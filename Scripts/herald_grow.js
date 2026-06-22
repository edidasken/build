/* ==========================================================================
   HERALD GROW
   GROW content running inside the same Herald/FlockNews app shell.
   ========================================================================== */

import { installScriptureLinks } from './the_scrolls/the_bible_link.js';

const NAV = [
  {
    section: 'Daily Practice',
    items: [
      { name: 'the_gospel_reading', title: 'Reading Plans', short: 'Reading', no: '1', desc: 'Daily reading plans with a personal streak and a full-year Scripture table.' },
      { name: 'the_gospel_devotionals', title: 'Devotionals', short: 'Devotions', no: '2', desc: 'A passage of Scripture, a reflection, and a prayer for the day.' },
      { name: 'the_gospel_heart', title: 'Heart Check', short: 'Heart', no: '3', desc: 'Self-examination, repentance, and practical next steps.' },
      { name: 'the_gospel_mirror', title: "Shepherd's Mirror", short: 'Mirror', no: '4', desc: 'A diagnostic mirror for growth, habits, care, and calling.' },
    ],
  },
  {
    section: 'Global Outreach',
    items: [
      { name: 'the_gospel_missions', title: 'World Missions', short: 'Missions', no: '5', desc: 'Joshua Project and Operation World style missions intelligence.' },
      { name: 'the_gospel_invitation', title: 'The Invitation', short: 'Invitation', no: '6', desc: 'A clear Gospel presentation for seekers and follow-up conversations.' },
    ],
  },
  {
    section: 'Study & Discipleship',
    items: [
      { name: 'the_gospel_courses', title: 'Courses', short: 'Courses', no: '7', desc: 'Structured discipleship courses for believers and churches.' },
      { name: 'the_gospel_quizzes', title: 'Quizzes', short: 'Quiz', no: '8', desc: 'Knowledge checks for Scripture, doctrine, and Christian formation.' },
      { name: 'the_gospel_theology', title: 'Theology', short: 'Theology', no: '9', desc: 'Doctrine explained with Scripture and pastoral clarity.' },
      { name: 'the_gospel_teaching_plans', title: 'Teaching Plans', short: 'Teaching', no: '10', desc: 'Session outlines, memory verses, and teaching structures.' },
      { name: 'the_gospel_lexicon', title: 'Lexicon', short: 'Lexicon', no: '11', desc: 'Greek and Hebrew word study in a simple study desk.' },
      { name: 'the_gospel_library', title: 'Library', short: 'Library', no: '12', desc: 'Books, resources, and discipleship library materials.' },
      { name: 'the_gospel_apologetics', title: 'Apologetics', short: 'Apologetics', no: '13', desc: 'Answers to hard questions with Scripture and reason.' },
      { name: 'the_gospel_psalms', title: 'Psalms', short: 'Psalms', no: '14', desc: 'Prayer, worship, lament, and praise from the Psalter.' },
      { name: 'the_gospel_counseling', title: 'Counseling', short: 'Care', no: '15', desc: 'Biblical care topics and pastoral next steps.' },
      { name: 'the_gospel_genealogy', title: 'Genealogy', short: 'People', no: '16', desc: 'People of Scripture, meanings, timelines, and family lines.' },
      { name: 'the_gospel_sermons', title: 'Sermons', short: 'Sermons', no: '17', desc: 'Preached messages from the church library.' },
    ],
  },
  {
    section: 'About',
    items: [
      { name: 'the_gospel_why', title: 'The Why', short: 'Why', no: '18', desc: 'Why GROW exists and how it serves the church.' },
    ],
  },
];

const ALL = NAV.flatMap(group => group.items);
const $ = (sel) => document.querySelector(sel);

const content = $('#hg-edition-content');
const integrated = content?.dataset.heraldIntegrated === 'true' || !$('#hg-flag');
const flag = $('#hg-flag');
const deck = $('#hg-deck');
const motto = $('#hg-motto');
const sectionNo = $('#hg-section-no');
const dateEl = $('#hg-date');
let currentUnmount = null;

const ICONS = {
  the_gospel_reading: '▣',
  the_gospel_devotionals: '☼',
  the_gospel_heart: '♡',
  the_gospel_mirror: '▤',
  the_gospel_missions: '◎',
  the_gospel_invitation: '✉',
  the_gospel_courses: '▧',
  the_gospel_quizzes: '?',
  the_gospel_theology: '♨',
  the_gospel_teaching_plans: '□',
  the_gospel_lexicon: '▯',
  the_gospel_library: '▥',
  the_gospel_apologetics: '⚖',
  the_gospel_psalms: '♫',
  the_gospel_counseling: '◍',
  the_gospel_genealogy: '♙',
  the_gospel_sermons: '◫',
  the_gospel_why: 'i',
};

function route() {
  return location.hash.replace(/^#/, '') || '';
}

function growHref(name) {
  return `#${name || 'fn-section-grow'}`;
}

function isGrowModule(name) {
  return ALL.some(item => item.name === name);
}

function isGrowHash(name) {
  return !name || name === 'fn-section-grow' || isGrowModule(name) || name.startsWith('section-the_gospel_');
}

function homeAnchorRoute(name) {
  return name && name.startsWith('section-') ? name : '';
}

function go(name) {
  location.hash = name ? `#${name}` : (integrated ? '#fn-section-grow' : '');
}

function todayLabel() {
  const d = new Date();
  $('#hg-vol') && ($('#hg-vol').textContent = String(d.getFullYear()));
  if (dateEl) dateEl.textContent = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderSideNav() {
  if (integrated) return;
  document.querySelectorAll('[data-herald-grow-nav]').forEach(link => {
    link.classList.add('fn-side-link-active');
  });
}

function syncActive(name) {
  document.querySelectorAll('[data-go]').forEach(link => {
    const active = (link.dataset.go || '') === name;
    link.classList.toggle('fn-side-link-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

function setMasthead(item) {
  if (!flag || !deck || !sectionNo || !motto) return;
  flag.textContent = item ? item.title : 'GROW';
  deck.textContent = item
    ? item.desc
    : 'Discipleship, devotions, Scripture, theology, apologetics, and missions in the new Herald design.';
  sectionNo.textContent = item ? `No. ${item.no}` : 'GROW';
  motto.innerHTML = ['Reading', 'Devotions', 'Missions', 'Theology'].map(label => {
    const match = ALL.find(item => item.short === label || item.title.includes(label));
    return match ? `<a class="fn-motto-link" href="${growHref(match.name)}">${label}</a>` : '';
  }).filter(Boolean).join('<span class="fn-motto-dot">·</span>');
}

function sectionLabel(no, title, subtitle = '') {
  return `<p class="fn-section-label">§ ${no} &nbsp;·&nbsp; ${title}${subtitle ? ` &nbsp;·&nbsp; ${subtitle}` : ''}</p>`;
}

function renderHome() {
  if (!content) return;
  setMasthead(null);
  syncActive('');

  content.innerHTML = `
    <section data-fn-section="front" id="hg-front">
      <div class="fn-front-grid hg-front-grid">
        <aside class="fn-front-left">
          <div class="fn-col-label"><a class="fn-section-link" href="${growHref('the_gospel_reading')}">Today's Scripture Readings</a></div>
          <div class="hg-reading-brief">
            <div class="fn-readings-day">Open The Word</div>
            <div class="fn-reading-row"><span class="fn-reading-tag">Daily Plan</span><a class="fn-reading-ref" href="${growHref('the_gospel_reading')}">One Year Bible Reading</a></div>
            <div class="fn-reading-row"><span class="fn-reading-tag">Formation</span><a class="fn-reading-ref" href="${growHref('the_gospel_heart')}">Heart Check</a></div>
            <div class="fn-reading-row"><span class="fn-reading-tag">Prayer</span><a class="fn-reading-ref" href="${growHref('the_gospel_psalms')}">Psalms</a></div>
          </div>
          ${integrated ? '' : `<div class="fn-index-box">
            <div class="fn-index-box-label">In This Section</div>
            <ul class="fn-index-list">
              ${ALL.map(item => `
                <li>
                  <a class="fn-index-link" href="${growHref(`section-${item.name}`)}" aria-label="Jump to ${escapeHtml(item.title)} section">
                    <span>${escapeHtml(item.short)}</span>
                    <span class="fn-index-dots"></span>
                    <span class="fn-index-pg">§ ${escapeHtml(item.no)}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>`}
        </aside>

        <main class="fn-front-main">
          <div class="fn-col-label">Discipleship Desk</div>
          <article class="hg-lead">
            <div class="fn-lead-theme">Public discipleship edition</div>
            <h1 class="fn-lead-headline">A full discipleship hub, reset into the new Herald design.</h1>
            <p class="fn-lead-scripture">"But grow in the grace and knowledge of our Lord and Savior Jesus Christ." — 2 Peter 3:18</p>
            <div class="fn-lead-body">
              <p>GROW gathers Scripture reading, daily devotion, doctrine, apologetics, missions, counseling, word study, and Gospel invitation into one public desk. Each section opens inside the same Herald view system used by FlockNews: masthead, section panels, and readable study material without app-hopping.</p>
              <p>This edition keeps the tools of the old GROW hub, but reformats the experience around the new Herald design: landscape masthead, rounded content panels, strong app rail, reader controls, and shared FlockOS navigation.</p>
            </div>
          </article>
        </main>
      </div>
    </section>

    ${NAV.map((group, groupIndex) => `
      <section data-fn-section="${slug(group.section)}" id="section-${slug(group.section)}">
        <hr class="rule-double">
        ${sectionLabel(groupIndex + 1, group.section, 'GROW')}
        <div class="hg-section-grid ${group.items.length > 4 ? 'hg-section-grid-wide' : ''}">
          ${group.items.map(item => `
            <a class="hg-section-card" id="section-${item.name}" href="${growHref(item.name)}">
              <span class="hg-section-mark">${ICONS[item.name] || '§'}</span>
              <span class="hg-section-kicker">§ ${item.no}</span>
              <span class="hg-section-title">${item.title}</span>
              <span class="hg-section-copy">${item.desc}</span>
            </a>
          `).join('')}
        </div>
      </section>
    `).join('')}
  `;
  installScriptureLinks(content);
}

async function renderModule(name) {
  const item = ALL.find(item => item.name === name);
  if (!item) {
    go('');
    return;
  }

  setMasthead(item);
  syncActive(name);
  content.innerHTML = `
    <section data-fn-section="${name}" class="hg-module-section">
      <hr class="rule-double">
      ${sectionLabel(item.no, item.title, item.desc)}
      <div class="hg-module-tools">
        <button class="fn-inv-share-btn" type="button" data-go-home>Front Page</button>
      </div>
      <div class="hg-module-body fn-loading">Loading ${item.title}...</div>
    </section>
  `;

  content.querySelector('[data-go-home]')?.addEventListener('click', () => go(''));
  const body = content.querySelector('.hg-module-body');

  if (typeof currentUnmount === 'function') {
    try { currentUnmount(); } catch (_) {}
    currentUnmount = null;
  }

  try {
    const mod = await import(`./the_gospel/${name}.js`);
    body.classList.remove('fn-loading');
    body.innerHTML = mod.render();
    const unmount = typeof mod.mount === 'function' ? mod.mount(body, { go }) : null;
    currentUnmount = typeof unmount === 'function' ? unmount : null;
    installScriptureLinks(body);
  } catch (error) {
    body.innerHTML = `
      <div class="fn-quiz-wrap">
        <div class="fn-quiz-cat">Loading Error</div>
        <div class="fn-quiz-q">${escapeHtml(item.title)} could not be loaded.</div>
        <p class="fn-inv-insight">${escapeHtml(error.message || String(error))}</p>
      </div>
    `;
  }
}

async function routePage() {
  if (!content) return;
  const name = route();
  if (!isGrowHash(name)) {
    if (!content.hasChildNodes()) renderHome();
    return;
  }
  if (name === 'fn-section-grow') {
    renderHome();
    return;
  }
  const anchor = homeAnchorRoute(name);
  if (!name || anchor) {
    renderHome();
    if (anchor) scrollToHomeAnchor(anchor);
  }
  else {
    await renderModule(name);
    scrollToGrow();
  }
}

function scrollToHomeAnchor(anchor) {
  requestAnimationFrame(() => {
    const target = document.getElementById(anchor);
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}

function scrollToGrow() {
  if (!integrated) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    return;
  }
  requestAnimationFrame(() => {
    const target = document.getElementById('fn-section-grow') || content;
    target.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}

function installChrome() {
  if (integrated) {
    $('#hg-share-btn')?.addEventListener('click', shareGrow);
    return;
  }
  const toggle = $('#fn-sidebar-toggle');
  const nav = $('#fn-side-nav');
  const backdrop = $('#fn-side-backdrop');

  function isOpen() {
    return document.documentElement.getAttribute('data-fn-sidebar') === 'open';
  }

  function sync(open) {
    document.documentElement.setAttribute('data-fn-sidebar', open ? 'open' : 'closed');
    toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle?.setAttribute('aria-label', open ? 'Close app navigation' : 'Open app navigation');
    nav?.setAttribute('aria-hidden', open ? 'false' : 'true');
    try { localStorage.setItem('fn_sidebar_open', open ? 'true' : 'false'); } catch (_) {}
  }

  sync(isOpen());
  toggle?.addEventListener('click', () => sync(!isOpen()));
  backdrop?.addEventListener('click', () => sync(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen() && window.matchMedia('(max-width: 640px)').matches) {
      sync(false);
      toggle?.focus();
    }
  });

  const switcherBtn = $('#fn-app-switcher-btn');
  const switcher = $('#fn-app-switcher');
  const chevron = switcherBtn?.querySelector('.fn-switcher-chevron');
  const switcherBackdrop = document.createElement('div');
  switcherBackdrop.className = 'fn-switcher-backdrop';
  switcherBackdrop.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;-webkit-tap-highlight-color:transparent;';
  document.body.appendChild(switcherBackdrop);

  function openSwitcher() {
    if (!switcher || !switcherBtn) return;
    switcher.hidden = false;
    switcher.setAttribute('aria-hidden', 'false');
    switcherBtn.setAttribute('aria-expanded', 'true');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    if (window.innerWidth <= 640) {
      switcherBackdrop.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSwitcher() {
    if (!switcher || !switcherBtn) return;
    switcher.hidden = true;
    switcher.setAttribute('aria-hidden', 'true');
    switcherBtn.setAttribute('aria-expanded', 'false');
    if (chevron) chevron.style.transform = '';
    switcherBackdrop.style.display = 'none';
    document.body.style.overflow = '';
  }

  switcherBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!switcher) return;
    switcher.hidden ? openSwitcher() : closeSwitcher();
  });
  switcherBackdrop.addEventListener('click', closeSwitcher);
  document.addEventListener('click', (event) => {
    if (!switcher || switcher.hidden) return;
    if (!switcher.contains(event.target) && !switcherBtn.contains(event.target)) {
      closeSwitcher();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && switcher && !switcher.hidden) closeSwitcher();
  });
  window.addEventListener('scroll', () => {
    if (switcher && !switcher.hidden && window.innerWidth > 640) closeSwitcher();
  }, { passive: true });

  $('#hg-share-btn')?.addEventListener('click', shareGrow);

  installReaderTools();
}

async function shareGrow() {
  const url = new URL(location.href);
  const title = route() ? `GROW — ${ALL.find(item => item.name === route())?.title || 'Discipleship'}` : 'GROW — Herald Edition';
  try {
    if (navigator.share) await navigator.share({ title, text: 'Discipleship resources from GROW by FlockOS.', url: url.href });
    else {
      await navigator.clipboard.writeText(url.href);
      alert('GROW link copied.');
    }
  } catch (_) {}
}

function setSidebar(open) {
  const current = document.documentElement.getAttribute('data-fn-sidebar') === 'open';
  const next = open == null ? !current : !!open;
  document.documentElement.setAttribute('data-fn-sidebar', next ? 'open' : 'closed');
  try { localStorage.setItem('fn_sidebar_open', String(next)); } catch (_) {}
  $('#fn-sidebar-toggle')?.setAttribute('aria-expanded', next ? 'true' : 'false');
}

function installReaderTools() {
  const TEXT_SIZE_KEY = 'herald.text-size-scale';
  const SIZES = [0.92, 1, 1.08, 1.16, 1.24, 1.32];
  const toggle = $('#fn-reader-toggle');
  const menu = $('#fn-reader-menu');
  let menuOpen = false;

  function nearestScale(value) {
    let scale = Number(value);
    if (!Number.isFinite(scale)) scale = 1;
    return SIZES.reduce((nearest, option) => (
      Math.abs(option - scale) < Math.abs(nearest - scale) ? option : nearest
    ), 1);
  }

  function storedScale() {
    try { return nearestScale(localStorage.getItem(TEXT_SIZE_KEY) || '1'); }
    catch (_) { return 1; }
  }

  function setTextSize(scale, persist) {
    const best = nearestScale(scale);
    document.documentElement.style.setProperty('--reader-scale', String(best));
    document.documentElement.setAttribute('data-reader-scale', String(best));
    document.documentElement.style.fontSize = `${16 * best}px`;
    document.querySelectorAll('[data-reading-size]').forEach(btn => {
      const active = Math.abs(Number(btn.getAttribute('data-reading-size') || '1') - best) < 0.001;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (persist) {
      try { localStorage.setItem(TEXT_SIZE_KEY, String(best)); } catch (_) {}
    }
  }

  function closeMenu() {
    if (!menu || !toggle) return;
    menuOpen = false;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    if (!menu || !toggle) return;
    menuOpen = true;
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  }

  setTextSize(storedScale(), false);
  if (!toggle || !menu) return;

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    menuOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('[data-reading-size]').forEach(btn => {
    btn.addEventListener('click', () => {
      setTextSize(btn.getAttribute('data-reading-size') || '1', true);
      closeMenu();
      toggle.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (!menuOpen) return;
    if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      closeMenu();
      toggle.focus();
    }
  });
}

function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

if (content) {
  todayLabel();
  renderSideNav();
  installChrome();
  window.addEventListener('hashchange', routePage);
  routePage();
}
