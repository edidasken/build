/* ══════════════════════════════════════════════════════════════════════════════
   THE MEMBER PANE — Right-side member list (presence + open DM)
   "Be of one mind, live in peace." — 2 Corinthians 13:11

   Optional pane that views can render alongside a thread. Included now so
   the import path exists; not mounted by default in Phase I.
   ══════════════════════════════════════════════════════════════════════════════ */

import { presence, dms } from '../../Scripts/the_upper_room/index.js';

export function renderMemberPane(host, { members = [] } = {}) {
  if (!host) return () => {};
  host.classList.add('member-pane');
  host.innerHTML = members.map(_row).join('') ||
    `<div class="view-empty member-pane-empty">No one to show.</div>`;

  let unwatch = () => {};
  presence.watch(members.map((m) => m.uid).filter(Boolean), (map) => {
    host.querySelectorAll('[data-uid]').forEach((el) => {
      const p = map[el.dataset.uid];
      const dot = el.querySelector('.dot');
      if (dot) dot.classList.toggle('is-online', Boolean(p && p.state === 'online'));
    });
  }).then((u) => { unwatch = u; }).catch(() => {});

  host.addEventListener('click', async (e) => {
    const t = e.target.closest('[data-uid]');
    if (!t) return;
    try { await dms.openWith(t.dataset.uid); } catch (_) {}
  });

  return () => { try { unwatch(); } catch (_) {} };
}

function _row(m) {
  return `
    <button type="button" data-uid="${_e(m.uid || '')}" class="member-row">
      <span class="dot member-dot"></span>
      <span>${_e(m.name || m.uid || '?')}</span>
    </button>`;
}
function _e(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
