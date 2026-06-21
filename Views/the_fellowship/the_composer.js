/* ══════════════════════════════════════════════════════════════════════════════
   THE COMPOSER — Message composer
   "Death and life are in the power of the tongue." — Proverbs 18:21
   ══════════════════════════════════════════════════════════════════════════════ */

import { messages, typing, attachments, emoji } from '../../Scripts/the_upper_room/index.js';
import { raiseToast } from '../../Scripts/vessels/the_staff.js';

export function renderComposer(host, { channelId }) {
  if (!host || !channelId) return () => {};
  host.innerHTML = `
    <div class="fc-composer-box">
      <button type="button" data-act="emoji"  title="Emoji"
              class="fc-composer-tool">🙂</button>
      <button type="button" data-act="attach" title="Attach"
              class="fc-composer-tool">📎</button>
      <textarea rows="1" placeholder="Speak in love…" class="fc-composer-input"></textarea>
      <input type="file" hidden>
      <flock-button tone="primary" data-act="send">Send</flock-button>
    </div>
  `;
  const ta    = host.querySelector('textarea');
  const file  = host.querySelector('input[type=file]');

  function autosize() { ta.style.height = 'auto'; ta.style.height = Math.min(140, ta.scrollHeight) + 'px'; }
  ta.addEventListener('input', () => { autosize(); typing.ping(channelId); });

  async function send() {
    const body = ta.value.trim();
    if (!body) return;
    ta.value = ''; autosize();
    try { await messages.send(channelId, body); }
    catch (e) { raiseToast({ tone: 'warn', message: e.message || 'Could not send.' }); }
  }

  host.addEventListener('click', async (e) => {
    const t = e.target.closest('[data-act]');
    if (!t) return;
    if (t.dataset.act === 'send')   return send();
    if (t.dataset.act === 'attach') return file.click();
    if (t.dataset.act === 'emoji')  {
      const sym = await emoji.pick(t);
      if (sym) { ta.value += sym; ta.focus(); autosize(); }
    }
  });

  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });

  file.addEventListener('change', async () => {
    const f = file.files && file.files[0];
    if (!f) return;
    const v = attachments.validate(f);
    if (!v.ok) { raiseToast({ tone: 'warn', message: v.message }); file.value = ''; return; }
    try {
      const meta = await attachments.upload(f, { channelId });
      await messages.send(channelId, `📎 ${meta.name} ${meta.url}`);
    } catch (err) {
      raiseToast({ tone: 'warn', message: err.message || 'Upload failed.' });
    } finally { file.value = ''; }
  });

  return () => { /* nothing to tear down */ };
}
