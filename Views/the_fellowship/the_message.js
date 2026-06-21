/* ══════════════════════════════════════════════════════════════════════════════
   THE MESSAGE — Single message renderer
   "Let your speech be alway with grace, seasoned with salt." — Colossians 4:6
   ══════════════════════════════════════════════════════════════════════════════ */

import { render as renderMentions } from '../../Scripts/the_upper_room/the_mentions.js';

export function renderMessage(m) {
  if (!m) return '';
  // Firestore stores senderName/sentAt; legacy/GAS uses authorName/author/ts
  const author = _e(m.senderName || m.authorName || m.author || 'Unknown');
  const rawTs  = m.sentAt || m.ts;
  const ts     = rawTs ? _time(rawTs) : '';
  const initials = _initials(author);
  const body  = renderMentions(String(m.body || m.text || ''), m.knownMembers || []);
  return `
    <div class="msg">
      <div class="msg-avatar">${initials}</div>
      <div class="msg-body">
        <div class="msg-meta">
          <span class="msg-author">${author}</span>
          <span class="msg-time">${ts}</span>
        </div>
        <div class="msg-text">${body}</div>
      </div>
    </div>`;
}

function _initials(s) {
  return String(s).trim().split(/\s+/).slice(0, 2).map((p) => p[0] || '').join('').toUpperCase() || '?';
}
function _time(ts) {
  try {
    // Firestore Timestamp objects have a .seconds property
    const ms = ts?.seconds ? ts.seconds * 1000 : new Date(ts).getTime();
    if (!ms || isNaN(ms)) return '';
    return new Date(ms).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }
  catch (_) { return ''; }
}
function _e(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
