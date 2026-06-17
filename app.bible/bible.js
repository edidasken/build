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

const state = {
  books: new Map(),
  currentBook: null,
  currentChapter: 1,
  highlight: null,
  testament: 'all',
  searchLoaded: false,
  crossrefIndexes: new Map(),
  crossrefBuckets: new Map(),
  tskBooks: new Map(),
  commentaryCatalog: null,
  sermonIndex: null,
  originalBooks: new Map(),
  strongDictionaries: new Map(),
  esvFootnotes: new Map(),
  esvInterlinear: new Map(),
  studyRequest: 0,
};

const el = {};

document.addEventListener('DOMContentLoaded', init);

async function init() {
  bindElements();
  mountHeader();
  bindEvents();
  renderBookList();
  renderBookmarks();
  await renderTodayPlan();

  const initialRef = new URLSearchParams(location.search).get('ref') || decodeURIComponent(location.hash.replace(/^#/, '')) || 'John 1';
  await goToReference(initialRef, { replace: true });
}

function bindElements() {
  for (const id of [
    'bible-topbar', 'bible-sidebar', 'bible-close-sidebar', 'bible-open-sidebar',
    'bible-book-filter', 'bible-book-list', 'bible-reference-form', 'bible-reference-input',
    'bible-current-title', 'bible-version-label', 'bible-chapter-select', 'bible-chapter-strip',
    'bible-passage', 'bible-prev-chapter', 'bible-next-chapter', 'bible-copy-passage',
    'bible-bookmark', 'bible-note', 'bible-pray', 'bible-search-form', 'bible-search-input',
    'bible-search-results', 'bible-search-count', 'bible-bookmark-list', 'bible-clear-bookmarks',
    'bible-crossrefs', 'bible-crossref-count', 'bible-commentaries', 'bible-commentary-count',
    'bible-original', 'bible-original-count',
    'bible-reading-plan', 'bible-open-reading-plan', 'bible-drawer', 'bible-drawer-backdrop',
    'bible-sidebar-backdrop', 'bible-close-drawer', 'bible-drawer-kicker', 'bible-drawer-title', 'bible-drawer-body',
    'bible-toasts',
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

function bindEvents() {
  el.referenceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    goToReference(el.referenceInput.value.trim());
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
  el.copyPassage.addEventListener('click', copyCurrentPassage);
  el.bookmark.addEventListener('click', saveBookmark);
  el.note.addEventListener('click', () => openNoteDrawer('note'));
  el.pray.addEventListener('click', () => openNoteDrawer('prayer'));
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
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      el.referenceInput.select();
    }
  });
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
  renderReader();
  updateActiveBook();
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
  el.referenceInput.value = formatReference(parsed, { fallbackChapter: state.currentChapter });
}

async function setChapter(chapter) {
  if (!state.currentBook) return;
  await goToBook(state.currentBook.slug, chapter);
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
  const highlight = normalizeHighlight(state.highlight, chapter);
  el.passage.innerHTML = `
    <div class="bible-passage-inner">
      ${verses.map((text, index) => {
        const verse = index + 1;
        const active = highlight && verse >= highlight.start && verse <= highlight.end;
        return `<p class="bible-verse ${active ? 'is-highlighted' : ''}" id="v${verse}" data-verse="${verse}">
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
  });
  if (highlight) {
    requestAnimationFrame(() => document.getElementById(`v${highlight.start}`)?.scrollIntoView({ block: 'center' }));
  } else {
    el.passage.scrollTop = 0;
  }
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
  state.highlight = {
    book: BOOK_ALIASES.get(state.currentBook.slug) || state.currentBook,
    chapter: state.currentChapter,
    verseStart: verse,
    verseEnd: verse,
  };
  el.referenceInput.value = currentReference();
  el.passage.querySelectorAll('.bible-verse').forEach((node) => {
    node.classList.toggle('is-highlighted', Number(node.dataset.verse) === verse);
  });
  updateLocation();
  renderCrossReferences();
  renderOriginalLanguage();
  renderCommentaries();
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
  const response = await fetch(new URL('./commentaries/catalog.json', import.meta.url));
  if (!response.ok) throw new Error('Commentary catalog missing');
  state.commentaryCatalog = await response.json();
  return state.commentaryCatalog;
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
  const verse = clamp(highlight?.start || 1, 1, Math.max(verses.length, 1));
  return {
    book: BOOK_ALIASES.get(state.currentBook.slug) || state.currentBook,
    slug: state.currentBook.slug,
    chapter,
    verse,
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

    const referenceHtml = references.items.length
      ? references.items.map((item, index) => `
          <article class="bible-crossref-item">
            <button type="button" data-crossref="${index}">
              <span class="bible-crossref-ref">${escapeHtml(item.ref)}</span>
              <span class="bible-crossref-text">${escapeHtml(item.text || '')}</span>
            </button>
          </article>
        `).join('')
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
    const notes = footnotes[key] || [];
    const kinds = new Set(words.map((word) => String(word.number || '').slice(0, 1).toLowerCase()).filter(Boolean));
    const [greek, hebrew] = await Promise.all([
      kinds.has('g') ? loadStrongDictionary('greek') : Promise.resolve({}),
      kinds.has('h') ? loadStrongDictionary('hebrew') : Promise.resolve({}),
    ]);
    const dictionary = { ...greek, ...hebrew };
    const limitedWords = words.slice(0, 36);
    const wordHtml = limitedWords.length
      ? limitedWords.map((word) => renderOriginalWord(word, dictionary)).join('')
      : '<div class="bible-empty">No interlinear data found for this verse.</div>';
    const esvHtml = esvWords.length
      ? `<details class="bible-original-details"><summary>ESV interlinear alignment</summary><div class="bible-original-alignment">${esvWords.slice(0, 28).map(renderEsvInterlinearToken).join('')}</div></details>`
      : '';
    const noteHtml = notes.length
      ? `<details class="bible-original-details"><summary>ESV notes and cross references</summary><div class="bible-original-notes">${notes.slice(0, 10).map(renderEsvNote).join('')}</div></details>`
      : '';
    el.originalCount.textContent = `${words.length} words`;
    el.original.innerHTML = `
      <div class="bible-original-grid">${wordHtml}</div>
      ${limitedWords.length < words.length ? `<div class="bible-crossref-source">${words.length - limitedWords.length} additional words are available in the imported local data.</div>` : ''}
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

async function renderCommentaries() {
  if (!el.commentaries || !state.currentBook) return;
  const target = currentStudyTarget();
  if (!target) return;
  el.commentaryCount.textContent = '';
  el.commentaries.innerHTML = '<div class="bible-loading">Loading library...</div>';

  try {
    const [catalog, sermonIndex] = await Promise.all([loadCommentaryCatalog(), loadSermonIndex()]);
    const libraries = catalog.libraries || [];
    const matches = findLocalSermonMatches(sermonIndex.items || [], target);
    const local = catalog.local || {};
    el.commentaryCount.textContent = `${matches.length || sermonIndex.count || 0} local`;
    el.commentaries.innerHTML = `
      <div class="bible-commentary-actions">
        <a class="bible-commentary-primary" href="app.bible/${escapeAttr(local.sermonsHtml || 'commentaries/bible-commentaries-english/110000-sermons.html')}" target="_blank" rel="noopener">
          <span class="bible-crossref-ref">Imported Sermon Index</span>
          <span class="bible-crossref-text">${escapeHtml(String(sermonIndex.count || 0))} local entries from the provided BibleCommentaries repo</span>
        </a>
        <a class="bible-commentary-primary" href="app.bible/${escapeAttr(local.commentariesHtml || 'commentaries/bible-commentaries-english/30-English-Commentaries.html')}" target="_blank" rel="noopener">
          <span class="bible-crossref-ref">30 English Commentaries</span>
          <span class="bible-crossref-text">${escapeHtml(String(libraries.length))} imported collection names</span>
        </a>
      </div>
      ${matches.length ? `
        <div class="bible-commentary-local">
          ${matches.slice(0, 8).map((item) => `
            <article class="bible-commentary-hit">
              <span class="bible-crossref-ref">${escapeHtml(target.book.name)} ${target.chapter}</span>
              <span class="bible-crossref-text">${escapeHtml(item.title)}</span>
            </article>
          `).join('')}
        </div>
      ` : '<div class="bible-empty">No local sermon-index match for this chapter.</div>'}
      <details class="bible-commentary-details">
        <summary>Imported commentary collections</summary>
        <div class="bible-commentary-library">
          ${libraries.map((item) => `
            <span>${escapeHtml(item.name)}</span>
          `).join('')}
        </div>
      </details>
      <div class="bible-commentary-links">
        <a href="app.bible/${escapeAttr(local.readme || 'commentaries/bible-commentaries-english/README.md')}" target="_blank" rel="noopener">Local README</a>
        <a href="app.bible/${escapeAttr(local.parallelHtml || 'commentaries/bible-commentaries-english/parallel-kjv(asv)-commentaries.html')}" target="_blank" rel="noopener">Local Parallel Index</a>
      </div>
      <div class="bible-crossref-source">
        Imported from <a href="${escapeAttr(catalog.source?.repo || 'https://github.com/BibleCommentaries')}" target="_blank" rel="noopener">BibleCommentaries</a>.
        Local archive files are stored under app.bible/commentaries.
      </div>
    `;
  } catch (_) {
    el.commentaryCount.textContent = '';
    el.commentaries.innerHTML = '<div class="bible-empty">Commentary library unavailable.</div>';
  }
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
  return `
    <article class="bible-tsk-note">
      <div class="bible-crossref-ref">Treasury of Scripture Knowledge</div>
      ${tsk.verse ? `<div class="bible-tsk-body">${cleanTskHtml(tsk.verse)}</div>` : ''}
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
  if (state.highlight?.verseStart) return formatReference(state.highlight);
  return `${state.currentBook.name} ${state.currentChapter}`;
}

function getCurrentPassageText() {
  if (!state.currentBook) return '';
  const chapter = state.currentChapter;
  const verses = state.currentBook.chapters[chapter - 1] || [];
  const highlight = normalizeHighlight(state.highlight, chapter);
  const start = highlight?.start || 1;
  const end = Math.min(highlight?.end || verses.length, verses.length);
  const body = verses.slice(start - 1, end).map((text, index) => `${start + index}. ${text}`).join('\n');
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

function saveBookmark() {
  if (!state.currentBook) return;
  const bookmarks = readStore(STORAGE_KEYS.bookmarks);
  const ref = currentReference();
  if (!bookmarks.some((item) => item.ref === ref)) {
    bookmarks.unshift({
      ref,
      book: state.currentBook.slug,
      chapter: state.currentChapter,
      highlight: state.highlight,
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
    button.addEventListener('click', () => {
      const item = bookmarks[Number(button.dataset.bookmark)];
      if (item) goToBook(item.book, item.chapter, item.highlight);
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
    const items = [
      ['Old Testament', row.ot],
      ['New Testament', row.nt],
      ['Psalms', row.ps],
      ['Proverbs', row.pr],
    ];
    el.readingPlan.innerHTML = items.map(([labelText, ref]) => `
      <div class="bible-reading-row">
        <button type="button" data-plan-ref="${escapeAttr(ref)}">
          <span class="bible-result-ref">${escapeHtml(labelText)}</span>
          <span class="bible-result-text">${escapeHtml(ref)}</span>
        </button>
      </div>
    `).join('');
    el.readingPlan.querySelectorAll('[data-plan-ref]').forEach((button) => {
      button.addEventListener('click', () => goToReference(button.dataset.planRef));
    });
  } catch (error) {
    el.readingPlan.innerHTML = '<div class="bible-empty">Reading plan unavailable.</div>';
  }
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
  const ref = encodeURIComponent(currentReference());
  history.replaceState(null, '', `${location.pathname}?ref=${ref}`);
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
