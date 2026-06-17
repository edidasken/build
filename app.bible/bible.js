import { mountUnityHeader } from '../Scripts/the_unity_header.js';

const BIBLE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/></svg>';

const CHAPTER_COUNTS = {
  genesis: 50, exodus: 40, leviticus: 27, numbers: 36, deuteronomy: 34, joshua: 24,
  judges: 21, ruth: 4, '1-samuel': 31, '2-samuel': 24, '1-kings': 22, '2-kings': 25,
  '1-chronicles': 29, '2-chronicles': 36, ezra: 10, nehemiah: 13, esther: 10, job: 42,
  psalms: 150, proverbs: 31, ecclesiastes: 12, 'song-of-solomon': 8, isaiah: 66,
  jeremiah: 52, lamentations: 5, ezekiel: 48, daniel: 12, hosea: 14, joel: 3, amos: 9,
  obadiah: 1, jonah: 4, micah: 7, nahum: 3, habakkuk: 3, zephaniah: 3, haggai: 2,
  zechariah: 14, malachi: 4, matthew: 28, mark: 16, luke: 24, john: 21, acts: 28,
  romans: 16, '1-corinthians': 16, '2-corinthians': 13, galatians: 6, ephesians: 6,
  philippians: 4, colossians: 4, '1-thessalonians': 5, '2-thessalonians': 3,
  '1-timothy': 6, '2-timothy': 4, titus: 3, philemon: 1, hebrews: 13, james: 5,
  '1-peter': 5, '2-peter': 3, '1-john': 5, '2-john': 1, '3-john': 1, jude: 1,
  revelation: 22,
};

const BOOKS = [
  ['Genesis', 'genesis', 'Old'], ['Exodus', 'exodus', 'Old'], ['Leviticus', 'leviticus', 'Old'],
  ['Numbers', 'numbers', 'Old'], ['Deuteronomy', 'deuteronomy', 'Old'], ['Joshua', 'joshua', 'Old'],
  ['Judges', 'judges', 'Old'], ['Ruth', 'ruth', 'Old'], ['1 Samuel', '1-samuel', 'Old'],
  ['2 Samuel', '2-samuel', 'Old'], ['1 Kings', '1-kings', 'Old'], ['2 Kings', '2-kings', 'Old'],
  ['1 Chronicles', '1-chronicles', 'Old'], ['2 Chronicles', '2-chronicles', 'Old'], ['Ezra', 'ezra', 'Old'],
  ['Nehemiah', 'nehemiah', 'Old'], ['Esther', 'esther', 'Old'], ['Job', 'job', 'Old'],
  ['Psalms', 'psalms', 'Old'], ['Proverbs', 'proverbs', 'Old'], ['Ecclesiastes', 'ecclesiastes', 'Old'],
  ['Song of Solomon', 'song-of-solomon', 'Old'], ['Isaiah', 'isaiah', 'Old'], ['Jeremiah', 'jeremiah', 'Old'],
  ['Lamentations', 'lamentations', 'Old'], ['Ezekiel', 'ezekiel', 'Old'], ['Daniel', 'daniel', 'Old'],
  ['Hosea', 'hosea', 'Old'], ['Joel', 'joel', 'Old'], ['Amos', 'amos', 'Old'],
  ['Obadiah', 'obadiah', 'Old'], ['Jonah', 'jonah', 'Old'], ['Micah', 'micah', 'Old'],
  ['Nahum', 'nahum', 'Old'], ['Habakkuk', 'habakkuk', 'Old'], ['Zephaniah', 'zephaniah', 'Old'],
  ['Haggai', 'haggai', 'Old'], ['Zechariah', 'zechariah', 'Old'], ['Malachi', 'malachi', 'Old'],
  ['Matthew', 'matthew', 'New'], ['Mark', 'mark', 'New'], ['Luke', 'luke', 'New'],
  ['John', 'john', 'New'], ['Acts', 'acts', 'New'], ['Romans', 'romans', 'New'],
  ['1 Corinthians', '1-corinthians', 'New'], ['2 Corinthians', '2-corinthians', 'New'],
  ['Galatians', 'galatians', 'New'], ['Ephesians', 'ephesians', 'New'], ['Philippians', 'philippians', 'New'],
  ['Colossians', 'colossians', 'New'], ['1 Thessalonians', '1-thessalonians', 'New'],
  ['2 Thessalonians', '2-thessalonians', 'New'], ['1 Timothy', '1-timothy', 'New'], ['2 Timothy', '2-timothy', 'New'],
  ['Titus', 'titus', 'New'], ['Philemon', 'philemon', 'New'], ['Hebrews', 'hebrews', 'New'],
  ['James', 'james', 'New'], ['1 Peter', '1-peter', 'New'], ['2 Peter', '2-peter', 'New'],
  ['1 John', '1-john', 'New'], ['2 John', '2-john', 'New'], ['3 John', '3-john', 'New'],
  ['Jude', 'jude', 'New'], ['Revelation', 'revelation', 'New'],
].map(([name, slug, testament], index) => ({ name, slug, testament, order: index + 1, chapterCount: CHAPTER_COUNTS[slug] || 1 }));

const BOOK_ALIASES = new Map();
for (const book of BOOKS) {
  BOOK_ALIASES.set(normalizeBookName(book.name), book);
  BOOK_ALIASES.set(book.slug, book);
}
BOOK_ALIASES.set('psalm', BOOK_ALIASES.get('psalms'));
BOOK_ALIASES.set('ps', BOOK_ALIASES.get('psalms'));
BOOK_ALIASES.set('prov', BOOK_ALIASES.get('proverbs'));
BOOK_ALIASES.set('song of songs', BOOK_ALIASES.get('song of solomon'));
BOOK_ALIASES.set('songs', BOOK_ALIASES.get('song of solomon'));
BOOK_ALIASES.set('revelations', BOOK_ALIASES.get('revelation'));

const CROSSREF_CODES = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
  JOS: 'joshua', JDG: 'judges', RUT: 'ruth', '1SA': '1-samuel', '2SA': '2-samuel',
  '1KI': '1-kings', '2KI': '2-kings', '1CH': '1-chronicles', '2CH': '2-chronicles',
  EZR: 'ezra', NEH: 'nehemiah', EST: 'esther', JOB: 'job', PSA: 'psalms',
  PRO: 'proverbs', ECC: 'ecclesiastes', SOS: 'song-of-solomon', ISA: 'isaiah',
  JER: 'jeremiah', LAM: 'lamentations', EZE: 'ezekiel', DAN: 'daniel', HOS: 'hosea',
  JOE: 'joel', AMO: 'amos', OBA: 'obadiah', JON: 'jonah', MIC: 'micah',
  NAH: 'nahum', HAB: 'habakkuk', ZEP: 'zephaniah', HAG: 'haggai', ZEC: 'zechariah',
  MAL: 'malachi', MAT: 'matthew', MAR: 'mark', LUK: 'luke', JOH: 'john',
  ACT: 'acts', ROM: 'romans', '1CO': '1-corinthians', '2CO': '2-corinthians',
  GAL: 'galatians', EPH: 'ephesians', PHP: 'philippians', COL: 'colossians',
  '1TH': '1-thessalonians', '2TH': '2-thessalonians', '1TI': '1-timothy',
  '2TI': '2-timothy', TIT: 'titus', PHM: 'philemon', HEB: 'hebrews',
  JAM: 'james', '1PE': '1-peter', '2PE': '2-peter', '1JO': '1-john',
  '2JO': '2-john', '3JO': '3-john', JDE: 'jude', REV: 'revelation',
};

const TSK_CODES = {
  Gen: 'genesis', Exo: 'exodus', Lev: 'leviticus', Num: 'numbers', Deu: 'deuteronomy',
  Jos: 'joshua', Jdg: 'judges', Rth: 'ruth', '1Sa': '1-samuel', '2Sa': '2-samuel',
  '1Ki': '1-kings', '2Ki': '2-kings', '1Ch': '1-chronicles', '2Ch': '2-chronicles',
  Ezr: 'ezra', Neh: 'nehemiah', Est: 'esther', Job: 'job', Psa: 'psalms',
  Pro: 'proverbs', Ecc: 'ecclesiastes', Sol: 'song-of-solomon', Son: 'song-of-solomon',
  Isa: 'isaiah', Jer: 'jeremiah', Lam: 'lamentations', Eze: 'ezekiel', Dan: 'daniel',
  Hos: 'hosea', Joe: 'joel', Amo: 'amos', Oba: 'obadiah', Jon: 'jonah',
  Mic: 'micah', Nah: 'nahum', Hab: 'habakkuk', Zep: 'zephaniah', Hag: 'haggai',
  Zec: 'zechariah', Mal: 'malachi', Mat: 'matthew', Mar: 'mark', Luk: 'luke',
  Joh: 'john', Act: 'acts', Rom: 'romans', '1Co': '1-corinthians',
  '2Co': '2-corinthians', Gal: 'galatians', Eph: 'ephesians', Phi: 'philippians',
  Col: 'colossians', '1Th': '1-thessalonians', '2Th': '2-thessalonians',
  '1Ti': '1-timothy', '2Ti': '2-timothy', Tit: 'titus', Phm: 'philemon',
  Heb: 'hebrews', Jam: 'james', Jas: 'james', '1Pe': '1-peter',
  '2Pe': '2-peter', '1Jo': '1-john', '2Jo': '2-john', '3Jo': '3-john',
  Jud: 'jude', Rev: 'revelation',
};

const STORAGE_KEYS = {
  bookmarks: 'herald_bible_bookmarks_v1',
  notes: 'herald_bible_notes_v1',
  prayers: 'herald_bible_prayers_v1',
};

const TEXT_SIZE_KEY = 'herald.text-size-scale';
const TEXT_SIZE_OPTIONS = [0.92, 1, 1.08, 1.16, 1.24, 1.32];
const CROSSREF_VISIBLE_LIMIT = 5;
const CROSSREF_TEXT_PREVIEW_CHARS = 150;
const TSK_VERSE_PREVIEW_CHARS = 220;
const ORIGINAL_VISIBLE_LIMIT = 6;
const ESV_ALIGNMENT_VISIBLE_LIMIT = 6;
const ORIGINAL_NOTES_VISIBLE_LIMIT = 3;
const KEY_VERB_VISIBLE_LIMIT = 6;

const state = {
  books: new Map(),
  currentBook: null,
  currentChapter: 1,
  highlight: null,
  selectedVerses: new Set(),
  testament: 'all',
  searchLoaded: false,
  crossrefIndexes: new Map(),
  crossrefBuckets: new Map(),
  tskBooks: new Map(),
  commentaryCatalog: null,
  commentarySources: new Map(),
  commentaryBooks: new Map(),
  commentaryRequest: 0,
  sermonIndex: null,
  bookOverviewIndex: null,
  originalBooks: new Map(),
  strongDictionaries: new Map(),
  esvFootnotes: new Map(),
  esvInterlinear: new Map(),
  studyRequest: 0,
  pickerStep: 'book',
  pickerBook: null,
  pickerChapter: 1,
};

const el = {};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  bindElements();
  mountHeader();
  bindEvents();
  renderBookList();
  renderBookmarks();
  initTextSizeControl();
  await renderTodayPlan();

  const initialParams = new URLSearchParams(location.search);
  const initialRef = initialParams.get('ref') || decodeURIComponent(location.hash.replace(/^#/, '')) || 'John 1';
  await goToReference(initialRef, { replace: true, selectedVerses: parseSelectedVerseParam(initialParams.get('verses')) });
  registerBibleServiceWorker();
}

function bindElements() {
  for (const id of [
    'bible-topbar', 'bible-sidebar', 'bible-close-sidebar', 'bible-open-sidebar',
    'bible-book-filter', 'bible-book-list', 'bible-reference-form', 'bible-reference-input',
    'bible-open-picker', 'bible-close-picker', 'bible-verse-picker', 'bible-picker-title', 'bible-picker-steps', 'bible-picker-content',
    'bible-current-title', 'bible-version-label', 'bible-chapter-select', 'bible-chapter-strip',
    'bible-book-overview',
    'bible-selection-bar', 'bible-selection-count', 'bible-selection-copy', 'bible-selection-share',
    'bible-selection-save', 'bible-selection-clear', 'bible-passage', 'bible-prev-chapter', 'bible-next-chapter', 'bible-copy-passage',
    'bible-bookmark', 'bible-note', 'bible-pray', 'bible-search-form', 'bible-search-input',
    'bible-search-results', 'bible-search-count', 'bible-bookmark-list', 'bible-clear-bookmarks',
    'bible-crossrefs', 'bible-crossref-count', 'bible-commentaries', 'bible-commentary-count',
    'bible-original', 'bible-original-count',
    'bible-reading-plan', 'bible-reading-plan-date', 'bible-open-reading-plan', 'bible-drawer', 'bible-drawer-backdrop',
    'bible-sidebar-backdrop', 'bible-close-drawer', 'bible-drawer-kicker', 'bible-drawer-title', 'bible-drawer-body',
    'bible-reader-toggle', 'bible-reader-menu', 'bible-toasts',
  ]) {
    el[toCamel(id.replace(/^bible-/, ''))] = document.getElementById(id);
  }
}

function mountHeader() {
  let user = null;
  try {
    const raw = sessionStorage.getItem('flock_auth_session') || sessionStorage.getItem('flock_auth_profile');
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.email) {
      user = {
        displayName: parsed.displayName || parsed.name || parsed.email.split('@')[0],
        email: parsed.email,
        photoURL: parsed.photoURL || '',
      };
    }
  } catch (_) {}

  mountUnityHeader(el.topbar, {
    appId: 'bible',
    appName: 'Bible',
    appIconSvg: BIBLE_ICON,
    appAccent: '#f7c756',
    appAccentDk: '#b8871e',
    homeHref: 'app.bible/',
    user,
    signInHref: 'app.flockos/app.flockos.html',
    onHamburger: () => toggleSidebar(),
    features: [
      { id: 'bible-reference', label: 'Lookup Scripture', hint: 'Jump to a passage', run: () => el.referenceInput?.focus() },
      { id: 'bible-search', label: 'Search Bible', hint: 'Search ESV text', run: () => el.searchInput?.focus() },
      { id: 'bible-note', label: 'Save Note', hint: 'Write a note on the current passage', run: () => openNoteDrawer('note') },
      { id: 'bible-prayer', label: 'Pray Passage', hint: 'Turn this passage into a prayer prompt', run: () => openNoteDrawer('prayer') },
    ],
  });
  syncSidebarToggleState(!isMobileShell());
}

function registerBibleServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('the_living_water.js').then((registration) => {
    const warm = () => {
      const worker = registration.active || navigator.serviceWorker.controller;
      worker?.postMessage({ type: 'WARM_APP_BIBLE_OFFLINE' });
    };
    const schedule = () => window.setTimeout(warm, 8000);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(schedule, { timeout: 15000 });
    } else {
      schedule();
    }
    window.addEventListener('appinstalled', () => window.setTimeout(warm, 12000), { once: true });
  }).catch(() => {});
}

function bindEvents() {
  el.referenceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    goToReference(el.referenceInput.value.trim());
  });
  el.openPicker.addEventListener('click', toggleVersePicker);
  el.closePicker.addEventListener('click', closeVersePicker);
  el.versePicker.addEventListener('click', handleVersePickerClick);
  document.addEventListener('click', (event) => {
    if (el.versePicker.hidden || event.target.closest('.bible-picker-wrap')) return;
    closeVersePicker();
  });

  el.bookFilter.addEventListener('input', renderBookList);
  document.querySelectorAll('[data-testament]').forEach((button) => {
    button.addEventListener('click', () => {
      state.testament = button.dataset.testament || 'all';
      document.querySelectorAll('[data-testament]').forEach((b) => b.classList.toggle('is-active', b === button));
      renderBookList();
    });
  });

  el.chapterSelect.addEventListener('change', () => setChapter(Number(el.chapterSelect.value)));
  el.prevChapter.addEventListener('click', () => moveChapter(-1));
  el.nextChapter.addEventListener('click', () => moveChapter(1));
  el.bookOverview.addEventListener('click', openBookOverviewDrawer);
  el.copyPassage.addEventListener('click', copyCurrentPassage);
  el.bookmark.addEventListener('click', saveBookmark);
  el.note.addEventListener('click', () => openNoteDrawer('note'));
  el.pray.addEventListener('click', () => openNoteDrawer('prayer'));
  el.selectionCopy.addEventListener('click', copyCurrentPassage);
  el.selectionShare.addEventListener('click', shareCurrentPassage);
  el.selectionSave.addEventListener('click', saveBookmark);
  el.selectionClear.addEventListener('click', clearVerseSelection);
  document.querySelectorAll('[data-study-jump]').forEach((button) => {
    button.addEventListener('click', () => jumpToStudyPanel(button.dataset.studyJump));
  });
  el.searchForm.addEventListener('submit', searchBible);
  el.clearBookmarks.addEventListener('click', clearBookmarks);
  el.openSidebar.addEventListener('click', () => toggleSidebar(true));
  el.closeSidebar.addEventListener('click', () => toggleSidebar(false));
  el.sidebarBackdrop.addEventListener('click', () => toggleSidebar(false));
  el.closeDrawer.addEventListener('click', closeDrawer);
  el.drawerBackdrop.addEventListener('click', closeDrawer);
  el.openReadingPlan.addEventListener('click', () => window.open('Data/one_year_bible.md', '_blank', 'noopener'));
  window.addEventListener('resize', () => {
    if (!isMobileShell()) {
      closeMobileSidebar();
      syncSidebarToggleState(!document.body.classList.contains('bible-nav-hidden'));
    } else {
      document.body.classList.remove('bible-nav-hidden');
      syncSidebarToggleState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileSidebar();
      closeDrawer();
      closeTextSizeMenu();
      closeVersePicker();
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      el.referenceInput.select();
    }
  });
}

function jumpToStudyPanel(id) {
  const target = document.getElementById(id || '');
  if (!target) return;
  document.querySelectorAll('[data-study-jump]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.studyJump === id);
  });
  scrollToStudyTarget(target);
  window.setTimeout(() => {
    try {
      target.focus({ preventScroll: true });
    } catch (_) {
      target.focus();
    }
  }, 260);
}

function scrollToStudyTarget(target) {
  const scroller = getDocumentScroller();
  const top = target.getBoundingClientRect().top + getDocumentScrollTop() - getStudyScrollOffset();
  if (scroller === document.body) {
    document.body.scrollTo({ top, behavior: 'auto' });
  } else {
    window.scrollTo({ top, behavior: 'auto' });
  }
}

function getDocumentScroller() {
  const html = document.documentElement;
  return document.body.scrollHeight > html.scrollHeight ? document.body : (document.scrollingElement || html);
}

function getDocumentScrollTop() {
  const scroller = getDocumentScroller();
  return scroller === document.body ? document.body.scrollTop : window.scrollY;
}

function getStudyScrollOffset() {
  const style = getComputedStyle(document.documentElement);
  const safe = parseFloat(style.getPropertyValue('--bible-safe-top')) || 0;
  const shell = parseFloat(style.getPropertyValue('--bible-shell-top')) || 0;
  const header = parseFloat(style.getPropertyValue('--bible-header-h')) || 56;
  const gap = parseFloat(style.getPropertyValue('--bible-header-gap')) || 16;
  const renderedHeader = el.topbar?.getBoundingClientRect().bottom || 0;
  return Math.max(renderedHeader, safe + shell + header + gap) + 34;
}

function initTextSizeControl() {
  setTextSize(readTextSize(), false);
  if (!el.readerToggle || !el.readerMenu) return;

  el.readerToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (el.readerMenu.hidden) openTextSizeMenu();
    else closeTextSizeMenu();
  });

  el.readerMenu.querySelectorAll('[data-reading-size]').forEach((button) => {
    button.addEventListener('click', () => {
      setTextSize(button.getAttribute('data-reading-size') || '1', true);
      closeTextSizeMenu();
      el.readerToggle.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (el.readerMenu.hidden) return;
    if (!el.readerMenu.contains(event.target) && !el.readerToggle.contains(event.target)) {
      closeTextSizeMenu();
    }
  });
}

function openTextSizeMenu() {
  if (!el.readerToggle || !el.readerMenu) return;
  el.readerMenu.hidden = false;
  el.readerToggle.setAttribute('aria-expanded', 'true');
}

function closeTextSizeMenu() {
  if (!el.readerToggle || !el.readerMenu) return;
  el.readerMenu.hidden = true;
  el.readerToggle.setAttribute('aria-expanded', 'false');
}

function readTextSize() {
  try {
    return nearestTextSize(localStorage.getItem(TEXT_SIZE_KEY) || '1');
  } catch (_) {
    return 1;
  }
}

function setTextSize(scale, persist) {
  const best = nearestTextSize(scale);
  document.documentElement.style.setProperty('--reader-scale', String(best));
  document.documentElement.setAttribute('data-reader-scale', String(best));
  document.querySelectorAll('[data-reading-size]').forEach((button) => {
    const active = Math.abs(Number(button.getAttribute('data-reading-size') || '1') - best) < 0.001;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  if (persist) {
    try {
      localStorage.setItem(TEXT_SIZE_KEY, String(best));
    } catch (_) {}
  }
}

function nearestTextSize(value) {
  const scale = Number(value);
  const target = Number.isFinite(scale) ? scale : 1;
  return TEXT_SIZE_OPTIONS.reduce((nearest, option) => (
    Math.abs(option - target) < Math.abs(nearest - target) ? option : nearest
  ), 1);
}

function renderBookList() {
  const q = normalizeBookName(el.bookFilter.value || '');
  const groups = { Old: [], New: [] };
  for (const book of BOOKS) {
    if (state.testament !== 'all' && book.testament !== state.testament) continue;
    if (q && !normalizeBookName(book.name).includes(q) && !book.slug.includes(q.replace(/\s+/g, '-'))) continue;
    groups[book.testament].push(book);
  }

  el.bookList.innerHTML = '';
  for (const testament of ['Old', 'New']) {
    if (!groups[testament].length) continue;
    const section = document.createElement('section');
    section.className = 'bible-book-group';
    section.innerHTML = `<div class="bible-book-group-title">${testament} Testament</div>`;
    for (const book of groups[testament]) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'bible-book-btn';
      button.dataset.slug = book.slug;
      button.innerHTML = `<span>${escapeHtml(book.name)}</span><span class="bible-book-count">${book.chapterCount}</span>`;
      button.addEventListener('click', () => goToBook(book.slug, 1));
      section.appendChild(button);
    }
    el.bookList.appendChild(section);
  }
  updateActiveBook();
}

async function goToBook(slug, chapter = 1, highlight = null, options = {}) {
  const data = await loadBook(slug);
  state.currentBook = data;
  state.currentChapter = clamp(chapter, 1, data.chapters.length);
  state.highlight = highlight;
  state.selectedVerses = selectedSetForChapter(options.selectedVerses, highlight, state.currentChapter, data);
  renderReader();
  updateActiveBook();
  syncVersePickerState();
  closeMobileSidebar();
  if (!options.replace) updateLocation();
}

async function goToReference(input, options = {}) {
  const parsed = parseReference(input);
  if (!parsed) {
    toast('Could not read that reference.');
    return;
  }
  await goToBook(parsed.book.slug, parsed.chapter || 1, parsed, options);
  el.referenceInput.value = currentReference() || formatReference(parsed, { fallbackChapter: state.currentChapter });
}

async function setChapter(chapter) {
  if (!state.currentBook) return;
  await goToBook(state.currentBook.slug, chapter);
}

function toggleVersePicker(event) {
  event?.stopPropagation();
  if (el.versePicker.hidden) {
    openVersePicker();
  } else {
    closeVersePicker();
  }
}

function openVersePicker() {
  state.pickerStep = 'book';
  syncVersePickerState();
  el.versePicker.hidden = false;
  el.openPicker.setAttribute('aria-expanded', 'true');
  renderVersePicker();
}

function closeVersePicker() {
  if (!el.versePicker || el.versePicker.hidden) return;
  el.versePicker.hidden = true;
  el.openPicker?.setAttribute('aria-expanded', 'false');
}

function syncVersePickerState() {
  if (!state.currentBook) return;
  state.pickerBook = BOOK_ALIASES.get(state.currentBook.slug) || state.currentBook;
  state.pickerChapter = state.currentChapter || 1;
  if (!el.versePicker?.hidden) renderVersePicker();
}

function handleVersePickerClick(event) {
  event.stopPropagation();
  const stepButton = event.target.closest('[data-picker-step]');
  if (stepButton) {
    state.pickerStep = stepButton.dataset.pickerStep || 'book';
    renderVersePicker();
    return;
  }

  const bookButton = event.target.closest('[data-picker-book]');
  if (bookButton) {
    state.pickerBook = BOOK_ALIASES.get(bookButton.dataset.pickerBook);
    state.pickerChapter = 1;
    state.pickerStep = 'chapter';
    renderVersePicker();
    return;
  }

  const chapterButton = event.target.closest('[data-picker-chapter]');
  if (chapterButton) {
    state.pickerChapter = Number(chapterButton.dataset.pickerChapter) || 1;
    state.pickerStep = 'verse';
    renderVersePicker();
    return;
  }

  const verseButton = event.target.closest('[data-picker-verse]');
  if (verseButton) {
    selectVerseFromPicker(Number(verseButton.dataset.pickerVerse) || 1);
  }
}

async function selectVerseFromPicker(verse) {
  const book = state.pickerBook || BOOK_ALIASES.get(state.currentBook?.slug);
  if (!book) return;
  const chapter = Math.max(1, Number(state.pickerChapter) || 1);
  closeVersePicker();
  await goToReference(`${book.name} ${chapter}:${verse}`);
}

async function renderVersePicker() {
  if (!el.versePicker || el.versePicker.hidden) return;
  const book = state.pickerBook || BOOK_ALIASES.get(state.currentBook?.slug) || BOOKS[0];
  const chapter = Math.max(1, Number(state.pickerChapter) || 1);
  const step = state.pickerStep || 'book';
  const bookData = step === 'verse' ? await loadBook(book.slug) : null;
  const verseCount = bookData?.chapters?.[chapter - 1]?.length || 0;

  el.pickerTitle.textContent = step === 'book'
    ? 'Choose a book'
    : step === 'chapter'
      ? `${book.name}: choose a chapter`
      : `${book.name} ${chapter}: choose a verse`;
  el.pickerSteps.innerHTML = [
    ['book', 'Book'],
    ['chapter', book.name || 'Chapter'],
    ['verse', chapter ? `Ch. ${chapter}` : 'Verse'],
  ].map(([value, label]) => `
    <button class="${step === value ? 'is-active' : ''}" type="button" data-picker-step="${value}" ${value !== 'book' && !book ? 'disabled' : ''}>
      ${escapeHtml(label)}
    </button>
  `).join('');

  if (step === 'book') {
    el.pickerContent.innerHTML = renderPickerBooks(book);
  } else if (step === 'chapter') {
    el.pickerContent.innerHTML = renderPickerChapters(book, chapter);
  } else {
    el.pickerContent.innerHTML = renderPickerVerses(verseCount, selectedVerseNumbers());
  }
}

function renderPickerBooks(activeBook) {
  return `
    <div class="bible-picker-grid bible-picker-book-grid">
      ${BOOKS.map((book) => `
        <button class="${activeBook?.slug === book.slug ? 'is-active' : ''}" type="button" data-picker-book="${escapeAttr(book.slug)}">
          <span>${escapeHtml(book.name)}</span>
          <small>${escapeHtml(book.testament)}</small>
        </button>
      `).join('')}
    </div>
  `;
}

function renderPickerChapters(book, activeChapter) {
  const count = book?.chapterCount || 1;
  return `
    <div class="bible-picker-grid bible-picker-number-grid">
      ${Array.from({ length: count }, (_, index) => {
        const chapter = index + 1;
        return `<button class="${chapter === activeChapter ? 'is-active' : ''}" type="button" data-picker-chapter="${chapter}">${chapter}</button>`;
      }).join('')}
    </div>
  `;
}

function renderPickerVerses(verseCount, selected) {
  if (!verseCount) return '<div class="bible-empty">Verse list unavailable for this chapter.</div>';
  return `
    <div class="bible-picker-grid bible-picker-number-grid">
      ${Array.from({ length: verseCount }, (_, index) => {
        const verse = index + 1;
        return `<button class="${selected.includes(verse) ? 'is-active' : ''}" type="button" data-picker-verse="${verse}">${verse}</button>`;
      }).join('')}
    </div>
  `;
}

async function moveChapter(offset) {
  if (!state.currentBook) return;
  const bookIndex = BOOKS.findIndex((book) => book.slug === state.currentBook.slug);
  const nextChapter = state.currentChapter + offset;
  if (nextChapter >= 1 && nextChapter <= state.currentBook.chapters.length) {
    await setChapter(nextChapter);
    return;
  }
  const nextBook = BOOKS[bookIndex + (offset > 0 ? 1 : -1)];
  if (!nextBook) return;
  const data = await loadBook(nextBook.slug);
  await goToBook(nextBook.slug, offset > 0 ? 1 : data.chapters.length);
}

function renderReader() {
  const book = state.currentBook;
  const chapter = state.currentChapter;
  if (!book) return;

  el.currentTitle.textContent = `${book.name} ${chapter}`;
  el.versionLabel.textContent = book.versionName || 'English Standard Version 2011';
  el.chapterSelect.innerHTML = book.chapters.map((_, index) => (
    `<option value="${index + 1}" ${index + 1 === chapter ? 'selected' : ''}>Chapter ${index + 1}</option>`
  )).join('');
  el.chapterStrip.innerHTML = book.chapters.map((_, index) => (
    `<button class="bible-chapter-btn ${index + 1 === chapter ? 'is-active' : ''}" type="button" data-chapter="${index + 1}">${index + 1}</button>`
  )).join('');
  el.chapterStrip.querySelectorAll('[data-chapter]').forEach((button) => {
    button.addEventListener('click', () => setChapter(Number(button.dataset.chapter)));
  });

  const verses = book.chapters[chapter - 1] || [];
  const selected = selectedVerseNumbers();
  el.passage.innerHTML = `
    <div class="bible-passage-inner">
      ${verses.map((text, index) => {
        const verse = index + 1;
        const active = state.selectedVerses.has(verse);
        return `<p class="bible-verse ${active ? 'is-highlighted is-selected' : ''}" id="v${verse}" data-verse="${verse}" role="button" tabindex="0" aria-pressed="${active ? 'true' : 'false'}">
          <span class="bible-verse-num">${verse}</span>${escapeHtml(text)}
        </p>`;
      }).join('')}
      <p class="bible-license">
        ESV Bible text credited to <a href="https://www.esv.org/" target="_blank" rel="noopener">ESV.org</a>.
        English Standard Version is published by Crossway.
      </p>
    </div>
  `;
  el.passage.querySelectorAll('[data-verse]').forEach((node) => {
    node.addEventListener('click', () => selectVerse(Number(node.dataset.verse)));
    node.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      selectVerse(Number(node.dataset.verse));
    });
  });
  if (selected.length) {
    requestAnimationFrame(() => document.getElementById(`v${selected[0]}`)?.scrollIntoView({ block: 'center' }));
  } else {
    el.passage.scrollTop = 0;
  }
  updateSelectionBar();
  renderCrossReferences();
  renderOriginalLanguage();
  renderCommentaries();
}

function updateActiveBook() {
  document.querySelectorAll('.bible-book-btn').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.slug === state.currentBook?.slug);
  });
}

function selectVerse(verse) {
  if (!state.currentBook || !verse) return;
  if (state.selectedVerses.has(verse)) {
    state.selectedVerses.delete(verse);
  } else {
    state.selectedVerses.add(verse);
  }
  state.highlight = highlightFromSelection();
  el.referenceInput.value = currentReference();
  syncVerseSelectionDom();
  updateSelectionBar();
  updateLocation();
  renderCrossReferences();
  renderOriginalLanguage();
  renderCommentaries();
}

function clearVerseSelection() {
  if (!state.currentBook) return;
  state.selectedVerses.clear();
  state.highlight = null;
  el.referenceInput.value = currentReference();
  syncVerseSelectionDom();
  updateSelectionBar();
  updateLocation();
  renderCrossReferences();
  renderOriginalLanguage();
  renderCommentaries();
}

function syncVerseSelectionDom() {
  el.passage.querySelectorAll('.bible-verse').forEach((node) => {
    const selected = state.selectedVerses.has(Number(node.dataset.verse));
    node.classList.toggle('is-highlighted', selected);
    node.classList.toggle('is-selected', selected);
    node.setAttribute('aria-pressed', selected ? 'true' : 'false');
  });
}

function updateSelectionBar() {
  if (!el.selectionBar || !el.selectionCount) return;
  const count = selectedVerseNumbers().length;
  el.selectionBar.hidden = !count;
  el.selectionCount.textContent = `${count} ${count === 1 ? 'verse' : 'verses'} selected`;
}

function selectedVerseNumbers() {
  return Array.from(state.selectedVerses || [])
    .map(Number)
    .filter((verse) => Number.isInteger(verse) && verse > 0)
    .sort((a, b) => a - b);
}

function selectedSetForChapter(verses, highlight, chapter, book) {
  const max = book?.chapters?.[chapter - 1]?.length || 0;
  const fromExplicit = normalizeVerseList(verses, max);
  if (fromExplicit.length) return new Set(fromExplicit);
  const fromHighlight = selectedVersesFromHighlight(highlight, chapter, max);
  return new Set(fromHighlight);
}

function selectedVersesFromHighlight(ref, chapter, max) {
  const highlight = normalizeHighlight(ref, chapter);
  if (!highlight) return [];
  const end = Math.min(highlight.end || highlight.start, max || highlight.end || highlight.start);
  const verses = [];
  for (let verse = Math.max(1, highlight.start); verse <= end; verse += 1) verses.push(verse);
  return verses;
}

function normalizeVerseList(verses, max = 0) {
  const list = Array.isArray(verses) ? verses : parseSelectedVerseParam(verses);
  const upper = Number(max) || Number.MAX_SAFE_INTEGER;
  return Array.from(new Set(list
    .map(Number)
    .filter((verse) => Number.isInteger(verse) && verse >= 1 && verse <= upper)))
    .sort((a, b) => a - b);
}

function parseSelectedVerseParam(value) {
  return String(value || '')
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((verse) => Number.isInteger(verse) && verse > 0);
}

function highlightFromSelection() {
  const selected = selectedVerseNumbers();
  if (!selected.length || !state.currentBook) return null;
  return {
    book: BOOK_ALIASES.get(state.currentBook.slug) || state.currentBook,
    chapter: state.currentChapter,
    verseStart: selected[0],
    verseEnd: selected[selected.length - 1],
  };
}

function selectedVerseGroups() {
  const selected = selectedVerseNumbers();
  if (!selected.length) return [];
  const groups = [];
  let start = selected[0];
  let prev = selected[0];
  for (const verse of selected.slice(1)) {
    if (verse === prev + 1) {
      prev = verse;
      continue;
    }
    groups.push([start, prev]);
    start = verse;
    prev = verse;
  }
  groups.push([start, prev]);
  return groups;
}

function formatSelectedReference() {
  if (!state.currentBook) return '';
  const groups = selectedVerseGroups();
  if (!groups.length) return `${state.currentBook.name} ${state.currentChapter}`;
  const verseList = groups.map(([start, end]) => (start === end ? `${start}` : `${start}-${end}`)).join(', ');
  return `${state.currentBook.name} ${state.currentChapter}:${verseList}`;
}

async function loadBook(slug) {
  if (state.books.has(slug)) return state.books.get(slug);
  const mod = await import(`./esv/books/${slug}.js`);
  state.books.set(slug, mod.default);
  return mod.default;
}

async function loadAllBooks() {
  await Promise.all(BOOKS.map((book) => loadBook(book.slug)));
  state.searchLoaded = true;
}

async function loadCrossrefIndex(slug) {
  if (state.crossrefIndexes.has(slug)) return state.crossrefIndexes.get(slug);
  const response = await fetch(new URL(`./cross-references/index/${slug}.json`, import.meta.url));
  if (!response.ok) throw new Error(`Cross-reference index missing for ${slug}`);
  const data = await response.json();
  state.crossrefIndexes.set(slug, data);
  return data;
}

async function loadCrossrefBucket(bucket) {
  if (state.crossrefBuckets.has(bucket)) return state.crossrefBuckets.get(bucket);
  const response = await fetch(new URL(`./cross-references/${bucket}.json`, import.meta.url));
  if (!response.ok) throw new Error(`Cross-reference bucket missing: ${bucket}`);
  const data = await response.json();
  state.crossrefBuckets.set(bucket, data);
  return data;
}

async function loadTskBook(slug) {
  if (state.tskBooks.has(slug)) return state.tskBooks.get(slug);
  const response = await fetch(new URL(`./tsk/books/${slug}.json`, import.meta.url));
  if (!response.ok) throw new Error(`TSK book missing for ${slug}`);
  const data = await response.json();
  state.tskBooks.set(slug, data);
  return data;
}

async function loadCommentaryCatalog() {
  if (state.commentaryCatalog) return state.commentaryCatalog;
  const [response, sourceMod] = await Promise.all([
    fetch(new URL('./commentaries/catalog.json', import.meta.url)),
    import('./commentaries/commentary-sources.js'),
  ]);
  if (!response.ok) throw new Error('Commentary catalog missing');
  const catalog = await response.json();
  const localSources = sourceMod.default || [];
  const sourceByKeyword = new Map(localSources.map((source) => [source.keyword, source]));
  catalog.libraries = (catalog.libraries || []).map((library) => ({
    ...library,
    ...(sourceByKeyword.get(library.keyword) || {}),
  }));
  catalog.localSources = localSources;
  state.commentaryCatalog = catalog;
  return state.commentaryCatalog;
}

async function loadCommentarySource(source) {
  if (!source?.modulePath) return null;
  if (state.commentarySources.has(source.id)) return state.commentarySources.get(source.id);
  const modulePath = source.modulePath.replace(/^\.\//, '');
  const mod = await import(`./commentaries/${modulePath}`);
  const data = mod[source.scriptName] || mod.default || null;
  state.commentarySources.set(source.id, data);
  return data;
}

async function loadCommentaryEntries(source, target) {
  if (!source) return [];
  const inlineEntries = findCommentaryEntries(source, target, []);
  const availableChapters = source.books?.[target.slug] || source.books?.[target.book.name];
  if (!source.chunkPath || !Array.isArray(availableChapters) || !availableChapters.includes(target.chapter)) {
    return inlineEntries;
  }
  const chunkPath = source.chunkPath
    .replace('{book}', target.slug)
    .replace('{chapter}', String(target.chapter))
    .replace(/^\.\//, '');
  const cacheKey = `${source.id}:${target.slug}:${target.chapter}`;
  if (!state.commentaryBooks.has(cacheKey)) {
    const response = await fetch(new URL(`./commentaries/${chunkPath}`, import.meta.url));
    const data = response.ok ? await response.json() : { entries: [] };
    state.commentaryBooks.set(cacheKey, data);
  }
  const chunk = state.commentaryBooks.get(cacheKey);
  return findCommentaryEntries(source, target, chunk.entries || inlineEntries);
}

async function loadSermonIndex() {
  if (state.sermonIndex) return state.sermonIndex;
  const response = await fetch(new URL('./commentaries/bible-commentaries-english/sermons-index.json', import.meta.url));
  if (!response.ok) throw new Error('Sermon index missing');
  state.sermonIndex = await response.json();
  return state.sermonIndex;
}

async function loadOriginalBook(slug) {
  if (state.originalBooks.has(slug)) return state.originalBooks.get(slug);
  const response = await fetch(new URL(`./original-languages/tahmmee-interlinear/books/${slug}.json`, import.meta.url));
  if (!response.ok) throw new Error(`Original-language book missing for ${slug}`);
  const data = await response.json();
  state.originalBooks.set(slug, data);
  return data;
}

async function loadStrongDictionary(kind) {
  if (state.strongDictionaries.has(kind)) return state.strongDictionaries.get(kind);
  const response = await fetch(new URL(`./original-languages/openscriptures-strongs/json/${kind}.json`, import.meta.url));
  if (!response.ok) throw new Error(`Strong's dictionary missing: ${kind}`);
  const data = await response.json();
  state.strongDictionaries.set(kind, data);
  return data;
}

async function loadEsvFootnotes(slug) {
  if (state.esvFootnotes.has(slug)) return state.esvFootnotes.get(slug);
  const response = await fetch(new URL(`./original-languages/jburson-bible-data/esv/footnotes/${slug}.json`, import.meta.url));
  if (!response.ok) throw new Error(`ESV footnotes missing for ${slug}`);
  const data = await response.json();
  state.esvFootnotes.set(slug, data);
  return data;
}

async function loadEsvInterlinear(slug) {
  if (state.esvInterlinear.has(slug)) return state.esvInterlinear.get(slug);
  const response = await fetch(new URL(`./original-languages/jburson-bible-data/esv/interlinear/${slug}.json`, import.meta.url));
  if (!response.ok) throw new Error(`ESV interlinear missing for ${slug}`);
  const data = await response.json();
  state.esvInterlinear.set(slug, data);
  return data;
}

function currentStudyTarget() {
  if (!state.currentBook) return null;
  const chapter = state.currentChapter;
  const verses = state.currentBook.chapters[chapter - 1] || [];
  const highlight = normalizeHighlight(state.highlight, chapter);
  const selected = selectedVerseNumbers();
  const verse = clamp(selected[0] || highlight?.start || 1, 1, Math.max(verses.length, 1));
  const verseEnd = clamp(selected[selected.length - 1] || highlight?.end || verse, verse, Math.max(verses.length, 1));
  return {
    book: BOOK_ALIASES.get(state.currentBook.slug) || state.currentBook,
    slug: state.currentBook.slug,
    chapter,
    verse,
    verseEnd,
  };
}

async function renderCrossReferences() {
  if (!el.crossrefs || !state.currentBook) return;
  const request = ++state.studyRequest;
  const target = currentStudyTarget();
  if (!target) return;
  el.crossrefCount.textContent = `${target.chapter}:${target.verse}`;
  el.crossrefs.innerHTML = '<div class="bible-loading">Loading references...</div>';

  try {
    const [references, tsk] = await Promise.all([
      loadCrossReferencesFor(target),
      loadTskFor(target),
    ]);
    if (request !== state.studyRequest) return;

    const visibleReferences = references.items.slice(0, CROSSREF_VISIBLE_LIMIT);
    const hiddenReferences = references.items.slice(CROSSREF_VISIBLE_LIMIT);
    const referenceHtml = references.items.length
      ? `
        ${visibleReferences.map((item, index) => renderCrossReferenceItem(item, index)).join('')}
        ${hiddenReferences.length ? `
          <details class="bible-study-more">
            <summary>${hiddenReferences.length} more cross references</summary>
            <div class="bible-crossrefs bible-crossrefs-extra">
              ${hiddenReferences.map((item, index) => renderCrossReferenceItem(item, index + CROSSREF_VISIBLE_LIMIT)).join('')}
            </div>
          </details>
        ` : ''}
      `
      : '<div class="bible-empty">No cross references found for this verse.</div>';

    const tskHtml = renderTskSection(tsk);
    el.crossrefCount.textContent = `${references.total || 0} refs`;
    el.crossrefs.innerHTML = `
      <div class="bible-crossref-source">
        Verse target: <strong>${escapeHtml(formatReference({ book: target.book, chapter: target.chapter, verseStart: target.verse }))}</strong>
      </div>
      ${referenceHtml}
      ${references.total > references.items.length ? `<div class="bible-crossref-source">${references.total - references.items.length} more references available in the imported dataset.</div>` : ''}
      ${tskHtml}
      <div class="bible-crossref-source">
        Cross references imported from <a href="https://github.com/josephilipraja/bible-cross-reference-json" target="_blank" rel="noopener">bible-cross-reference-json</a>.
        Treasury notes imported from <a href="https://github.com/helpsministries/biblewebapp/tree/master/input/com_tske" target="_blank" rel="noopener">TSKe</a>.
      </div>
    `;
    bindCrossReferenceActions(references.items);
  } catch (error) {
    if (request !== state.studyRequest) return;
    el.crossrefCount.textContent = '';
    el.crossrefs.innerHTML = '<div class="bible-empty">References unavailable.</div>';
  }
}

async function renderOriginalLanguage() {
  if (!el.original || !state.currentBook) return;
  const target = currentStudyTarget();
  if (!target) return;
  const key = `${target.chapter}:${target.verse}`;
  el.originalCount.textContent = key;
  el.original.innerHTML = '<div class="bible-loading">Loading original text...</div>';

  try {
    const [bookInterlinear, footnotes, esvInterlinear] = await Promise.all([
      loadOriginalBook(target.slug),
      loadEsvFootnotes(target.slug),
      loadEsvInterlinear(target.slug),
    ]);
    const words = bookInterlinear[key] || [];
    const esvWords = esvInterlinear[key] || [];
    const esvPassageWords = collectEsvInterlinearRange(esvInterlinear, target);
    const notes = footnotes[key] || [];
    const kinds = new Set(words.map((word) => String(word.number || '').slice(0, 1).toLowerCase()).filter(Boolean));
    const [greek, hebrew] = await Promise.all([
      kinds.has('g') ? loadStrongDictionary('greek') : Promise.resolve({}),
      kinds.has('h') ? loadStrongDictionary('hebrew') : Promise.resolve({}),
    ]);
    const dictionary = { ...greek, ...hebrew };
    const visibleWords = words.slice(0, ORIGINAL_VISIBLE_LIMIT);
    const hiddenWords = words.slice(ORIGINAL_VISIBLE_LIMIT);
    const wordHtml = visibleWords.length
      ? visibleWords.map((word) => renderOriginalWord(word, dictionary)).join('')
      : '<div class="bible-empty">No interlinear data found for this verse.</div>';
    const extraWordHtml = hiddenWords.length
      ? `
        <details class="bible-study-more">
          <summary>${hiddenWords.length} more interlinear words</summary>
          <div class="bible-original-grid bible-original-grid-extra">${hiddenWords.map((word) => renderOriginalWord(word, dictionary)).join('')}</div>
        </details>
      `
      : '';
    const esvHtml = esvWords.length
      ? `
        <details class="bible-original-details">
          <summary>ESV interlinear alignment</summary>
          <div class="bible-original-alignment">${esvWords.slice(0, ESV_ALIGNMENT_VISIBLE_LIMIT).map(renderEsvInterlinearToken).join('')}</div>
          ${esvWords.length > ESV_ALIGNMENT_VISIBLE_LIMIT ? `
            <details class="bible-study-more bible-study-more-nested">
              <summary>${esvWords.length - ESV_ALIGNMENT_VISIBLE_LIMIT} more alignment tokens</summary>
              <div class="bible-original-alignment">${esvWords.slice(ESV_ALIGNMENT_VISIBLE_LIMIT).map(renderEsvInterlinearToken).join('')}</div>
            </details>
          ` : ''}
        </details>
      `
      : '';
    const noteHtml = notes.length
      ? `
        <details class="bible-original-details">
          <summary>ESV notes and cross references</summary>
          <div class="bible-original-notes">${notes.slice(0, ORIGINAL_NOTES_VISIBLE_LIMIT).map(renderEsvNote).join('')}</div>
          ${notes.length > ORIGINAL_NOTES_VISIBLE_LIMIT ? `<div class="bible-crossref-source">${notes.length - ORIGINAL_NOTES_VISIBLE_LIMIT} more imported notes are available in the local data.</div>` : ''}
        </details>
      `
      : '';
    const keyVerbHtml = renderKeyVerbs(esvPassageWords, target);
    el.originalCount.textContent = `${words.length} words`;
    el.original.innerHTML = `
      ${keyVerbHtml}
      <div class="bible-original-grid">${wordHtml}</div>
      ${extraWordHtml}
      ${esvHtml}
      ${noteHtml}
      <div class="bible-crossref-source">
        Interlinear data imported from tahmmee/interlinear_bibledata. Strong's definitions imported from openscriptures/strongs.
        ESV notes and alignment imported from jburson/bible-data.
      </div>
    `;
  } catch (_) {
    el.originalCount.textContent = '';
    el.original.innerHTML = '<div class="bible-empty">Original-language data unavailable.</div>';
  }
}

function renderCrossReferenceItem(item, index) {
  return `
    <article class="bible-crossref-item">
      <button type="button" data-crossref="${index}">
        <span class="bible-crossref-ref">${escapeHtml(item.ref)}</span>
        <span class="bible-crossref-text">${escapeHtml(truncatePlainText(item.text || '', CROSSREF_TEXT_PREVIEW_CHARS))}</span>
      </button>
    </article>
  `;
}

async function renderCommentaries() {
  if (!el.commentaries || !state.currentBook) return;
  const request = ++state.commentaryRequest;
  const target = currentStudyTarget();
  if (!target) return;
  el.commentaryCount.textContent = '';
  el.commentaries.innerHTML = '<div class="bible-loading">Loading library...</div>';

  try {
    const [catalog, sermonIndex] = await Promise.all([loadCommentaryCatalog(), loadSermonIndex()]);
    const libraries = catalog.libraries || [];
    const matches = findLocalSermonMatches(sermonIndex.items || [], target);
    const results = await loadAvailableCommentaryResults(libraries, target, matches);
    if (request !== state.commentaryRequest) return;
    el.commentaryCount.textContent = `${results.length} available`;
    el.commentaries.innerHTML = renderCommentaryLibrary(target, results, libraries, matches, sermonIndex);
  } catch (_) {
    if (request !== state.commentaryRequest) return;
    el.commentaryCount.textContent = '';
    el.commentaries.innerHTML = '<div class="bible-empty">Commentary library unavailable.</div>';
  }
}

async function loadAvailableCommentaryResults(libraries, target, matches) {
  const settled = await Promise.allSettled(libraries.map(async (library) => {
    const source = await loadCommentarySource(library);
    if (!source) return null;
    const chapters = source.books?.[target.slug] || source.books?.[target.book.name];
    if (Array.isArray(chapters) && !chapters.includes(target.chapter)) return null;
    const entries = await loadCommentaryEntries(source, target);
    const sections = entries.flatMap((entry) => extractCommentarySections(entry, target)).slice(0, 4);
    if (!sections.length) return null;
    return {
      library,
      source,
      entries,
      sections,
      matches: matches.filter((match) => commentaryTitleMatches(library, match.title)).slice(0, 3),
    };
  }));
  return settled
    .filter((result) => result.status === 'fulfilled' && result.value)
    .map((result) => result.value);
}

function renderCommentaryLibrary(target, results, libraries, matches, sermonIndex) {
  return `
    <div class="bible-commentary-intro">
      <div>
        <span class="bible-kicker">Current Passage</span>
        <strong>${escapeHtml(formatStudyTarget(target))}</strong>
      </div>
      <span>${escapeHtml(String(results.length))} available ${results.length === 1 ? 'library' : 'libraries'}</span>
    </div>
    <div class="bible-commentary-shell">
      ${results.length ? `
        <div class="bible-commentary-accordion-list" role="list">
          ${results.map((result, index) => renderCommentaryAccordion(result, index)).join('')}
        </div>
      ` : `
        <div class="bible-empty">No bundled local commentary is available for ${escapeHtml(formatStudyTarget(target))} yet.</div>
      `}
    </div>
    <details class="bible-commentary-details">
      <summary>Local import status</summary>
      <div class="bible-commentary-imports">
        <span>${escapeHtml(String(libraries.length))} commentary modules are registered in app.bible.</span>
        <span>${escapeHtml(String(results.length))} have bundled local text for this selected passage.</span>
        <span>${escapeHtml(String(sermonIndex.count || 0))} sermon/index records are archived locally.</span>
        <span>Commentary bodies load from local chapter chunks so offline use stays mobile-friendly.</span>
        ${matches.length ? `<span>${escapeHtml(String(matches.length))} local index ${matches.length === 1 ? 'match' : 'matches'} found for this chapter.</span>` : ''}
      </div>
    </details>
  `;
}

function renderCommentaryAccordion(result, index) {
  const { library, source, entries, sections } = result;
  const first = sections[0];
  const remaining = sections.length - 1;
  return `
    <details class="bible-commentary-accordion" role="listitem">
      <summary>
        <span class="bible-commentary-card-name">${escapeHtml(library.name)}</span>
        <span class="bible-commentary-card-status">${escapeHtml(first.label)}${remaining ? ` + ${remaining} more` : ''}</span>
      </summary>
      <div class="bible-commentary-viewer">
        <header class="bible-commentary-viewer-head">
          <span class="bible-kicker">Library</span>
          <h4>${escapeHtml(library.name)}</h4>
          <p>${escapeHtml(`${sections.length} applicable ${sections.length === 1 ? 'portion' : 'portions'} loaded from local chapter data.`)}</p>
        </header>
        <div class="bible-commentary-entries">
          ${sections.map((section) => `
            <section class="bible-commentary-entry">
              <span class="bible-crossref-ref">${escapeHtml(section.label)}</span>
              <div>${cleanCommentaryHtml(truncateCommentaryHtml(section.html))}</div>
            </section>
          `).join('')}
        </div>
        <details class="bible-commentary-full">
          <summary>View whole chapter commentary</summary>
          <div class="bible-commentary-full-body">
            ${entries.map((entry) => `
              <section class="bible-commentary-entry">
                <span class="bible-crossref-ref">${escapeHtml(entry.ref || `${first.book} ${first.chapter}`)}</span>
                <div>${cleanCommentaryHtml(entry.text || entry.body || '')}</div>
              </section>
            `).join('')}
          </div>
        </details>
        <div class="bible-commentary-module">
          <span>Local data</span>
          <code>${escapeHtml(library.scriptName || '')}</code>
          ${source?.chunkPath ? `<code>${escapeHtml(source.chunkPath.replace('{book}', first.book).replace('{chapter}', String(first.chapter)))}</code>` : ''}
        </div>
      </div>
    </details>
  `;
}

function extractCommentarySections(entry, target) {
  const blocks = commentaryHtmlBlocks(entry.text || entry.body || '');
  if (!blocks.length) return [];
  const parsed = [];
  let current = null;
  for (const block of blocks) {
    const range = detectCommentaryRange(block.text, target);
    if (range) {
      if (current?.html.length) parsed.push(current);
      current = {
        book: entry.book || target.slug,
        chapter: Number(entry.chapter || target.chapter),
        start: range.start,
        end: range.end,
        label: formatCommentaryRangeLabel(target, range.start, range.end),
        html: [block.html],
      };
    } else if (current) {
      current.html.push(block.html);
    }
  }
  if (current?.html.length) parsed.push(current);
  const matching = parsed.filter((section) => rangesOverlap(section.start, section.end, target.verse, target.verseEnd));
  const precise = matching.filter((section) => section.start === target.verse && section.end <= target.verseEnd);
  const sections = precise.length ? precise : matching;
  if (sections.length) {
    return sections.map((section) => ({
      ...section,
      html: section.html.join(''),
    }));
  }
  if (!parsed.length && Number(entry.chapter || target.chapter) === target.chapter) {
    return [{
      book: entry.book || target.slug,
      chapter: Number(entry.chapter || target.chapter),
      start: target.verse,
      end: target.verseEnd,
      label: formatStudyTarget(target),
      html: blocks.map((block) => block.html).join(''),
    }];
  }
  return [];
}

function commentaryHtmlBlocks(value) {
  const template = document.createElement('template');
  template.innerHTML = String(value || '');
  const blockNodes = [...template.content.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote')];
  const blocks = blockNodes.length ? blockNodes : [...template.content.childNodes].filter((node) => String(node.textContent || '').trim());
  return blocks.map((node) => ({
    html: node.outerHTML || escapeHtml(node.textContent || ''),
    text: normalizeWhitespace(node.textContent || ''),
  })).filter((block) => block.text);
}

function truncateCommentaryHtml(value, maxBlocks = 5, maxChars = 950) {
  const blocks = commentaryHtmlBlocks(value);
  if (!blocks.length) return value;
  let count = 0;
  const selected = [];
  let truncated = blocks.length > maxBlocks;
  for (const block of blocks) {
    if (selected.length >= maxBlocks || count >= maxChars) {
      truncated = true;
      break;
    }
    if (count + block.text.length > maxChars) {
      selected.push(`<p>${escapeHtml(block.text.slice(0, Math.max(0, maxChars - count)).trim())}...</p>`);
      truncated = true;
      break;
    }
    selected.push(block.html);
    count += block.text.length;
  }
  return `${selected.join('')}${truncated ? '<p class="bible-commentary-truncated">Open the whole chapter commentary below for the complete local text.</p>' : ''}`;
}

function detectCommentaryRange(text, target) {
  const value = normalizeWhitespace(text);
  const bookPattern = escapeRegExp(target.book.name).replace(/\\ /g, '\\s+');
  const slugPattern = escapeRegExp(target.slug.replace(/-/g, ' ')).replace(/\\ /g, '\\s+');
  const patterns = [
    /^Verses?\s+(\d{1,3})(?:\s*[-–—]\s*(\d{1,3}))?/i,
    /^Verse\s+(\d{1,3})/i,
    new RegExp(`\\b(?:${bookPattern}|${slugPattern})\\s+${target.chapter}\\s*:\\s*(\\d{1,3})(?:\\s*[-–—]\\s*(\\d{1,3}))?`, 'i'),
    new RegExp(`^${target.chapter}\\s*:\\s*(\\d{1,3})(?:\\s*[-–—]\\s*(\\d{1,3}))?`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (!match) continue;
    const start = Number(match[1]);
    const end = Number(match[2] || match[1]);
    if (Number.isFinite(start) && start > 0) {
      return { start, end: Math.max(start, end || start) };
    }
  }
  return null;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA <= endB && startB <= endA;
}

function formatCommentaryRangeLabel(target, start, end) {
  const base = `${target.book.name} ${target.chapter}:${start}`;
  return start === end ? base : `${base}-${end}`;
}

function formatStudyTarget(target) {
  return formatReference({
    book: target.book,
    chapter: target.chapter,
    verseStart: target.verse,
    verseEnd: target.verseEnd > target.verse ? target.verseEnd : null,
  });
}

function findCommentaryEntries(source, target, sourceEntries = null) {
  if (!source) return [];
  const keys = [
    `${target.chapter}:${target.verse}`,
    `${target.chapter}`,
    `${target.book.name} ${target.chapter}:${target.verse}`,
    `${target.book.name} ${target.chapter}`,
    `${target.slug} ${target.chapter}:${target.verse}`,
    `${target.slug} ${target.chapter}`,
  ].map((key) => normalizeBookName(key));
  const entries = Array.isArray(sourceEntries) ? sourceEntries : (Array.isArray(source.entries) ? source.entries : []);
  const fromEntries = entries.filter((entry) => {
    const ref = normalizeBookName(entry.ref || entry.reference || '');
    return ref && keys.some((key) => ref === key || ref.startsWith(`${key} `));
  });
  const chapterBucket = source.books?.[target.slug]?.[String(target.chapter)] || source.books?.[target.book.name]?.[String(target.chapter)];
  const verseBucket = chapterBucket?.[String(target.verse)] || chapterBucket;
  const fromBooks = Array.isArray(verseBucket) ? verseBucket : (verseBucket ? [verseBucket] : []);
  return [...fromEntries, ...fromBooks].slice(0, 8);
}

function commentaryHasMatchingTitle(item, matches) {
  return matches.some((match) => commentaryTitleMatches(item, match.title));
}

function commentaryTitleMatches(item, title) {
  const sourceName = normalizeBookName(item?.name || '');
  const keyword = normalizeBookName(item?.keyword || '');
  const text = normalizeBookName(title || '');
  if (!text) return false;
  return (keyword && text.includes(keyword)) || sourceName.split(' ').some((word) => word.length > 4 && text.includes(word));
}

function cleanCommentaryHtml(value) {
  const html = cleanTskHtml(String(value || ''));
  return html || '<span class="bible-muted">No commentary text.</span>';
}

function truncatePlainText(value, maxChars) {
  const text = normalizeWhitespace(String(value || ''));
  if (!maxChars || text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars + 1);
  const trimmed = slice.slice(0, Math.max(slice.lastIndexOf(' '), maxChars)).trim();
  return `${trimmed || text.slice(0, maxChars).trim()}...`;
}

async function loadCrossReferencesFor(target) {
  const index = await loadCrossrefIndex(target.slug);
  const pointer = index[`${target.chapter}:${target.verse}`];
  if (!pointer) return { total: 0, items: [] };
  const bucket = await loadCrossrefBucket(pointer.bucket);
  const row = bucket[String(pointer.id)];
  const refs = Object.values(row?.r || {}).map(parseCrossrefValue).filter(Boolean);
  const items = await Promise.all(refs.slice(0, 30).map(async (ref) => ({
    ...ref,
    text: await getVerseText(ref),
  })));
  return { total: refs.length, items };
}

async function loadTskFor(target) {
  const book = await loadTskBook(target.slug);
  return {
    chapter: book.chapters?.[String(target.chapter)] || '',
    verse: book.verses?.[`${target.chapter}:${target.verse}`] || '',
  };
}

function renderTskSection(tsk) {
  if (!tsk?.chapter && !tsk?.verse) return '';
  const verseHtml = tsk.verse ? cleanTskHtml(tsk.verse) : '';
  const showFullVerse = normalizeWhitespace(textFromHtml(tsk.verse)).length > TSK_VERSE_PREVIEW_CHARS;
  return `
    <article class="bible-tsk-note">
      <div class="bible-crossref-ref">Treasury of Scripture Knowledge</div>
      ${verseHtml ? `<div class="bible-tsk-body ${showFullVerse ? 'bible-tsk-body-preview' : ''}">${verseHtml}</div>` : ''}
      ${showFullVerse ? `<details class="bible-tsk-details"><summary>Full verse note</summary><div class="bible-tsk-body">${verseHtml}</div></details>` : ''}
      ${tsk.chapter ? `<details class="bible-tsk-details"><summary>Chapter overview</summary><div class="bible-tsk-body">${cleanTskHtml(tsk.chapter)}</div></details>` : ''}
    </article>
  `;
}

function bindCrossReferenceActions(items) {
  el.crossrefs.querySelectorAll('[data-crossref]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = items[Number(button.dataset.crossref)];
      if (item?.ref) goToReference(item.ref);
    });
  });
  el.crossrefs.querySelectorAll('[data-tsk-ref]').forEach((button) => {
    button.addEventListener('click', () => goToReference(button.dataset.tskRef));
  });
}

function renderOriginalWord(word, dictionary) {
  const number = normalizeStrongNumber(word.number);
  const entry = dictionary[number] || dictionary[number?.toLowerCase?.()] || null;
  const lemma = entry?.lemma || entry?.word || '';
  const translit = entry?.translit || entry?.xlit || entry?.pron || '';
  const definition = entry?.strongs_def || entry?.data?.def?.short || entry?.kjv_def || '';
  return `
    <article class="bible-original-word">
      <div class="bible-original-word-top">
        <span class="bible-original-script">${escapeHtml(word.word || '')}</span>
        ${number ? `<span class="bible-strong-number">${escapeHtml(number)}</span>` : ''}
      </div>
      <div class="bible-original-gloss">${escapeHtml(word.text || lemma || '')}</div>
      ${translit ? `<div class="bible-original-meta">${escapeHtml(translit)}</div>` : ''}
      ${definition ? `<div class="bible-original-definition">${escapeHtml(definition)}</div>` : ''}
    </article>
  `;
}

function renderEsvInterlinearToken(token) {
  const parts = String(token || '').split('|');
  const strong = normalizeStrongNumber(parts[3] || '');
  const english = parts[5] || '';
  const original = parts[6] || '';
  const translit = parts[7] || '';
  const gloss = parts[10] || '';
  return `
    <span class="bible-original-token">
      <strong>${escapeHtml(original || english)}</strong>
      <span>${escapeHtml(english || gloss)}</span>
      ${strong ? `<em>${escapeHtml(strong)}</em>` : ''}
      ${translit ? `<small>${escapeHtml(translit)}</small>` : ''}
    </span>
  `;
}

function collectEsvInterlinearRange(esvInterlinear, target) {
  const start = Math.max(1, Number(target.verse) || 1);
  const end = Math.max(start, Number(target.verseEnd) || start);
  const items = [];
  for (let verse = start; verse <= end; verse += 1) {
    const tokens = esvInterlinear[`${target.chapter}:${verse}`] || [];
    tokens.forEach((token) => items.push({ token, verse }));
  }
  return items;
}

function renderKeyVerbs(items, target) {
  const verbs = findKeyVerbs(items);
  if (!verbs.length) return '';
  const visible = verbs.slice(0, KEY_VERB_VISIBLE_LIMIT);
  const hidden = verbs.slice(KEY_VERB_VISIBLE_LIMIT);
  return `
    <section class="bible-key-verbs" aria-label="Key verbs in ${escapeAttr(formatStudyTarget(target))}">
      <div class="bible-key-verbs-head">
        <span class="bible-crossref-ref">Key Verbs</span>
        <span>${verbs.length} found</span>
      </div>
      <div class="bible-key-verb-list">
        ${visible.map(renderKeyVerb).join('')}
      </div>
      ${hidden.length ? `
        <details class="bible-study-more">
          <summary>${hidden.length} more verbs</summary>
          <div class="bible-key-verb-list bible-key-verb-list-extra">${hidden.map(renderKeyVerb).join('')}</div>
        </details>
      ` : ''}
    </section>
  `;
}

function findKeyVerbs(items) {
  const seen = new Set();
  return items.map(({ token, verse }) => parseEsvInterlinearToken(token, verse))
    .filter((item) => item && isVerbMorph(item.morph))
    .map((item) => ({
      ...item,
      parsing: parseVerbMorphology(item.morph),
    }))
    .filter((item) => {
      const key = `${item.verse}:${item.strong || item.lemma || item.original}:${item.morph}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function parseEsvInterlinearToken(token, verse) {
  const parts = String(token || '').split('|');
  const morph = parts[4] || '';
  return {
    verse,
    strong: normalizeStrongNumber(parts[3] || ''),
    morph,
    english: parts[5] || '',
    original: parts[6] || '',
    translit: parts[7] || '',
    lemma: parts[8] || '',
    lemmaTranslit: parts[9] || '',
    gloss: parts[10] || '',
  };
}

function isVerbMorph(morph) {
  const value = String(morph || '').trim();
  return /^V[-\s]/i.test(value) || /^@v/i.test(value);
}

function renderKeyVerb(item) {
  return `
    <article class="bible-key-verb">
      <div class="bible-key-verb-main">
        <strong>${escapeHtml(item.english || item.gloss || item.original || 'verb')}</strong>
        <span>${escapeHtml(item.original || item.lemma || '')}</span>
      </div>
      <div class="bible-key-verb-meta">
        ${item.verse ? `<span>v.${escapeHtml(item.verse)}</span>` : ''}
        ${item.strong ? `<span>${escapeHtml(item.strong)}</span>` : ''}
        ${item.lemmaTranslit || item.translit ? `<span>${escapeHtml(item.lemmaTranslit || item.translit)}</span>` : ''}
      </div>
      <div class="bible-key-verb-parse">${escapeHtml(item.parsing || 'Verb')}</div>
    </article>
  `;
}

function parseVerbMorphology(morph) {
  const value = String(morph || '').trim();
  if (/^V[-\s]/i.test(value)) return parseGreekVerbMorphology(value);
  if (/^@v/i.test(value)) return parseHebrewVerbMorphology(value);
  return 'Verb';
}

function parseGreekVerbMorphology(morph) {
  const code = String(morph || '').replace(/\s+/g, '');
  const compact = code.replace(/^V-?/i, '');
  const personMap = { 1: '1st person', 2: '2nd person', 3: '3rd person' };
  const tenseMap = {
    P: 'present',
    I: 'imperfect',
    F: 'future',
    A: 'aorist',
    X: 'perfect',
    Y: 'pluperfect',
    R: 'future perfect',
  };
  const voiceMap = {
    A: 'active',
    M: 'middle',
    P: 'passive',
    E: 'middle/passive',
    D: 'middle deponent',
    O: 'passive deponent',
    N: 'middle/passive deponent',
    Q: 'impersonal active',
  };
  const moodMap = {
    I: 'indicative',
    M: 'imperative',
    S: 'subjunctive',
    O: 'optative',
    N: 'infinitive',
    P: 'participle',
  };
  const numberMap = { S: 'singular', P: 'plural' };
  const genderMap = { M: 'masculine', F: 'feminine', N: 'neuter' };
  const caseMap = {
    N: 'nominative',
    G: 'genitive',
    D: 'dative',
    A: 'accusative',
    V: 'vocative',
  };

  const hasPerson = Boolean(personMap[compact[0]]);
  const cursor = hasPerson ? 1 : 0;
  const person = hasPerson ? personMap[compact[0]] : '';
  const tense = tenseMap[compact[cursor]] || '';
  const voice = voiceMap[compact[cursor + 1]] || '';
  const mood = moodMap[compact[cursor + 2]] || '';
  const tail = compact.split('-')[1] || '';
  const grammaticalCase = mood === 'participle' ? (caseMap[tail[0]] || '') : '';
  const number = mood === 'participle' ? (numberMap[tail[1]] || '') : (numberMap[tail[0]] || '');
  const gender = mood === 'participle' ? (genderMap[tail[2]] || '') : (genderMap[tail[1]] || '');
  return [person, tense, voice, mood, grammaticalCase, number, gender].filter(Boolean).join(', ') || 'Verb';
}

function parseHebrewVerbMorphology(morph) {
  const code = String(morph || '').trim().replace(/^@/, '');
  const stemMap = {
    q: 'Qal',
    n: 'Niphal',
    p: 'Piel',
    P: 'Pual',
    h: 'Hiphil',
    H: 'Hophal',
    t: 'Hithpael',
    o: 'Polel',
    O: 'Polal',
    r: 'Hithpolel',
  };
  const formMap = {
    p: 'perfect',
    q: 'sequential perfect',
    i: 'imperfect',
    w: 'wayyiqtol',
    v: 'imperative',
    r: 'participle',
    s: 'infinitive construct',
    a: 'infinitive absolute',
  };
  const personMap = { 1: '1st person', 2: '2nd person', 3: '3rd person' };
  const genderMap = { m: 'masculine', f: 'feminine', c: 'common' };
  const numberMap = { s: 'singular', p: 'plural', d: 'dual' };
  const stem = stemMap[code[1]] || '';
  const form = formMap[code[2]] || '';
  const details = code.slice(3);
  const person = personMap[details.match(/[123]/)?.[0]] || '';
  const gender = genderMap[details.match(/[mfc]/)?.[0]] || '';
  const number = numberMap[details.match(/[spd]/)?.[0]] || '';
  return [stem, form, person, gender, number].filter(Boolean).join(', ') || 'Hebrew verb';
}

function renderEsvNote(note) {
  const text = note.t ? formatJbursonText(note.t) : '';
  const crossRefs = String(note.c || '').split(';').map((item) => item.split('*')[0].trim()).filter(Boolean);
  return `
    <article class="bible-original-note">
      <span class="bible-crossref-ref">${escapeHtml(note.a || 'note')}</span>
      ${text ? `<div>${text}</div>` : ''}
      ${crossRefs.length ? `<div class="bible-original-note-refs">${crossRefs.slice(0, 12).map((ref) => `<span>${escapeHtml(ref)}</span>`).join('')}</div>` : ''}
    </article>
  `;
}

function normalizeStrongNumber(value) {
  const match = String(value || '').trim().match(/^([gh])0*(\d+)$/i);
  if (!match) return String(value || '').trim().toUpperCase();
  return `${match[1].toUpperCase()}${Number(match[2])}`;
}

function formatJbursonText(value) {
  return escapeHtml(String(value || '').replace(/\*[a-z0-9]+/gi, ''));
}

function parseCrossrefValue(value) {
  const [code, chapter, verse] = String(value || '').trim().split(/\s+/);
  const slug = CROSSREF_CODES[code];
  const book = slug ? BOOK_ALIASES.get(slug) : null;
  if (!book || !chapter || !verse) return null;
  return {
    ref: `${book.name} ${Number(chapter)}:${Number(verse)}`,
    slug,
    chapter: Number(chapter),
    verse: Number(verse),
  };
}

async function getVerseText(ref) {
  try {
    const book = await loadBook(ref.slug);
    return book.chapters?.[ref.chapter - 1]?.[ref.verse - 1] || '';
  } catch (_) {
    return '';
  }
}

function cleanTskHtml(raw) {
  const template = document.createElement('template');
  template.innerHTML = String(raw || '');
  return Array.from(template.content.childNodes).map(renderTskNode).join('');
}

function textFromHtml(raw) {
  const template = document.createElement('template');
  template.innerHTML = String(raw || '');
  return template.content.textContent || '';
}

function renderTskNode(node) {
  if (node.nodeType === Node.TEXT_NODE) return escapeHtml(node.textContent);
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const tag = node.tagName.toLowerCase();
  const children = Array.from(node.childNodes).map(renderTskNode).join('');
  if (tag === 'br') return '<br>';
  if (tag === 'b' || tag === 'strong') return `<strong>${children}</strong>`;
  if (tag === 'i' || tag === 'em') return `<em>${children}</em>`;
  if (tag === 'u') {
    const parsed = parseTskReference(node.textContent);
    if (!parsed) return `<span class="bible-tsk-ref">${children}</span>`;
    return `<button class="bible-inline-ref" type="button" data-tsk-ref="${escapeAttr(parsed.ref)}">${escapeHtml(parsed.label)}</button>`;
  }
  return children;
}

function parseTskReference(value) {
  const match = String(value || '').trim().match(/^([1-3]?[A-Za-z]{2,3})_(\d+):(\d+)(?:-(\d+))?$/);
  if (!match) return null;
  const [, code, chapter, startVerse, endVerse] = match;
  const slug = TSK_CODES[code];
  const book = slug ? BOOK_ALIASES.get(slug) : null;
  if (!book) return null;
  const versePart = endVerse ? `${Number(startVerse)}-${Number(endVerse)}` : Number(startVerse);
  const ref = `${book.name} ${Number(chapter)}:${versePart}`;
  return { ref, label: value.replace('_', ' ') };
}

function findLocalSermonMatches(items, target) {
  const book = normalizeBookName(target.book.name);
  const slugWords = normalizeBookName(target.slug.replace(/-/g, ' '));
  const chapter = String(target.chapter);
  const patterns = [
    `${book} ${chapter}`,
    `${slugWords} ${chapter}`,
    `${book}${chapter}`,
    `${slugWords}${chapter}`,
  ];
  return items.filter((item) => {
    const title = normalizeBookName(item.title || '');
    return patterns.some((pattern) => title.includes(pattern));
  });
}

function parseReference(input) {
  const cleaned = String(input || '').trim().replace(/\s+/g, ' ');
  if (!cleaned) return null;
  const sorted = [...BOOKS].sort((a, b) => b.name.length - a.name.length);
  let matched = null;
  let rest = '';
  for (const book of sorted) {
    const aliases = [book.name, book.slug.replace(/-/g, ' ')];
    if (book.slug === 'psalms') aliases.push('Psalm', 'Ps');
    if (book.slug === 'song-of-solomon') aliases.push('Song of Songs', 'Songs');
    for (const alias of aliases) {
      const re = new RegExp(`^${escapeRegExp(alias)}\\b\\.?\\s*`, 'i');
      const hit = cleaned.match(re);
      if (hit) {
        matched = book;
        rest = cleaned.slice(hit[0].length).trim();
        break;
      }
    }
    if (matched) break;
  }
  if (!matched) {
    matched = BOOK_ALIASES.get(normalizeBookName(cleaned));
    if (!matched) return null;
  }

  if (!rest) return { book: matched, chapter: 1 };
  const range = rest.match(/^(\d+)(?::(\d+))?(?:\s*-\s*(?:(\d+):)?(\d+))?/);
  if (!range) return { book: matched, chapter: 1 };
  const chapter = Number(range[1]);
  const verseStart = range[2] ? Number(range[2]) : null;
  const endChapter = range[3] ? Number(range[3]) : chapter;
  const verseEnd = range[4] ? Number(range[4]) : verseStart;
  return { book: matched, chapter, verseStart, endChapter, verseEnd };
}

function normalizeHighlight(ref, currentChapter) {
  if (!ref?.verseStart) return null;
  if (ref.chapter !== currentChapter) return null;
  if (ref.endChapter && ref.endChapter !== ref.chapter) {
    return { start: ref.verseStart, end: Number.MAX_SAFE_INTEGER };
  }
  return { start: ref.verseStart, end: ref.verseEnd || ref.verseStart };
}

function formatReference(ref, { fallbackChapter = 1 } = {}) {
  const chapter = ref.chapter || fallbackChapter;
  if (!ref.verseStart) return `${ref.book.name} ${chapter}`;
  if (ref.verseEnd && ref.verseEnd !== ref.verseStart) {
    if (ref.endChapter && ref.endChapter !== chapter) return `${ref.book.name} ${chapter}:${ref.verseStart}-${ref.endChapter}:${ref.verseEnd}`;
    return `${ref.book.name} ${chapter}:${ref.verseStart}-${ref.verseEnd}`;
  }
  return `${ref.book.name} ${chapter}:${ref.verseStart}`;
}

function currentReference() {
  if (!state.currentBook) return '';
  if (selectedVerseNumbers().length) return formatSelectedReference();
  if (state.highlight?.verseStart) return formatReference(state.highlight);
  return `${state.currentBook.name} ${state.currentChapter}`;
}

function getCurrentPassageText() {
  if (!state.currentBook) return '';
  const chapter = state.currentChapter;
  const verses = state.currentBook.chapters[chapter - 1] || [];
  const selected = selectedVerseNumbers();
  const body = selected.length
    ? selected.map((verse) => `${verse}. ${verses[verse - 1] || ''}`).join('\n')
    : verses.map((text, index) => `${index + 1}. ${text}`).join('\n');
  return `${currentReference()} (ESV)\n${body}\n\nCredit: ESV Bible text via ESV.org`;
}

async function copyCurrentPassage() {
  const text = getCurrentPassageText();
  try {
    await navigator.clipboard.writeText(text);
    toast('Passage copied.');
  } catch (_) {
    fallbackCopy(text);
    toast('Passage copied.');
  }
}

async function shareCurrentPassage() {
  const ref = currentReference();
  const text = getCurrentPassageText();
  updateLocation();
  try {
    if (navigator.share) {
      await navigator.share({ title: `${ref} (ESV)`, text, url: location.href });
      return;
    }
    await navigator.clipboard.writeText(`${text}\n${location.href}`);
    toast('Passage copied for sharing.');
  } catch (_) {
    try {
      fallbackCopy(`${text}\n${location.href}`);
      toast('Passage copied for sharing.');
    } catch (_) {}
  }
}

function saveBookmark() {
  if (!state.currentBook) return;
  const bookmarks = readStore(STORAGE_KEYS.bookmarks);
  const ref = currentReference();
  const selectedVerses = selectedVerseNumbers();
  if (!bookmarks.some((item) => item.ref === ref)) {
    bookmarks.unshift({
      ref,
      book: state.currentBook.slug,
      chapter: state.currentChapter,
      highlight: state.highlight,
      selectedVerses,
      text: getCurrentPassagePreview(),
      savedAt: new Date().toISOString(),
    });
    writeStore(STORAGE_KEYS.bookmarks, bookmarks.slice(0, 60));
  }
  renderBookmarks();
  toast('Bookmark saved.');
}

function renderBookmarks() {
  const bookmarks = readStore(STORAGE_KEYS.bookmarks);
  if (!bookmarks.length) {
    el.bookmarkList.innerHTML = '<div class="bible-empty">No bookmarks saved yet.</div>';
    return;
  }
  el.bookmarkList.innerHTML = bookmarks.map((item, index) => `
    <div class="bible-saved-item">
      <button type="button" data-bookmark="${index}">
        <span class="bible-saved-ref">${escapeHtml(item.ref)}</span>
        <span class="bible-saved-text">${escapeHtml(item.text || '')}</span>
      </button>
    </div>
  `).join('');
  el.bookmarkList.querySelectorAll('[data-bookmark]').forEach((button) => {
    button.addEventListener('click', async () => {
      const item = bookmarks[Number(button.dataset.bookmark)];
      if (!item) return;
      await goToBook(item.book, item.chapter, item.highlight, { selectedVerses: item.selectedVerses });
      el.referenceInput.value = currentReference();
    });
  });
}

function clearBookmarks() {
  if (!confirm('Clear saved Bible bookmarks?')) return;
  writeStore(STORAGE_KEYS.bookmarks, []);
  renderBookmarks();
}

function getCurrentPassagePreview() {
  const text = getCurrentPassageText().split('\n').slice(1).join(' ');
  return text.length > 170 ? `${text.slice(0, 170)}...` : text;
}

async function openBookOverviewDrawer() {
  if (!state.currentBook) return;
  el.drawerKicker.textContent = 'Book Overview';
  el.drawerTitle.textContent = state.currentBook.name;
  el.drawerBody.innerHTML = '<div class="bible-loading">Loading book overview...</div>';
  openDrawer();

  try {
    const overview = await getBookOverview(state.currentBook);
    if (!overview) {
      el.drawerBody.innerHTML = '<div class="bible-empty">No overview is available for this book yet.</div>';
      return;
    }
    el.drawerBody.innerHTML = renderBookOverview(overview);
  } catch (_) {
    el.drawerBody.innerHTML = '<div class="bible-empty">Book overview unavailable.</div>';
  }
}

async function getBookOverview(book) {
  if (!state.bookOverviewIndex) {
    const mod = await import('../Data/books-of-the-bible.js');
    state.bookOverviewIndex = new Map((mod.default || []).map((item) => [
      normalizeBookName(item.bookName),
      item,
    ]));
  }
  return state.bookOverviewIndex.get(normalizeBookName(book.name))
    || state.bookOverviewIndex.get(normalizeBookName(book.slug.replace(/-/g, ' ')))
    || null;
}

function renderBookOverview(overview) {
  const meta = [
    overview.testament ? `${overview.testament} Testament` : '',
    overview.genre || '',
    overview.author ? `Author: ${overview.author}` : '',
  ].filter(Boolean);
  return `
    <article class="bible-book-overview">
      <div class="bible-overview-meta">
        ${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
      </div>
      ${renderOverviewSection('Summary', overview.summary)}
      ${renderOverviewSection('Key Verse', overview.keyVerse, 'bible-overview-verse')}
      ${renderOverviewSection('Themes', overview.themes)}
      ${renderOverviewSection('Christ in This Book', overview.christInBook)}
      ${renderOverviewSection('Time Period', overview.timePeriod)}
      ${renderOverviewSection('Application', overview.application)}
    </article>
  `;
}

function renderOverviewSection(label, value, className = '') {
  if (!value) return '';
  return `
    <section class="bible-overview-section ${className}">
      <h3>${escapeHtml(label)}</h3>
      <p>${escapeHtml(value)}</p>
    </section>
  `;
}

function openNoteDrawer(type) {
  const isPrayer = type === 'prayer';
  const key = isPrayer ? STORAGE_KEYS.prayers : STORAGE_KEYS.notes;
  const ref = currentReference();
  el.drawerKicker.textContent = isPrayer ? 'Prayer' : 'Journal';
  el.drawerTitle.textContent = isPrayer ? 'Pray This Passage' : 'Save Note';
  const saved = readStore(key).filter((item) => item.ref === ref).slice(0, 6);
  el.drawerBody.innerHTML = `
    <form class="bible-drawer-form" id="bible-drawer-form">
      <label class="bible-field">
        <span>Reference</span>
        <input name="ref" value="${escapeAttr(ref)}">
      </label>
      <label class="bible-field">
        <span>${isPrayer ? 'Prayer' : 'Note'}</span>
        <textarea name="body" placeholder="${isPrayer ? 'Write a prayer from this passage.' : 'Write your observation, question, or application.'}"></textarea>
      </label>
      <div class="bible-drawer-actions">
        <button class="bible-btn bible-btn-primary" type="submit">${isPrayer ? 'Save Prayer' : 'Save Note'}</button>
        <button class="bible-btn" type="button" id="bible-copy-drawer">Copy Passage</button>
        <a class="bible-btn" href="app.flockshamar/" target="_blank" rel="noopener">Open Notes</a>
        <a class="bible-btn" href="app.flockos/app.flockos.html?covenant=new&view=the_prayer_chain" target="_blank" rel="noopener">Open Prayer</a>
      </div>
      <p class="bible-license">Saved locally in this browser for now. ESV Bible text credited to <a href="https://www.esv.org/" target="_blank" rel="noopener">ESV.org</a>.</p>
    </form>
    <div class="bible-reading-plan">
      ${saved.map((item) => `
        <article class="bible-saved-note">
          <time>${escapeHtml(new Date(item.savedAt).toLocaleString())}</time>
          <div>${escapeHtml(item.body)}</div>
        </article>
      `).join('')}
    </div>
  `;
  el.drawerBody.querySelector('#bible-copy-drawer')?.addEventListener('click', copyCurrentPassage);
  el.drawerBody.querySelector('#bible-drawer-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = String(form.get('body') || '').trim();
    const savedRef = String(form.get('ref') || ref).trim();
    if (!body) {
      toast(isPrayer ? 'Write a prayer first.' : 'Write a note first.');
      return;
    }
    const items = readStore(key);
    items.unshift({
      ref: savedRef,
      body,
      passage: getCurrentPassageText(),
      savedAt: new Date().toISOString(),
    });
    writeStore(key, items.slice(0, 100));
    toast(isPrayer ? 'Prayer saved.' : 'Note saved.');
    openNoteDrawer(type);
  });
  openDrawer();
}

function openDrawer() {
  el.drawerBackdrop.hidden = false;
  el.drawer.classList.add('is-open');
  el.drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  el.drawer.classList.remove('is-open');
  el.drawer.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    if (!el.drawer.classList.contains('is-open')) el.drawerBackdrop.hidden = true;
  }, 180);
}

async function searchBible(event) {
  event.preventDefault();
  const q = String(el.searchInput.value || '').trim().toLowerCase();
  if (q.length < 2) {
    toast('Search for at least two characters.');
    return;
  }
  el.searchResults.innerHTML = '<div class="bible-loading">Loading ESV books...</div>';
  el.searchCount.textContent = '';
  await loadAllBooks();
  const results = [];
  for (const book of BOOKS) {
    const data = await loadBook(book.slug);
    data.chapters.forEach((verses, chapterIndex) => {
      verses.forEach((verseText, verseIndex) => {
        if (verseText.toLowerCase().includes(q)) {
          results.push({
            ref: `${data.name} ${chapterIndex + 1}:${verseIndex + 1}`,
            slug: data.slug,
            chapter: chapterIndex + 1,
            verse: verseIndex + 1,
            text: verseText,
          });
        }
      });
    });
  }
  renderSearchResults(results, q);
}

function renderSearchResults(results, q) {
  el.searchCount.textContent = `${results.length} found`;
  const limited = results.slice(0, 60);
  if (!limited.length) {
    el.searchResults.innerHTML = '<div class="bible-empty">No verses found.</div>';
    return;
  }
  el.searchResults.innerHTML = limited.map((item, index) => `
    <div class="bible-search-result">
      <button type="button" data-result="${index}">
        <span class="bible-result-ref">${escapeHtml(item.ref)}</span>
        <span class="bible-result-text">${highlightText(item.text, q)}</span>
      </button>
    </div>
  `).join('');
  el.searchResults.querySelectorAll('[data-result]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = limited[Number(button.dataset.result)];
      goToBook(item.slug, item.chapter, {
        book: BOOK_ALIASES.get(item.slug),
        chapter: item.chapter,
        verseStart: item.verse,
        verseEnd: item.verse,
      });
    });
  });
}

async function renderTodayPlan() {
  try {
    const mod = await import('../Data/one_year_bible.js');
    const today = new Date();
    const label = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const row = mod.default.find((entry) => entry.date === label) || mod.default[0];
    if (el.readingPlanDate) {
      el.readingPlanDate.textContent = `${row.date} - Day ${row.day}`;
    }
    const items = [
      ['Old Testament', row.ot],
      ['New Testament', row.nt],
      ['Psalms', row.ps],
      ['Proverbs', row.pr],
    ];
    el.readingPlan.innerHTML = items.map(([labelText, ref]) => `
      <div class="bible-reading-row">
        <button type="button" data-plan-ref="${escapeAttr(ref)}" aria-label="Open ${escapeAttr(labelText)} reading, ${escapeAttr(ref)}">
          <span class="bible-result-ref">${escapeHtml(labelText)}</span>
          <span class="bible-result-text">${escapeHtml(ref)}</span>
        </button>
      </div>
    `).join('');
    el.readingPlan.querySelectorAll('[data-plan-ref]').forEach((button) => {
      button.addEventListener('click', () => goToPlanReference(button.dataset.planRef));
    });
  } catch (error) {
    if (el.readingPlanDate) el.readingPlanDate.textContent = '';
    el.readingPlan.innerHTML = '<div class="bible-empty">Reading plan unavailable.</div>';
  }
}

async function goToPlanReference(ref) {
  const parsed = parseReference(ref);
  if (parsed) {
    await goToReference(ref);
    return;
  }
  const openingRef = getOpeningReference(ref);
  if (openingRef && openingRef !== ref) {
    await goToReference(openingRef);
    return;
  }
  await goToReference(ref);
}

function getOpeningReference(ref) {
  const text = String(ref || '').trim();
  if (!text) return '';
  const firstSegment = text.split(/\s+-\s+(?=[1-3]?\s*[A-Za-z])/)[0]?.trim();
  return firstSegment || text;
}

function toggleSidebar(force) {
  if (!isMobileShell()) {
    const show = typeof force === 'boolean'
      ? force
      : document.body.classList.contains('bible-nav-hidden');
    document.body.classList.toggle('bible-nav-hidden', !show);
    closeMobileSidebar();
    syncSidebarToggleState(show);
    return show;
  }

  const open = typeof force === 'boolean' ? force : !el.sidebar.classList.contains('is-open');
  el.sidebar.classList.toggle('is-open', open);
  if (el.sidebarBackdrop) {
    el.sidebarBackdrop.hidden = !(open && isMobileShell());
  }
  syncSidebarToggleState(open);
  return open;
}

function closeMobileSidebar() {
  el.sidebar.classList.remove('is-open');
  if (el.sidebarBackdrop) {
    el.sidebarBackdrop.hidden = true;
  }
  if (isMobileShell()) {
    syncSidebarToggleState(false);
  }
}

function syncSidebarToggleState(open) {
  document.querySelectorAll('.unity-hamburger').forEach((button) => {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? 'Hide Bible navigation' : 'Show Bible navigation');
    button.title = open ? 'Hide Bible navigation' : 'Show Bible navigation';
  });
}

function isMobileShell() {
  return window.matchMedia('(max-width: 860px)').matches;
}

function updateLocation() {
  if (!state.currentBook) return;
  const params = new URLSearchParams();
  const selected = selectedVerseNumbers();
  if (selected.length) {
    params.set('ref', `${state.currentBook.name} ${state.currentChapter}`);
    params.set('verses', selected.join(','));
  } else {
    params.set('ref', currentReference());
  }
  history.replaceState(null, '', `${location.pathname}?${params.toString()}`);
}

function readStore(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

function normalizeBookName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function normalizeWhitespace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function toCamel(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value || min));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  return safe.replace(new RegExp(`(${escapeRegExp(escapeHtml(query))})`, 'ig'), '<mark>$1</mark>');
}

function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

function toast(message) {
  const node = document.createElement('div');
  node.className = 'bible-toast';
  node.textContent = message;
  el.toasts.appendChild(node);
  setTimeout(() => node.remove(), 2600);
}
