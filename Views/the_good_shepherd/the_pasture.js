/* ══════════════════════════════════════════════════════════════════════════════
   THE PASTURE — Greeting / hero strip for the_good_shepherd
   "He maketh me to lie down in green pastures." — Psalm 23:2
   ══════════════════════════════════════════════════════════════════════════════ */

export function renderPasture(me) {
  const greeting = _timeGreeting();
  const first    = _firstName(me);
  const name     = first ? ` ${_e(first)}` : '';
  return `
    <header class="pasture-hero page-hero">
      <div class="pasture-hero-copy">
        <div class="pasture-kicker">FlockOS Today</div>
        <div class="pasture-date">${_today()}</div>
        <h1 class="page-hero-title">${greeting}${name}.</h1>
        <p class="pasture-tagline page-hero-sub">Be still, and know. The flock is gathered below.</p>
        <p class="page-hero-scripture">&ldquo;I am the good shepherd. I know my own and my own know me.&rdquo; &mdash; John 10:14</p>
        <div class="pasture-actions" aria-label="Pastoral quick actions">
          <button type="button" class="pasture-action pasture-action--know" data-pasture-jump="the_fold">
            <span class="pasture-action-icon" aria-hidden="true">◎</span>
            <span>Know the flock</span>
          </button>
          <button type="button" class="pasture-action pasture-action--feed" data-pasture-jump="the_upper_room">
            <span class="pasture-action-icon" aria-hidden="true">✦</span>
            <span>Feed the soul</span>
          </button>
          <button type="button" class="pasture-action pasture-action--guard" data-pasture-jump="the_life">
            <span class="pasture-action-icon" aria-hidden="true">◇</span>
            <span>Guard the weak</span>
          </button>
        </div>
      </div>
      <div class="pasture-hero-aside" aria-label="Pastoral care rhythm">
        <div class="pasture-compass" aria-hidden="true">
          <span class="pasture-compass-ring"></span>
          <span class="pasture-compass-mark pasture-compass-mark--top">K</span>
          <span class="pasture-compass-mark pasture-compass-mark--right">F</span>
          <span class="pasture-compass-mark pasture-compass-mark--bottom">G</span>
        </div>
        <span>Know</span>
        <span>Feed</span>
        <span>Guard</span>
      </div>
    </header>
  `;
}

function _firstName(me) {
  if (!me) return '';
  const raw = me.firstName || me.preferredName
           || (me.displayName ? String(me.displayName).trim().split(/\s+/)[0] : '')
           || (me.name        ? String(me.name).trim().split(/\s+/)[0]        : '')
           || (me.email       ? String(me.email).split('@')[0]                 : '');
  return raw || '';
}

function _timeGreeting() {
  const h = new Date().getHours();
  if (h < 5)  return 'Peace to you tonight';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Peace to you tonight';
}

function _today() {
  try {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric'
    });
  } catch (_) {
    return new Date().toDateString();
  }
}

function _e(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
