/* ══════════════════════════════════════════════════════════════════════════════
   THE INTERACTIONS PANE — GAS interaction ledger (TheScrolls)
   "And the books were opened." — Revelation 20:12

   The pastoral conversation ledger: calls, sms, emails, visits, notes,
   prayers, pastoral actions. Backed by Google Apps Script via TheVine.
   This is the "did we touch this person, when, why" surface — distinct from
   the live Firebase chat.
   ══════════════════════════════════════════════════════════════════════════════ */

import * as scrolls from '../../Scripts/the_scrolls/index.js';

export function renderInteractionsPane(host /*, ctx */) {
  if (!host) return () => {};
  host.innerHTML = `
    <div class="ix-pane">
      <div class="ix-toolbar">
        <select id="ix-type" class="ix-control ix-type">
          <option value="">All types</option>
        </select>
        <input type="search" placeholder="Search…" id="ix-q" class="ix-control ix-search">
        <button type="button" data-act="refresh" class="flock-btn ix-refresh">Refresh</button>
      </div>
      <div data-bind="list" class="ix-list">
        <flock-skeleton rows="6"></flock-skeleton>
      </div>
    </div>
  `;

  const sel  = host.querySelector('#ix-type');
  const list = host.querySelector('[data-bind="list"]');
  const q    = host.querySelector('#ix-q');

  scrolls.types().then((t = {}) => {
    const types = Object.keys(t);
    types.forEach((k) => {
      const opt = document.createElement('option');
      opt.value = k;
      opt.textContent = t[k].label || k;
      sel.appendChild(opt);
    });
  }).catch(() => {});

  async function refresh() {
    list.innerHTML = `<flock-skeleton rows="6"></flock-skeleton>`;
    try {
      const rows = await scrolls.timeline(null, 100);
      const filtered = (rows || [])
        .filter((r) => !sel.value || r.type === sel.value)
        .filter((r) => !q.value.trim() || JSON.stringify(r).toLowerCase().includes(q.value.toLowerCase()));
      list.innerHTML = filtered.length
        ? filtered.map(_row).join('')
        : `<div class="view-empty ix-empty">No interactions match.</div>`;
    } catch (_) {
      list.innerHTML = `<div class="view-empty ix-empty">Pastoral ledger unavailable right now.</div>`;
    }
  }

  host.addEventListener('click', (e) => { if (e.target.closest('[data-act="refresh"]')) refresh(); });
  sel.addEventListener('change', refresh);
  q.addEventListener('input', () => clearTimeout(host._t) || (host._t = setTimeout(refresh, 200)));
  refresh();

  return () => { clearTimeout(host._t); };
}

function _row(r) {
  return `
    <div class="ix-row">
      <div class="ix-icon">${_e(r.icon || '•')}</div>
      <div class="ix-body">
        <div class="ix-title">${_e(r.label || r.type || 'Interaction')}</div>
        <div class="ix-detail">${_e(r.detail || '')}</div>
      </div>
      <div class="ix-time">${_when(r.ts || r.timestamp)}</div>
    </div>`;
}
function _when(ts) {
  if (!ts) return '';
  try { return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); }
  catch (_) { return ''; }
}
function _e(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
