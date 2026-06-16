/* ══════════════════════════════════════════════════════════════════════════════
   THE ADORNMENT — Theme controller (New Covenant redesign)
   "Strength and honour are her clothing." — Proverbs 31:25

   Owns theme selection for the new shell. New Covenant now exposes one visual
   theme: Herald. The shared palette lives in herald-tokens.css and app-owned
   component styling lives in the matching Styles/*.css file.

       <html data-theme="herald">

   Persistence: localStorage key 'flock_theme', locked to 'herald'.

   Public API:
     applyTheme(name)        — set + persist + apply
     applyAuto()             — legacy alias for Herald
     current()               — the resolved theme name
     choices()               — array of { id, label, scheme }
     init()                  — run once on boot
   ══════════════════════════════════════════════════════════════════════════════ */

const KEY = 'flock_theme';
const THEME = 'herald';

const CHOICES = [
  { id: THEME, label: 'Herald', scheme: 'light' },
];

let _resolved = THEME;

export function choices() { return CHOICES.slice(); }
export function current() { return _resolved; }

export function applyTheme(name) {
  if (name && name !== THEME) {
    console.warn(`Adornment.applyTheme: "${name}" is no longer available; using Herald.`);
  }
  _set(THEME);
  try { localStorage.setItem(KEY, THEME); } catch (_) {}
}

export function applyAuto() {
  applyTheme(THEME);
}

export function init() {
  applyTheme(THEME);
}

/* ── internals ───────────────────────────────────────────────────────────── */
function _set(name) {
  _resolved = name;
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', name);
    // Keep the <meta name="theme-color"> in sync with the surface for nice
    // PWA chrome. Only adjust if a meta tag exists; never invent one.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', '#0f172a');
    }
  }
}
