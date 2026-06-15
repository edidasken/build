/* ══════════════════════════════════════════════════════════════════════════════
   VIEW: THE FELLOWSHIP — Unified comms surface inside FlockOS
   "And they continued stedfastly… in fellowship." — Acts 2:42

   One page, one comms source of truth:
     • Embedded FlockChat — channels, direct messages, prayer chain, and live updates
   ══════════════════════════════════════════════════════════════════════════════ */

import { ensureVessels } from '../_frame.js';
import { renderFlockchatPane }     from './the_flockchat_pane.js';

export const name  = 'the_fellowship';
export const title = 'Fellowship';

export function render(/* params */) {
  return `
    <section class="fellowship-frame-view">
      <section data-pane="flockchat" class="fellowship-panel fellowship-panel--flockchat">
        <flock-skeleton rows="6"></flock-skeleton>
      </section>
    </section>
  `;
}

export function mount(root, ctx) {
  ensureVessels('the_chalice', 'the_seal', 'the_basin', 'the_mantle',
                'the_menorah', 'the_censer', 'the_signet', 'the_cup', 'the_rod', 'the_staff');

  const stops = [];
  const grab  = (k) => root.querySelector(`[data-pane="${k}"]`);

  stops.push(renderFlockchatPane(grab('flockchat'), ctx));

  return () => stops.forEach((fn) => { try { fn && fn(); } catch (_) {} });
}
