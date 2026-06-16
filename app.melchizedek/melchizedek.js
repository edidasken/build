/* ═══════════════════════════════════════════════════════════════════════════
   MELCHIZEDEK — Background Check Management
   "And Melchizedek king of Salem brought out bread and wine.
    He was priest of God Most High." — Genesis 14:18

   Manages Checkr background checks for church members.
   Requires pastor/admin role. API key stored via Admin → Integrations → Checkr.

   Security: Checkr API is NEVER called client-side. All Checkr calls go through
   the initiateBackgroundCheck Cloud Function which reads the key server-side.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Constants ──────────────────────────────────────────────────────────── */
const BG_COLLECTION        = 'backgroundChecks';
const CANDIDATE_COLLECTION = 'checkrCandidates';
const DEFAULT_PACKAGE      = 'tasker_standard';

// Live Scan result values (California DOJ fingerprint-based check — AB 506)
// 'clear' = DOJ returned no disqualifying record
// 'pending' = submitted, awaiting DOJ response
// 'failed' = DOJ returned disqualifying record

const ROLE_LEVELS = { readonly: 0, volunteer: 1, care: 2, deacon: 2, leader: 3, treasurer: 3, pastor: 4, admin: 5 };

/* ── State ──────────────────────────────────────────────────────────────── */
let _allMembers  = [];
let _checksMap   = {}; // memberId → { status, checkrCandidateId, checkrReportId, invitationSentAt, updatedAt }
let _currentView = 'overview';
let _unsubChecks = null;
let _sortField   = 'firstName'; // 'lastName' | 'firstName' | 'role' | 'status'
let _sortDir     = 'asc';       // 'asc' | 'desc'
let _orgName     = '';          // loaded from Firestore appConfig/church_name

/* ── Helpers ────────────────────────────────────────────────────────────── */
const _e = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function _roleLevel(role) {
  return ROLE_LEVELS[String(role || '').toLowerCase()] ?? -1;
}

async function _poll(fn, timeout = 8000, interval = 120) {
  const deadline = Date.now() + timeout;
  return new Promise((resolve, reject) => {
    const check = () => {
      if (fn()) return resolve(true);
      if (Date.now() > deadline) return reject(new Error('Timeout waiting for dependency'));
      setTimeout(check, interval);
    };
    check();
  });
}

/* ── Boot ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Wait for UpperRoom + Nehemiah to load (script defer)
    await _poll(() => window.UpperRoom && window.Nehemiah && typeof window.Nehemiah.isAuthenticated === 'function');

    const UR = window.UpperRoom;
    const N  = window.Nehemiah;

    // Auth guard — redirect to sign-in if no active session
    // Note: <base href="../"> in the HTML means 'app.melchizedek/index.html'
    // resolves correctly to /app.melchizedek/index.html
    if (!N.isAuthenticated()) {
      window.location.replace('app.melchizedek/index.html');
      return;
    }

    // Role check — pastor+ only; redirect to sign-in if insufficient
    const profile  = N.getProfile ? N.getProfile() : null;
    const role     = (profile?.role || '').toLowerCase();
    if (_roleLevel(role) < 4) {
      window.location.replace('app.melchizedek/index.html');
      return;
    }

    // Wait for Firebase Auth token to be fully restored before any Firestore reads
    await new Promise(resolve => {
      const unsub = window.firebase?.auth?.().onAuthStateChanged(user => {
        unsub?.();
        resolve(user);
      });
      if (!window.firebase?.auth) resolve(null); // no-op if firebase not ready
    });

    // Mount app
    document.getElementById('melch-boot')?.classList.add('ws-hidden');
    document.getElementById('melch-app').hidden = false;

    _wireNav();
    _wireHeader(profile);
    await _loadData();
    _renderView('overview');
    _subscribeChecks();

  } catch (err) {
    console.error('[Melchizedek] init error', err);
    _showBootError(err);
  }
});

/* ── Boot error ─────────────────────────────────────────────────────────── */
function _showBootError(err) {
  document.getElementById('melch-boot')?.classList.add('ws-hidden');
  document.body.insertAdjacentHTML('beforeend', `
    <div class="melch-boot-error">
      <div class="melch-boot-card">
        <div class="melch-boot-icon">⚠️</div>
        <div class="melch-boot-title">Could not load app</div>
        <div class="melch-boot-message">${_e(err?.message || String(err))}</div>
        <button class="flock-btn flock-btn--primary" onclick="location.reload()">Try Again</button>
      </div>
    </div>`);
}

/* ── Header ─────────────────────────────────────────────────────────────── */
const MELCH_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><polyline points="9,12 11,14 15,10"/></svg>';

function _wireHeader(profile) {
  const host = document.getElementById('melch-topbar');
  if (!host) return;

  import('../Scripts/the_unity_header.js').then(({ mountUnityHeader }) => {
    const ctrl = mountUnityHeader(host, {
      appId:       'melchizedek',
      appName:     'Safety',
      appIconSvg:  MELCH_ICON,
      appAccent:   '#7c3aed',
      appAccentDk: '#4c1d95',
      homeHref:    'app.melchizedek/',
      signInHref:  'app.melchizedek/index.html',
      user:        profile || null,
      onSignOut:   async () => {
        try { await window.Nehemiah?.signOut?.(); } catch (_) {}
        window.location.replace('app.melchizedek/index.html');
      },
      onHamburger: () => {
        document.body.classList.toggle('veil-side-open');
      },
      features: [
        { id: 'view-overview',     label: 'Overview',     hint: 'Navigate', run: () => _wireNavTo('overview') },
        { id: 'view-members',      label: 'All Members',  hint: 'Navigate', run: () => _wireNavTo('members') },
        { id: 'view-pending',      label: 'Pending',      hint: 'Navigate', run: () => _wireNavTo('pending') },
        { id: 'view-approved',     label: 'Approved',     hint: 'Navigate', run: () => _wireNavTo('approved') },
        { id: 'view-not-approved', label: 'Not Approved', hint: 'Navigate', run: () => _wireNavTo('not-approved') },
        { id: 'view-compliance',   label: 'Compliance',   hint: 'Navigate', run: () => _wireNavTo('compliance') },
      ],
    });
    setTimeout(() => { try { ctrl?.update?.({ user: profile || null }); } catch (_) {} }, 1200);
  }).catch(err => console.warn('[Melchizedek] Unity header mount failed:', err));

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const side = document.getElementById('the-veil-side');
    if (side && document.body.classList.contains('veil-side-open') &&
        !side.contains(e.target) && !e.target.closest('.unity-header')) {
      document.body.classList.remove('veil-side-open');
    }
  });
}

function _wireNavTo(view) {
  document.querySelectorAll('[data-melch-view]').forEach(b => {
    b.classList.toggle('is-active', b.dataset.melchView === view);
    b.setAttribute('aria-current', b.dataset.melchView === view ? 'page' : 'false');
  });
  _currentView = view;
  _renderView(view);
  document.body.classList.remove('veil-side-open');
}

/* ── Navigation ─────────────────────────────────────────────────────────── */
function _wireNav() {
  document.querySelectorAll('[data-melch-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.melchView;
      document.querySelectorAll('[data-melch-view]').forEach(b => {
        b.classList.toggle('is-active', b.dataset.melchView === view);
        b.setAttribute('aria-current', b.dataset.melchView === view ? 'page' : 'false');
      });
      _currentView = view;
      _renderView(view);
      // Close mobile sidebar after nav
      document.body.classList.remove('veil-side-open');
    });
  });
}

/* ── Data loading ───────────────────────────────────────────────────────── */
async function _loadData() {
  const db = window.firebase?.firestore?.();

  // Load members directly from Firestore
  if (db) {
    try {
      const snap = await db.collection('members').limit(500).get();
      _allMembers = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn('[Melchizedek] members load error', err);
      _allMembers = [];
    }
  }

  // Filter inactive
  _allMembers = _allMembers.filter(r => {
    const ms = String(r.membershipStatus || '').toLowerCase();
    const s  = String(r.status || r.active || '').toLowerCase();
    return ms !== 'archived' && s !== 'inactive' && s !== 'false' && s !== '0' && s !== 'archived';
  });

  // Load background checks snapshot
  if (db) {
    try {
      const snap = await db.collection(BG_COLLECTION).get();
      _checksMap = {};
      snap.docs.forEach(d => { _checksMap[d.id] = d.data(); });
    } catch (_) {}
  }

  // Load org name from appConfig
  if (db) {
    try {
      const cfgDoc = await db.collection('appConfig').doc('church_name').get();
      _orgName = cfgDoc.exists ? (cfgDoc.data()?.value || '') : '';
    } catch (_) {}
  }
}

/* ── Live subscription ───────────────────────────────────────────────────── */
function _subscribeChecks() {
  const db = window.firebase?.firestore?.();
  if (!db) return;
  if (_unsubChecks) _unsubChecks();
  _unsubChecks = db.collection(BG_COLLECTION).onSnapshot(snap => {
    snap.docChanges().forEach(change => {
      if (change.type === 'removed') {
        delete _checksMap[change.doc.id];
      } else {
        _checksMap[change.doc.id] = change.doc.data();
      }
    });
    // Re-render current view
    _renderView(_currentView);
  }, err => console.warn('[Melchizedek] checks subscription error', err));
}

/* ── Views ──────────────────────────────────────────────────────────────── */
function _renderView(view) {
  const content = document.getElementById('melch-content');
  if (!content) return;

  switch (view) {
    case 'overview':    content.innerHTML = _viewOverview();    break;
    case 'members':     content.innerHTML = _viewMembers(_allMembers);  break;
    case 'pending':     content.innerHTML = _viewFiltered('pending',     'Pending Checks',  'Checks sent and awaiting results.'); break;
    case 'approved':    content.innerHTML = _viewFiltered('clear',       'Approved',        'Members whose background check came back clear.'); break;
    case 'not-approved': content.innerHTML = _viewFiltered('consider',   'Not Approved',    'Members whose background check requires further review.'); break;
    case 'compliance':   content.innerHTML = _viewCompliance(); break;
    case 'about':        content.innerHTML = _viewAbout();       break;
    default:            content.innerHTML = _viewOverview();
  }
  _wireContentActions(content);
}

function _viewOverview() {
  const total       = _allMembers.length;
  const checked     = Object.keys(_checksMap).length;
  const approved    = Object.values(_checksMap).filter(c => c.status === 'clear').length;
  const notApproved = Object.values(_checksMap).filter(c => c.status === 'consider').length;
  const pending     = Object.values(_checksMap).filter(c => c.status === 'pending').length;
  const noCheck     = total - checked;

  // Live Scan stats (CA DOJ fingerprint — manual record)
  const lsCleared  = Object.values(_checksMap).filter(c => c.liveScan?.result === 'clear').length;
  const lsPending  = Object.values(_checksMap).filter(c => c.liveScan?.result === 'pending').length;
  const lsFailed   = Object.values(_checksMap).filter(c => c.liveScan?.result === 'failed').length;
  const lsNone     = total - Object.values(_checksMap).filter(c => c.liveScan?.result).length;

  return `
    <div class="melch-section-head">
      <div class="melch-section-title melch-section-title--large">Background Checks</div>
      <div class="melch-section-subtitle melch-section-subtitle--large">Background checks, waivers, and compliance records for safer ministry.</div>
    </div>

    <div class="melch-kicker">Checkr</div>
    <div class="melch-stat-grid">
      ${_statCard('Total Members', total, 'accent')}
      ${_statCard('Approved', approved, 'ok')}
      ${_statCard('Not Approved', notApproved, 'error')}
      ${_statCard('Pending', pending, 'warn')}
      ${_statCard('No Check', noCheck, 'muted')}
    </div>

    <div class="melch-kicker">
      Live Scan <span class="melch-kicker-note">— CA DOJ Fingerprint (manual record)</span>
    </div>
    <div class="melch-stat-grid melch-stat-grid--loose">
      ${_statCard('LS Cleared', lsCleared, 'ok')}
      ${_statCard('LS Pending', lsPending, 'warn')}
      ${_statCard('LS Failed', lsFailed, 'error')}
      ${_statCard('No Live Scan', lsNone, 'muted')}
    </div>

    <div class="melch-kicker melch-kicker--roomy">Members Without a Checkr Check</div>
    ${_renderMemberList(_allMembers.filter(m => {
      const uid = m.id || m.memberNumber || m.email || '';
      return !_checksMap[uid];
    }), { showInitiateBtn: true })}
    ${_complianceAlerts()}
  `;
}

function _statCard(label, count, tone = 'accent') {
  return `
    <div class="ms-stat-card melch-stat-card">
      <div class="melch-stat-count melch-stat-count--${tone}">${count}</div>
      <div class="melch-stat-label">${_e(label)}</div>
    </div>`;
}

function _viewMembers(members) {
  return `
    <div class="melch-section-title melch-section-head--compact">All Members</div>
    ${_renderMemberList(members, { showInitiateBtn: true })}
  `;
}

function _viewFiltered(status, title, subtitle) {
  const members = _allMembers.filter(m => {
    const uid = m.id || m.memberNumber || m.email || '';
    return (_checksMap[uid]?.status || '') === status;
  });
  const parentNotifBanner = status === 'consider' && members.length ? `
    <div class="melch-warning-banner">
      <strong class="melch-warning-strong">⚠ Pen. Code §11105.3(c)(1) — Mandatory Parent Notification</strong><br>
      If your organization proceeds with placing any of these individuals in a role supervising minors,
      you are legally required to notify affected parents/guardians in writing at least
      <strong>10 days before that person begins duties</strong>. Use the "Document Notification" button
      on each record to log compliance.
    </div>` : '';
  return `
    <div class="melch-section-head melch-section-head--compact">
      <div class="melch-section-title">${_e(title)}</div>
      <div class="melch-section-subtitle">${_e(subtitle)}</div>
    </div>
    ${parentNotifBanner}
    ${members.length
      ? _renderMemberList(members, { showInitiateBtn: status === 'consider', showParentNotif: status === 'consider' })
      : `<div class="life-empty">No members in this category.</div>`}
  `;
}

/* ── Member list renderer ────────────────────────────────────────────────── */
const _AVATAR_COLORS = ['c0','c1','c2','c3','c4','c5','c6','c7','c8','c9'];

function _viewAbout() {
  return `
<div class="melch-about">

  <!-- Header -->
  <div class="melch-about-hero">
    <div class="melch-about-hero-row">
      <div class="melch-about-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/></svg>
      </div>
      <div>
        <div class="melch-about-title">Safety</div>
        <div class="melch-about-subtitle">
          Background Check &amp; AB-506 Compliance Management
        </div>
      </div>
    </div>
  </div>

  <!-- Safety mandate -->
  <div class="melch-mandate">
    <div class="melch-mandate-kicker">The Safety Mandate</div>
    <p class="melch-mandate-copy">
      Ministry care includes wise safeguards for the vulnerable, clear records for leaders, and accountable workflows for everyone who serves.
    </p>
    <p class="melch-mandate-copy melch-mandate-copy--secondary">
      Safety brings background checks, annual waivers, mandated reporter training, LiveScan records, and Checkr status into one auditable place.
    </p>
    <div class="melch-mandate-note">
      <strong>Why it matters:</strong> every worker's fitness to serve should be verified through objective, documented evidence, not assumption.
    </div>
  </div>

  <!-- Section 1 -->
  ${_aboutSection('1', 'The Legal Imperative — California AB-506',
    `<p>Originally enacted in 2021 and <strong>fully in force as of January 1, 2024</strong> (amended by AB 1754,
    Stats. 2023, Ch. 131), <strong>Assembly Bill 506</strong> — codified at Cal. Bus. &amp; Prof. Code §18975 —
    requires every qualifying youth-serving organization to implement a comprehensive child abuse prevention
    program. The transitional exemption previously granted to legacy organizations has expired. Full compliance
    is now mandatory with no exceptions.</p>
    <div class="melch-about-grid">
      ${_aboutCallout('⏱ The Regular Volunteer Threshold',
        '<strong>§18975(e)(1):</strong> A &ldquo;regular volunteer&rdquo; is any person <strong>18 or older</strong> who has direct contact with, or supervision of, children for more than <strong>16 hours per month</strong> or <strong>32 hours per year</strong>. Administrators and paid employees are subject to all requirements regardless of hours.')}
      ${_aboutCallout('📋 Mandated Reporter Training',
        '<strong>§18975(a):</strong> Every administrator, employee, and regular volunteer must complete state-approved training in child abuse and neglect <em>identification</em> and child abuse and neglect <em>reporting</em> before beginning service. These workers are legally designated mandated reporters under Pen. Code §11165.7(a)(7). The requirement may be satisfied by the free online course offered by the California Office of Child Abuse Prevention (OCAP) at the State Department of Social Services.')}
      ${_aboutCallout('🔍 Fingerprint Background Check &amp; Annual Waiver',
        '<strong>§18975(b) / Pen. Code §11105.3:</strong> Every qualifying person must submit to a state and federal fingerprint-based criminal history background check processed through the California Department of Justice. <strong>DOJ processing is free for nonprofits</strong> (§11105.3(b)(1)). Organizations must also maintain a signed annual waiver from each worker authorizing release of their criminal history — this waiver must be renewed every year (§11105.3(b)(2)(C)).')}
      ${_aboutCallout('👥 Two Mandated Reporters Policy',
        '<strong>§18975(c)(2)(A):</strong> Organizations must adopt written policies requiring, <em>to the greatest extent possible</em>, the presence of at least two mandated reporters whenever staff or volunteers are in contact with or supervising children. <em>Narrow exception (§18975(c)(2)(B)):</em> one-to-one mentoring programs may substitute this requirement by adopting comprehensive screening, volunteer and parent training, and regular parent contact policies.')}
      ${_aboutCallout('📢 Mandatory Parent Notification',
        '<strong>Pen. Code §11105.3(c)(1):</strong> If a background check reveals a disqualifying conviction — including sex offenses under §290, child abuse offenses under §§273a or 273d, or assault under §220 — and the organization still places that person in a role supervising minors, it <em>must</em> notify the parents or guardians of affected children at least <strong>10 days before that person begins duties</strong>. This obligation cannot be waived.')}
      ${_aboutCallout('🔒 Non-Transferability of Criminal History Records',
        '<strong>Pen. Code §11105.3(g):</strong> DOJ criminal history records are confidential to the specific requesting agency and may not be transferred, shared, or relied upon by any other organization. A volunteer cleared by a school, another church, or any other ministry must submit new fingerprints tied to Little Flock\'s own ORI — prior clearances have no legal standing here.')}
    </div>
    ${_aboutRefPills([
      { label: 'BPC §18975 — Full Text', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=18975.&lawCode=BPC' },
      { label: 'Pen. Code §11105.3', url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=11105.3.&lawCode=PEN' },
      { label: 'OCAP Mandated Reporter Training', url: 'https://www.cdss.ca.gov/inforesources/ocap' },
      { label: 'DOJ Agency Authorization', url: 'https://oag.ca.gov/fingerprints/agencies' },
      { label: 'LiveScan Locations', url: 'https://oag.ca.gov/fingerprints/locations' }
    ])}`
  )}

  <!-- Section 2 -->
  ${_aboutSection('2', 'Why Automation — The Case for Safety',
    `<p>Manually tracking AB-506 compliance introduces serious operational and legal risk. Safety
    eliminates that risk by converting every manual step into an automated, auditable workflow.</p>
    <div class="melch-about-table-wrap">
      <table class="melch-about-table">
        <thead>
          <tr>
            <th>Manual Challenge</th>
            <th>Safety Solution</th>
          </tr>
        </thead>
        <tbody>
          ${_aboutTableRow(
            'Tracking volunteer hours to identify who crosses the 16 hrs/month or 32 hrs/year threshold.',
            'FlockOS tracks shift schedules, flags profiles approaching the threshold, and triggers the check workflow <em>before</em> limits are breached.'
          )}
          ${_aboutTableRow(
            'Managing DOJ LiveScan paperwork and matching Form 8016 data to volunteer profiles.',
            'Automatically generates pre-filled BCIA 8016 forms with Little Flock\'s ORI, ensuring exact name and demographic matching to prevent DOJ rejection.'
          )}
          ${_aboutTableRow(
            'Validating static background checks that quickly become outdated.',
            'Checkr Continuous Criminal (Continuous Crim) monitoring alerts leadership instantly if a cleared worker has a subsequent arrest.'
          )}
          ${_aboutTableRow(
            'Chasing volunteers via email to complete Mandated Reporter Training.',
            'Automated email sequences, in-app notifications, and certificate upload tracking within the FlockOS dashboard.'
          )}
        </tbody>
      </table>
    </div>`
  )}

  <!-- Section 3 -->
  ${_aboutSection('3', 'Checkr API &amp; LiveScan Integration',
    `<p>LiveScan satisfies California\'s DOJ fingerprint requirement. Pairing it with the Checkr API delivers
    a comprehensive, modern trust-and-safety framework that goes far beyond a one-time check.</p>
    <div class="melch-about-grid melch-about-grid--two">
      <div class="melch-about-card melch-about-card--gold">
        <div class="melch-about-card-title">Checkr API</div>
        ${_aboutBullet('Instant Initiation', 'Only a candidate email address is needed to kickstart screening natively from the FlockOS dashboard.')}
        ${_aboutBullet('Continuous Monitoring', 'Checkr\'s data network monitors for post-hire offenses and pushes real-time webhook updates back to FlockOS.')}
        ${_aboutBullet('AI-Powered Adjudication', 'Machine learning classifiers filter non-reportable information per local law, delivering clean Clear / Review statuses.')}
      </div>
      <div class="melch-about-card melch-about-card--blue">
        <div class="melch-about-card-title melch-about-card-title--blue">LiveScan Workflow</div>
        ${_aboutBullet('ORI Integration', 'Little Flock\'s DOJ-issued ORI is stored securely; every initiated check outputs a customized BCIA 8016 Request for Live Scan Service form pre-filled with the correct agency data.')}
        ${_aboutBullet('Applicant Tracking', 'Volunteers visit an authorized Live Scan operator with provided documentation. The ATI (Applicant Tracking Identifier) is logged in the Safety record.')}
        ${_aboutBullet('DOJ Clearance Syncing', 'Once the DOJ issues a clearance, Safety updates the worker\'s compliance status, unlocking youth-event scheduling assignments.')}
        ${_aboutBullet('Subsequent Arrest Notification', 'Per Pen. Code §11105.3(i)(2), organizations may enroll cleared workers in the DOJ\'s ongoing <em>Subsequent Arrest Notification</em> service — the California equivalent of continuous monitoring. Safety manages enrollment and routes any future notifications to leadership automatically.')}
      </div>
    </div>`
  )}

  <!-- Section 4 -->
  ${_aboutSection('4', 'Technical Architecture — The Onboarding Pipeline',
    `<p>Safety transforms a high-risk administrative chore into a seamless, fully auditable pipeline.</p>
    <div class="melch-about-steps">
      ${_aboutStep('1', 'gold', 'Trigger',
        'A FlockOS member is assigned to a youth ministry role, or their attendance tracking hits the AB-506 hour threshold. Safety flags the profile automatically.')}
      ${_aboutStep('2', 'blue', 'API Call',
        'Safety pings the Checkr API via <code>/v1/candidates</code> to initiate the national check and enroll the candidate in continuous monitoring.')}
      ${_aboutStep('3', 'green', 'Document Generation',
        'A pre-filled LiveScan Form 8016 is generated with Little Flock\'s ORI. Instructions and a link to the California state Mandated Reporter Training portal are sent to the candidate.')}
      ${_aboutStep('4', 'purple', 'Status Webhooks',
        'As Checkr completes screening, it sends a secure <code>check.completed</code> webhook to FlockOS, automatically updating the member\'s dashboard record in real time.')}
      ${_aboutStep('5', 'navy', 'Final Adjudication',
        'Leadership reviews the consolidated Safety dashboard — Checkr result and DOJ LiveScan clearance in one view — and approves or flags the worker for follow-up.')}
    </div>`
  )}

  <!-- Section 5 -->
  ${_aboutSection('5', 'Going Further — How FlockOS Cares for the Little Flock',
    `<p>AB-506 sets the legal floor. Safety is built to go well beyond it — transforming compliance
    from a checklist into a living, breathing layer of pastoral care for every person who serves.</p>
    <div class="melch-about-grid">
      ${_aboutCallout('📡 Hour Threshold Watchdog',
        'FlockOS tracks every member\'s ministry involvement hours in real time. When a volunteer approaches the 16 hr/month or 32 hr/year threshold, Safety flags the profile and opens the compliance workflow — <em>before</em> the legal line is crossed, not after.')}
      ${_aboutCallout('🔔 Dual Continuous Monitoring',
        'Cleared workers are enrolled in both the California DOJ\'s Subsequent Arrest Notification service (§11105.3(i)(2)) and Checkr\'s national Continuous Criminal monitoring simultaneously — providing state-level and national-level post-clearance surveillance in a single dashboard.')}
      ${_aboutCallout('📅 Annual Waiver Auto-Renewal',
        'California law requires a fresh signed waiver from each worker every year (§11105.3(b)(2)(C)). Safety auto-generates and routes renewal requests 30 days before expiry, tracks completion, and locks the worker\'s scheduling access until the waiver is re-signed.')}
      ${_aboutCallout('📜 OCAP Training Certificate Vault',
        'Every worker\'s OCAP completion certificate is uploaded, stored, and tracked within their Safety profile. The system flags certificates as they age and resurfaces the renewal workflow — because mandated reporter training is not a one-time event.')}
      ${_aboutCallout('🗓 Two-Reporter Scheduling Guard',
        'When a youth-event shift is being scheduled in FlockOS, Safety cross-references §18975(c)(2)(A) and blocks any assignment that would leave a single worker alone with children. The scheduling UI surfaces the policy requirement and prompts leadership to add a second cleared reporter before saving.')}
      ${_aboutCallout('📣 Parent Notification Workflow',
        'If a background check returns a Review result that leadership chooses to manually override, Safety immediately surfaces the §11105.3(c)(1) parent notification obligation — generates the required written notice, tracks the 10-day window, and records confirmation of delivery in the audit log.')}
      ${_aboutCallout('📊 Insurance Compliance Record',
        'Under §18975(d), insurers may request proof of compliance before writing liability coverage for a youth-serving organization. Safety generates a complete compliance report on demand — training completions, background check dates, waiver status, and policy acknowledgments — providing everything needed to satisfy an insurer\'s loss control audit.')}
    </div>`
  )}

  <!-- Footer note -->
  <div class="melch-about-footer">
    <strong>A note on security:</strong> The Checkr API key is
    <em>never</em> called client-side. All Checkr API calls route through a Firebase Cloud Function
    that reads the key server-side, ensuring credentials are never exposed in the browser.
    Access to this module is restricted to pastor and admin roles only.
  </div>

</div>`;
}

function _aboutSection(num, title, body) {
  return `
    <div class="melch-about-section">
      <div class="melch-about-section-heading">
        <span class="melch-about-section-num">${_e(num)}</span>
        <span class="melch-about-section-title">${title}</span>
      </div>
      <div class="melch-about-section-body">${body}</div>
    </div>`;
}

function _aboutCallout(label, text) {
  return `
    <div class="melch-about-callout">
      <span class="melch-about-callout-icon">${label.split(' ')[0]}</span>
      <div>
        <div class="melch-about-callout-title">
          ${_e(label.split(' ').slice(1).join(' '))}
        </div>
        <div class="melch-about-callout-copy">${text}</div>
      </div>
    </div>`;
}

function _aboutTableRow(challenge, solution) {
  return `
    <tr class="melch-about-table-row">
      <td class="melch-about-table-cell melch-about-table-cell--muted">${challenge}</td>
      <td class="melch-about-table-cell">${solution}</td>
    </tr>`;
}

function _aboutBullet(label, text) {
  return `<div class="melch-about-bullet">
    <div class="melch-about-bullet-title">${_e(label)}</div>
    <div class="melch-about-bullet-copy">${text}</div>
  </div>`;
}

function _aboutStep(num, tone, label, text) {
  const last = num === '5';
  return `
    <div class="melch-about-step">
      <div class="melch-about-step-track">
        <div class="melch-about-step-num melch-about-step-num--${tone}">${_e(num)}</div>
        ${last ? '' : '<div class="melch-about-step-line"></div>'}
      </div>
      <div class="melch-about-step-body${last ? ' melch-about-step-body--last' : ''}">
        <div class="melch-about-step-title">${_e(label)}</div>
        <div class="melch-about-step-copy">${text}</div>
      </div>
    </div>`;
}

function _aboutRefPills(refs) {
  return `<div class="melch-about-ref-list">
    ${refs.map(r =>
      `<a href="${r.url}" target="_blank" rel="noopener"
        class="melch-about-ref">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        ${_e(r.label)}</a>`
    ).join('')}
  </div>`;
}

function _sortedMembers(members) {
  const STATUS_ORDER = { clear: 0, pending: 1, consider: 2, '': 3 };
  return [...members].sort((a, b) => {
    const uid_a = a.id || a.memberNumber || a.email || '';
    const uid_b = b.id || b.memberNumber || b.email || '';
    let av, bv;
    switch (_sortField) {
      case 'firstName':
        av = (a.firstName || a.displayName || a.name || '').toLowerCase();
        bv = (b.firstName || b.displayName || b.name || '').toLowerCase();
        break;
      case 'role':
        av = (a.role || a.memberType || '').toLowerCase();
        bv = (b.role || b.memberType || '').toLowerCase();
        break;
      case 'status': {
        const sa = _checksMap[uid_a]?.status || '';
        const sb = _checksMap[uid_b]?.status || '';
        av = STATUS_ORDER[sa] ?? 3;
        bv = STATUS_ORDER[sb] ?? 3;
        break;
      }
      default: // lastName
        av = (a.lastName || a.displayName || a.name || '').toLowerCase();
        bv = (b.lastName || b.displayName || b.name || '').toLowerCase();
    }
    if (av < bv) return _sortDir === 'asc' ? -1 : 1;
    if (av > bv) return _sortDir === 'asc' ?  1 : -1;
    return 0;
  });
}

function _sortBar() {
  const fields = [
    { key: 'lastName',  label: 'Last Name' },
    { key: 'firstName', label: 'First Name' },
    { key: 'role',      label: 'Role' },
    { key: 'status',    label: 'Check Status' },
  ];
  const pills = fields.map(f => {
    const active = f.key === _sortField;
    const arrow  = active ? (_sortDir === 'asc' ? ' ↑' : ' ↓') : '';
    return `<button class="flock-btn flock-btn--sm melch-sort-button${active ? ' flock-btn--primary' : ' flock-btn--ghost'}" data-act="sort" data-sort-field="${f.key}">${_e(f.label)}${arrow}</button>`;
  }).join('');
  return `<div class="melch-sort-bar">
    <span class="melch-sort-label">Sort:</span>
    ${pills}
  </div>`;
}

function _renderMemberList(members, opts = {}) {
  if (!members.length) return '<div class="life-empty">No members found.</div>';
  const sorted = _sortedMembers(members);
  return `${_sortBar()}<div class="melch-member-list">${sorted.map(m => _memberRow(m, opts)).join('')}</div>`;
}

function _memberRow(p, opts = {}) {
  const first    = p.firstName || '';
  const last     = p.lastName || '';
  const name     = p.displayName || p.name || `${first} ${last}`.trim() || 'Unknown';
  const role     = (p.role || p.memberType || 'member').toLowerCase();
  const email    = (p.email || p.primaryEmail || '').trim();
  const uid      = p.id || p.memberNumber || p.email || '';
  const initials = (first ? first[0] : (name[0] || '')) + (last ? last[0] : (name[1] || ''));
  const avatar   = _AVATAR_COLORS[(name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % _AVATAR_COLORS.length];
  const check    = _checksMap[uid] || null;
  const badge    = _statusBadge(check?.status);

  return `
    <div class="melch-member-row" data-member-id="${_e(uid)}">
      <div class="melch-avatar melch-avatar--${avatar}">
        ${_e(initials.toUpperCase().slice(0,2))}
      </div>
      <div class="melch-member-main">
        <div class="melch-member-name">${_e(name)}</div>
        <div class="melch-member-meta">${_e(role)}${email ? ' · ' + _e(email) : ''}</div>
      </div>
      <div class="melch-member-actions">
        ${badge}
        ${_liveScanBadge(check?.liveScan)}
        <button class="flock-btn flock-btn--ghost flock-btn--sm melch-manage-btn" data-act="open-admin-modal"
          data-member-id="${_e(uid)}" data-name="${_e(name)}" data-email="${_e(email)}"
          ${opts.showInitiateBtn ? 'data-show-initiate="1"' : ''}
          ${opts.showParentNotif ? 'data-show-parent-notif="1"' : ''}
          ${check?.invitationUrl ? `data-invitation-url="${_e(check.invitationUrl)}"` : ''}>Manage</button>
      </div>
    </div>`;
}

function _statusBadge(status) {
  switch (status) {
    case 'clear':
      return '<span class="wall-status-badge wall-status--ok" title="Checkr: Approved">APPROVED</span>';
    case 'consider':
      return '<span class="wall-status-badge wall-status--error" title="Checkr: Not Approved">NOT APPROVED</span>';
    case 'pending':
      return '<span class="wall-status-badge wall-status--warn" title="Checkr: Pending">PENDING</span>';
    default:
      return '<span class="wall-status-badge wall-status--muted" title="No Checkr check">No Check</span>';
  }
}

function _liveScanBadge(ls) {
  if (!ls?.result) return '<span class="wall-status-badge wall-status--muted" title="No Live Scan on file">No LS</span>';
  switch (ls.result) {
    case 'clear':
      return `<span class="wall-status-badge wall-status--ok" title="Live Scan cleared${ls.clearedAt ? ' · ' + _fmtDate(ls.clearedAt) : ''}">LS CLEAR</span>`;
    case 'pending':
      return `<span class="wall-status-badge wall-status--warn" title="Live Scan submitted${ls.submittedAt ? ' · ' + _fmtDate(ls.submittedAt) : ''}">LS PENDING</span>`;
    case 'failed':
      return `<span class="wall-status-badge wall-status--error" title="Live Scan failed${ls.clearedAt ? ' · ' + _fmtDate(ls.clearedAt) : ''}">LS FAILED</span>`;
    default:
      return '<span class="wall-status-badge wall-status--muted">LS ?</span>';
  }
}

function _fmtDate(val) {
  if (!val) return '';
  try {
    const d = val?.toDate ? val.toDate() : new Date(val);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (_) { return ''; }
}

/* ── Admin modal (overview + member list rows) ───────────────────────────── */
function _ensureAdminModal() {
  let modal = document.getElementById('melch-adm-modal');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'melch-adm-modal';
  modal.className = 'melch-modal-overlay melch-modal-overlay--admin';
  modal.innerHTML = '<div class="melch-adm-card"></div>';
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('is-open'); });
  document.body.appendChild(modal);
  return modal;
}

function _openAdminModal(btn) {
  const uid          = btn.dataset.memberId || '';
  const dname        = btn.dataset.name || '';
  const email        = btn.dataset.email || '';
  const showInitiate = btn.hasAttribute('data-show-initiate');
  const showPNtf     = btn.hasAttribute('data-show-parent-notif');
  const showComp     = btn.hasAttribute('data-show-compliance');
  const invUrl       = btn.dataset.invitationUrl || '';

  const m     = _allMembers.find(x => (x.id || x.memberNumber || x.email || '') === uid) || {};
  const check = _checksMap[uid] || {};
  const ws    = _waiverStatus(check);
  const os    = _ocapStatus(check);
  const hs    = _hoursStatus(check);

  const initials = ((m.firstName?.[0] || dname[0] || '') + (m.lastName?.[0] || dname[1] || '')).toUpperCase().slice(0, 2);
  const avatar   = _AVATAR_COLORS[(dname.charCodeAt(0) + (dname.charCodeAt(1) || 0)) % _AVATAR_COLORS.length];
  const san      = check.sanEnrolled ? _statusPill('SAN Enrolled', 'ok') : _statusPill('SAN Not Enrolled', 'muted');
  const pn       = check.parentNotif?.sent
    ? _statusPill('Notif Sent ' + _fmtDate(check.parentNotif.sentDate), 'ok')
    : _statusPill('No Parent Notif', 'muted');

  const modal = _ensureAdminModal();
  const card  = modal.querySelector('.melch-adm-card');

  card.innerHTML = `
    <div class="melch-modal-header">
      <div class="melch-avatar melch-avatar--large melch-avatar--${avatar}">${_e(initials)}</div>
      <div class="melch-modal-person">
        <div class="melch-modal-person-name">${_e(dname)}</div>
        <div class="melch-modal-person-meta">${m.role ? _e(m.role) : ''}${email ? (m.role ? ' · ' : '') + _e(email) : ''}</div>
      </div>
      <button class="melch-close-btn" data-act="close-adm-modal" aria-label="Close">✕</button>
    </div>
    <div class="melch-adm-rows">
      ${_amRow('Checkr',        _statusBadge(check.status))}
      ${_amRow('Live Scan',     _liveScanBadge(check.liveScan))}
      ${_amRow('Annual Waiver', _statusPill(ws.label, ws.color))}
      ${_amRow('OCAP Cert',     _statusPill(os.label, os.color))}
      ${_amRow('Hours',         _statusPill(hs.label, hs.color))}
      ${_amRow('SAN',           san)}
      ${_amRow('Parent Notif',  pn)}
    </div>
    <div class="melch-adm-actions">
      ${showInitiate && email ? `
        <button class="flock-btn flock-btn--primary flock-btn--sm" data-act="modal-initiate-check"
          data-member-id="${_e(uid)}" data-email="${_e(email)}" data-name="${_e(dname)}">
          ${check.status ? 'Re-check' : 'Initiate Check'}
        </button>` : ''}
      <button class="flock-btn flock-btn--ghost flock-btn--sm" data-act="modal-record-livescan">
        ${check.liveScan ? 'Update LS' : '+ Live Scan'}
      </button>
      ${(showPNtf || check.status === 'consider') ? `
        <button class="flock-btn flock-btn--sm ${check.parentNotif?.sent ? 'melch-notif-btn--sent' : 'melch-notif-btn--needed'}" data-act="modal-parent-notif">
          ${check.parentNotif?.sent ? '✓ Notified ' + _fmtDate(check.parentNotif.sentDate) : '§ Document Notification'}
        </button>` : ''}
      ${invUrl ? `
        <a href="${_e(invUrl)}" target="_blank" rel="noopener noreferrer"
          class="flock-btn flock-btn--sm melch-report-link">View Report ↗</a>` : ''}
      ${showComp ? `
        <button class="flock-btn flock-btn--ghost flock-btn--sm" data-act="modal-edit-compliance">Edit Compliance</button>
        <button class="flock-btn flock-btn--ghost flock-btn--sm melch-waiver-btn" data-act="modal-generate-waiver">Waiver ↓</button>` : ''}
    </div>`;

  card.querySelector('[data-act="close-adm-modal"]').addEventListener('click', () => {
    modal.classList.remove('is-open');
  });
  card.querySelector('[data-act="modal-record-livescan"]')?.addEventListener('click', () => {
    modal.classList.remove('is-open');
    _showLiveScanModal(uid, dname);
  });
  card.querySelector('[data-act="modal-parent-notif"]')?.addEventListener('click', () => {
    modal.classList.remove('is-open');
    _showParentNotifModal(uid, dname);
  });
  card.querySelector('[data-act="modal-edit-compliance"]')?.addEventListener('click', () => {
    modal.classList.remove('is-open');
    _showComplianceModal(uid, dname);
  });
  card.querySelector('[data-act="modal-generate-waiver"]')?.addEventListener('click', () => {
    modal.classList.remove('is-open');
    window.open(`app.melchizedek/waiver-sign.html?uid=${encodeURIComponent(uid)}`, '_blank');
  });

  const initiateBtn = card.querySelector('[data-act="modal-initiate-check"]');
  if (initiateBtn) {
    initiateBtn.addEventListener('click', async () => {
      const ok = confirm(`Initiate a background check for ${dname}?\n\nCheckr will send an email to ${email} with a secure link to submit their information.`);
      if (!ok) return;
      initiateBtn.disabled = true;
      const orig = initiateBtn.textContent;
      initiateBtn.textContent = 'Sending…';
      try {
        await _initiateCheck({ memberId: uid, email, name: dname });
        initiateBtn.textContent = 'Sent ✓';
        setTimeout(() => { initiateBtn.disabled = false; initiateBtn.textContent = 'Re-check'; }, 3000);
      } catch (err) {
        console.error('[Melchizedek] initiateCheck error', err);
        alert(`Could not initiate check: ${err?.message || String(err)}`);
        initiateBtn.disabled = false;
        initiateBtn.textContent = orig;
      }
    });
  }

  modal.classList.add('is-open');
}

function _amRow(label, value) {
  return `
    <div class="melch-am-row">
      <span class="melch-am-label">${label}</span>
      <span class="melch-am-value">${value}</span>
    </div>`;
}

/* ── Action wiring ───────────────────────────────────────────────────────── */
function _wireContentActions(root) {
  root.querySelectorAll('[data-act="open-admin-modal"]').forEach(btn => {
    btn.addEventListener('click', () => _openAdminModal(btn));
  });

  root.querySelectorAll('[data-act="sort"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const field = btn.dataset.sortField;
      if (_sortField === field) {
        _sortDir = _sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        _sortField = field;
        _sortDir   = 'asc';
      }
      _renderView(_currentView);
    });
  });

  root.querySelectorAll('[data-act="record-livescan"]').forEach(btn => {
    btn.addEventListener('click', () => {
      _showLiveScanModal(btn.dataset.memberId, btn.dataset.name);
    });
  });

  root.querySelectorAll('[data-act="edit-compliance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      _showComplianceModal(btn.dataset.memberId, btn.dataset.name);
    });
  });

  root.querySelectorAll('[data-act="document-parent-notif"]').forEach(btn => {
    btn.addEventListener('click', () => {
      _showParentNotifModal(btn.dataset.memberId, btn.dataset.name);
    });
  });

  root.querySelectorAll('[data-act="print-compliance"]').forEach(btn => {
    btn.addEventListener('click', () => window.print());
  });

  root.querySelectorAll('[data-act="generate-waiver"]').forEach(btn => {
    btn.addEventListener('click', () =>
      window.open(`app.melchizedek/waiver-sign.html?uid=${encodeURIComponent(btn.dataset.memberId)}`, '_blank'));
  });

  // In-content navigation links (e.g. compliance alert cards)
  root.querySelectorAll('[data-melch-view]').forEach(el => {
    el.addEventListener('click', () => _wireNavTo(el.dataset.melchView));
  });

  root.querySelectorAll('[data-act="initiate-check"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const memberId = btn.dataset.memberId;
      const email    = btn.dataset.email;
      const name     = btn.dataset.name;
      if (!email) {
        alert('This member has no email address. Add an email before initiating a background check.');
        return;
      }
      const ok = confirm(`Initiate a background check for ${name}?\n\nCheckr will send an email to ${email} with a secure link to submit their information.`);
      if (!ok) return;

      btn.disabled = true;
      const orig = btn.textContent;
      btn.textContent = 'Sending…';

      try {
        await _initiateCheck({ memberId, email, name });
        btn.textContent = 'Sent ✓';
        setTimeout(() => { btn.disabled = false; btn.textContent = 'Re-check'; }, 3000);
      } catch (err) {
        console.error('[Melchizedek] initiateCheck error', err);
        alert(`Could not initiate check: ${err?.message || String(err)}`);
        btn.disabled = false;
        btn.textContent = orig;
      }
    });
  });
}

/* ── Live Scan modal (California DOJ fingerprint — AB 506 — manual entry) ── */
function _showLiveScanModal(memberId, name) {
  const existing = _checksMap[memberId]?.liveScan || {};

  // Remove any existing modal
  document.getElementById('melch-ls-modal')?.remove();

  const modal = document.createElement('div');
  modal.id = 'melch-ls-modal';
  modal.className = 'melch-modal-overlay';
  modal.innerHTML = `
    <div class="melch-modal-card">
      <div class="melch-modal-title">Live Scan Record</div>
      <div class="melch-modal-subtitle">
        ${_e(name)} — California DOJ Fingerprint (AB 506)
      </div>

      <label class="melch-form-label">
        <div class="melch-form-field-title">Result</div>
        <select id="ls-result" class="melch-select">
          <option value="pending" ${existing.result === 'pending' ? 'selected' : ''}>Pending — submitted, awaiting DOJ response</option>
          <option value="clear"   ${existing.result === 'clear'   ? 'selected' : ''}>Cleared — DOJ returned no disqualifying record</option>
          <option value="failed"  ${existing.result === 'failed'  ? 'selected' : ''}>Failed — DOJ returned disqualifying record</option>
        </select>
      </label>

      <label class="melch-form-label">
        <div class="melch-form-field-title">Date Submitted to Live Scan Station</div>
        <input type="date" id="ls-submitted" value="${_isoDate(existing.submittedAt)}"
          class="melch-input">
      </label>

      <label class="melch-form-label melch-form-label--roomy">
        <div class="melch-form-field-title">Date Result Received from DOJ</div>
        <input type="date" id="ls-received" value="${_isoDate(existing.clearedAt)}"
          class="melch-input">
      </label>

      <div class="melch-form-note">
        Live Scan is done in person at a CA DOJ-approved fingerprint station. Results go directly from DOJ to your organization — record the result here to keep your roster current.
      </div>

      <div class="melch-form-actions">
        <button id="ls-cancel" class="flock-btn flock-btn--ghost flock-btn--sm">Cancel</button>
        <button id="ls-save"   class="flock-btn flock-btn--primary flock-btn--sm">Save Record</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  modal.querySelector('#ls-cancel').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  modal.querySelector('#ls-save').addEventListener('click', async () => {
    const result    = modal.querySelector('#ls-result').value;
    const submitted = modal.querySelector('#ls-submitted').value;
    const received  = modal.querySelector('#ls-received').value;
    const saveBtn   = modal.querySelector('#ls-save');

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';

    try {
      await _saveLiveScan({ memberId, name, result, submitted, received });
      modal.remove();
    } catch (err) {
      console.error('[Melchizedek] saveLiveScan error', err);
      alert(`Could not save: ${err?.message || String(err)}`);
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Record';
    }
  });
}

async function _saveLiveScan({ memberId, name, result, submitted, received }) {
  const db = window.firebase?.firestore?.();
  if (!db) throw new Error('Firestore not available.');

  const lsData = {
    result,
    submittedAt: submitted || null,
    clearedAt:   received  || null,
    recordedAt:  new Date().toISOString(),
  };

  await db.collection(BG_COLLECTION).doc(memberId).set({
    memberId,
    name,
    liveScan:  lsData,
    updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });

  // Optimistic local update
  if (!_checksMap[memberId]) _checksMap[memberId] = { memberId, name };
  _checksMap[memberId].liveScan  = lsData;
  _checksMap[memberId].updatedAt = new Date().toISOString();
  _renderView(_currentView);
}

function _isoDate(val) {
  if (!val) return '';
  try {
    const d = val?.toDate ? val.toDate() : new Date(val);
    return d.toISOString().split('T')[0];
  } catch (_) { return ''; }
}

/* ── Checkr API proxy (via Cloud Function) ──────────────────────────────── */
async function _initiateCheck({ memberId, email, name, packageSlug = DEFAULT_PACKAGE }) {
  // Confirm the Cloud Function is available
  const funcs = window.firebase?.functions?.();
  if (!funcs) throw new Error('Firebase Functions not available. Ensure the app is connected to Firebase.');

  const fn = funcs.httpsCallable('initiateBackgroundCheck');
  const result = await fn({ memberId, email, name, packageSlug });

  if (!result.data?.ok) {
    throw new Error(result.data?.error || 'Unknown error from background check service.');
  }

  // Optimistically update local state
  _checksMap[memberId] = {
    status: 'pending',
    memberId,
    email,
    name,
    invitationSentAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...(result.data.candidateId ? { checkrCandidateId: result.data.candidateId } : {}),
  };
  _renderView(_currentView);
}

// ═══════════════════════════════════════════════════════════════════════════
// ── COMPLIANCE TRACKING ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════

// ── Status helpers ─────────────────────────────────────────────────────── //

function _waiverStatus(check) {
  const d = check?.waiverSignedDate;
  if (!d) return { status: 'missing', label: 'Not Signed', color: '#7a7f96' };
  const signed   = new Date(d);
  const expires  = new Date(signed);
  expires.setFullYear(expires.getFullYear() + 1);
  const daysLeft = Math.floor((expires - new Date()) / 86400000);
  if (daysLeft <   0) return { status: 'expired',  label: `Expired`,                          color: '#dc2626' };
  if (daysLeft <= 30) return { status: 'expiring', label: `Expires ${_fmtDate(expires.toISOString())}`, color: '#d97706' };
  return { status: 'current',  label: `Current · Exp ${_fmtDate(expires.toISOString())}`,     color: '#059669' };
}

function _ocapStatus(check) {
  const d = check?.ocapCertDate;
  if (!d) return { status: 'missing', label: 'Not on File', color: '#7a7f96' };
  const cert    = new Date(d);
  const expires = new Date(cert);
  expires.setFullYear(expires.getFullYear() + 2); // 2-year renewal cycle
  const daysLeft = Math.floor((expires - new Date()) / 86400000);
  if (daysLeft <   0) return { status: 'expired',  label: `Cert Expired`,  color: '#dc2626' };
  if (daysLeft <= 60) return { status: 'expiring', label: `Renew Soon`,    color: '#d97706' };
  return { status: 'current',  label: `Current · ${_fmtDate(d)}`,         color: '#059669' };
}

function _hoursStatus(check) {
  const mo = Number(check?.monthlyHours ?? 0);
  const yr = Number(check?.yearlyHours  ?? 0);
  if (mo > 16 || yr > 32) return { status: 'over',    label: `${mo}h/mo · ${yr}h/yr`, color: '#dc2626' };
  if (mo >= 12 || yr >= 26) return { status: 'near',  label: `${mo}h/mo · ${yr}h/yr`, color: '#d97706' };
  if (mo === 0 && yr === 0) return { status: 'unknown', label: '—',                    color: '#7a7f96' };
  return { status: 'ok', label: `${mo}h/mo · ${yr}h/yr`, color: '#059669' };
}

function _memberDisplayName(m) {
  const first = m.firstName || '';
  const last  = m.lastName  || '';
  return m.displayName || m.name || `${first} ${last}`.trim() || '(Unknown)';
}

function _statusPill(label, color) {
  const tone = color === '#059669' || color === 'ok'
    ? 'ok'
    : color === '#d97706' || color === 'warn'
      ? 'warn'
      : color === '#dc2626' || color === 'error'
        ? 'error'
        : 'muted';
  return `<span class="melch-status-pill melch-status-pill--${tone}">${_e(label)}</span>`;
}

function _toneFromColor(color) {
  if (color === '#059669' || color === 'ok') return 'ok';
  if (color === '#d97706' || color === 'warn') return 'warn';
  if (color === '#dc2626' || color === 'error') return 'error';
  return 'muted';
}

function _setFormStatus(el, label, color) {
  if (!el) return;
  el.textContent = label;
  el.classList.remove(
    'melch-form-status--ok',
    'melch-form-status--warn',
    'melch-form-status--error',
    'melch-form-status--muted',
  );
  el.classList.add(`melch-form-status--${_toneFromColor(color)}`);
}

// ── Compliance alerts (used in Overview) ──────────────────────────────── //

function _complianceAlerts() {
  const expiring = [], missingOcap = [], overHours = [], notSan = [], needsNotif = [];

  // Only alert on members who have a background check record (tracked volunteers)
  const tracked = _allMembers.filter(m => {
    const uid = m.id || m.memberNumber || m.email || '';
    return !!_checksMap[uid];
  });

  for (const m of tracked) {
    const uid   = m.id || m.memberNumber || m.email || '';
    const check = _checksMap[uid];
    const ws = _waiverStatus(check);
    const os = _ocapStatus(check);
    const hs = _hoursStatus(check);
    if (ws.status === 'expired' || ws.status === 'expiring') expiring.push(_memberDisplayName(m));
    if (os.status === 'expired' || os.status === 'missing') missingOcap.push(_memberDisplayName(m));
    if (hs.status === 'over' || hs.status === 'near')       overHours.push(_memberDisplayName(m));
    if (!check?.sanEnrolled) notSan.push(_memberDisplayName(m));
    if (check?.status === 'consider' && !check?.parentNotif?.sent) needsNotif.push(_memberDisplayName(m));
  }

  const alerts = [];
  if (expiring.length)    alerts.push({ icon: '📋', tone: 'warn', text: `<strong>${expiring.length} volunteer${expiring.length > 1 ? 's' : ''}</strong> ha${expiring.length > 1 ? 've' : 's'} an annual waiver expiring or already expired.`, link: 'compliance' });
  if (missingOcap.length) alerts.push({ icon: '📚', tone: 'warn', text: `<strong>${missingOcap.length} volunteer${missingOcap.length > 1 ? 's' : ''}</strong> ${missingOcap.length > 1 ? 'are' : 'is'} missing a current OCAP mandated reporter certification.`, link: 'compliance' });
  if (overHours.length)   alerts.push({ icon: '⏱', tone: 'error', text: `<strong>${overHours.length} volunteer${overHours.length > 1 ? 's' : ''}</strong> ${overHours.length > 1 ? 'are' : 'is'} at or above the volunteer hour threshold — enhanced screening required.`, link: 'compliance' });
  if (needsNotif.length)  alerts.push({ icon: '📬', tone: 'error', text: `<strong>${needsNotif.length} volunteer${needsNotif.length > 1 ? 's' : ''}</strong> with "Consider" status require documented parent/guardian notification (§11105.3(c)(1)).`, link: 'not-approved' });
  if (notSan.length > 0 && tracked.length > 0) alerts.push({ icon: '🔔', tone: 'muted', text: `<strong>${notSan.length} volunteer${notSan.length > 1 ? 's' : ''}</strong> ${notSan.length > 1 ? 'are' : 'is'} not enrolled in DOJ Subsequent Arrest Notification (SAN).`, link: 'compliance' });

  if (!alerts.length) return '';

  return `
    <div class="melch-alerts">
      <div class="melch-kicker melch-kicker--roomy">Compliance Alerts</div>
      ${alerts.map(a => `
        <div class="melch-alert melch-alert--${a.tone}" data-melch-view="${a.link}">
          <span class="melch-alert-icon">${a.icon}</span>
          <span class="melch-alert-copy">${a.text}
            <span class="melch-alert-link">View →</span>
          </span>
        </div>`).join('')}
    </div>`;
}

// ── Compliance view ────────────────────────────────────────────────────── //

function _viewCompliance() {
  const sorted = _sortedMembers(_allMembers);

  // Aggregate stats
  let cntWaiverOk = 0, cntWaiverWarn = 0, cntOcapOk = 0, cntOcapWarn = 0, cntSan = 0;
  for (const m of _allMembers) {
    const uid   = m.id || m.memberNumber || m.email || '';
    const check = _checksMap[uid];
    const ws = _waiverStatus(check);
    const os = _ocapStatus(check);
    if (ws.status === 'current')  cntWaiverOk++;   else cntWaiverWarn++;
    if (os.status === 'current')  cntOcapOk++;     else cntOcapWarn++;
    if (check?.sanEnrolled)       cntSan++;
  }

  const statCard = (label, ok, warn, icon) => `
    <div class="melch-compliance-stat">
      <div class="melch-compliance-stat-label">${icon} ${label}</div>
      <div class="melch-compliance-stat-count">${ok}</div>
      <div class="melch-compliance-stat-note${warn > 0 ? ' melch-compliance-stat-note--warn' : ''}">${warn} need attention</div>
    </div>`;

  const rows = sorted.map(m => {
    const uid   = m.id || m.memberNumber || m.email || '';
    const dname = _memberDisplayName(m);
    const check = _checksMap[uid] || {};
    // Quick status dot: red if any critical issue, amber if any warning, green if all clear
    const ws = _waiverStatus(check);
    const os = _ocapStatus(check);
    const hs = _hoursStatus(check);
    const hasCritical = [ws, os].some(s => s.status === 'expired' || s.status === 'missing') ||
                        hs.status === 'over' || check.status === 'consider';
    const hasWarn     = [ws, os].some(s => s.status === 'expiring') || hs.status === 'near';
    const dotTone = hasCritical ? 'error' : hasWarn ? 'warn' : 'ok';
    return `<tr class="mcvt-row melch-compliance-row">
      <td class="mcvt-cell melch-compliance-member-cell" data-label="Member">
        <div class="melch-compliance-person">
          <span class="melch-status-dot melch-status-dot--${dotTone}" title="${hasCritical ? 'Needs attention' : hasWarn ? 'Expiring soon' : 'All clear'}"></span>
          <div>
            <div class="melch-compliance-name">${_e(dname)}</div>
            ${m.role ? `<div class="melch-compliance-role">${_e(m.role)}</div>` : ''}
          </div>
        </div>
      </td>
      <td class="mcvt-cell melch-compliance-manage-cell" data-label="Manage">
        <button class="flock-btn flock-btn--ghost flock-btn--sm melch-manage-btn" data-act="open-admin-modal"
          data-member-id="${_e(uid)}" data-name="${_e(dname)}"
          data-show-compliance="1">Manage</button>
      </td>
    </tr>`;
  }).join('');

  return `
    <div id="melch-cc">
    <div class="mcv-hdr melch-compliance-header">
      <div>
        <div class="melch-section-title">Compliance Tracker</div>
        <div class="melch-section-subtitle">
          Annual waivers · OCAP certifications · Hour thresholds · DOJ SAN enrollment · Parent notification records
        </div>
      </div>
      <button class="flock-btn flock-btn--ghost flock-btn--sm melch-print-btn" data-act="print-compliance">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Print Report
      </button>
    </div>

    <div class="mcv-stats melch-section-head">
      ${statCard('Annual Waivers', cntWaiverOk, cntWaiverWarn, '📋')}
      ${statCard('OCAP Certs', cntOcapOk, cntOcapWarn, '📚')}
      <div class="melch-compliance-stat">
        <div class="melch-compliance-stat-label">🔔 DOJ SAN</div>
        <div class="melch-compliance-stat-count">${cntSan}</div>
        <div class="melch-compliance-stat-note${(_allMembers.length - cntSan) > 0 ? ' melch-compliance-stat-note--warn' : ''}">${_allMembers.length - cntSan} not enrolled</div>
      </div>
    </div>

    ${_sortBar()}

    <div class="mcvt-wrap">
      <table class="melch-compliance-table">
        <thead class="mcvt-head">
          <tr>
            <th>Member</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${rows || '<tr><td colspan="2" class="melch-empty-row">No members loaded.</td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="melch-compliance-footnote">
      Hour thresholds: ≥12 hrs/month or ≥26 hrs/year = near threshold (enhanced screening advised);
      >16 hrs/month or >32 hrs/year = over threshold (required).
      Annual waiver expires 1 year from signing (BPC §18975). OCAP cert renewal: 2-year cycle.
    </div>
    </div>`;
}

// ── Compliance edit modal ──────────────────────────────────────────────── //

function _showComplianceModal(memberId, name) {
  const check = _checksMap[memberId] || {};

  document.getElementById('melch-compliance-modal')?.remove();
  const modal = document.createElement('div');
  modal.id = 'melch-compliance-modal';
  modal.className = 'melch-modal-overlay';

  const fieldLabel = (text) =>
    `<div class="melch-form-field-title">${text}</div>`;

  modal.innerHTML = `
    <div class="melch-modal-card melch-modal-card--wide">
      <div class="melch-modal-title">Compliance Record</div>
      <div class="melch-modal-subtitle">${_e(name)}</div>

      <label class="melch-form-label melch-form-label--wide">
        ${fieldLabel('Annual Waiver Signed Date — BPC §18975(b)(2)(C)')}
        <input type="date" id="mc-waiver-date" class="melch-input" value="${_isoDate(check.waiverSignedDate) || ''}">
        <div id="mc-waiver-status" class="melch-form-status"></div>
      </label>

      <label class="melch-form-label melch-form-label--wide">
        ${fieldLabel('OCAP Mandated Reporter Cert Date')}
        <input type="date" id="mc-ocap-date" class="melch-input" value="${_isoDate(check.ocapCertDate) || ''}">
        <div id="mc-ocap-status" class="melch-form-status"></div>
      </label>

      <div class="melch-form-grid">
        <label class="melch-form-label">
          ${fieldLabel('Monthly Hours (this month)')}
          <input type="number" id="mc-monthly-hours" min="0" max="744" placeholder="0"
            class="melch-input" value="${check.monthlyHours ?? ''}">
        </label>
        <label class="melch-form-label">
          ${fieldLabel('Yearly Hours (this year)')}
          <input type="number" id="mc-yearly-hours" min="0" max="8784" placeholder="0"
            class="melch-input" value="${check.yearlyHours ?? ''}">
        </label>
      </div>

      <div class="melch-form-label melch-form-label--wide">
        ${fieldLabel('DOJ Subsequent Arrest Notification (SAN)')}
        <label class="melch-check-label">
          <input type="checkbox" id="mc-san-enrolled"
            ${check.sanEnrolled ? 'checked' : ''}>
          <span>Enrolled in DOJ SAN</span>
        </label>
        <div id="mc-san-date-row" class="melch-dynamic-row${check.sanEnrolled ? ' is-open' : ''}">
          ${fieldLabel('SAN Enrollment Date')}
          <input type="date" id="mc-san-date" class="melch-input" value="${_isoDate(check.sanEnrolledDate) || ''}">
        </div>
      </div>

      <label class="melch-form-label melch-form-label--wide">
        ${fieldLabel('Compliance Notes')}
        <textarea id="mc-notes" rows="3" placeholder="Internal notes…"
          class="melch-textarea">${_e(check.complianceNotes || '')}</textarea>
      </label>

      <div id="mc-error" class="melch-error"></div>

      <div class="melch-form-actions">
        <button id="mc-cancel" class="flock-btn flock-btn--ghost flock-btn--sm">Cancel</button>
        <button id="mc-save"   class="flock-btn flock-btn--primary flock-btn--sm">Save Record</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  const waiverIn = modal.querySelector('#mc-waiver-date');
  const ocapIn   = modal.querySelector('#mc-ocap-date');
  const sanCb    = modal.querySelector('#mc-san-enrolled');
  const sanRow   = modal.querySelector('#mc-san-date-row');

  const updateWaiverStatus = () => {
    const el = modal.querySelector('#mc-waiver-status');
    const ws = _waiverStatus({ waiverSignedDate: waiverIn.value });
    _setFormStatus(el, ws.label, ws.color);
  };
  const updateOcapStatus = () => {
    const el = modal.querySelector('#mc-ocap-status');
    const os = _ocapStatus({ ocapCertDate: ocapIn.value });
    _setFormStatus(el, os.label, os.color);
  };
  waiverIn.addEventListener('change', updateWaiverStatus);
  ocapIn.addEventListener('change', updateOcapStatus);
  updateWaiverStatus(); updateOcapStatus();

  sanCb.addEventListener('change', () => { sanRow.classList.toggle('is-open', sanCb.checked); });

  modal.querySelector('#mc-cancel').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  modal.querySelector('#mc-save').addEventListener('click', async () => {
    const btn = modal.querySelector('#mc-save');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      await _saveComplianceFields({
        memberId, name,
        waiverDate:     waiverIn.value   || null,
        ocapDate:       ocapIn.value     || null,
        monthlyHours:   Number(modal.querySelector('#mc-monthly-hours').value) || 0,
        yearlyHours:    Number(modal.querySelector('#mc-yearly-hours').value)  || 0,
        sanEnrolled:    sanCb.checked,
        sanEnrolledDate: sanCb.checked ? (modal.querySelector('#mc-san-date').value || null) : null,
        notes:          modal.querySelector('#mc-notes').value.trim() || null,
      });
      modal.remove();
    } catch (err) {
      const errEl = modal.querySelector('#mc-error');
      errEl.textContent = err.message; errEl.classList.add('is-open');
      btn.disabled = false; btn.textContent = 'Save Record';
    }
  });
}

async function _saveComplianceFields({ memberId, name, waiverDate, ocapDate, monthlyHours, yearlyHours, sanEnrolled, sanEnrolledDate, notes }) {
  const db = window.firebase?.firestore?.();
  if (!db) throw new Error('Firestore not available.');
  const payload = {
    memberId,
    name,
    updatedAt: new Date().toISOString(),
    ...(waiverDate      != null ? { waiverSignedDate: waiverDate }    : {}),
    ...(ocapDate        != null ? { ocapCertDate: ocapDate }          : {}),
    ...(monthlyHours    != null ? { monthlyHours }                    : {}),
    ...(yearlyHours     != null ? { yearlyHours }                     : {}),
    ...(sanEnrolled     != null ? { sanEnrolled }                     : {}),
    ...(sanEnrolledDate != null ? { sanEnrolledDate }                 : {}),
    ...(notes           != null ? { complianceNotes: notes }          : {}),
  };
  await db.collection(BG_COLLECTION).doc(memberId).set(payload, { merge: true });
  // Optimistic local update
  _checksMap[memberId] = { ...(_checksMap[memberId] || {}), ...payload };
  _renderView(_currentView);
}

// ── Parent notification modal (§11105.3(c)(1)) ────────────────────────── //

function _showParentNotifModal(memberId, name) {
  const check = _checksMap[memberId] || {};
  const pn    = check.parentNotif   || {};

  document.getElementById('melch-parentnotif-modal')?.remove();
  const modal = document.createElement('div');
  modal.id = 'melch-parentnotif-modal';
  modal.className = 'melch-modal-overlay';
  const fieldLabel = (text) =>
    `<div class="melch-form-field-title">${text}</div>`;

  modal.innerHTML = `
    <div class="melch-modal-card melch-modal-card--wide melch-modal-card--parent">
      <div class="melch-modal-title">Parent / Guardian Notification</div>
      <div class="melch-modal-subtitle melch-modal-subtitle--tight">${_e(name)}</div>

      <div class="melch-parent-warning">
        <strong>Pen. Code §11105.3(c)(1)</strong> — If this individual will supervise minors, affected
        parents/guardians must receive written notification at least
        <strong>10 days before they begin duties</strong>.
      </div>

      <label class="melch-form-label melch-form-label--wide">
        <div class="melch-check-label melch-check-label--strong">
          <input type="checkbox" id="pn-sent"
            ${pn.sent ? 'checked' : ''}>
          <span>Written notification was sent</span>
        </div>
      </label>

      <div id="pn-details-row" class="melch-dynamic-row${pn.sent ? ' is-open' : ''}">
        <label class="melch-form-label">
          ${fieldLabel('Date Sent')}
          <input type="date" id="pn-sent-date" class="melch-input" value="${_isoDate(pn.sentDate) || ''}">
        </label>

        <label class="melch-form-label">
          ${fieldLabel('Method')}
          <select id="pn-method" class="melch-select">
            <option value="">— select —</option>
            <option value="written-mail"  ${pn.method === 'written-mail'  ? 'selected' : ''}>Written letter (mail)</option>
            <option value="written-email" ${pn.method === 'written-email' ? 'selected' : ''}>Written letter (email)</option>
            <option value="in-person"     ${pn.method === 'in-person'     ? 'selected' : ''}>In-person delivery</option>
          </select>
        </label>

        <label class="melch-form-label">
          ${fieldLabel('Date Confirmed / Acknowledged (optional)')}
          <input type="date" id="pn-confirmed-date" class="melch-input" value="${_isoDate(pn.confirmedDate) || ''}">
        </label>
      </div>

      <div id="pn-error" class="melch-error"></div>

      <div class="melch-form-actions">
        <button id="pn-cancel" class="flock-btn flock-btn--ghost flock-btn--sm">Cancel</button>
        <button id="pn-save"   class="flock-btn flock-btn--primary flock-btn--sm">Save Record</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  const sentCb = modal.querySelector('#pn-sent');
  const detRow = modal.querySelector('#pn-details-row');
  sentCb.addEventListener('change', () => { detRow.classList.toggle('is-open', sentCb.checked); });

  modal.querySelector('#pn-cancel').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });

  modal.querySelector('#pn-save').addEventListener('click', async () => {
    const btn = modal.querySelector('#pn-save');
    btn.disabled = true; btn.textContent = 'Saving…';
    try {
      await _saveParentNotif({
        memberId,
        sent:          sentCb.checked,
        sentDate:      modal.querySelector('#pn-sent-date').value      || null,
        method:        modal.querySelector('#pn-method').value         || null,
        confirmedDate: modal.querySelector('#pn-confirmed-date').value || null,
      });
      modal.remove();
    } catch (err) {
      const errEl = modal.querySelector('#pn-error');
      errEl.textContent = err.message; errEl.classList.add('is-open');
      btn.disabled = false; btn.textContent = 'Save Record';
    }
  });
}

/* ── Generate AB-506 Annual Waiver Form ─────────────────────────────────── */
function _generateWaiver(memberId, displayName) {
  const check  = _checksMap[memberId] || {};
  const member = _allMembers.find(m => (m.id || m.memberNumber || m.email || '') === memberId) || {};
  const org    = _orgName || '[Organization Name]';
  const today  = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const dob    = check.dateOfBirth || member.dateOfBirth || member.dob || '';
  const dobLine = dob ? `<strong>Date of Birth:</strong> ${_e(dob)}<br>` : '';
  const memberNo = member.memberNumber || member.id || '';
  const memberNoLine = memberNo ? `<strong>Member ID:</strong> ${_e(memberNo)}<br>` : '';
  const printCssHref = new URL('Styles/safety-print.css', document.baseURI).href;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AB-506 Annual Waiver — ${_e(displayName)}</title>
  <link rel="stylesheet" href="${printCssHref}">
</head>
<body>

  <!-- PRINT BUTTON (hidden when printing) -->
  <div class="no-print print-actions">
    <button class="print-button" onclick="window.print()">Save as PDF / Print</button>
  </div>

<div class="page">

  <div class="header">
    <div class="org-name">${_e(org)}</div>
    <div class="doc-title">Annual Authorization for Background Check</div>
    <div class="doc-subtitle">Pursuant to California Business &amp; Professions Code §18975 (AB 506)</div>
  </div>

  <!-- MEMBER INFO -->
  <div class="member-info">
    <strong>Member Name:</strong> ${_e(displayName)}<br>
    ${dobLine}
    ${memberNoLine}
    <strong>Date of Form:</strong> ${_e(today)}
  </div>

  <!-- SECTION 1 — CONSENT -->
  <div class="section">
    <div class="section-title">1. Consent &amp; Authorization</div>
    <p>
      I, <strong>${_e(displayName)}</strong>, hereby voluntarily authorize <strong>${_e(org)}</strong>
      (the &ldquo;Organization&rdquo;) and its authorized agents to obtain a background investigation
      report concerning me from one or more consumer reporting agencies, law enforcement databases,
      the California Department of Justice (DOJ), and/or other authorized sources.
    </p>
    <p>
      I understand that this authorization is required under California AB 506 (Business &amp; Professions
      Code §18975) for any person who has direct contact with minors in a youth-serving organization
      and who is not required to obtain a criminal background check under any other law.
    </p>
    <p>
      I understand that this authorization is valid for one (1) year from the date signed, and that
      I may be asked to re-authorize annually in accordance with the Organization&rsquo;s child
      safety policy.
    </p>
  </div>

  <!-- SECTION 2 — STATUTORY DISCLOSURE -->
  <div class="section">
    <div class="section-title">2. Statutory Disclosure (BPC §18975)</div>
    <div class="statutory">
      California Business &amp; Professions Code §18975 requires youth-serving organizations to
      obtain criminal background checks on employees and volunteers who have direct contact with
      minors. A &ldquo;youth-serving organization&rdquo; means any organization that provides
      services to, is organized for, or has as one of its primary purposes the provision of
      programs or activities for persons under 18 years of age. The required check includes
      a search of DOJ records and, where applicable, an FBI check. A disqualifying offense may
      result in the individual being prohibited from having direct contact with minors.
    </div>
    <p class="indent">
      I understand and acknowledge the above disclosure and consent to the background check
      described herein.
    </p>
  </div>

  <!-- SECTION 3 — DOJ SAN ENROLLMENT -->
  <div class="section">
    <div class="section-title">3. DOJ Subsequent Arrest Notification (SAN) Enrollment</div>
    <p>
      I acknowledge that the Organization may elect to enroll me in the California Department of
      Justice Subsequent Arrest Notification (SAN) program, which provides ongoing notifications
      to the Organization if I am arrested for a qualifying offense after my initial background
      check is complete. By signing this form, I consent to such enrollment for the duration of
      my service with the Organization.
    </p>
  </div>

  <!-- SECTION 4 — CHILD SAFETY POLICY ACKNOWLEDGMENT -->
  <div class="section">
    <div class="section-title">4. Child Safety Policy Acknowledgment</div>
    <p>
      I confirm that I have received, read, and agree to comply with the Organization&rsquo;s
      Child Safety Policy (the &ldquo;Policy&rdquo;). I understand that any violation of the
      Policy may result in immediate removal from ministry and, where applicable, reporting to
      law enforcement.
    </p>
  </div>

  <!-- SECTION 5 — ANNUAL RENEWAL -->
  <div class="section">
    <div class="section-title">5. Annual Renewal</div>
    <p>
      I understand that this authorization expires one (1) year from the date of my signature
      below and that continued service in a role that involves direct contact with minors requires
      annual renewal. I agree to re-sign this form each program year upon request.
    </p>
  </div>

  <!-- SIGNATURE -->
  <div class="section">
    <div class="section-title">6. Signature</div>
    ${check.waiverSignature ? `
    <div class="esig-block">
      <div class="esig-label">✅ Electronically Signed</div>
      <img class="esig-img" src="${check.waiverSignature}" alt="Signature">
      <div class="esig-name"><strong>Printed Name:</strong> ${_e(check.waiverSignedName || displayName)}</div>
      <div class="esig-date"><strong>Date:</strong> ${_e(check.waiverSignedDate ? new Date(check.waiverSignedDate?.toDate?.() || check.waiverSignedDate).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) : today)}</div>
      <div class="esig-note">This electronic signature was captured via the Safety compliance system and is stored securely in the Organization's database.</div>
    </div>` : `
    <div class="sign-block">
      <div class="sign-line">
        <span class="sign-label">Volunteer/Staff Signature:</span>
        <span class="sign-rule"></span>
      </div>
      <div class="sign-line">
        <span class="sign-label">Printed Name:</span>
        <span class="sign-rule"></span>
      </div>
      <div class="sign-line">
        <span class="sign-label">Date:</span>
        <span class="sign-rule"></span>
      </div>
      <div class="sign-line">
        <span class="sign-label">Witness Signature:</span>
        <span class="sign-rule"></span>
      </div>
      <div class="sign-line">
        <span class="sign-label">Witness Printed Name:</span>
        <span class="sign-rule"></span>
      </div>
      <div class="sign-line">
        <span class="sign-label">Witness Date:</span>
        <span class="sign-rule"></span>
      </div>
    </div>`}
  </div>

  <!-- ADMIN USE ONLY -->
  <div class="section">
    <div class="section-title">For Office Use Only</div>
    <div class="admin-box">
      <div class="admin-row">
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">Background Check Submitted Date</div>
        </div>
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">Result Received Date</div>
        </div>
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">Result (Clear / Pending / Disqualified)</div>
        </div>
      </div>
      <div class="admin-row">
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">SAN Enrolled (Y/N) &amp; Date</div>
        </div>
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">Reviewed By (Staff Initials)</div>
        </div>
        <div>
          <div class="admin-field"></div>
          <div class="admin-label">Next Renewal Due</div>
        </div>
      </div>
      <div class="admin-row">
        <div class="admin-notes-field">
          <div class="admin-field"></div>
          <div class="admin-label">Notes</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    ${_e(org)} &nbsp;|&nbsp; AB-506 Annual Authorization Form &nbsp;|&nbsp; Generated ${_e(today)}
    &nbsp;|&nbsp; Retain in personnel/volunteer file for a minimum of 7 years.
  </div>

</div>

<script>
  // Auto-open Save as PDF dialog after page renders
  window.addEventListener('load', () => {
    setTimeout(() => window.print(), 400);
  });
</script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, '_blank');
  if (!win) {
    // Fallback: download the HTML file if popup truly blocked
    const a = document.createElement('a');
    const safeName = (displayName || 'Member').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
    a.href = url; a.download = `AB506-Waiver-${safeName}-${new Date().getFullYear()}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function _saveParentNotif({ memberId, sent, sentDate, method, confirmedDate }) {
  const db = window.firebase?.firestore?.();
  if (!db) throw new Error('Firestore not available.');
  const payload = {
    memberId,
    updatedAt: new Date().toISOString(),
    parentNotif: { sent: !!sent, sentDate: sentDate || null, method: method || null, confirmedDate: confirmedDate || null },
  };
  await db.collection(BG_COLLECTION).doc(memberId).set(payload, { merge: true });
  _checksMap[memberId] = { ...(_checksMap[memberId] || {}), ...payload };
  _renderView(_currentView);
}
