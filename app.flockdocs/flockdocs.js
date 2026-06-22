/* ══════════════════════════════════════════════════════════════════════════════
   FLOCKDOCS.JS — FlockDocs Productivity Suite
   "Write the vision and make it plain on tablets." — Habakkuk 2:2

   This is the main entry point for the FlockDocs app — a productivity suite
   for churches including word processing, spreadsheets, and document management.

   Features:
     • Rich text document editor
     • Private user documents
     • Shared church documents
     • Folder organization
     • Real-time Firestore sync
     • Collaborative editing (future)
   ══════════════════════════════════════════════════════════════════════════════ */

import { mountUnityHeader } from '../Scripts/the_unity_header.js';
import { mountQuill }       from '../Scripts/the_quill.js';

/* ── Constants ───────────────────────────────────────────────────────────── */
const STORE_KEY_PREFS = 'fd_prefs';
const STORE_KEY_DOCS = 'fd_dev_documents';
const STORE_KEY_FOLDERS = 'fd_dev_folders';
const COLLECTION_DOCS = 'flockDocs';
const COLLECTION_FOLDERS = 'flockFolders';
const DOC_RENDER_PAGE_SIZE = 36;
const SYSTEM_DOC_LOAD_LIMIT = 40;
const SYSTEM_DOC_CACHE_TTL_MS = 2 * 60 * 1000;

/* ── State ────────────────────────────────────────────────────────────────── */
const S = {
  user: null,              // { uid, displayName, email, role }
  currentView: 'all-docs', // 'all-docs' | 'notes' | 'prayers' | 'journal' | 'calendar' | 'my-docs' | 'shared-docs' | 'recent' | 'trash'
  currentDoc: null,        // Currently open document
  documents: [],           // All documents (filtered based on view)
  visibleDocCount: DOC_RENDER_PAGE_SIZE,
  loadSeq: 0,
  systemDocCache: {
    prayer: { docs: null, loadedAt: 0, promise: null },
    journal: { docs: null, loadedAt: 0, promise: null },
    calendar: { docs: null, loadedAt: 0, promise: null },
  },
  folders: [],             // Folder list
  currentFolder: null,     // Current folder filter
  searchQuery: '',         // Search filter
  autoSaveTimer: null,     // Auto-save debounce timer
  prefs: {
    defaultFontSize: 16,
    defaultFont: 'Noto Serif',
  },
};

/* ── Initialization ───────────────────────────────────────────────────────── */
window.FlockDocs = {
  init,
  createNewDocument,
  createNewNote,
  createNewPrayerRequest,
  createNewJournalEntry,
  createNewCalendarEvent,
  createNewSpreadsheet,
  openDocument,
  saveDocument,
  deleteDocument,
  emptyTrash,
  switchView,
  loadMoreDocuments,
  importFromExcel,
  exportToExcel,
  createFolder,
  renameDocument,
  moveToFolder,
  shareDocument,
};

// Wait for Firebase + Nehemiah + restored auth state to be ready.
// Firebase Auth restores the persisted user asynchronously from IndexedDB, so
// we MUST wait for onAuthStateChanged to fire once before deciding whether the
// user is authenticated — otherwise legitimately logged-in users get redirected
// on a fresh tab where sessionStorage is empty.
function _waitForReady() {
  return new Promise((resolve, reject) => {
    const TIMEOUT_MS = 8000;
    const startedAt = Date.now();

    function decide() {
      if (Nehemiah.isAuthenticated()) {
        resolve();
        return;
      }
      console.warn('[FlockDocs] User not authenticated, redirecting to login');
      window.location.replace('app.flockdocs/index.html');
      reject(new Error('Not authenticated'));
    }

    function waitForAuthState() {
      // Firebase + Nehemiah loaded — wait for the first onAuthStateChanged
      // callback so we know whether a persisted session exists.
      try {
        const unsub = firebase.auth().onAuthStateChanged(() => {
          try { unsub(); } catch (_) {}
          decide();
        });
      } catch (err) {
        console.error('[FlockDocs] onAuthStateChanged failed:', err);
        decide();
      }
    }

    const tick = () => {
      if (typeof firebase !== 'undefined' && firebase.auth && typeof Nehemiah !== 'undefined') {
        waitForAuthState();
      } else if (Date.now() - startedAt >= TIMEOUT_MS) {
        console.error('[FlockDocs] Timeout waiting for firebase/Nehemiah, redirecting to login');
        window.location.replace('app.flockdocs/index.html');
        reject(new Error('Timeout'));
      } else {
        setTimeout(tick, 100);
      }
    };
    tick();
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    await _waitForReady();
    // Mint Firebase custom token so Firestore reads are authenticated
    if (typeof UpperRoom !== 'undefined') {
      await UpperRoom.init();
      await UpperRoom.authenticate();
    }
    // Auth passed — reveal the app shell (was hidden to block guest access)
    const appEl = document.getElementById('fd-app');
    if (appEl) appEl.style.display = 'grid';
    init();
  } catch (err) {
    console.error('[FlockDocs] Auth check failed:', err.message);
    window.location.replace('app.flockdocs/index.html');
  }
});

function init() {
  console.log('[FlockDocs] Initializing...');

  // Get authenticated user from Nehemiah
  let profile = (typeof Nehemiah !== 'undefined' && Nehemiah.getProfile) ? Nehemiah.getProfile() : null;

  // Fallback: if Nehemiah has no cached profile but Firebase Auth has a user
  // (e.g. fresh tab with no sessionStorage but persisted Firebase session),
  // synthesize a minimal profile from the Firebase user so we don't redirect.
  if (!profile && typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
    const fbUser = firebase.auth().currentUser;
    profile = {
      uid: fbUser.uid,
      email: fbUser.email || '',
      displayName: fbUser.displayName || fbUser.email || '',
      role: 'member',
    };
  }

  if (profile) {
    // profile.uid may be absent when Nehemiah returns a GAS-based profile
    // (sessionStorage flock_auth_profile has no uid field). Fall back to
    // the Firebase Auth currentUser uid so Firestore queries work.
    const fbUid = (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser)
      ? firebase.auth().currentUser.uid
      : undefined;
    S.user = {
      uid: profile.uid || fbUid,
      displayName: profile.displayName || profile.email,
      email: profile.email,
      role: profile.role || 'member',
    };
  } else {
    console.error('[FlockDocs] No authenticated user found');
    window.location.replace('app.flockdocs/index.html');
    return;
  }

  console.log('[FlockDocs] User:', S.user.displayName);

  _loadPrefs();
  _mountHeader();
  _bindEvents();
  _loadDocuments();
  _loadFolders();
  
  console.log('[FlockDocs] Ready');
}

/* ── Unity Header ─────────────────────────────────────────────────────────── */
function _mountHeader() {
  const appIconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13,2 13,9 20,9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>';
  
  mountUnityHeader(document.getElementById('fd-topbar'), {
    appId: 'flockdocs',
    appName: 'Docs',
    appIconSvg,
    appAccent: '#2563eb',
    appAccentDk: '#1d4ed8',
    homeHref: 'app.flockdocs/app.flockdocs.html',
    signInHref: 'app.flockdocs/index.html',
    user: S.user,
    onSignOut: async () => {
      try {
        await Nehemiah.logout();
        window.location.replace('app.flockdocs/index.html');
      } catch (err) {
        console.error('[FlockDocs] Sign out failed:', err);
      }
    },
    onHamburger: () => {
      document.getElementById('fd-sidebar-wrap')?.classList.toggle('is-open');
    },
    features: [
      { id: 'fd-all-docs',  label: 'All Documents',  hint: 'Browse all docs',        run: () => document.querySelector('[data-view="all-docs"]')?.click() },
      { id: 'fd-notes',     label: 'Notes',          hint: 'Quick notes in Docs',    run: () => document.querySelector('[data-view="notes"]')?.click() },
      { id: 'fd-prayers',   label: 'Prayer Requests', hint: 'Your prayer requests',  run: () => document.querySelector('[data-view="prayers"]')?.click() },
      { id: 'fd-journal',   label: 'Journal',         hint: 'Your journal entries',  run: () => document.querySelector('[data-view="journal"]')?.click() },
      { id: 'fd-calendar',  label: 'Calendar',        hint: 'Your calendar records', run: () => document.querySelector('[data-view="calendar"]')?.click() },
      { id: 'fd-my-docs',   label: 'My Documents',   hint: 'Docs you created',       run: () => document.querySelector('[data-view="my-docs"]')?.click() },
      { id: 'fd-shared',    label: 'Shared with Me', hint: 'Docs shared with you',   run: () => document.querySelector('[data-view="shared-docs"]')?.click() },
      { id: 'fd-recent',    label: 'Recent',         hint: 'Recently viewed docs',   run: () => document.querySelector('[data-view="recent"]')?.click() },
      { id: 'fd-trash',     label: 'Trash',          hint: 'Deleted documents',      run: () => document.querySelector('[data-view="trash"]')?.click() },
    ],
    extras: [
      {
        aria: 'Create new document',
        title: 'Create new document',
        html: `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span class="fd-new-label">New</span>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        `,
      },
    ],
  });
  
  // Mount the "+ New" button after Unity Header is ready
  _mountNewButton();
}

function _mountNewButton() {
  const header = document.getElementById('fd-topbar');
  const btn = header?.querySelector('.unity-extra');
  if (!header || !btn) return;

  btn.id = 'fd-new-btn';
  btn.classList.add('fd-new-btn');
  btn.setAttribute('aria-haspopup', 'menu');
  btn.setAttribute('aria-expanded', 'false');

  const menu = document.createElement('div');
  menu.id = 'fd-new-menu';
  menu.className = 'fd-new-menu';
  menu.setAttribute('role', 'menu');
  menu.innerHTML = `
    <button type="button" class="fd-new-menu-item" data-doc-type="document" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <span><strong>Document</strong><small>Word processor</small></span>
    </button>
    <button type="button" class="fd-new-menu-item" data-doc-type="spreadsheet" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
      <span><strong>Spreadsheet</strong><small>Tables & calculations</small></span>
    </button>
    <button type="button" class="fd-new-menu-item" data-doc-type="note" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M8 10h8M8 14h5"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3h14a2 2 0 012 2v10.5L15.5 21H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
      </svg>
      <span><strong>Note</strong><small>Fast thoughts & care notes</small></span>
    </button>
    <button type="button" class="fd-new-menu-item" data-doc-type="prayer" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s-7-4.35-7-10a7 7 0 1114 0c0 5.65-7 10-7 10z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 10.5h5M12 8v5"/>
      </svg>
      <span><strong>Prayer Request</strong><small>Add a care record</small></span>
    </button>
    <button type="button" class="fd-new-menu-item" data-doc-type="journal" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6M9 12h5"/>
      </svg>
      <span><strong>Journal Entry</strong><small>Record a reflection</small></span>
    </button>
    <button type="button" class="fd-new-menu-item" data-doc-type="calendar" role="menuitem">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 2v4m8-4v4M4 10h16M6 5h12a2 2 0 012 2v13H4V7a2 2 0 012-2z"/>
      </svg>
      <span><strong>Calendar Event</strong><small>Add time and place</small></span>
    </button>
  `;
  header.appendChild(menu);

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setOpen(!menu.classList.contains('is-open'));
    });

    menu.addEventListener('click', (e) => {
      const item = e.target.closest('[data-doc-type]');
      if (!item) return;
      if (item.dataset.docType === 'spreadsheet') createNewSpreadsheet();
      else if (item.dataset.docType === 'note') createNewNote();
      else if (item.dataset.docType === 'prayer') createNewPrayerRequest();
      else if (item.dataset.docType === 'journal') createNewJournalEntry();
      else if (item.dataset.docType === 'calendar') createNewCalendarEvent();
      else createNewDocument('document');
      setOpen(false);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) setOpen(false);
    });
  }
}

/* ── Preferences ──────────────────────────────────────────────────────────── */
function _loadPrefs() {
  try {
    const raw = localStorage.getItem(STORE_KEY_PREFS);
    if (raw) Object.assign(S.prefs, JSON.parse(raw));
  } catch (_) { /* ignore */ }
}

function _savePrefs() {
  try {
    localStorage.setItem(STORE_KEY_PREFS, JSON.stringify(S.prefs));
  } catch (_) {}
}

/* ── Event Bindings ───────────────────────────────────────────────────────── */
function _bindEvents() {
  // Sidebar view buttons
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      switchView(view);
    });
  });

  // Search input
  document.getElementById('fd-search-input')?.addEventListener('input', (e) => {
    S.searchQuery = e.target.value.toLowerCase();
    S.visibleDocCount = DOC_RENDER_PAGE_SIZE;
    _renderDocuments();
  });

  // Editor toolbar
  document.querySelectorAll('[data-format]').forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.dataset.format;
      _execCommand(format);
    });
  });

  // Format select
  document.getElementById('fd-format-select')?.addEventListener('change', (e) => {
    _execCommand('formatBlock', e.target.value);
  });

  // Back button
  document.querySelector('[data-action="back"]')?.addEventListener('click', () => {
    _closeEditor();
  });

  // Save button
  document.getElementById('fd-save-btn')?.addEventListener('click', saveDocument);

  // Editor content - auto-save on input
  document.getElementById('fd-editor-content')?.addEventListener('input', () => {
    _autoSave();
  });

  // Close mobile sidebar when clicking outside
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('fd-sidebar-wrap');
    const hamburger = document.querySelector('.unity-hamburger');
    if (sidebar?.classList.contains('is-open') && 
        !sidebar.contains(e.target) && 
        e.target !== hamburger && 
        !hamburger?.contains(e.target)) {
      sidebar.classList.remove('is-open');
    }
  });

  // Formula bar for spreadsheet
  const formulaBar = document.getElementById('fd-formula-bar');
  if (formulaBar) {
    formulaBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const selectedCell = document.querySelector('.fd-cell.is-selected');
        if (selectedCell && S.currentDoc?.type === 'spreadsheet') {
          const cellId = selectedCell.dataset.cell;
          _setCellValue(cellId, formulaBar.value);
          _renderSpreadsheet();
          _autoSave();
        }
      }
    });
  }

  // Excel import file input
  const excelImport = document.getElementById('fd-excel-import');
  if (excelImport) {
    excelImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        importFromExcel(file);
        e.target.value = ''; // Reset input
      }
    });
  }
}

/* ── Documents CRUD ───────────────────────────────────────────────────────── */
async function _loadDocuments(options = {}) {
  if (!_checkFirebase()) return;
  const loadSeq = ++S.loadSeq;
  if (!options.keepVisible) S.visibleDocCount = DOC_RENDER_PAGE_SIZE;
  const systemOnly = _isSystemOnlyView(S.currentView);
  const systemDocs = await _loadSystemDocumentsForCurrentView({ force: !!options.forceSystem });
  if (loadSeq !== S.loadSeq) return;

  // Use localStorage for mock user (development mode)
  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      
      S.documents = _filterDocsForCurrentView(allDocs.concat(systemDocs));
      
      S.documents = _sortDocs(S.documents);
      
      _renderDocuments();
      console.log('[FlockDocs] Loaded', S.documents.length, 'documents from localStorage');
    } catch (err) {
      console.error('[FlockDocs] Error loading from localStorage:', err);
      S.documents = [];
      _renderDocuments();
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    if (systemOnly) {
      S.documents = _sortDocs(_filterDocsForCurrentView(systemDocs));
      _renderDocuments();
      return;
    }

    const db = firebase.firestore();
    let query = db.collection(COLLECTION_DOCS);

    // Filter based on current view
    if (S.currentView === 'my-docs') {
      query = query.where('ownerId', '==', S.user.uid);
    } else if (S.currentView === 'shared-docs') {
      query = query.where('shared', '==', true);
    } else if (S.currentView === 'trash') {
      query = query.where('deleted', '==', true);
    } else {
      // All docs: show both owned and shared
      query = query.where('deleted', '==', false);
    }

    query = query.orderBy('updatedAt', 'desc');

    const snapshot = await query.get();
    if (loadSeq !== S.loadSeq) return;
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    S.documents = _sortDocs(_filterDocsForCurrentView(docs.concat(systemDocs)));

    _renderDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error loading documents:', err);
    console.log('[FlockDocs] ERROR: Failed to load documents');
  }
}

async function _loadFolders() {
  if (!_checkFirebase()) return;

  try {
    const db = firebase.firestore();
    const snapshot = await db.collection(COLLECTION_FOLDERS)
      .where('ownerId', '==', S.user.uid)
      .orderBy('name')
      .get();

    S.folders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    _renderFolders();
  } catch (err) {
    console.error('[FlockDocs] Error loading folders:', err);
  }
}

function _filterDocsForCurrentView(docs) {
  const allDocs = Array.isArray(docs) ? docs : [];
  if (S.currentView === 'my-docs') {
    return allDocs.filter(doc => doc.ownerId === S.user.uid && !doc.deleted);
  }
  if (S.currentView === 'notes') {
    return allDocs.filter(doc => _normalizeDocType(doc.type) === 'note' && !doc.deleted);
  }
  if (S.currentView === 'prayers') {
    return allDocs.filter(doc => _normalizeDocType(doc.type) === 'prayer' && !doc.deleted);
  }
  if (S.currentView === 'journal') {
    return allDocs.filter(doc => _normalizeDocType(doc.type) === 'journal' && !doc.deleted);
  }
  if (S.currentView === 'calendar') {
    return allDocs.filter(doc => _normalizeDocType(doc.type) === 'calendar' && !doc.deleted);
  }
  if (S.currentView === 'shared-docs') {
    return allDocs.filter(doc => doc.shared && !doc.deleted);
  }
  if (S.currentView === 'trash') {
    return allDocs.filter(doc => doc.deleted);
  }
  return allDocs.filter(doc => !doc.deleted);
}

function _sortDocs(docs) {
  return (Array.isArray(docs) ? docs : []).sort((a, b) => _dateValue(b.updatedAt) - _dateValue(a.updatedAt));
}

function _upsertLoadedDocument(doc) {
  if (!doc?.id) return;
  const next = S.documents.filter(item => item.id !== doc.id);
  const filtered = _filterDocsForCurrentView([doc]);
  if (filtered.length) next.push(filtered[0]);
  S.documents = _sortDocs(next);
  _renderDocuments();
}

function _dateValue(value) {
  if (!value) return 0;
  if (value && typeof value.toDate === 'function') return value.toDate().getTime();
  const date = value instanceof Date ? value : new Date(value);
  const time = date.getTime();
  return Number.isFinite(time) ? time : 0;
}

function _isSystemOnlyView(viewName) {
  return viewName === 'prayers' || viewName === 'journal' || viewName === 'calendar';
}

function _shouldLoadSystemDocs(viewName) {
  return viewName === 'all-docs' || viewName === 'recent' || _isSystemOnlyView(viewName);
}

async function _loadSystemDocumentsForCurrentView(options = {}) {
  if (!_shouldLoadSystemDocs(S.currentView) || typeof UpperRoom === 'undefined') return [];

  const loaders = [];
  if (S.currentView === 'all-docs' || S.currentView === 'recent' || S.currentView === 'prayers') {
    loaders.push(_loadCachedSystemDocs('prayer', _loadPrayerDocs, options));
  }
  if (S.currentView === 'all-docs' || S.currentView === 'recent' || S.currentView === 'journal') {
    loaders.push(_loadCachedSystemDocs('journal', _loadJournalDocs, options));
  }
  if (S.currentView === 'all-docs' || S.currentView === 'recent' || S.currentView === 'calendar') {
    loaders.push(_loadCachedSystemDocs('calendar', _loadCalendarDocs, options));
  }

  const settled = await Promise.allSettled(loaders);
  return settled.flatMap(result => {
    if (result.status === 'fulfilled') return result.value;
    console.warn('[FlockDocs] System docs source failed:', result.reason);
    return [];
  });
}

function _loadCachedSystemDocs(source, loader, options = {}) {
  const cache = S.systemDocCache[source];
  if (!cache) return loader();

  const now = Date.now();
  if (!options.force && cache.docs && now - cache.loadedAt < SYSTEM_DOC_CACHE_TTL_MS) {
    return Promise.resolve(cache.docs);
  }
  if (!options.force && cache.promise) return cache.promise;

  cache.promise = loader()
    .then(docs => {
      cache.docs = Array.isArray(docs) ? docs : [];
      cache.loadedAt = Date.now();
      return cache.docs;
    })
    .finally(() => {
      cache.promise = null;
    });
  return cache.promise;
}

function _markSystemSourceDirty(source) {
  const cache = S.systemDocCache[source];
  if (!cache) return;
  cache.loadedAt = 0;
  cache.promise = null;
}

async function _loadPrayerDocs() {
  if (!UpperRoom.listPrayers) return [];
  const rows = _unwrapResults(await UpperRoom.listPrayers({ limit: SYSTEM_DOC_LOAD_LIMIT }));
  return rows.map(_mapPrayerToDoc).filter(Boolean);
}

async function _loadJournalDocs() {
  if (!UpperRoom.listJournal) return [];
  const rows = _unwrapResults(await UpperRoom.listJournal({ limit: SYSTEM_DOC_LOAD_LIMIT }));
  return rows.map(_mapJournalToDoc).filter(Boolean);
}

async function _loadCalendarDocs() {
  if (!UpperRoom.listCalendarEvents) return [];
  const rows = _unwrapResults(await UpperRoom.listCalendarEvents({ limit: SYSTEM_DOC_LOAD_LIMIT }));
  return rows.map(_mapCalendarToDoc).filter(Boolean);
}

function _unwrapResults(value) {
  if (Array.isArray(value)) return value;
  if (value && Array.isArray(value.results)) return value.results;
  if (value && Array.isArray(value.events)) return value.events;
  return [];
}

function _mapPrayerToDoc(row) {
  if (!row || !row.id) return null;
  const category = row.category || 'Prayer Request';
  const name = category === 'Prayer Request' ? 'Prayer Request' : `Prayer: ${category}`;
  return {
    id: _systemDocId('prayer', row.id),
    source: 'prayer',
    sourceId: row.id,
    type: 'prayer',
    name,
    content: _buildPrayerContent(row),
    sourceData: row,
    ownerId: row.createdBy || row.submitterEmail || S.user?.uid,
    ownerName: row.submitterName || S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    updatedAt: row.lastUpdated || row.submittedAt || row.createdAt,
    createdAt: row.submittedAt || row.createdAt,
  };
}

function _mapJournalToDoc(row) {
  if (!row || !row.id) return null;
  const title = _firstValue(row, ['title', 'Title', 'name', 'subject']) || 'Journal Entry';
  const bodyKey = _firstKey(row, ['content', 'entry', 'journalText', 'text', 'body', 'notes', 'reflection']);
  const body = bodyKey ? row[bodyKey] : '';
  return {
    id: _systemDocId('journal', row.id),
    source: 'journal',
    sourceId: row.id,
    type: 'journal',
    name: title,
    content: _buildJournalContent({ ...row, title, body, __bodyKey: bodyKey || 'content' }),
    sourceData: { ...row, __bodyKey: bodyKey || 'content' },
    ownerId: row.createdBy || S.user?.email || S.user?.uid,
    ownerName: S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    updatedAt: row.updatedAt || row.createdAt || row.date,
    createdAt: row.createdAt || row.date,
  };
}

function _mapCalendarToDoc(row) {
  if (!row || !(row.id || row.EventID)) return null;
  const id = row.id || row.EventID;
  const title = row.Title || row.title || 'Calendar Event';
  return {
    id: _systemDocId('calendar', id),
    source: 'calendar',
    sourceId: id,
    type: 'calendar',
    name: title,
    content: _buildCalendarContent(row),
    sourceData: row,
    ownerId: row.email || row.CreatedBy || S.user?.email || S.user?.uid,
    ownerName: S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    updatedAt: row.UpdatedAt || row.StartDateTime || row.CreatedAt,
    createdAt: row.CreatedAt || row.StartDateTime,
  };
}

function _systemDocId(source, id) {
  return `${source}:${id}`;
}

function _isSystemDoc(doc) {
  return !!(doc && doc.source && doc.type);
}

function _firstKey(obj, keys) {
  return keys.find(key => obj[key] !== undefined && obj[key] !== null && String(obj[key]).trim() !== '');
}

function _firstValue(obj, keys) {
  const key = _firstKey(obj, keys);
  return key ? obj[key] : '';
}

function _field(tag, name, value, fallback = '') {
  return `<${tag} class="fd-system-field" data-field="${_e(name)}" data-placeholder="${_e(fallback)}">${_e(value || fallback)}</${tag}>`;
}

function _buildPrayerContent(row = {}) {
  return [
    _field('h1', 'category', row.category || 'Prayer Request', 'Prayer Request'),
    _field('p', 'prayerText', row.prayerText || '', 'Write the request here...'),
    '<h2>Admin Notes</h2>',
    _field('p', 'adminNotes', row.adminNotes || '', 'Add private care notes here...'),
  ].join('');
}

function _buildJournalContent(row = {}) {
  return [
    _field('h1', 'title', row.title || 'Journal Entry', 'Journal Entry'),
    _field('p', 'body', row.body || '', 'Start writing...'),
  ].join('');
}

function _buildCalendarContent(row = {}) {
  return [
    _field('h1', 'Title', row.Title || row.title || 'Calendar Event', 'Calendar Event'),
    _field('p', 'Description', row.Description || row.description || '', 'Describe the event...'),
    '<h2>Start</h2>',
    _field('p', 'StartDateTime', row.StartDateTime || '', _defaultCalendarStart()),
    '<h2>End</h2>',
    _field('p', 'EndDateTime', row.EndDateTime || '', _defaultCalendarEnd()),
    '<h2>Location</h2>',
    _field('p', 'Location', row.Location || '', 'Add a location...'),
  ].join('');
}

function _defaultCalendarStart() {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 1);
  return start.toISOString().slice(0, 16);
}

function _defaultCalendarEnd() {
  const end = new Date();
  end.setMinutes(0, 0, 0);
  end.setHours(end.getHours() + 2);
  return end.toISOString().slice(0, 16);
}

function createNewDocument(type = 'document') {
  if (type === 'spreadsheet') {
    createNewSpreadsheet();
    return;
  }

  const isNote = type === 'note';
  S.currentDoc = {
    id: null,
    name: isNote ? 'Untitled Note' : 'Untitled Document',
    type: isNote ? 'note' : 'document',
    content: isNote
      ? '<h1>Untitled Note</h1><p>Capture a thought, reminder, or care note...</p>'
      : '<h1>Untitled Document</h1><p>Start typing...</p>',
    ownerId: S.user.uid,
    ownerName: S.user.displayName,
    shared: false,
    folderId: null,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  _openEditor();
}

function createNewNote() {
  createNewDocument('note');
}

function createNewPrayerRequest() {
  const row = {
    id: null,
    category: 'Prayer Request',
    prayerText: '',
    adminNotes: '',
    submitterName: S.user?.displayName || '',
    submitterEmail: S.user?.email || '',
    createdBy: S.user?.email || S.user?.uid,
    submittedAt: new Date(),
    lastUpdated: new Date(),
  };

  S.currentDoc = {
    id: null,
    source: 'prayer',
    sourceId: null,
    type: 'prayer',
    name: 'Prayer Request',
    content: _buildPrayerContent(row),
    sourceData: row,
    ownerId: S.user?.email || S.user?.uid,
    ownerName: S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  _openEditor();
}

function createNewJournalEntry() {
  const row = {
    id: null,
    title: 'Journal Entry',
    body: '',
    __bodyKey: 'content',
    createdBy: S.user?.email || S.user?.uid,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  S.currentDoc = {
    id: null,
    source: 'journal',
    sourceId: null,
    type: 'journal',
    name: 'Journal Entry',
    content: _buildJournalContent(row),
    sourceData: row,
    ownerId: S.user?.email || S.user?.uid,
    ownerName: S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  _openEditor();
}

function createNewCalendarEvent() {
  const row = {
    id: null,
    Title: 'Calendar Event',
    Description: '',
    StartDateTime: _defaultCalendarStart(),
    EndDateTime: _defaultCalendarEnd(),
    Location: '',
    email: S.user?.email || '',
    CreatedBy: S.user?.email || '',
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  };

  S.currentDoc = {
    id: null,
    source: 'calendar',
    sourceId: null,
    type: 'calendar',
    name: 'Calendar Event',
    content: _buildCalendarContent(row),
    sourceData: row,
    ownerId: S.user?.email || S.user?.uid,
    ownerName: S.user?.displayName || 'Member',
    shared: false,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  _openEditor();
}

function createNewSpreadsheet() {
  // Initialize spreadsheet with 26 columns (A-Z) and 100 rows
  const cells = {};
  // Empty cells initially - will be populated as user types
  
  S.currentDoc = {
    id: null,
    name: 'Untitled Spreadsheet',
    type: 'spreadsheet',
    content: null, // Not used for spreadsheets
    cells: cells, // { 'A1': { value: '42', formula: '=SUM(A2:A5)' }, ... }
    columnWidths: {}, // { 'A': 120, 'B': 100, ... }
    rowHeights: {}, // { '1': 24, '2': 24, ... }
    ownerId: S.user.uid,
    ownerName: S.user.displayName,
    shared: false,
    folderId: null,
    deleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  _openEditor();
}

async function openDocument(docId) {
  if (!_checkFirebase()) return;

  const loadedDoc = S.documents.find(d => d.id === docId);
  if (_isSystemDoc(loadedDoc)) {
    S.currentDoc = { ...loadedDoc };
    _openEditor();
    console.log('[FlockDocs] Opened system document:', docId);
    return;
  }

  // Use localStorage for mock user (development mode)
  if (_isMockUser()) {
    try {
      const allDocs = _loadFromLocalStorage();
      const doc = allDocs.find(d => d.id === docId);
      
      if (!doc) {
        _toast('Document not found', 'error');
        return;
      }

      S.currentDoc = { ...doc };
      _openEditor();
      console.log('[FlockDocs] Opened document from localStorage:', docId);
    } catch (err) {
      console.error('[FlockDocs] Error opening document from localStorage:', err);
      _toast('Failed to open document', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    const docRef = await db.collection(COLLECTION_DOCS).doc(docId).get();
    
    if (!docRef.exists) {
      _toast('Document not found', 'error');
      return;
    }

    S.currentDoc = {
      id: docRef.id,
      ...docRef.data(),
    };

    _openEditor();
  } catch (err) {
    console.error('[FlockDocs] Error opening document:', err);
    _toast('Failed to open document', 'error');
  }
}

async function saveDocument() {
  if (!S.currentDoc) return;
  if (!_checkFirebase()) return;

  S.currentDoc.updatedAt = new Date();

  // Handle document vs spreadsheet differently
  if (S.currentDoc.type === 'spreadsheet') {
    // For spreadsheets, name is editable in the header
    // cells data is already in S.currentDoc.cells
  } else {
    // For documents, extract content and name from editor
    const editor = document.getElementById('fd-editor-content');
    if (editor) {
      S.currentDoc.content = editor.innerHTML;
      
      // Extract document name from first heading
      const firstHeading = editor.querySelector('h1, h2, h3');
      if (firstHeading) {
        S.currentDoc.name = firstHeading.textContent.trim() || 'Untitled Document';
      }
    }
  }

  if (_isSystemDoc(S.currentDoc)) {
    await _saveSystemDocument();
    return;
  }

  const saveStatus = document.getElementById('fd-save-status');
  
  // Use localStorage for mock user (development mode)
  if (_isMockUser()) {
    try {
      if (saveStatus) saveStatus.textContent = 'Saving...';
      
      let allDocs = _loadFromLocalStorage();
      
      if (S.currentDoc.id) {
        // Update existing document
        const index = allDocs.findIndex(d => d.id === S.currentDoc.id);
        if (index >= 0) {
          allDocs[index] = { ...S.currentDoc };
        }
      } else {
        // Create new document
        S.currentDoc.id = 'doc_' + Date.now();
        S.currentDoc.createdAt = new Date();
        allDocs.push({ ...S.currentDoc });
      }
      
      _saveToLocalStorage(allDocs);
      _upsertLoadedDocument({ ...S.currentDoc });
      
      if (saveStatus) saveStatus.textContent = 'All changes saved';
      console.log('[FlockDocs] Document saved to localStorage:', S.currentDoc.id);
    } catch (err) {
      console.error('[FlockDocs] Error saving to localStorage:', err);
      if (saveStatus) saveStatus.textContent = 'Error saving';
      _toast('Failed to save document', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    
    if (saveStatus) saveStatus.textContent = 'Saving...';

    const docData = {
      name: S.currentDoc.name,
      type: S.currentDoc.type,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Add type-specific fields
    if (S.currentDoc.type === 'spreadsheet') {
      docData.cells = S.currentDoc.cells || {};
      docData.columnWidths = S.currentDoc.columnWidths || {};
      docData.rowHeights = S.currentDoc.rowHeights || {};
    } else {
      docData.content = S.currentDoc.content;
    }

    if (S.currentDoc.id) {
      // Update existing document
      await db.collection(COLLECTION_DOCS).doc(S.currentDoc.id).update(docData);
    } else {
      // Create new document
      const newDocData = {
        ...docData,
        ownerId: S.currentDoc.ownerId,
        ownerName: S.currentDoc.ownerName,
        shared: S.currentDoc.shared,
        folderId: S.currentDoc.folderId,
        deleted: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const docRef = await db.collection(COLLECTION_DOCS).add(newDocData);
      S.currentDoc.id = docRef.id;
    }

    _upsertLoadedDocument({ ...S.currentDoc });
    if (saveStatus) saveStatus.textContent = 'All changes saved';
    console.log('[FlockDocs] Document saved:', S.currentDoc.id);
  } catch (err) {
    console.error('[FlockDocs] Error saving document:', err);
    _toast('Failed to save document', 'error');
    const saveStatus = document.getElementById('fd-save-status');
    if (saveStatus) saveStatus.textContent = 'Error saving';
  }
}

async function _saveSystemDocument() {
  const saveStatus = document.getElementById('fd-save-status');
  if (saveStatus) saveStatus.textContent = 'Saving...';

  try {
    if (typeof UpperRoom === 'undefined') throw new Error('UpperRoom is unavailable');
    const fields = _collectSystemFields();
    let savedId = S.currentDoc.sourceId;

    if (S.currentDoc.source === 'prayer') {
      const payload = {
        category: fields.category || S.currentDoc.name || 'Prayer Request',
        prayerText: fields.prayerText || '',
        adminNotes: fields.adminNotes || '',
        submitterName: S.user?.displayName || S.currentDoc.sourceData?.submitterName || '',
        submitterEmail: S.user?.email || S.currentDoc.sourceData?.submitterEmail || '',
      };
      if (savedId) {
        await UpperRoom.updatePrayer(savedId, payload);
      } else {
        savedId = await UpperRoom.createPrayer(payload);
      }
      S.currentDoc.name = payload.category === 'Prayer Request' ? 'Prayer Request' : `Prayer: ${payload.category}`;
    } else if (S.currentDoc.source === 'journal') {
      const bodyKey = S.currentDoc.sourceData?.__bodyKey || 'content';
      const payload = {
        title: fields.title || S.currentDoc.name || 'Journal Entry',
        [bodyKey]: fields.body || '',
      };
      if (savedId) {
        await UpperRoom.updateJournal({ id: savedId, ...payload });
      } else {
        const result = await UpperRoom.createJournal(payload);
        savedId = result?.id || result;
      }
      S.currentDoc.name = payload.title;
    } else if (S.currentDoc.source === 'calendar') {
      const payload = {
        Title: fields.Title || S.currentDoc.name || 'Calendar Event',
        Description: fields.Description || '',
        StartDateTime: fields.StartDateTime || _defaultCalendarStart(),
        EndDateTime: fields.EndDateTime || _defaultCalendarEnd(),
        Location: fields.Location || '',
      };
      if (savedId) {
        await UpperRoom.updateCalendarEvent(savedId, payload);
      } else {
        savedId = await UpperRoom.createCalendarEvent(payload);
      }
      S.currentDoc.name = payload.Title;
    }

    if (savedId) {
      S.currentDoc.sourceId = savedId;
      S.currentDoc.id = _systemDocId(S.currentDoc.source, savedId);
    }
    S.currentDoc.updatedAt = new Date();
    _markSystemSourceDirty(S.currentDoc.source);
    _upsertLoadedDocument({ ...S.currentDoc });
    if (saveStatus) saveStatus.textContent = 'All changes saved';
    _toast(`${_getDocTypeLabel(S.currentDoc.type)} saved`, 'success');
  } catch (err) {
    console.error('[FlockDocs] Error saving system document:', err);
    if (saveStatus) saveStatus.textContent = 'Error saving';
    _toast('Failed to save document', 'error');
  }
}

function _collectSystemFields() {
  const editor = document.getElementById('fd-editor-content');
  if (!editor) return {};
  const fields = {};
  editor.querySelectorAll('[data-field]').forEach(el => {
    const key = el.getAttribute('data-field');
    if (key) fields[key] = el.textContent.trim();
  });
  return fields;
}

async function deleteDocument(docId) {
  const doc = S.documents.find(d => d.id === docId);
  if (!doc) return;

  if (_isSystemDoc(doc)) {
    const confirmed = await _showConfirmDialog(
      'Delete Record',
      `Are you sure you want to delete "${doc.name}"? This removes it from ${_getDocTypeLabel(doc.type)} records.`,
      'Delete',
      'Cancel'
    );
    if (!confirmed) return;
    await _deleteSystemDocument(doc);
    return;
  }

  // Show confirmation dialog
  const confirmed = await _showConfirmDialog(
    'Delete Document',
    `Are you sure you want to delete "${doc.name}"? This will move it to the trash.`,
    'Delete',
    'Cancel'
  );

  if (!confirmed) return;

  if (!_checkFirebase()) return;

  // Use localStorage for mock user (development mode)
  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      const index = allDocs.findIndex(d => d.id === docId);
      
      if (index >= 0) {
        allDocs[index].deleted = true;
        allDocs[index].deletedAt = new Date();
        _saveToLocalStorage(allDocs);
      }

      _toast('Document moved to trash', 'success');
      _loadDocuments();
      console.log('[FlockDocs] Document moved to trash in localStorage:', docId);
    } catch (err) {
      console.error('[FlockDocs] Error deleting document from localStorage:', err);
      _toast('Failed to delete document', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    // Soft delete - move to trash
    await db.collection(COLLECTION_DOCS).doc(docId).update({
      deleted: true,
      deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    _toast('Document moved to trash', 'success');
    _loadDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error deleting document:', err);
    _toast('Failed to delete document', 'error');
  }
}

async function _deleteSystemDocument(doc) {
  if (!doc?.sourceId || typeof UpperRoom === 'undefined') return;

  try {
    if (doc.source === 'prayer' && UpperRoom.deletePrayer) {
      await UpperRoom.deletePrayer(doc.sourceId);
    } else if (doc.source === 'journal' && UpperRoom.deleteJournal) {
      await UpperRoom.deleteJournal({ id: doc.sourceId });
    } else if (doc.source === 'calendar' && UpperRoom.deleteCalendarEvent) {
      await UpperRoom.deleteCalendarEvent(doc.sourceId);
    } else {
      throw new Error(`Unsupported system document source: ${doc.source}`);
    }
    _markSystemSourceDirty(doc.source);
    _toast('Record deleted', 'success');
    _loadDocuments({ forceSystem: true });
  } catch (err) {
    console.error('[FlockDocs] Error deleting system document:', err);
    _toast('Failed to delete record', 'error');
  }
}

async function emptyTrash() {
  const count = S.documents.length;
  if (count === 0) {
    _toast('Trash is already empty', 'info');
    return;
  }

  const confirmed = await _showConfirmDialog(
    'Empty Trash',
    `Permanently delete ${count} document${count !== 1 ? 's' : ''}? This cannot be undone.`,
    'Empty Trash',
    'Cancel'
  );
  if (!confirmed) return;

  if (!_checkFirebase()) return;

  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      allDocs = allDocs.filter(d => !d.deleted);
      _saveToLocalStorage(allDocs);
      _toast('Trash emptied', 'success');
      _loadDocuments();
    } catch (err) {
      console.error('[FlockDocs] Error emptying trash:', err);
      _toast('Failed to empty trash', 'error');
    }
    return;
  }

  try {
    const db = firebase.firestore();
    const batch = db.batch();
    S.documents.forEach(doc => {
      batch.delete(db.collection(COLLECTION_DOCS).doc(doc.id));
    });
    await batch.commit();
    _toast('Trash emptied', 'success');
    _loadDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error emptying trash:', err);
    _toast('Failed to empty trash', 'error');
  }
}

/* ── File Management (Folders, Move, Share, Rename) ───────────────────────── */
async function createFolder() {
  const folderName = await _showInputDialog(
    'Create Folder',
    'Enter folder name:',
    'New Folder'
  );

  if (!folderName) return;

  if (!_checkFirebase()) return;

  // Use localStorage for mock user
  if (_isMockUser()) {
    try {
      const folders = JSON.parse(localStorage.getItem(STORE_KEY_FOLDERS) || '[]');
      const newFolder = {
        id: 'folder_' + Date.now(),
        name: folderName,
        ownerId: S.user.uid,
        ownerName: S.user.displayName,
        createdAt: new Date().toISOString(),
      };
      folders.push(newFolder);
      localStorage.setItem(STORE_KEY_FOLDERS, JSON.stringify(folders));
      S.folders = folders;
      _renderFolders();
      _toast('Folder created', 'success');
    } catch (err) {
      console.error('[FlockDocs] Error creating folder:', err);
      _toast('Failed to create folder', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    const folderData = {
      name: folderName,
      ownerId: S.user.uid,
      ownerName: S.user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await db.collection(COLLECTION_FOLDERS).add(folderData);
    _toast('Folder created', 'success');
    _loadFolders();
  } catch (err) {
    console.error('[FlockDocs] Error creating folder:', err);
    _toast('Failed to create folder', 'error');
  }
}

async function renameDocument(docId) {
  const doc = S.documents.find(d => d.id === docId);
  if (!doc) return;

  const newName = await _showInputDialog(
    'Rename Document',
    'Enter new name:',
    doc.name
  );

  if (!newName || newName === doc.name) return;

  if (!_checkFirebase()) return;

  // Use localStorage for mock user
  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      const index = allDocs.findIndex(d => d.id === docId);
      if (index >= 0) {
        allDocs[index].name = newName;
        allDocs[index].updatedAt = new Date();
        _saveToLocalStorage(allDocs);
      }
      _toast('Document renamed', 'success');
      _loadDocuments();
    } catch (err) {
      console.error('[FlockDocs] Error renaming document:', err);
      _toast('Failed to rename document', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    await db.collection(COLLECTION_DOCS).doc(docId).update({
      name: newName,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    _toast('Document renamed', 'success');
    _loadDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error renaming document:', err);
    _toast('Failed to rename document', 'error');
  }
}

async function moveToFolder(docId) {
  const doc = S.documents.find(d => d.id === docId);
  if (!doc) return;

  const folderId = await _showFolderSelector('Move to Folder', doc.folderId);
  if (folderId === null) return; // User cancelled

  if (!_checkFirebase()) return;

  // Use localStorage for mock user
  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      const index = allDocs.findIndex(d => d.id === docId);
      if (index >= 0) {
        allDocs[index].folderId = folderId || null;
        allDocs[index].updatedAt = new Date();
        _saveToLocalStorage(allDocs);
      }
      _toast('Document moved', 'success');
      _loadDocuments();
    } catch (err) {
      console.error('[FlockDocs] Error moving document:', err);
      _toast('Failed to move document', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    await db.collection(COLLECTION_DOCS).doc(docId).update({
      folderId: folderId || null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    _toast('Document moved', 'success');
    _loadDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error moving document:', err);
    _toast('Failed to move document', 'error');
  }
}

async function shareDocument(docId) {
  const doc = S.documents.find(d => d.id === docId);
  if (!doc) return;

  const confirmed = await _showConfirmDialog(
    doc.shared ? 'Unshare Document' : 'Share with Church',
    doc.shared 
      ? `Remove "${doc.name}" from shared documents?`
      : `Share "${doc.name}" with your church? All church members will be able to view this document.`,
    doc.shared ? 'Unshare' : 'Share',
    'Cancel'
  );

  if (!confirmed) return;

  if (!_checkFirebase()) return;

  const newSharedState = !doc.shared;

  // Use localStorage for mock user
  if (_isMockUser()) {
    try {
      let allDocs = _loadFromLocalStorage();
      const index = allDocs.findIndex(d => d.id === docId);
      if (index >= 0) {
        allDocs[index].shared = newSharedState;
        allDocs[index].updatedAt = new Date();
        _saveToLocalStorage(allDocs);
      }
      _toast(newSharedState ? 'Document shared with church' : 'Document unshared', 'success');
      _loadDocuments();
    } catch (err) {
      console.error('[FlockDocs] Error sharing document:', err);
      _toast('Failed to update sharing', 'error');
    }
    return;
  }

  // Use Firestore for authenticated users
  try {
    const db = firebase.firestore();
    await db.collection(COLLECTION_DOCS).doc(docId).update({
      shared: newSharedState,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    _toast(newSharedState ? 'Document shared with church' : 'Document unshared', 'success');
    _loadDocuments();
  } catch (err) {
    console.error('[FlockDocs] Error sharing document:', err);
    _toast('Failed to update sharing', 'error');
  }
}

/* ── View Management ──────────────────────────────────────────────────────── */
function switchView(viewName) {
  S.currentView = viewName;
  
  // Update sidebar active state
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === viewName);
  });

  // Update library title
  const titles = {
    'all-docs': 'All Documents',
    'notes': 'Notes',
    'prayers': 'Prayer Requests',
    'journal': 'Journal',
    'calendar': 'Calendar',
    'my-docs': 'My Documents',
    'shared-docs': 'Shared with Church',
    'recent': 'Recent Documents',
    'trash': 'Trash',
  };
  document.getElementById('fd-library-title').textContent = titles[viewName] || 'Documents';

  // Show Empty Trash button only when in trash view
  const emptyTrashBtn = document.getElementById('fd-empty-trash-btn');
  if (emptyTrashBtn) emptyTrashBtn.style.display = viewName === 'trash' ? '' : 'none';

  _loadDocuments();
}

/* ── Rendering ────────────────────────────────────────────────────────────── */
function _renderDocuments() {
  const container = document.getElementById('fd-doc-list');
  if (!container) return;

  // Filter documents by search query
  let docs = S.documents;
  if (S.searchQuery) {
    docs = docs.filter(doc => 
      (doc.name || '').toLowerCase().includes(S.searchQuery)
    );
  }
  if (S.visibleDocCount < DOC_RENDER_PAGE_SIZE) {
    S.visibleDocCount = DOC_RENDER_PAGE_SIZE;
  }

  if (docs.length === 0) {
    const empty = _getEmptyStateConfig();
    container.innerHTML = `
      <div class="fd-empty-state">
        ${_getDocIcon(empty.type)}
        <h3>${S.searchQuery ? `No ${empty.plural} found` : empty.title}</h3>
        <p>${S.searchQuery ? 'Try a different search term' : empty.body}</p>
        ${!S.searchQuery ? `<button class="fd-btn fd-btn--primary" onclick="${empty.action}">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          ${empty.button}
        </button>` : ''}
      </div>
    `;
    return;
  }

  const visibleDocs = docs.slice(0, S.visibleDocCount);
  const hasMore = visibleDocs.length < docs.length;
  container.innerHTML = `
    <div class="fd-doc-grid">${visibleDocs.map(_renderDocCard).join('')}</div>
    ${hasMore ? `
      <div class="fd-load-more">
        <div class="fd-load-more-count">Showing ${visibleDocs.length} of ${docs.length}</div>
        <button class="fd-btn fd-btn--ghost" type="button" onclick="FlockDocs.loadMoreDocuments()">
          Load more
        </button>
      </div>
    ` : ''}
  `;
}

function loadMoreDocuments() {
  S.visibleDocCount += DOC_RENDER_PAGE_SIZE;
  _renderDocuments();
}

function _getEmptyStateConfig() {
  if (S.currentView === 'notes') {
    return {
      type: 'note',
      plural: 'notes',
      title: 'No notes yet',
      body: 'Capture your first note inside Docs.',
      button: 'Create Note',
      action: 'FlockDocs.createNewNote()',
    };
  }
  if (S.currentView === 'prayers') {
    return {
      type: 'prayer',
      plural: 'prayer requests',
      title: 'No prayer requests yet',
      body: 'Add your first prayer request from Docs.',
      button: 'Add Prayer Request',
      action: 'FlockDocs.createNewPrayerRequest()',
    };
  }
  if (S.currentView === 'journal') {
    return {
      type: 'journal',
      plural: 'journal entries',
      title: 'No journal entries yet',
      body: 'Start your first journal entry from Docs.',
      button: 'Add Journal Entry',
      action: 'FlockDocs.createNewJournalEntry()',
    };
  }
  if (S.currentView === 'calendar') {
    return {
      type: 'calendar',
      plural: 'calendar events',
      title: 'No calendar events yet',
      body: 'Add your first calendar event from Docs.',
      button: 'Add Calendar Event',
      action: 'FlockDocs.createNewCalendarEvent()',
    };
  }
  return {
    type: 'document',
    plural: 'documents',
    title: 'No documents yet',
    body: 'Create your first document to get started',
    button: 'Create Document',
    action: 'FlockDocs.createNewDocument()',
  };
}

function _renderDocCard(doc) {
  const icon = _getDocIcon(doc.type);
  const date = _formatDate(doc.updatedAt);
  const size = _getDocSize(doc);
  const type = _normalizeDocType(doc.type);
  
  return `
    <div class="fd-doc-card" data-doc-type="${type}" onclick="FlockDocs.openDocument('${doc.id}')">
      <button class="fd-doc-menu-btn" onclick="event.stopPropagation(); _showContextMenu(event, '${doc.id}')">
        <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
      <div class="fd-doc-icon fd-doc-icon--${type}">${icon}</div>
      <div class="fd-doc-name">${_e(doc.name)}</div>
      <div class="fd-doc-type-pill">${_getDocTypeLabel(type)}</div>
      <div class="fd-doc-meta">
        ${doc.shared ? `
          <div class="fd-doc-meta-row">
            <div class="fd-doc-meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Shared
            </div>
          </div>
        ` : ''}
        <div class="fd-doc-meta-row">
          <div class="fd-doc-meta-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${date}
          </div>
          ${size ? `
            <span>•</span>
            <div class="fd-doc-meta-item">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              ${size}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function _renderFolders() {
  const container = document.getElementById('fd-folders-list');
  if (!container) return;

  if (S.folders.length === 0) {
    container.innerHTML = '<div class="fd-empty-folders">No folders</div>';
    return;
  }

  container.innerHTML = S.folders.map(folder => `
    <div class="fd-folder-item" onclick="_selectFolder('${folder.id}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
      </svg>
      ${_e(folder.name)}
    </div>
  `).join('');
}

/* ── Editor ───────────────────────────────────────────────────────────────── */
function _openEditor() {
  if (!S.currentDoc) return;

  const libraryView = document.getElementById('fd-library-view');
  const editorView = document.getElementById('fd-editor-view');
  const spreadsheetView = document.getElementById('fd-spreadsheet-view');

  if (libraryView) libraryView.classList.add('hidden');
  
  if (S.currentDoc.type === 'spreadsheet') {
    if (editorView) editorView.classList.add('hidden');
    if (spreadsheetView) {
      spreadsheetView.classList.remove('hidden');
      _renderSpreadsheet();
    }
  } else {
    if (spreadsheetView) spreadsheetView.classList.add('hidden');
    if (editorView) {
      editorView.classList.remove('hidden');
      editorView.classList.toggle('is-note-editor', S.currentDoc.type === 'note');
      const editor = document.getElementById('fd-editor-content');
      if (editor) {
        editor.innerHTML = S.currentDoc.content;
        editor.focus();
      }
      // Mount Quill on the toolbar host
      if (S._quill) S._quill.destroy();
      const toolbarHost = document.getElementById('fd-quill-bar');
      const pageEl      = document.getElementById('fd-editor-page');
      pageEl?.classList.toggle('fd-editor-page--note', S.currentDoc.type === 'note');
      S._quill = mountQuill(editor, {
        mode:     S.currentDoc.type === 'note' ? 'note' : 'document',
        toolbar:  toolbarHost,
        pageEl,
        onBack:   _closeEditor,
        statusEl: document.getElementById('fd-save-status'),
      });
    }
  }
}

function _closeEditor() {
  const libraryView = document.getElementById('fd-library-view');
  const editorView = document.getElementById('fd-editor-view');
  const spreadsheetView = document.getElementById('fd-spreadsheet-view');

  if (S._quill) { S._quill.destroy(); S._quill = null; }
  if (libraryView) libraryView.classList.remove('hidden');
  if (editorView) editorView.classList.add('hidden');
  if (spreadsheetView) spreadsheetView.classList.add('hidden');
  editorView?.classList.remove('is-note-editor');
  document.getElementById('fd-editor-page')?.classList.remove('fd-editor-page--note');

  S.currentDoc = null;
  _renderDocuments();
}

function _execCommand(command, value = null) {
  document.execCommand(command, false, value);
  document.getElementById('fd-editor-content')?.focus();
}

function _autoSave() {
  clearTimeout(S.autoSaveTimer);
  
  const saveStatus = document.getElementById('fd-save-status');
  if (saveStatus) saveStatus.textContent = 'Unsaved changes...';

  S.autoSaveTimer = setTimeout(() => {
    saveDocument();
  }, 2000); // Auto-save after 2 seconds of no typing
}

/* ── Spreadsheet ──────────────────────────────────────────────────────────── */
function _renderSpreadsheet() {
  if (!S.currentDoc || S.currentDoc.type !== 'spreadsheet') return;

  const container = document.getElementById('fd-spreadsheet-container');
  if (!container) return;

  const cols = 26; // A-Z
  const rows = 100;

  let html = '<table class="fd-spreadsheet-table"><thead><tr><th class="fd-cell-header"></th>';
  
  // Column headers with resize handles
  for (let c = 0; c < cols; c++) {
    const col = String.fromCharCode(65 + c); // A, B, C, ...
    const width = S.currentDoc.columnWidths?.[col] || 100;
    html += `<th class="fd-cell-header" data-col="${col}" data-width="${width}">${col}<div class="fd-col-resize-handle" data-col="${col}"></div></th>`;
  }
  html += '</tr></thead><tbody>';

  // Rows with height and row-resize handles
  for (let r = 1; r <= rows; r++) {
    const rowH = S.currentDoc.rowHeights?.[r] || 28;
    html += `<tr data-row-height="${rowH}"><th class="fd-cell-header" data-row="${r}">${r}<div class="fd-row-resize-handle" data-row="${r}"></div></th>`;
    for (let c = 0; c < cols; c++) {
      const col = String.fromCharCode(65 + c);
      const cellId = `${col}${r}`;
      const value = _getCellDisplayValue(cellId);
      
      html += `<td class="fd-cell" data-cell="${cellId}" data-row="${r}" data-col="${col}">`;
      html += `<div class="fd-cell-content">${_e(value)}</div>`;
      html += `</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';

  container.innerHTML = html;

  container.querySelectorAll('th[data-col][data-width]').forEach(th => {
    const width = Number(th.dataset.width) || 100;
    th.style.width = `${width}px`;
    th.style.minWidth = `${width}px`;
  });
  container.querySelectorAll('tr[data-row-height]').forEach(row => {
    row.style.height = `${Number(row.dataset.rowHeight) || 28}px`;
  });

  // Bind cell click events
  container.querySelectorAll('.fd-cell').forEach(cell => {
    cell.addEventListener('click', (e) => _onCellClick(e.currentTarget));
    cell.addEventListener('dblclick', (e) => _onCellDoubleClick(e.currentTarget));
  });

  // Bind resize handles
  _initResizeHandles(container);

  // Update name in title
  const titleEl = document.getElementById('fd-spreadsheet-title');
  if (titleEl) titleEl.textContent = S.currentDoc.name || 'Untitled Spreadsheet';
}

function _initResizeHandles(container) {
  container.querySelectorAll('.fd-col-resize-handle').forEach(handle => {
    handle.addEventListener('mousedown', _onColResizeStart);
    handle.addEventListener('touchstart', _onColResizeTouchStart, { passive: false });
  });
  container.querySelectorAll('.fd-row-resize-handle').forEach(handle => {
    handle.addEventListener('mousedown', _onRowResizeStart);
    handle.addEventListener('touchstart', _onRowResizeTouchStart, { passive: false });
  });
}

function _onColResizeStart(e) {
  e.preventDefault(); e.stopPropagation();
  const col = e.currentTarget.dataset.col;
  const th = e.currentTarget.closest('th');
  const container = document.getElementById('fd-spreadsheet-container');
  const startX = e.clientX;
  const startWidth = th.offsetWidth;
  const onMove = (ev) => {
    const w = Math.max(40, startWidth + (ev.clientX - startX));
    th.style.width = w + 'px'; th.style.minWidth = w + 'px';
    container.querySelectorAll(`td[data-col="${col}"]`).forEach(td => { td.style.width = w + 'px'; td.style.minWidth = w + 'px'; });
  };
  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    S.currentDoc.columnWidths = S.currentDoc.columnWidths || {};
    S.currentDoc.columnWidths[col] = Math.max(40, startWidth + (ev.clientX - startX));
    _autoSave();
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function _onColResizeTouchStart(e) {
  e.preventDefault(); e.stopPropagation();
  const touch = e.touches[0];
  const col = e.currentTarget.dataset.col;
  const th = e.currentTarget.closest('th');
  const container = document.getElementById('fd-spreadsheet-container');
  const startX = touch.clientX;
  const startWidth = th.offsetWidth;
  const onMove = (ev) => {
    const t = ev.touches[0];
    const w = Math.max(40, startWidth + (t.clientX - startX));
    th.style.width = w + 'px'; th.style.minWidth = w + 'px';
    container.querySelectorAll(`td[data-col="${col}"]`).forEach(td => { td.style.width = w + 'px'; td.style.minWidth = w + 'px'; });
  };
  const onEnd = () => {
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
    S.currentDoc.columnWidths = S.currentDoc.columnWidths || {};
    S.currentDoc.columnWidths[col] = th.offsetWidth;
    _autoSave();
  };
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
}

function _onRowResizeStart(e) {
  e.preventDefault(); e.stopPropagation();
  const row = e.currentTarget.dataset.row;
  const tr = e.currentTarget.closest('tr');
  const startY = e.clientY;
  const startHeight = tr.offsetHeight;
  const onMove = (ev) => {
    tr.style.height = Math.max(20, startHeight + (ev.clientY - startY)) + 'px';
  };
  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    S.currentDoc.rowHeights = S.currentDoc.rowHeights || {};
    S.currentDoc.rowHeights[row] = Math.max(20, startHeight + (ev.clientY - startY));
    _autoSave();
  };
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function _onRowResizeTouchStart(e) {
  e.preventDefault(); e.stopPropagation();
  const touch = e.touches[0];
  const row = e.currentTarget.dataset.row;
  const tr = e.currentTarget.closest('tr');
  const startY = touch.clientY;
  const startHeight = tr.offsetHeight;
  const onMove = (ev) => {
    const t = ev.touches[0];
    tr.style.height = Math.max(20, startHeight + (t.clientY - startY)) + 'px';
  };
  const onEnd = () => {
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);
    S.currentDoc.rowHeights = S.currentDoc.rowHeights || {};
    S.currentDoc.rowHeights[row] = tr.offsetHeight;
    _autoSave();
  };
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
}

function _onCellClick(cellEl) {
  // Remove previous selection
  document.querySelectorAll('.fd-cell.is-selected').forEach(c => c.classList.remove('is-selected'));
  
  // Select this cell
  cellEl.classList.add('is-selected');
  
  const cellId = cellEl.dataset.cell;
  const cellData = S.currentDoc.cells?.[cellId];
  
  // Show formula in formula bar
  const formulaBar = document.getElementById('fd-formula-bar');
  if (formulaBar) {
    formulaBar.value = cellData?.formula || cellData?.value || '';
  }
  
  // Show cell reference
  const cellRef = document.getElementById('fd-cell-ref');
  if (cellRef) {
    cellRef.textContent = cellId;
  }
}

function _onCellDoubleClick(cellEl) {
  const cellId = cellEl.dataset.cell;
  const cellData = S.currentDoc.cells?.[cellId];
  const currentValue = cellData?.formula || cellData?.value || '';

  // Create inline editor
  const contentDiv = cellEl.querySelector('.fd-cell-content');
  if (!contentDiv) return;

  contentDiv.innerHTML = `<input type="text" class="fd-cell-input" value="${_e(currentValue)}" />`;
  const input = contentDiv.querySelector('input');
  
  if (input) {
    input.focus();
    input.select();

    const saveCell = () => {
      const newValue = input.value.trim();
      _setCellValue(cellId, newValue);
      _renderSpreadsheet();
      _autoSave();
    };

    input.addEventListener('blur', saveCell);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveCell();
      } else if (e.key === 'Escape') {
        _renderSpreadsheet();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        saveCell();
        // Move to next cell
        const nextCol = String.fromCharCode(cellEl.dataset.col.charCodeAt(0) + 1);
        const nextRow = cellEl.dataset.row;
        const nextCell = document.querySelector(`[data-cell="${nextCol}${nextRow}"]`);
        if (nextCell) _onCellDoubleClick(nextCell);
      }
    });
  }
}

function _setCellValue(cellId, rawValue) {
  if (!S.currentDoc.cells) S.currentDoc.cells = {};

  if (!rawValue) {
    // Delete empty cell
    delete S.currentDoc.cells[cellId];
    return;
  }

  // Check if it's a formula (starts with =)
  if (rawValue.startsWith('=')) {
    S.currentDoc.cells[cellId] = {
      formula: rawValue,
      value: _calculateFormula(rawValue.substring(1)),
    };
  } else {
    S.currentDoc.cells[cellId] = {
      value: rawValue,
    };
  }
  
  S.currentDoc.updatedAt = new Date();
}

function _getCellDisplayValue(cellId) {
  const cellData = S.currentDoc.cells?.[cellId];
  if (!cellData) return '';
  return cellData.value || '';
}

function _calculateFormula(formula) {
  try {
    // Handle common spreadsheet functions FIRST (before replacing cell references)
    let expr = _replaceFunctions(formula);

    // Then replace remaining cell references with their values
    expr = expr.replace(/([A-Z]+)([0-9]+)/g, (match, col, row) => {
      const cellId = `${col}${row}`;
      const value = _getCellDisplayValue(cellId);
      return value ? (isNaN(value) ? `"${value}"` : value) : '0';
    });

    // Evaluate the expression
    const result = _safeEval(expr);
    return result.toString();
  } catch (err) {
    return '#ERROR!';
  }
}

function _replaceFunctions(expr) {
  // SUM(A1:A5) → A1+A2+A3+A4+A5
  expr = expr.replace(/SUM\(([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)\)/gi, (match, col1, row1, col2, row2) => {
    const values = [];
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    for (let r = startRow; r <= endRow; r++) {
      const cellId = `${col1}${r}`;
      const val = _getCellDisplayValue(cellId);
      values.push(val || '0');
    }
    return `(${values.join('+')})`;
  });

  // AVERAGE(A1:A5) → (A1+A2+A3+A4+A5)/5
  expr = expr.replace(/AVERAGE\(([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)\)/gi, (match, col1, row1, col2, row2) => {
    const values = [];
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    for (let r = startRow; r <= endRow; r++) {
      const cellId = `${col1}${r}`;
      const val = _getCellDisplayValue(cellId);
      values.push(val || '0');
    }
    const count = endRow - startRow + 1;
    return `((${values.join('+')})/${count})`;
  });

  // COUNT(A1:A5) → 5
  expr = expr.replace(/COUNT\(([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)\)/gi, (match, col1, row1, col2, row2) => {
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    let count = 0;
    for (let r = startRow; r <= endRow; r++) {
      const cellId = `${col1}${r}`;
      const val = _getCellDisplayValue(cellId);
      if (val && !isNaN(val)) count++;
    }
    return count.toString();
  });

  // MAX(A1:A5)
  expr = expr.replace(/MAX\(([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)\)/gi, (match, col1, row1, col2, row2) => {
    const values = [];
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    for (let r = startRow; r <= endRow; r++) {
      const cellId = `${col1}${r}`;
      const val = _getCellDisplayValue(cellId);
      if (val && !isNaN(val)) values.push(parseFloat(val));
    }
    return values.length > 0 ? Math.max(...values).toString() : '0';
  });

  // MIN(A1:A5)
  expr = expr.replace(/MIN\(([A-Z]+)([0-9]+):([A-Z]+)([0-9]+)\)/gi, (match, col1, row1, col2, row2) => {
    const values = [];
    const startRow = parseInt(row1);
    const endRow = parseInt(row2);
    for (let r = startRow; r <= endRow; r++) {
      const cellId = `${col1}${r}`;
      const val = _getCellDisplayValue(cellId);
      if (val && !isNaN(val)) values.push(parseFloat(val));
    }
    return values.length > 0 ? Math.min(...values).toString() : '0';
  });

  return expr;
}

function _safeEval(expr) {
  // Very basic safe evaluation - only allow numbers and basic operators
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    throw new Error('Invalid expression');
  }
  return Function(`"use strict"; return (${expr})`)();
}

/* ── Excel Import/Export ──────────────────────────────────────────────────── */
function importFromExcel(file) {
  if (typeof XLSX === 'undefined') {
    _toast('Excel library not loaded', 'error');
    console.error('[FlockDocs] XLSX library not available');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Get first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert sheet to our cell format
      const cells = {};
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      
      for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];
          
          if (cell && cell.v !== undefined && cell.v !== null && cell.v !== '') {
            // Convert Excel cell address (0-indexed) to our format (A1, B2, etc.)
            const colLetter = String.fromCharCode(65 + col);
            const rowNumber = row + 1;
            const ourCellId = `${colLetter}${rowNumber}`;
            
            // Check if it's a formula
            if (cell.f) {
              cells[ourCellId] = {
                formula: '=' + cell.f,
                value: cell.v?.toString() || ''
              };
            } else {
              cells[ourCellId] = {
                value: cell.v?.toString() || ''
              };
            }
          }
        }
      }
      
      // Extract filename without extension for document name
      const filename = file.name.replace(/\.[^/.]+$/, '');
      
      // Create new spreadsheet with imported data
      S.currentDoc = {
        id: null,
        name: filename || 'Imported Spreadsheet',
        type: 'spreadsheet',
        content: null,
        cells: cells,
        columnWidths: {},
        rowHeights: {},
        ownerId: S.user.uid,
        ownerName: S.user.displayName,
        shared: false,
        folderId: null,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      _openEditor();
      _toast(`Imported ${Object.keys(cells).length} cells from Excel`, 'success');
      console.log('[FlockDocs] Imported Excel file:', filename, 'with', Object.keys(cells).length, 'cells');
    } catch (err) {
      console.error('[FlockDocs] Error importing Excel file:', err);
      _toast('Failed to import Excel file', 'error');
    }
  };
  
  reader.onerror = () => {
    _toast('Failed to read file', 'error');
  };
  
  reader.readAsArrayBuffer(file);
}

function exportToExcel() {
  if (typeof XLSX === 'undefined') {
    _toast('Excel library not loaded', 'error');
    console.error('[FlockDocs] XLSX library not available');
    return;
  }

  if (!S.currentDoc || S.currentDoc.type !== 'spreadsheet') {
    _toast('No spreadsheet to export', 'error');
    return;
  }

  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Create worksheet data
    const worksheetData = {};
    
    // Convert our cells to Excel format
    for (const cellId in S.currentDoc.cells) {
      const cellData = S.currentDoc.cells[cellId];
      
      // Parse cell ID (e.g., "B5" -> col: 1, row: 4)
      const match = cellId.match(/^([A-Z]+)([0-9]+)$/);
      if (!match) continue;
      
      const colLetter = match[1];
      const rowNumber = parseInt(match[2]);
      
      // Convert column letter to number (A=0, B=1, etc.)
      const col = colLetter.charCodeAt(0) - 65;
      const row = rowNumber - 1;
      
      const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
      
      // Create Excel cell
      const excelCell = {};
      
      if (cellData.formula) {
        // Remove leading = from formula
        excelCell.f = cellData.formula.startsWith('=') ? cellData.formula.substring(1) : cellData.formula;
        excelCell.v = cellData.value || '';
      } else {
        const value = cellData.value || '';
        // Try to parse as number
        if (!isNaN(value) && value !== '') {
          excelCell.v = parseFloat(value);
          excelCell.t = 'n';
        } else {
          excelCell.v = value;
          excelCell.t = 's';
        }
      }
      
      worksheetData[cellAddress] = excelCell;
    }
    
    // Calculate range
    let maxRow = 0;
    let maxCol = 0;
    for (const cellId in S.currentDoc.cells) {
      const match = cellId.match(/^([A-Z]+)([0-9]+)$/);
      if (match) {
        const col = match[1].charCodeAt(0) - 65;
        const row = parseInt(match[2]) - 1;
        if (row > maxRow) maxRow = row;
        if (col > maxCol) maxCol = col;
      }
    }
    
    worksheetData['!ref'] = XLSX.utils.encode_range({
      s: { r: 0, c: 0 },
      e: { r: maxRow, c: maxCol }
    });
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheetData, 'Sheet1');
    
    // Generate Excel file and download
    const filename = (S.currentDoc.name || 'spreadsheet') + '.xlsx';
    XLSX.writeFile(workbook, filename);
    
    _toast('Exported to ' + filename, 'success');
    console.log('[FlockDocs] Exported spreadsheet to:', filename);
  } catch (err) {
    console.error('[FlockDocs] Error exporting to Excel:', err);
    _toast('Failed to export to Excel', 'error');
  }
}

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function _checkFirebase() {
  if (typeof firebase === 'undefined' || !firebase.firestore) {
    console.error('[FlockDocs] Firebase not initialized');
    _toast('Database connection error', 'error');
    return false;
  }
  return true;
}

function _isMockUser() {
  return S.user && S.user.uid === 'dev-user';
}

function _loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem(STORE_KEY_DOCS);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('[FlockDocs] Error loading from localStorage:', err);
    return [];
  }
}

function _saveToLocalStorage(documents) {
  try {
    localStorage.setItem(STORE_KEY_DOCS, JSON.stringify(documents));
  } catch (err) {
    console.error('[FlockDocs] Error saving to localStorage:', err);
  }
}

function _getDocIcon(type) {
  const kind = _normalizeDocType(type);
  const icons = {
    document: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/></svg>`,
    note: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h8M8 10h8M8 14h5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3h14a2 2 0 012 2v10.5L15.5 21H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg>`,
    prayer: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21s-7-4.35-7-10a7 7 0 1114 0c0 5.65-7 10-7 10z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.5 10.5h5M12 8v5"/></svg>`,
    journal: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6M9 12h5"/></svg>`,
    calendar: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 2v4m8-4v4M4 10h16M6 5h12a2 2 0 012 2v13H4V7a2 2 0 012-2z"/></svg>`,
    spreadsheet: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-2h2v2zm0-4H7v-2h2v2zm0-4H7V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>`,
    presentation: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/></svg>`,
  };
  return icons[kind] || icons.document;
}

function _normalizeDocType(type) {
  if (type === 'spreadsheet' || type === 'note' || type === 'presentation' || type === 'prayer' || type === 'journal' || type === 'calendar') return type;
  return 'document';
}

function _getDocTypeLabel(type) {
  const labels = {
    document: 'Document',
    note: 'Note',
    prayer: 'Prayer Request',
    journal: 'Journal Entry',
    calendar: 'Calendar Event',
    spreadsheet: 'Spreadsheet',
    presentation: 'Presentation',
  };
  return labels[_normalizeDocType(type)] || 'Document';
}

function _formatDate(date) {
  if (!date) return 'Unknown';
  
  // Handle Firestore Timestamp
  if (date && typeof date.toDate === 'function') {
    date = date.toDate();
  } else if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function _e(str) {
  return String(str ?? '').replace(/[&<>"']/g, c =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function _toast(msg, type = 'info') {
  console.log(`[FlockDocs] ${type.toUpperCase()}: ${msg}`);
  // TODO: Implement toast UI
}

function _getDocSize(doc) {
  if (!doc) return null;
  
  let bytes = 0;
  
  if (doc.type === 'spreadsheet' && doc.cells) {
    // Estimate spreadsheet size based on cell count and content
    const cellCount = Object.keys(doc.cells).length;
    const cellDataStr = JSON.stringify(doc.cells);
    bytes = cellDataStr.length;
  } else if (doc.content) {
    // Document size based on HTML content
    bytes = doc.content.length;
  }
  
  // Convert bytes to human-readable format
  if (bytes === 0) return null;
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ── Modal Dialogs ─────────────────────────────────────────────────────────── */
function _showModal(title, bodyHtml, footerHtml) {
  const overlay = document.getElementById('fd-modal-overlay');
  const titleEl = document.getElementById('fd-modal-title');
  const bodyEl = document.getElementById('fd-modal-body');
  const footerEl = document.getElementById('fd-modal-footer');
  
  if (!overlay || !titleEl || !bodyEl || !footerEl) return;
  
  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  footerEl.innerHTML = footerHtml;
  overlay.classList.add('is-open');
}

function _closeModal() {
  const overlay = document.getElementById('fd-modal-overlay');
  if (overlay) overlay.classList.remove('is-open');
}

function _showConfirmDialog(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
  return new Promise((resolve) => {
    const bodyHtml = `<p class="fd-modal-text">${_e(message)}</p>`;
    const footerHtml = `
      <button class="fd-btn fd-btn--ghost" onclick="window._modalResolve(false)">
        ${_e(cancelText)}
      </button>
      <button class="fd-btn fd-btn--primary" onclick="window._modalResolve(true)">
        ${_e(confirmText)}
      </button>
    `;
    
    window._modalResolve = (result) => {
      _closeModal();
      delete window._modalResolve;
      resolve(result);
    };
    
    _showModal(title, bodyHtml, footerHtml);
  });
}

function _showInputDialog(title, label, defaultValue = '') {
  return new Promise((resolve) => {
    const bodyHtml = `
      <div class="fd-form-group">
        <label class="fd-form-label">${_e(label)}</label>
        <input type="text" class="fd-form-input" id="fd-dialog-input" value="${_e(defaultValue)}" autofocus>
      </div>
    `;
    const footerHtml = `
      <button class="fd-btn fd-btn--ghost" onclick="window._modalResolve(null)">
        Cancel
      </button>
      <button class="fd-btn fd-btn--primary" onclick="window._modalResolve(document.getElementById('fd-dialog-input').value)">
        OK
      </button>
    `;
    
    window._modalResolve = (result) => {
      _closeModal();
      delete window._modalResolve;
      resolve(result);
    };
    
    _showModal(title, bodyHtml, footerHtml);
    
    // Focus input and handle Enter key
    setTimeout(() => {
      const input = document.getElementById('fd-dialog-input');
      if (input) {
        input.focus();
        input.select();
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            window._modalResolve(input.value);
          }
        });
      }
    }, 100);
  });
}

function _showFolderSelector(title, currentFolderId = null) {
  return new Promise((resolve) => {
    const folderOptions = [
      `<option value="">📁 Root (No folder)</option>`,
      ...S.folders.map(f => 
        `<option value="${f.id}" ${f.id === currentFolderId ? 'selected' : ''}>
          📁 ${_e(f.name)}
        </option>`
      )
    ].join('');
    
    const bodyHtml = `
      <div class="fd-form-group">
        <label class="fd-form-label">Select folder:</label>
        <select class="fd-form-select" id="fd-folder-select">
          ${folderOptions}
        </select>
      </div>
    `;
    const footerHtml = `
      <button class="fd-btn fd-btn--ghost" onclick="window._modalResolve(null)">
        Cancel
      </button>
      <button class="fd-btn fd-btn--primary" onclick="window._modalResolve(document.getElementById('fd-folder-select').value)">
        Move
      </button>
    `;
    
    window._modalResolve = (result) => {
      _closeModal();
      delete window._modalResolve;
      resolve(result);
    };
    
    _showModal(title, bodyHtml, footerHtml);
  });
}

/* ── Context Menu ──────────────────────────────────────────────────────────── */
function _showContextMenu(event, docId) {
  event.preventDefault();
  event.stopPropagation();
  
  const doc = S.documents.find(d => d.id === docId);
  if (!doc) return;
  
  const menu = document.getElementById('fd-context-menu');
  if (!menu) return;
  
  const menuHtml = _isSystemDoc(doc) ? `
    <button class="fd-context-item" onclick="_contextAction('open', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
      Open
    </button>
    <div class="fd-context-divider"></div>
    <button class="fd-context-item is-danger" onclick="_contextAction('delete', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
      Delete record
    </button>
  ` : `
    <button class="fd-context-item" onclick="_contextAction('open', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
      </svg>
      Open
    </button>
    <button class="fd-context-item" onclick="_contextAction('rename', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
      Rename
    </button>
    <button class="fd-context-item" onclick="_contextAction('move', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
      </svg>
      Move to folder
    </button>
    <div class="fd-context-divider"></div>
    <button class="fd-context-item" onclick="_contextAction('share', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
      </svg>
      ${doc.shared ? 'Unshare' : 'Share with church'}
    </button>
    <div class="fd-context-divider"></div>
    <button class="fd-context-item is-danger" onclick="_contextAction('delete', '${docId}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
      Delete
    </button>
  `;
  
  menu.innerHTML = menuHtml;
  
  // Position menu
  const x = event.clientX;
  const y = event.clientY;
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.classList.add('is-open');

  // Clamp to viewport so menu never bleeds off the right or bottom edge
  const rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth - 8) {
    menu.style.left = Math.max(8, x - rect.width) + 'px';
  }
  if (rect.bottom > window.innerHeight - 8) {
    menu.style.top = Math.max(8, y - rect.height) + 'px';
  }

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('click', _closeContextMenu);
  }, 0);
}

function _closeContextMenu() {
  const menu = document.getElementById('fd-context-menu');
  if (menu) menu.classList.remove('is-open');
  document.removeEventListener('click', _closeContextMenu);
}

function _contextAction(action, docId) {
  _closeContextMenu();
  
  switch (action) {
    case 'open':
      FlockDocs.openDocument(docId);
      break;
    case 'rename':
      FlockDocs.renameDocument(docId);
      break;
    case 'move':
      FlockDocs.moveToFolder(docId);
      break;
    case 'share':
      FlockDocs.shareDocument(docId);
      break;
    case 'delete':
      FlockDocs.deleteDocument(docId);
      break;
  }
}

function _selectFolder(folderId) {
  S.currentFolder = folderId;
  _loadDocuments();
}

/* ── Export for HTML onclick handlers ──────────────────────────────────────── */
window._showContextMenu = _showContextMenu;
window._closeModal = _closeModal;
window._contextAction = _contextAction;
window._selectFolder = _selectFolder;
