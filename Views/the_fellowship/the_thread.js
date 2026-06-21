/* ══════════════════════════════════════════════════════════════════════════════
   THE THREAD — Message stream + composer for one channel
   "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend." — Pr 27:17
   ══════════════════════════════════════════════════════════════════════════════ */

import { messages, typing }   from '../../Scripts/the_upper_room/index.js';
import { renderMessage }      from './the_message.js';
import { renderComposer }     from './the_composer.js';

export function renderThread(host, { channelId }) {
  if (!host || !channelId) return () => {};
  host.innerHTML = `
    <div class="thread-pane">
      <div data-bind="stream" class="thread-stream">
        <flock-skeleton rows="6"></flock-skeleton>
      </div>
      <div data-bind="typing" class="thread-typing"></div>
      <div data-bind="composer"></div>
    </div>
  `;
  const stream  = host.querySelector('[data-bind="stream"]');
  const typBox  = host.querySelector('[data-bind="typing"]');
  const compose = host.querySelector('[data-bind="composer"]');

  let stopComposer = renderComposer(compose, { channelId });
  let unwatchMsgs  = () => {};
  let unwatchTyp   = () => {};

  messages.watch(channelId, (rows = []) => {
    stream.innerHTML = rows.length
      ? rows.map((m) => renderMessage(m)).join('')
      : `<div class="view-empty">No messages yet. Be the first.</div>`;
    stream.scrollTop = stream.scrollHeight;
  }).then((u) => { unwatchMsgs = u; }).catch(() => {});

  typing.watch(channelId, (uids = []) => {
    typBox.textContent = uids.length
      ? `${uids.length} ${uids.length === 1 ? 'person is' : 'people are'} typing…`
      : '';
  }).then((u) => { unwatchTyp = u; }).catch(() => {});

  return () => {
    try { stopComposer(); } catch (_) {}
    try { unwatchMsgs();  } catch (_) {}
    try { unwatchTyp();   } catch (_) {}
  };
}
