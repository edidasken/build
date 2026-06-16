/* ══════════════════════════════════════════════════════════════════════════════
   FINE LINEN — FlockOS Design System
   Legacy theme API, locked to the Herald theme.

   USAGE:
     Adornment.init();                     — auto-applies saved theme on load
     Adornment.setTheme('herald');         — apply Herald
     Adornment.getTheme();                 — returns current theme name
     Adornment.themes                      — array of all valid theme names

   STORAGE:
     TheVine.flock.preferences.get/update  — synced to server (auth users)
     localStorage 'flock_theme'            — fallback (public / offline)

   INJECTION:
     Appends a <style id="adornment-css"> to <head>.
     Sets data-theme on <html>.
   ══════════════════════════════════════════════════════════════════════════════ */

const Adornment = (() => {

  /* ─── THEME REGISTRY ──────────────────────────────────────────────────────── */

  const THEMES = ['herald'];

  const DEFAULT_THEME = 'herald';
  const STORAGE_KEY   = 'flock_theme';
  // CSS is now loaded via new_covenant.css (merged single file); embedded CSS and STYLE_ID removed.


  /* ─── INTERNAL HELPERS ────────────────────────────────────────────────────── */

  // _inject() removed; CSS is loaded via <link> to new_covenant.css (merged single file)

  function _apply(name) {
    document.documentElement.setAttribute('data-theme', name);
  }

  /* ── Theme metadata for swatch rendering ─────────────────────────────────── */
  const THEME_META = {
    herald: { label: 'Herald', bg: '#f8fafc', accent: '#f7c756', mode: 'light' },
  };

  /* ─── PUBLIC API ──────────────────────────────────────────────────────────── */

  /** Key used to cache the admin global override locally. */
  const GLOBAL_THEME_KEY = 'flock_global_theme';

  /**
   * init()
   * Injects CSS and applies the saved theme.
   * Always applies Herald. Stale saved custom themes are cleared during boot.
   * Call once on page load, before anything renders.
   */
  function init() {
    // _inject() removed; CSS is loaded via <link> to new_covenant.css (merged single file)
    loadOverrides(); // Apply Interface Studio overrides immediately

    // Custom themes disabled — always apply the Herald theme.
    // Clear any stored theme overrides so stale dark/custom themes never persist.
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(GLOBAL_THEME_KEY);
    localStorage.removeItem('flock_allow_custom_themes');
    _apply(DEFAULT_THEME);

    // Custom themes disabled — no async theme fetching.
  }

  /** Sync theme from user's saved preferences (only called when custom themes are allowed). */
  function _syncUserPref() {
    var _fbMode = typeof UpperRoom !== 'undefined' && typeof Modules !== 'undefined' && Modules._isFirebaseComms && Modules._isFirebaseComms();
    if (_fbMode) {
      UpperRoom.getUserPreferences().then(prefs => {
        if (prefs && prefs.theme && prefs.theme !== DEFAULT_THEME) _apply(DEFAULT_THEME);
      }).catch(() => {});
    } else if (typeof TheVine !== 'undefined' && TheVine.flock && TheVine.flock.preferences) {
      TheVine.flock.preferences.get().then(prefs => {
        if (prefs && prefs.theme && prefs.theme !== DEFAULT_THEME) _apply(DEFAULT_THEME);
      }).catch(() => {});
    }
  }

  /**
   * setTheme(name)
   * Apply a named theme and persist it.
   * Saves to localStorage always; syncs to TheVine if authenticated.
   */
  function setTheme(name) {
    if (name && name !== DEFAULT_THEME) {
      console.warn(`Adornment.setTheme: "${name}" is no longer available; using Herald.`);
    }
    _apply(DEFAULT_THEME);
    localStorage.setItem(STORAGE_KEY, DEFAULT_THEME);

    var _fbMode = typeof UpperRoom !== 'undefined' && typeof Modules !== 'undefined' && Modules._isFirebaseComms && Modules._isFirebaseComms();
    if (_fbMode) {
      UpperRoom.updateUserPreferences({ theme: DEFAULT_THEME }).catch(() => {});
    } else if (typeof TheVine !== 'undefined' && TheVine.flock && TheVine.flock.preferences) {
      TheVine.flock.preferences.update({ theme: DEFAULT_THEME }).catch(() => {});
    }
  }

  /**
   * getTheme()
   * Returns the currently active theme name from the <html> attribute.
   */
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
  }

  /**
   * getGlobalTheme()
   * Returns the cached admin global override ('default' or a theme name).
   */
  function getGlobalTheme() {
    return localStorage.getItem(GLOBAL_THEME_KEY) || 'default';
  }

  /* ═══════════════════════════════════════════════════════════════════════
     INTERFACE OVERRIDES
     Applies a map of CSS custom property overrides + font-family + any
     component-level custom CSS.  Called by the Interface Studio in Settings.
     ═══════════════════════════════════════════════════════════════════════ */
  var OVERRIDE_STYLE_ID = 'adornment-overrides';
  var OVERRIDE_LS_KEY   = 'flock_interface_overrides';

  /**
   * applyOverrides(obj)
   *   obj.vars   — {  '--radius-sm': '4px', '--shadow-sm': 'none', … }
   *   obj.fonts  — { body: 'Lora, serif', heading: 'Montserrat, sans-serif' }
   *   obj.sizes  — { '.btn': '0.9rem', '.card .card-title': '1rem', … }
   *   obj.pads   — { '.card': '1.5rem', '.btn': '0.6rem 1.5rem', … }
   *   obj.custom — raw CSS string appended at the end
   */
  function applyOverrides(obj) {
    if (!obj) obj = {};
    var el = document.getElementById(OVERRIDE_STYLE_ID);
    if (!el) {
      el = document.createElement('style');
      el.id = OVERRIDE_STYLE_ID;
      document.head.appendChild(el);
    }

    var css = '';

    // 1) CSS variable overrides (on :root so they win over theme selectors)
    var vars = obj.vars || {};
    var varEntries = Object.keys(vars);
    if (varEntries.length) {
      css += ':root {\n';
      varEntries.forEach(function(k) { css += '  ' + k + ': ' + vars[k] + ';\n'; });
      css += '}\n';
    }

    // 2) Font-family overrides
    var fonts = obj.fonts || {};
    if (fonts.body) {
      css += 'html { font-family: ' + fonts.body + '; }\n';
    }
    if (fonts.heading) {
      css += 'h1, h2, h3, h4, h5, h6, .settings-section-title, .page-header h1, .welcome-hero h1, .modal-title, .ur-hero-title, .dev-welcome-title { font-family: ' + fonts.heading + '; }\n';
    }

    // 3) Font-size overrides per selector
    var sizes = obj.sizes || {};
    Object.keys(sizes).forEach(function(sel) {
      css += sel + ' { font-size: ' + sizes[sel] + '; }\n';
    });

    // 4) Padding overrides per selector
    var pads = obj.pads || {};
    Object.keys(pads).forEach(function(sel) {
      css += sel + ' { padding: ' + pads[sel] + '; }\n';
    });

    // 5) Raw custom CSS
    if (obj.custom) css += obj.custom + '\n';

    el.textContent = css;
  }

  /**
   * loadOverrides()  — reads from localStorage and applies
   */
  function loadOverrides() {
    try {
      var raw = localStorage.getItem(OVERRIDE_LS_KEY);
      if (raw) applyOverrides(JSON.parse(raw));
    } catch(e) { /* ignore corrupt data */ }
  }

  /**
   * clearOverrides()
   */
  function clearOverrides() {
    var el = document.getElementById(OVERRIDE_STYLE_ID);
    if (el) el.textContent = '';
    localStorage.removeItem(OVERRIDE_LS_KEY);
  }

  // ── Lazy Studio Font Loader ─────────────────────────────────────────────
  // Core fonts (Noto Sans, Hebrew, Serif) are in the HTML <link>.
  // Studio/theme fonts are loaded on-demand when the theme picker opens.
  var _studioFontsLoaded = false;
  function loadStudioFonts() {
    if (_studioFontsLoaded) return;
    _studioFontsLoaded = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?'
      + 'family=Lora:ital,wght@0,400;0,700;1,400'
      + '&family=Merriweather:ital,wght@0,400;0,700;1,400'
      + '&family=Montserrat:wght@400;600;700'
      + '&family=Nunito:wght@400;600;700'
      + '&family=Open+Sans:wght@400;600;700'
      + '&family=Poppins:wght@400;600;700'
      + '&family=Playfair+Display:ital,wght@0,400;0,700;1,400'
      + '&family=PT+Serif:ital,wght@0,400;0,700;1,400'
      + '&family=Raleway:wght@400;600;700'
      + '&family=Roboto:wght@400;500;700'
      + '&family=Roboto+Slab:wght@400;600;700'
      + '&family=Source+Sans+3:wght@400;600;700'
      + '&family=Work+Sans:wght@400;600;700'
      + '&display=swap';
    document.head.appendChild(link);
  }

  return {
    themes:    THEMES,
    themeMeta: THEME_META,
    init,
    setTheme,
    getTheme,
    getGlobalTheme,
    applyOverrides,
    loadOverrides,
    clearOverrides,
    loadStudioFonts,
    OVERRIDE_LS_KEY: OVERRIDE_LS_KEY
  };

})();
