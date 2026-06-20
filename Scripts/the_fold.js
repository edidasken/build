/* ══════════════════════════════════════════════════════════════════════════════
   THE FOLD  — Groups & Attendance
   Community structure management: small groups, Bible studies, attendance tracking.

   "I have other sheep that are not of this fold. I must bring them also,
    and they will listen to my voice." — John 10:16

   Depends on: TheVine (the_true_vine.js), Modules (the_tabernacle.js),
               TheScrolls (the_scrolls.js)
   ══════════════════════════════════════════════════════════════════════════════ */

var TheFold = (() => {
  'use strict';

  // ── Helpers ─────────────────────────────────────────────────────────────
  function _e(s) {
    if (s == null) return '';
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(String(s)));
    return d.innerHTML;
  }
  function _badge(text, cls) {
    return '<span class="badge badge-' + (cls || 'info') + '">' + _e(text) + '</span>';
  }
  function _statusBadge(val) {
    var t = String(val || '').toUpperCase();
    if (['TRUE','ACTIVE','OPEN','PUBLISHED','YES'].includes(t))
      return _badge(val, 'success');
    if (['FALSE','INACTIVE','CLOSED','ARCHIVED','NO'].includes(t))
      return _badge(val, 'warn');
    if (['URGENT','PENDING','DRAFT','NEW','CRITICAL'].includes(t))
      return _badge(val, 'danger');
    return _badge(val, 'info');
  }
  function _spinner() {
    return '<div style="text-align:center;padding:80px 20px;color:var(--ink-muted);">'
      + '<div class="spinner" style="margin:0 auto 16px;width:32px;height:32px;border:3px solid var(--line);border-top-color:var(--accent);border-radius:50%;animation:spin .6s linear infinite;"></div>'
      + 'Loading\u2026</div>';
  }
  function _empty(icon, msg) {
    return '<div class="flock-empty"><div class="flock-empty-icon">' + icon + '</div>' + _e(msg) + '</div>';
  }
  function _rows(res) {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.rows)) return res.rows;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.results)) return res.results;
    if (Array.isArray(res.items)) return res.items;
    return [];
  }
  function _toast(msg, type) {
    if (typeof Modules !== 'undefined' && Modules.toast) return Modules.toast(msg, type || 'info');
    if (typeof window !== 'undefined' && window.toast) return window.toast(msg, type || 'info');
    if (type === 'danger' || type === 'error') alert(msg);
  }
  function _canManageAccess() {
    try {
      if (typeof Nehemiah !== 'undefined') {
        if (Nehemiah.can && (Nehemiah.can('users.write') || Nehemiah.can('users.edit') || Nehemiah.can('access.write') || Nehemiah.can('permissions.write'))) return true;
        if (Nehemiah.hasGroup && (Nehemiah.hasGroup('Admin') || Nehemiah.hasGroup('Lead Pastor') || Nehemiah.hasGroup('Master') || Nehemiah.hasGroup('Seed Admin'))) return true;
        if (Nehemiah.hasRole && (Nehemiah.hasRole('admin') || Nehemiah.hasRole('lead pastor'))) return true;
      }
    } catch (_) {}
    try {
      var s = TheVine && TheVine.session ? TheVine.session() : null;
      var role = String((s && s.role) || '').toLowerCase();
      if (s && (role === 'admin' || role === 'lead pastor' || (s.roleLevel || 0) >= 5)) return true;
      var groups = (s && s.groups) || [];
      if (typeof groups === 'string') groups = JSON.parse(groups || '[]');
      return groups.some(function(g) {
        var v = String(g || '').toLowerCase();
        return v === 'admin' || v === 'lead pastor' || v === 'master' || v === 'seed admin';
      });
    } catch (_) {}
    return false;
  }

  // ── State ───────────────────────────────────────────────────────────────
  var _container = null;
  var _activeTab = 'groups';
  var _cache     = { groups: [], attendance: [], access: [], templates: {}, accessError: '' };

  function _isFB() {
    return typeof Modules !== 'undefined' && Modules._isFirebaseComms && Modules._isFirebaseComms();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN APP — two tabs: Groups | Attendance
  // ══════════════════════════════════════════════════════════════════════════

  async function renderApp(container, opts) {
    _container = container;
    opts = opts || {};
    container.innerHTML = _spinner();

    try {
      var calls = [
        _isFB() ? UpperRoom.listGroups() : TheVine.flock.groups.list(),
        _isFB() ? UpperRoom.listAttendance({ limit: 60 }) : TheVine.flock.attendance.list({ limit: 60 })
      ];
      if (_canManageAccess() && TheVine && TheVine.flock) {
        calls.push(TheVine.flock.access.list());
        calls.push(TheVine.flock.access.templates());
      }
      var res = await Promise.allSettled(calls);
      _cache.groups     = _rows(res[0].status === 'fulfilled' ? res[0].value : []);
      _cache.attendance = _rows(res[1].status === 'fulfilled' ? res[1].value : []);
      _cache.access     = res[2] && res[2].status === 'fulfilled' ? _rows(res[2].value) : [];
      _cache.templates  = res[3] && res[3].status === 'fulfilled' ? ((res[3].value && (res[3].value.templates || res[3].value.data)) || {}) : {};
      _cache.accessError = res[2] && res[2].status === 'rejected' ? String(res[2].reason && res[2].reason.message ? res[2].reason.message : res[2].reason) : '';
    } catch (_) {}
    // Read QUARTERLY_PLANNER from global config cache (set at boot)
    var _qpRaw = localStorage.getItem('flock_cfg_QUARTERLY_PLANNER');
    _cache.quarterlyPlanner = _qpRaw === null || String(_qpRaw).toUpperCase() !== 'FALSE';

    var nG = _cache.groups.length;
    var nA = _cache.attendance.length;
    var nU = _cache.access.length;
    var activeGroups = _cache.groups.filter(function(g) { return String(g.status || g.active || '').toUpperCase() !== 'INACTIVE'; }).length;

    var h = '';

    // ← Return to Dashboard
    if (!opts.embedded) {
      h += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap;">';
      h += '<button onclick="TheLife.backToHub()" style="background:none;border:1px solid var(--line);border-radius:6px;padding:6px 14px;cursor:pointer;color:var(--ink);font-size:0.84rem;">\u2190 Return to Dashboard</button>';
      h += '<h2 style="font-size:1.1rem;color:var(--accent);margin:0;">\uD83D\uDC51 The Fold</h2>';
      h += '</div>';
    }

    // KPI ribbon
    h += '<div class="flock-dashboard-strip" style="margin-bottom:14px;">';
    h += '<div class="flock-dash-item"><span class="flock-dash-val">' + nG + '</span><span class="flock-dash-label">Groups</span></div>';
    h += '<div class="flock-dash-item"><span class="flock-dash-val">' + activeGroups + '</span><span class="flock-dash-label">Active</span></div>';
    h += '<div class="flock-dash-item"><span class="flock-dash-val">' + nA + '</span><span class="flock-dash-label">Records</span></div>';
    if (nA) {
      var latest = _cache.attendance[0];
      var tot = latest.total != null ? latest.total : ((Number(latest.adults || 0)) + (Number(latest.children || 0)));
      h += '<div class="flock-dash-item"><span class="flock-dash-val">' + tot + '</span><span class="flock-dash-label">Last Count</span></div>';
    }
    h += '</div>';

    // Search
    h += '<div style="margin-bottom:14px;">';
    h += '<input id="fold-q" type="search" placeholder="Search groups, dates\u2026"'
       + ' oninput="TheFold._search(this.value)"'
       + ' style="width:100%;max-width:480px;background:rgba(255,255,255,0.07);border:1px solid var(--line);border-radius:6px;padding:8px 12px;color:var(--ink);font-size:0.88rem;font-family:inherit;">';
    h += '</div>';

    // Tab bar
    h += '<div style="display:flex;gap:2px;border-bottom:2px solid var(--line);margin-bottom:16px;overflow-x:auto;-webkit-overflow-scrolling:touch;">';
    var tabs = ['groups', 'attendance'];
    if (_canManageAccess()) tabs.push('access');
    tabs.forEach(function(key) {
      var labels = { groups: '\uD83D\uDC65 Groups', attendance: '\uD83D\uDCCA Attendance', access: '\uD83D\uDD10 Access' };
      var counts = { groups: nG, attendance: nA, access: nU };
      var active = key === _activeTab;
      h += '<button class="fold-tab' + (active ? ' active' : '') + '" data-foldtab="' + key + '"'
         + ' onclick="TheFold.switchTab(\'' + key + '\')"'
         + ' style="padding:10px 18px;border:none;background:' + (active ? 'var(--accent)' : 'transparent')
         + ';color:' + (active ? 'var(--ink-inverse)' : 'var(--ink)')
         + ';border-radius:8px 8px 0 0;font-weight:' + (active ? '700' : '500')
         + ';font-size:0.84rem;cursor:pointer;font-family:inherit;transition:all .15s;">'
         + labels[key] + ' <span style="font-size:0.72rem;opacity:0.7;">(' + counts[key] + ')</span></button>';
    });
    if (_cache.quarterlyPlanner !== false) {
      h += '<button onclick="if(window.navigate)window.navigate(\'quarterly\');"'
         + ' style="padding:10px 18px;border:none;background:transparent;color:var(--ink);'
         + 'border-radius:8px 8px 0 0;font-weight:500;font-size:0.84rem;cursor:pointer;'
         + 'font-family:inherit;transition:all .15s;display:inline-flex;align-items:center;gap:5px;white-space:nowrap;">'
         + '\uD83D\uDCC5 Quarterly Planner</button>';
    }
    h += '</div>';

    // Panels
    h += '<div id="fold-panels">';
    h += '<div id="fold-p-groups" style="' + (_activeTab !== 'groups' ? 'display:none;' : '') + '">' + _buildGroups() + '</div>';
    h += '<div id="fold-p-attendance" style="' + (_activeTab !== 'attendance' ? 'display:none;' : '') + '">' + _buildAttendance() + '</div>';
    if (_canManageAccess()) h += '<div id="fold-p-access" style="' + (_activeTab !== 'access' ? 'display:none;' : '') + '">' + _buildAccess() + '</div>';
    h += '</div>';

    container.innerHTML = h;

    if (typeof TheScrolls !== 'undefined') {
      TheScrolls.log(TheScrolls.TYPES.APP_OPEN, '', 'Opened The Fold');
    }
  }

  // ── Tab switch ──────────────────────────────────────────────────────────
  function switchTab(key) {
    _activeTab = key;
    document.querySelectorAll('[data-foldtab]').forEach(function(t) {
      var active = t.getAttribute('data-foldtab') === key;
      t.classList.toggle('active', active);
      t.style.background = active ? 'var(--accent)' : 'transparent';
      t.style.color     = active ? 'var(--ink-inverse)' : 'var(--ink)';
      t.style.fontWeight = active ? '700' : '500';
    });
    ['groups','attendance','access'].forEach(function(k) {
      var p = document.getElementById('fold-p-' + k);
      if (p) p.style.display = k === key ? '' : 'none';
    });
  }

  // ── Search ──────────────────────────────────────────────────────────────
  function _search(q) {
    q = (q || '').toLowerCase().trim();
    document.querySelectorAll('.fold-row').forEach(function(r) {
      r.style.display = (!q || (r.dataset.search || '').indexOf(q) >= 0) ? '' : 'none';
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GROUPS TABLE
  // ══════════════════════════════════════════════════════════════════════════

  function _buildGroups() {
    var rows = _cache.groups;
    var h = '<div style="display:flex;gap:10px;margin-bottom:14px;">';
    h += '<button onclick="Modules.newGroup()" style="background:var(--accent);color:var(--ink-inverse);border:none;border-radius:6px;padding:8px 16px;cursor:pointer;font-weight:600;font-size:0.84rem;">+ New Group</button>';
    h += '</div>';

    if (!rows.length) return h + _empty('\uD83D\uDC65', 'No groups yet.');

    h += '<table class="data-table"><thead><tr>'
       + '<th>Name</th><th>Type</th><th>Leader</th><th>Day / Time</th><th>Location</th><th>Members</th><th>Status</th><th></th>'
       + '</tr></thead><tbody>';
    rows.forEach(function(r) {
      var mLookup = (typeof Modules !== 'undefined' && Modules._dataCache && Modules._dataCache['memberDir']) || [];
      var lid = r.leaderId || r.leader || r.leaderName || '';
      var leaderName = lid;
      for (var mi = 0; mi < mLookup.length; mi++) {
        var mm = mLookup[mi];
        if ((mm.email && mm.email === lid) || mm.id === lid) {
          leaderName = mm.preferredName || ((mm.firstName || '') + ' ' + (mm.lastName || '')).trim() || lid;
          break;
        }
      }
      var dayTime = (r.meetingDay || '') + (r.meetingTime ? ' ' + r.meetingTime : '');
      var search = ((r.name || '') + ' ' + (r.type || r.groupType || '') + ' ' + leaderName + ' ' + (r.meetingDay || '') + ' ' + (r.location || r.meetingLocation || '')).toLowerCase();
      h += '<tr class="fold-row" data-search="' + _e(search) + '">';
      h += '<td data-label="Name"><strong>' + _e(r.name || r.groupName || '') + '</strong></td>';
      h += '<td data-label="Type">' + _e(r.type || r.groupType || '') + '</td>';
      h += '<td data-label="Leader">' + _e(leaderName) + '</td>';
      h += '<td data-label="Day / Time">' + _e(dayTime) + '</td>';
      h += '<td data-label="Location">' + _e(r.location || r.meetingLocation || '') + '</td>';
      h += '<td data-label="Members">' + _e(r.memberCount != null ? r.memberCount : '') + '</td>';
      h += '<td data-label="Status">' + _statusBadge(r.status || r.active) + '</td>';
      h += '<td><button onclick="TheFold.editGroup(\'' + _e(r.id) + '\')" style="background:none;border:1px solid var(--line);border-radius:4px;padding:3px 10px;cursor:pointer;color:var(--ink);font-size:0.76rem;">Edit</button></td>';
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ATTENDANCE TABLE
  // ══════════════════════════════════════════════════════════════════════════

  function _buildAttendance() {
    var rows = _cache.attendance;
    var h = '<div style="display:flex;gap:10px;margin-bottom:14px;">';
    h += '<button onclick="Modules.newAttendance()" style="background:var(--accent);color:var(--ink-inverse);border:none;border-radius:6px;padding:8px 16px;cursor:pointer;font-weight:600;font-size:0.84rem;">+ Record Attendance</button>';
    h += '<button onclick="Modules.attendanceSummary()" style="background:none;border:1px solid var(--line);border-radius:6px;padding:8px 16px;cursor:pointer;color:var(--ink);font-size:0.84rem;">Summary</button>';
    h += '</div>';

    if (!rows.length) return h + _empty('\uD83D\uDCCA', 'No attendance records yet.');

    h += '<table class="data-table"><thead><tr>'
       + '<th>Date</th><th>Service / Event</th><th>Adults</th><th>Children</th><th>Total</th><th>Notes</th><th></th>'
       + '</tr></thead><tbody>';
    rows.forEach(function(r) {
      var total = r.total != null ? r.total : ((Number(r.adults || 0)) + (Number(r.children || 0)));
      var search = ((r.date || r.serviceDate || '') + ' ' + (r.serviceType || r.eventName || r.name || '') + ' ' + (r.notes || '')).toLowerCase();
      h += '<tr class="fold-row" data-search="' + _e(search) + '">';
      h += '<td data-label="Date">' + _e(r.date || r.serviceDate || '') + '</td>';
      h += '<td data-label="Service">' + _e(r.serviceType || r.eventName || r.name || '') + '</td>';
      h += '<td data-label="Adults">' + _e(r.adults != null ? r.adults : '') + '</td>';
      h += '<td data-label="Children">' + _e(r.children != null ? r.children : '') + '</td>';
      h += '<td data-label="Total"><strong>' + _e(total) + '</strong></td>';
      h += '<td data-label="Notes" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + _e(r.notes || '') + '</td>';
      h += '<td><button onclick="TheFold.editAttendance(\'' + _e(r.id) + '\')" style="background:none;border:1px solid var(--line);border-radius:4px;padding:3px 10px;cursor:pointer;color:var(--ink);font-size:0.76rem;">Edit</button></td>';
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  function _buildAccess() {
    if (_cache.accessError) {
      return _empty('\uD83D\uDD10', 'Access controls unavailable: ' + _cache.accessError);
    }
    var rows = _cache.access || [];
    var h = '<div style="display:flex;gap:10px;margin-bottom:14px;align-items:center;flex-wrap:wrap;">';
    h += '<button onclick="TheFold.refreshAccess()" style="background:none;border:1px solid var(--line);border-radius:6px;padding:8px 16px;cursor:pointer;color:var(--ink);font-size:0.84rem;">Refresh Access</button>';
    h += '<span style="font-size:0.78rem;color:var(--ink-muted);">Reset uses the passcode you set and rewrites role, group, and module grants.</span>';
    h += '</div>';
    if (!rows.length) return h + _empty('\uD83D\uDD10', 'No user accounts available.');
    h += '<table class="data-table"><thead><tr>'
       + '<th>User</th><th>Status</th><th>Role</th><th>Groups</th><th>Grants</th><th></th>'
       + '</tr></thead><tbody>';
    rows.forEach(function(r) {
      var target = r.username || r.email || '';
      var groups = Array.isArray(r.groups) ? r.groups : [];
      var grants = Array.isArray(r.moduleGrants) ? r.moduleGrants : [];
      var search = ((r.username || '') + ' ' + (r.email || '') + ' ' + (r.displayName || '') + ' ' + (r.role || '') + ' ' + groups.join(' ')).toLowerCase();
      h += '<tr class="fold-row" data-search="' + _e(search) + '">';
      h += '<td data-label="User"><strong>' + _e(r.displayName || r.username || r.email || '') + '</strong><br><span style="font-size:0.76rem;color:var(--ink-muted);">' + _e(r.email || r.username || '') + '</span></td>';
      h += '<td data-label="Status">' + _statusBadge(r.status || '') + '</td>';
      h += '<td data-label="Role">' + _e(r.role || '') + '</td>';
      h += '<td data-label="Groups">' + _e(groups.join(', ')) + '</td>';
      h += '<td data-label="Grants" style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + _e(grants.join(', ')) + '</td>';
      h += '<td style="white-space:nowrap;display:flex;gap:6px;flex-wrap:wrap;">'
        + '<button onclick="TheFold.resetAccess(\'' + _e(target) + '\')" style="background:var(--accent);border:1px solid var(--accent);color:var(--ink-inverse);border-radius:4px;padding:4px 10px;cursor:pointer;font-size:0.76rem;font-weight:700;">Reset Access</button>'
        + '<button onclick="TheFold.resetPasscode(\'' + _e(target) + '\')" style="background:none;border:1px solid var(--line);border-radius:4px;padding:4px 10px;cursor:pointer;color:var(--ink);font-size:0.76rem;">Passcode</button>'
        + '</td>';
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // EDIT FUNCTIONS — delegate to Modules._edit / _modal
  // ══════════════════════════════════════════════════════════════════════════

  function editGroup(id) {
    if (typeof Modules !== 'undefined' && Modules.editGroup) {
      Modules.editGroup(id);
      return;
    }
    // Fallback: use _edit pattern directly
    if (typeof Modules !== 'undefined' && Modules._edit) {
      Modules._edit('groups', 'Edit Small Group', [
        { name: 'groupName',   label: 'Group Name', required: true },
        { name: 'type',        label: 'Type', type: 'select',
          options: ['Life Group','Bible Study','Youth','Mens','Womens','Seniors','Kids','Other'] },
        { name: 'leader',      label: 'Leader Name' },
        { name: 'meetingDay',  label: 'Meeting Day', type: 'select',
          options: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
        { name: 'location',    label: 'Location' },
        { name: 'description', label: 'Description', type: 'textarea' },
      ], function(p) { return _isFB() ? UpperRoom.updateGroup(p) : TheVine.flock.groups.update(p); }, id, function(p) { return _isFB() ? UpperRoom.getGroup(p.id || p) : TheVine.flock.groups.get(p); });
    }
  }

  function editAttendance(id) {
    if (typeof Modules !== 'undefined' && Modules.editAttendance) {
      Modules.editAttendance(id);
      return;
    }
    if (typeof Modules !== 'undefined' && Modules._edit) {
      Modules._edit('attendance', 'Edit Attendance Record', [
        { name: 'date',        label: 'Date',            type: 'date', required: true },
        { name: 'serviceType', label: 'Service / Event', required: true },
        { name: 'adults',      label: 'Adults',          type: 'number' },
        { name: 'children',    label: 'Children',        type: 'number' },
        { name: 'notes',       label: 'Notes',           type: 'textarea' },
      ], function(p) { return _isFB() ? UpperRoom.updateAttendance(p) : TheVine.flock.attendance.update(p); }, id, function(p) { return _isFB() ? UpperRoom.getAttendance(p.id || p) : TheVine.flock.attendance.get(p); });
    }
  }

  async function refreshAccess() {
    try {
      var res = await TheVine.flock.access.list();
      _cache.access = _rows(res);
      var panel = document.getElementById('fold-p-access');
      if (panel) panel.innerHTML = _buildAccess();
    } catch (e) {
      _toast('Access refresh failed: ' + (e.message || e), 'danger');
    }
  }

  async function resetPasscode(target) {
    if (!target) return;
    var passcode = prompt('Set passcode for ' + target + ' (minimum 6 characters):', '');
    if (!passcode) return;
    if (passcode.trim().length < 6) { alert('Passcode must be at least 6 characters.'); return; }
    if (!confirm('Set passcode for ' + target + '?')) return;
    try {
      await TheVine.flock.users.resetPasscode({ targetEmail: target, passcode: passcode.trim() });
      alert('Passcode set for ' + target + '.');
      if (typeof TheScrolls !== 'undefined') TheScrolls.log(TheScrolls.TYPES.ADMIN_ACTION, target, 'Fold reset passcode', { personName: target });
    } catch (e) {
      alert('Failed: ' + (e.message || e));
    }
  }

  async function resetAccess(target) {
    if (!target) return;
    var templateNames = Object.keys(_cache.templates || {});
    if (!templateNames.length) templateNames = ['Lead Pastor', 'Admin', 'Care Team', 'Comms Team', 'Worship Admin', 'Volunteer Coordinator', 'Treasurer'];
    var template = prompt('Access template for ' + target + ':\n\n' + templateNames.join(', '), 'Lead Pastor');
    if (!template) return;
    if (templateNames.indexOf(template) === -1 && !confirm('Use custom template/group "' + template + '"?')) return;
    var passcode = prompt('Set passcode for ' + target + ' (minimum 6 characters):', '');
    if (!passcode) return;
    if (passcode.trim().length < 6) { alert('Passcode must be at least 6 characters.'); return; }
    try {
      await TheVine.flock.users.resetAccess({
        targetEmail: target,
        template: template,
        role: template,
        status: 'active',
        passcode: passcode.trim()
      });
      alert('Access reset for ' + target + '\nTemplate: ' + template);
      if (typeof TheScrolls !== 'undefined') TheScrolls.log(TheScrolls.TYPES.ADMIN_ACTION, target, 'Fold reset access', { personName: target, template: template });
      await refreshAccess();
    } catch (e) {
      alert('Failed: ' + (e.message || e));
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════════════════════
  return {
    renderApp:      renderApp,
    switchTab:      switchTab,
    editGroup:      editGroup,
    editAttendance: editAttendance,
    refreshAccess:  refreshAccess,
    resetPasscode:  resetPasscode,
    resetAccess:    resetAccess,
    _search:        _search,
  };
})();
