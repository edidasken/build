/* ══════════════════════════════════════════════════════════════════════════════
   THE GOSPEL: THE WHY — About GROW
   "For it is God who works in you to will and to act." — Philippians 2:13
   ══════════════════════════════════════════════════════════════════════════════ */

import { esc, sectionHead } from './the_gospel_shared.js';

export const name        = 'the_gospel_why';
export const title       = 'The Why';
export const description = 'Why GROW exists and how it serves the church.';
export const accent      = '#b8871e';

export function render() {
  return /* html */`
    <section class="grow-page" data-grow="why">
      <header class="grow-hero" style="--grow-accent:${accent}">
        <div class="grow-hero-icon">i</div>
        <div class="grow-hero-text">
          <h1 class="grow-hero-title">${title}</h1>
          <p class="grow-hero-sub">${esc(description)}</p>
        </div>
      </header>

      <article class="grow-detail-panel">
        <div class="fn-lead-theme">Public discipleship desk</div>
        <h2 class="grow-detail-title">GROW gathers the church's formation resources into one Herald-style page.</h2>
        <p class="grow-detail-body">It is built for daily Scripture, devotion, doctrine, apologetics, missions, biblical care, word study, teaching plans, and preached messages. The goal is simple: help people keep growing without sending them through a maze of disconnected tools.</p>
        <p class="grow-detail-body">The static study bundles in <code>Data/*.js</code> render directly in the public GROW page, while signed-in church records can still appear where a live backend is available.</p>
      </article>

      ${sectionHead('What GROW brings together')}
      <div class="hg-section-grid hg-section-grid-wide">
        ${_card('Scripture', 'One Year Bible readings, Psalms, and focused reading plans keep the Word at the center.')}
        ${_card('Doctrine', 'Theology, apologetics, lexicon study, and Bible-library resources give structure to learning.')}
        ${_card('Formation', "Heart Check, Shepherd's Mirror, counseling topics, courses, and teaching plans move knowledge toward obedience.")}
        ${_card('Mission', 'World Missions and The Invitation keep discipleship tied to evangelism, prayer, and the Great Commission.')}
        ${_card('Church Memory', 'Sermons and church-created learning records can be surfaced when the member backend is available.')}
        ${_card('Public Access', 'The Herald shell keeps GROW usable as a public page without requiring the FlockOS app shell.')}
      </div>
    </section>
    `;
}

export function mount(_root) {
  return () => {};
}

function _card(title, body) {
  return /* html */`
    <article class="hg-section-card" style="min-height:132px;">
      <span class="hg-section-kicker">GROW</span>
      <span class="hg-section-title">${esc(title)}</span>
      <span class="hg-section-copy">${esc(body)}</span>
    </article>
  `;
}
