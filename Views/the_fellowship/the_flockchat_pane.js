/* ══════════════════════════════════════════════════════════════════════════════
   THE FLOCKCHAT PANE — Embedded standalone FlockChat
   "Let no corrupt communication proceed out of your mouth." — Ephesians 4:29

   The local app.flockchat PWA is the source of truth for the chat surface
   (legacy + offline + all the polish that already lives in app.flockchat).
   We embed it here so the user never leaves FlockOS to use it.
   ══════════════════════════════════════════════════════════════════════════════ */

export function renderFlockchatPane(host, ctx = {}) {
  if (!host) return () => {};
  host.innerHTML = `
    <div class="fc-pane">
      <div data-bind="frame" class="fc-pane-frame"></div>
    </div>
  `;

  const frameHost = host.querySelector('[data-bind="frame"]');
  const handoff   = buildHandoff(ctx);
  const url       = buildLocalFlockchatUrl(handoff);

  const frame = document.createElement('iframe');
  frame.setAttribute('data-flockchat', '');
  frame.setAttribute('title', 'FlockChat');
  frame.setAttribute('allow', 'autoplay; clipboard-read; clipboard-write; microphone; camera; notifications; web-share');
  frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  frame.src = url;
  frameHost.replaceChildren(frame);

  return () => { /* iframe disposed with host */ };
}

function buildHandoff(ctx = {}) {
  const query = ctx?.handoff || ctx?.launchIntent || ctx || {};
  const handoff = {};

  if (query.church) handoff.church = query.church;
  if (query.conversationId) handoff.conversationId = query.conversationId;
  if (query.channel) handoff.channel = query.channel;
  if (query.dm) handoff.dm = query.dm;
  if (query.source) handoff.source = query.source;
  if (query.return) handoff.return = query.return;
  if (query.returnTo) handoff.return = query.returnTo;

  if (!handoff.source) handoff.source = 'the_fellowship';
  if (!handoff.return) handoff.return = window.location.href;

  return handoff;
}

function buildLocalFlockchatUrl(handoff = {}) {
  const base = window.location.href.replace(/\/app\.flockos\/[^?#]*.*$/, '');
  const url = new URL(`${base}/app.flockchat/app.flockchat.html`);
  Object.entries(handoff).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  url.searchParams.set('embed', '1');
  return url.toString();
}
