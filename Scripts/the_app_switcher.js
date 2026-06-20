/* ══════════════════════════════════════════════════════════════════════════════
   THE APP SWITCHER — Cross-app navigation popover
   "That they all may be one." — John 17:21

   Single source of truth for New Covenant apps + Launcher. Renders a
   compact "Apps" button that opens a popover listing every app with its
   canonical launcher SVG icon. Designed to drop into any app header so users
   are never trapped inside a single app.

   Usage (HTML):
     <button data-app-switcher data-app-switcher-current="flockos"></button>

   Or programmatic:
     import { mountSwitcher } from '/Scripts/the_app_switcher.js';
     mountSwitcher(buttonEl, { current: 'flockchat' });

   The script also auto-mounts on DOMContentLoaded for any element carrying
   the [data-app-switcher] attribute.

   All paths are relative to the New_Covenant root (every app sets
   <base href="../"> or the absolute GitHub equivalent), so they work
   identically from any app folder.
   ══════════════════════════════════════════════════════════════════════════════ */

import { canAccessUnityApp, hasUnitySession } from './the_unity_session.js';

/* Canonical SVGs — copied verbatim from New_Covenant/index.html (the launcher).
   These are the SINGLE SOURCE OF TRUTH for app iconography. Do not diverge. */
export const NC_APP_ICONS = {
  launcher:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  grow:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  bible:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/></svg>',
  invite:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="3" x2="12" y2="21"/><line x1="4.5" y1="8.5" x2="19.5" y2="8.5"/></svg>',
  flockos:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
  fold:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7c4 0 4 3 8 3s4-3 8-3"/><path d="M3 17c4 0 4 3 8 3s4-3 8-3"/><path d="M3 12h18"/></svg>',
  fellowship:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',
  care:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 8v6"/><path d="M9 11h6"/></svg>',
  prayer:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>',
  seasons:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  upperroom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
  service:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h3"/></svg>',
  quarterly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  missions:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  harvest:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V8"/><path d="M5 12c2-3 5-3 7-1 2-2 5-2 7 1"/><path d="M5 18c2-3 5-3 7-1 2-2 5-2 7 1"/></svg>',
  way:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 9h14"/></svg>',
  content:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  giving:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  weavers:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  admin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/></svg>',
  stand:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
  flockshow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16 10,8" fill="currentColor" stroke="none"/></svg>',
  flockchat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  flockdocs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13,2 13,9 20,9"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>',
  flockshamar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>',
  flocknews: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>',
  feed:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  wellspring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><line x1="12" y1="14" x2="12" y2="18" stroke-opacity="0.5"/></svg>',
  melchizedek: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><polyline points="9,12 11,14 15,10"/></svg>',
  multiply:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="7.5" y2="7.5"/><line x1="16.5" y1="16.5" x2="19" y2="19"/><line x1="19" y1="5" x2="16.5" y2="7.5"/><line x1="7.5" y1="16.5" x2="5" y2="19"/></svg>',
};

export const NC_APP_ICON_SRCS = {
  flocknews:   new URL('../Images/icon-herald.svg', import.meta.url).href,
  invite:      new URL('../Images/icon-invite.svg', import.meta.url).href,
  flockos:     new URL('../Images/icon-flockos.svg', import.meta.url).href,
  fold:        new URL('../Images/icon-flockos.svg', import.meta.url).href,
  care:        new URL('../Images/icon-flockos.svg', import.meta.url).href,
  workflows:   new URL('../Images/icon-flockos.svg', import.meta.url).href,
  prayer:      new URL('../Images/icon-chat.svg', import.meta.url).href,
  seasons:     new URL('../Images/icon-flockos.svg', import.meta.url).href,
  upperroom:   new URL('../Images/icon-flockos.svg', import.meta.url).href,
  service:     new URL('../Images/icon-flockos.svg', import.meta.url).href,
  quarterly:   new URL('../Images/icon-stand.svg', import.meta.url).href,
  missions:    new URL('../Images/icon-grow.svg', import.meta.url).href,
  harvest:     new URL('../Images/icon-grow.svg', import.meta.url).href,
  way:         new URL('../Images/icon-grow.svg', import.meta.url).href,
  content:     new URL('../Images/icon-flockdocs.svg', import.meta.url).href,
  giving:      new URL('../Images/icon-flockos.svg', import.meta.url).href,
  weavers:     new URL('../Images/icon-flockos.svg', import.meta.url).href,
  admin:       new URL('../Images/icon-melchizedek.svg', import.meta.url).href,
  announcements: new URL('../Images/icon-chat.svg', import.meta.url).href,
  events:      new URL('../Images/icon-flockos.svg', import.meta.url).href,
  forgive:     new URL('../Images/icon-grow.svg', import.meta.url).href,
  generations: new URL('../Images/icon-flockos.svg', import.meta.url).href,
  prayerful:   new URL('../Images/icon-chat.svg', import.meta.url).href,
  outreach:    new URL('../Images/icon-grow.svg', import.meta.url).href,
  analytics:   new URL('../Images/icon-flockos.svg', import.meta.url).href,
  deploy:      new URL('../Images/icon-flockos.svg', import.meta.url).href,
  bezalel:     new URL('../Images/icon-melchizedek.svg', import.meta.url).href,
  about:       new URL('../Images/icon-flockos.svg', import.meta.url).href,
  learn:       new URL('../Images/icon-grow.svg', import.meta.url).href,
  'truth-admin': new URL('../Images/icon-flockdocs.svg', import.meta.url).href,
  stand:       new URL('../Images/icon-stand.svg', import.meta.url).href,
  flockshow:   new URL('../Images/icon-show.svg', import.meta.url).href,
  flockchat:   new URL('../Images/icon-chat.svg', import.meta.url).href,
  flockdocs:   new URL('../Images/icon-flockdocs.svg', import.meta.url).href,
  flockshamar: new URL('../Images/icon-flockshamar.svg', import.meta.url).href,
  feed:        new URL('../Images/icon-feed.svg', import.meta.url).href,
  wellspring:  new URL('../Images/icon-wellspring.svg', import.meta.url).href,
  melchizedek: new URL('../Images/icon-melchizedek.svg', import.meta.url).href,
  grow:        new URL('../Images/icon-grow.svg', import.meta.url).href,
};

/* Canonical app catalog. Order = launcher order (Public first, then Secure). */
export const NC_APPS = [
  { id: 'flocknews', name: 'Herald',         sub: 'Daily spiritual content',        href: 'index.html',                      accent: '#e8a838', accentDk: '#b8871e', public: true },
  { id: 'bible',     name: 'Bible',          sub: 'ESV reader, notes & prayer',     href: 'app.bible/',                      accent: '#f7c756', accentDk: '#b8871e', public: true },
  { id: 'invite',    name: 'The Invitation', sub: 'Share the hope of Jesus Christ', href: 'app.invite/app.invite.html',       accent: '#f7c756', accentDk: '#b8871e', public: true },
  { id: 'flockos',   name: 'FlockOS',        sub: 'Church management',              href: 'app.flockos/app.flockos.html',     accent: '#3b82f6', accentDk: '#1e3a8a' },
  { id: 'fold',      name: 'The Fold',       sub: 'Members & flock care',           href: 'app.flockos/app.flockos.html?covenant=new&view=the_fold',          accent: '#3b82f6', accentDk: '#1e3a8a' },
  { id: 'care',      name: 'Care',           sub: 'Pastoral care & follow-up',      href: 'app.flockos/app.flockos.html?covenant=new&view=the_life',          accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'workflows', name: 'Workflows',      sub: 'Installed ministry procedures',  href: 'app.flockos/app.flockos.html?covenant=new&view=the_do',            accent: '#64748b', accentDk: '#334155' },
  { id: 'prayer',    name: 'Prayer',         sub: 'Prayer chain & requests',        href: 'app.flockos/app.flockos.html?covenant=new&view=the_prayer_chain',  accent: '#8b5cf6', accentDk: '#4c1d95' },
  { id: 'seasons',   name: 'Seasons',        sub: 'Calendar & events',              href: 'app.flockos/app.flockos.html?covenant=new&view=the_seasons',       accent: '#d97706', accentDk: '#92400e' },
  { id: 'upperroom', name: 'Upper Room',     sub: 'Devotion, journal & prayer',     href: 'app.flockos/app.flockos.html?covenant=new&view=the_upper_room',    accent: '#ef4444', accentDk: '#7f1d1d' },
  { id: 'grow',      name: 'Grow',           sub: 'Discipleship hub',               href: 'app.flockos/app.flockos.html?covenant=new&view=the_growth',        accent: '#f59e0b', accentDk: '#92400e' },
  { id: 'service',   name: 'Service Order',  sub: 'Worship planning',               href: 'app.flockos/app.flockos.html?covenant=new&view=the_anatomy_of_worship', accent: '#64748b', accentDk: '#334155' },
  { id: 'quarterly', name: 'Quarterly',       sub: 'Quarterly worship planner',      href: 'app.flockos/app.flockos.html?covenant=new&view=quarterly_worship', accent: '#a855f7', accentDk: '#4c1d95' },
  { id: 'missions',  name: 'Missions',        sub: 'Great Commission work',          href: 'app.flockos/app.flockos.html?covenant=new&view=the_great_commission', accent: '#0ea5e9', accentDk: '#0c4a6e' },
  { id: 'harvest',   name: 'Harvest',         sub: 'Outreach & conversions',         href: 'app.flockos/app.flockos.html?covenant=new&view=the_harvest',       accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'way',       name: 'The Way',         sub: 'Discipleship pathways',          href: 'app.flockos/app.flockos.html?covenant=new&view=the_way',           accent: '#f59e0b', accentDk: '#92400e' },
  { id: 'content',   name: 'Content',         sub: 'Teaching & media library',       href: 'app.flockos/app.flockos.html?covenant=new&view=the_truth',         accent: '#2563eb', accentDk: '#1d4ed8' },
  { id: 'giving',    name: 'Giving',          sub: 'Stewardship & gifts',            href: 'app.flockos/app.flockos.html?covenant=new&view=the_gift_drift',    accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'weavers',   name: "The Weaver's Plan", sub: 'Strategy & planning',          href: 'app.flockos/app.flockos.html?covenant=new&view=the_weavers_plan',  accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'admin',     name: 'Admin',           sub: 'FlockOS administration',         href: 'app.flockos/app.flockos.html?covenant=new&view=the_wall',          accent: '#7c3aed', accentDk: '#4c1d95' },
  { id: 'announcements', name: 'Announcements', sub: 'Church announcements',         href: 'app.flockos/app.flockos.html?covenant=new&view=the_announcements', accent: '#06b6d4', accentDk: '#0c4a6e' },
  { id: 'events',    name: 'Events',          sub: 'Special events & gatherings',    href: 'app.flockos/app.flockos.html?covenant=new&view=the_pentecost',     accent: '#d97706', accentDk: '#92400e' },
  { id: 'forgive',   name: 'Forgiveness',     sub: 'Reconciliation guide',           href: 'app.flockos/app.flockos.html?covenant=new&view=the_call_to_forgive', accent: '#ef4444', accentDk: '#7f1d1d' },
  { id: 'generations', name: 'Generations',   sub: 'Build history & records',        href: 'app.flockos/app.flockos.html?covenant=new&view=the_generations',  accent: '#64748b', accentDk: '#334155' },
  { id: 'prayerful', name: 'Prayerful Action', sub: 'Prayer journal & rhythm',       href: 'app.flockos/app.flockos.html?covenant=new&view=prayerful_action', accent: '#8b5cf6', accentDk: '#4c1d95' },
  { id: 'outreach',  name: 'Outreach',        sub: 'Fishing for men',                href: 'app.flockos/app.flockos.html?covenant=new&view=fishing_for_men',   accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'analytics', name: 'Analytics',       sub: 'Ministry data',                  href: 'app.flockos/app.flockos.html?covenant=new&view=fishing_for_data',  accent: '#2563eb', accentDk: '#1d4ed8' },
  { id: 'deploy',    name: 'Deploy',          sub: 'Deployment referral',            href: 'app.flockos/app.flockos.html?covenant=new&view=software_deployment_referral', accent: '#64748b', accentDk: '#334155' },
  { id: 'bezalel',   name: 'Bezalel',         sub: 'Build tools',                    href: 'app.flockos/app.flockos.html?covenant=new&view=bezalel',           accent: '#7c3aed', accentDk: '#4c1d95' },
  { id: 'about',     name: 'About FlockOS',   sub: 'The why',                        href: 'app.flockos/app.flockos.html?covenant=new&view=about_flockos',     accent: '#3b82f6', accentDk: '#1e3a8a' },
  { id: 'learn',     name: 'Learn More',      sub: 'FlockOS overview',               href: 'app.flockos/app.flockos.html?covenant=new&view=learn_more',       accent: '#f59e0b', accentDk: '#92400e' },
  { id: 'truth-admin', name: 'Truth Editor',  sub: 'Content administration',         href: 'app.flockos/app.flockos.html?covenant=new&view=content-admin',    accent: '#2563eb', accentDk: '#1d4ed8' },
  { id: 'stand',     name: 'FlockStand',     sub: 'Songs, setlists & live',         href: 'app.stand/',                       accent: '#a855f7', accentDk: '#4c1d95' },
  { id: 'flockshow', name: 'FlockShow',      sub: 'Worship slides & service',       href: 'app.flockshow/app.flockshow.html', accent: '#ef4444', accentDk: '#7f1d1d' },
  { id: 'flocksort', name: 'FlockSort',      sub: 'Free water-sort puzzle',         href: 'app.flocksort/',                   accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'flockchat', name: 'FlockChat',      sub: 'Messaging & prayer chain',       href: 'app.flockchat/app.flockchat.html', accent: '#06b6d4', accentDk: '#0c4a6e' },
  { id: 'flockdocs', name: 'Docs',           sub: 'Documents & productivity',       href: 'app.flockdocs/',                   accent: '#2563eb', accentDk: '#1d4ed8' },
  { id: 'flockshamar', name: 'Notes',        sub: 'Keep & guard your notes',        href: 'app.flockshamar/app.flockshamar.html', accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'feed',      name: 'Feed',           sub: 'Sermon prep & study tools',      href: 'app.feed/',                        accent: '#d97706', accentDk: '#92400e' },
  { id: 'wellspring', name: 'The Wellspring', sub: 'Offline data & local database', href: 'app.wellspring/app.wellspring.html', accent: '#f7c756', accentDk: '#b8871e' },
  { id: 'melchizedek', name: 'Safety',       sub: 'Background checks — powered by Checkr', href: 'app.melchizedek/app.melchizedek.html', accent: '#7c3aed', accentDk: '#4c1d95' },
];

/* ─── Styles (injected once) ────────────────────────────────────────────── */
const STYLE_ID = 'nc-app-switcher-style';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const css = `
.nc-switcher-btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; padding: 7px 10px; border-radius: 10px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
  color: inherit; cursor: pointer; font: 600 0.78rem 'Plus Jakarta Sans', system-ui, sans-serif;
  letter-spacing: 0.02em; transition: background .15s, border-color .15s, transform .1s;
  -webkit-tap-highlight-color: transparent;
}
.nc-switcher-btn:hover  { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.22); }
.nc-switcher-btn:active { transform: scale(0.96); }
.nc-switcher-btn svg    { width: 16px; height: 16px; flex-shrink: 0; }
.nc-switcher-btn-label  { white-space: nowrap; }
@media (max-width: 540px) {
  .nc-switcher-btn { padding: 7px 8px; }
  .nc-switcher-btn-label { display: none; }
}

.nc-switcher-backdrop {
  position: fixed; inset: 0; z-index: 99998;
  background: rgba(8,12,32,0.45);
  opacity: 0; transition: opacity .14s ease;
  -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px);
}
.nc-switcher-backdrop.open { opacity: 1; }

.nc-switcher-pop {
  position: fixed; z-index: 99999;
  width: min(320px, calc(100vw - 24px));
  max-height: min(70vh, 560px);
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  background: #111b44; color: #eef1fb;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px;
  box-shadow: 0 18px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3);
  padding: 10px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  transform-origin: top right;
  transform: scale(0.96) translateY(-4px); opacity: 0;
  transition: transform .14s ease, opacity .14s ease;
}
.nc-switcher-pop.open { transform: scale(1) translateY(0); opacity: 1; }

.nc-switcher-title {
  font-size: 0.66rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: #9ba8d0;
  padding: 6px 10px 8px;
}

.nc-switcher-grid {
  display: grid; grid-template-columns: 1fr; gap: 4px;
  min-width: 0;
}

.nc-switcher-item {
  display: flex; align-items: center; gap: 11px;
  padding: 9px 10px; border-radius: 10px;
  text-decoration: none; color: #eef1fb;
  border: 1px solid transparent;
  transition: background .12s, border-color .12s;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}
.nc-switcher-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.10); }
.nc-switcher-item.is-current {
  background: rgba(91,141,238,0.10);
  border-color: rgba(91,141,238,0.30);
  cursor: default;
}
.nc-switcher-item.is-current:hover { background: rgba(91,141,238,0.10); }

.nc-switcher-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.30);
  background: linear-gradient(135deg, #b8871e, #f7c756);
  overflow: hidden;
}
.nc-switcher-icon svg { width: 18px; height: 18px; }
.nc-switcher-icon-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nc-switcher-label { flex: 1; min-width: 0; }
.nc-switcher-label strong {
  display: block; font-size: 0.88rem; font-weight: 700; letter-spacing: -0.005em;
  color: #eef1fb;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.nc-switcher-label span {
  display: block; font-size: 0.72rem; color: #9ba8d0; margin-top: 1px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.nc-switcher-item.is-current .nc-switcher-label strong { color: #a0beff; }

.nc-switcher-current-pill {
  font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: #a0beff;
  padding: 2px 7px; border-radius: 999px;
  background: rgba(91,141,238,0.15); border: 1px solid rgba(91,141,238,0.30);
  flex-shrink: 0;
}

.nc-switcher-divider {
  height: 1px; background: rgba(255,255,255,0.08);
  margin: 6px 6px;
}
.nc-switcher-item--signin .nc-switcher-icon {
  background: linear-gradient(135deg, #b8871e, #f7c756);
}
`;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

/* ─── Markup ───────────────────────────────────────────────────────────── */
function buttonHTML() {
  return `${NC_APP_ICONS.launcher}<span class="nc-switcher-btn-label">Apps</span>`;
}

function popoverHTML(currentId, opts = {}) {
  currentId = resolveCurrentAppId(currentId);
  // Resolve all app hrefs against the deployment's launcher root (NOT
  // <base href>, which always points at the master source, and NOT the
  // current page directory, which would double-up paths when called from
  // inside an app sub-folder or from the launcher itself).
  let launcherUrl;
  try {
    const u = new URL(location.href);
    let p = u.pathname;
    p = p.replace(/\/[^/]*\.[^/]+$/, '/');               // strip filename
    if (!p.endsWith('/')) p += '/';
    p = p.replace(/\/app\.[^/]+\/.*$/, '/');             // climb out of any app.* folder
    launcherUrl = u.origin + p;
  } catch (_) { launcherUrl = './'; }
  const visibleApps = NC_APPS.filter(app => canAccessUnityApp(app));
  const items = visibleApps.map((app) => {
    const isCurrent = app.id === currentId;
    const tag = isCurrent ? 'div' : 'a';
    const resolvedHref = (() => {
      try { return new URL(app.href, launcherUrl).href; }
      catch (_) { return app.href; }
    })();
    const hrefAttr = isCurrent ? '' : ` href="${resolvedHref}"`;
    const cls = `nc-switcher-item${isCurrent ? ' is-current' : ''}`;
    const pill = isCurrent ? '<span class="nc-switcher-current-pill">Current</span>' : '';
    const iconSrc = NC_APP_ICON_SRCS[app.id];
    const iconHTML = iconSrc
      ? `<img class="nc-switcher-icon-img" src="${escapeAttr(iconSrc)}" alt="" aria-hidden="true">`
      : (NC_APP_ICONS[app.id] || '');
    return `
      <${tag} class="${cls}"${hrefAttr} data-app-id="${app.id}">
        <span class="nc-switcher-icon" style="--nc-app-accent-dk:${escapeAttr(app.accentDk)};--nc-app-accent:${escapeAttr(app.accent)}">${iconHTML}</span>
        <span class="nc-switcher-label"><strong>${app.name}</strong><span>${app.sub}</span></span>
        ${pill}
      </${tag}>`;
  }).join('');
  const signInHref = (() => {
    try { return new URL(opts.signInHref || 'app.flockos/', launcherUrl).href; }
    catch (_) { return opts.signInHref || 'app.flockos/'; }
  })();
  const signin = hasUnitySession() ? '' : `
    <div class="nc-switcher-divider"></div>
    <a class="nc-switcher-item nc-switcher-item--signin" href="${escapeAttr(signInHref)}" data-app-id="signin">
      <span class="nc-switcher-icon">${NC_APP_ICONS.launcher}</span>
      <span class="nc-switcher-label"><strong>Sign In</strong><span>Access your church apps</span></span>
    </a>`;
  return `
    <div class="nc-switcher-title">Switch app</div>
    <div class="nc-switcher-grid">${items}${signin}</div>`;
}

/* ─── Open / close ─────────────────────────────────────────────────────── */
let _open = null; // { backdrop, pop, btn }

function closeSwitcher() {
  if (!_open) return;
  const { backdrop, pop } = _open;
  backdrop.classList.remove('open');
  pop.classList.remove('open');
  setTimeout(() => {
    backdrop.remove();
    pop.remove();
  }, 160);
  _open = null;
  document.removeEventListener('keydown', _onKey, true);
  window.removeEventListener('resize', closeSwitcher);
  window.removeEventListener('scroll', _onScroll, true);
}

function _onKey(e) {
  if (e.key === 'Escape') { e.stopPropagation(); closeSwitcher(); }
}

/* Close the popover when the page (or any ancestor) scrolls — but NOT
   when the user is scrolling inside the popover itself. */
function _onScroll(e) {
  if (!_open) return;
  const t = e.target;
  if (t === _open.pop || (t && t.nodeType === 1 && _open.pop.contains(t))) return;
  closeSwitcher();
}

function openSwitcher(btn, currentId, opts = {}) {
  if (_open) { closeSwitcher(); return; }
  ensureStyles();
  currentId = resolveCurrentAppId(currentId);

  const backdrop = document.createElement('div');
  backdrop.className = 'nc-switcher-backdrop';
  // Guard against iOS ghost-click: the backdrop renders under the tap point,
  // so iOS fires a synthetic click on it ~300ms after opening. Ignore any
  // backdrop click that arrives within 350ms of the switcher opening.
  let _justOpened = true;
  setTimeout(() => { _justOpened = false; }, 350);
  backdrop.addEventListener('click', () => { if (!_justOpened) closeSwitcher(); });

  const pop = document.createElement('div');
  pop.className = 'nc-switcher-pop';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', 'Switch app');
  pop.innerHTML = popoverHTML(currentId, opts);

  document.body.appendChild(backdrop);
  document.body.appendChild(pop);

  // Position: anchored to button, top-right by default.
  const r = btn.getBoundingClientRect();
  const margin = 8;
  const w = pop.offsetWidth;
  const h = pop.offsetHeight;
  let top = r.bottom + margin;
  let left = r.right - w;
  if (left < margin) left = margin;
  if (left + w > window.innerWidth - margin) left = window.innerWidth - w - margin;
  if (top + h > window.innerHeight - margin) top = Math.max(margin, r.top - h - margin);
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;

  // Close when an item is clicked (let nav happen first)
  pop.addEventListener('click', (e) => {
    const a = e.target.closest('a.nc-switcher-item');
    if (a) closeSwitcher();
  });

  requestAnimationFrame(() => {
    backdrop.classList.add('open');
    pop.classList.add('open');
  });

  _open = { backdrop, pop, btn };
  document.addEventListener('keydown', _onKey, true);
  window.addEventListener('resize', closeSwitcher);
  window.addEventListener('scroll', _onScroll, true);
}

/* ─── Public API ───────────────────────────────────────────────────────── */
export function mountSwitcher(host, opts = {}) {
  if (!host) return;
  ensureStyles();
  const current = resolveCurrentAppId(opts.current || host.dataset.appSwitcherCurrent || '');
  // Make the host look right and behave like a button.
  host.classList.add('nc-switcher-btn');
  host.setAttribute('type', 'button');
  host.setAttribute('aria-label', 'Switch app');
  host.setAttribute('aria-haspopup', 'dialog');
  if (!host.dataset.appSwitcherWired) {
    host.innerHTML = buttonHTML();
    host.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openSwitcher(host, current, opts);
    });
    host.dataset.appSwitcherWired = '1';
    host.dataset.appSwitcherCurrent = current;
  }
  return host;
}

export function resolveCurrentAppId(fallback = '') {
  const base = fallback || '';
  try {
    const view = new URLSearchParams(location.search).get('view');
    if (view) {
      const routed = NC_APPS.find((app) => {
        try {
          const hrefView = new URL(app.href, location.origin + '/').searchParams.get('view');
          return hrefView === view;
        } catch (_) {
          return false;
        }
      });
      if (routed) return routed.id;
    }
  } catch (_) { /* keep fallback */ }
  return base;
}

/* Auto-mount any [data-app-switcher] elements present at load. */
function autoMount() {
  document.querySelectorAll('[data-app-switcher]').forEach((el) => {
    if (!el.dataset.appSwitcherWired) mountSwitcher(el);
  });
  fixLauncherLinks();
}

/* The app HTML files declare <base href="https://.../New_Covenant/"> so
   relative URLs work everywhere. But that means an `href="./"` "back to
   launcher" link always points at the master source — not the actual
   per-church deployment the user is browsing. Rewrite those links to
   the parent of the current location so they go to the right launcher. */
function fixLauncherLinks() {
  try {
    const launcherUrl = new URL('../', location.href).href;
    document.querySelectorAll('a[title="Back to launcher"], a[aria-label="Back to launcher"]').forEach((a) => {
      a.href = launcherUrl;
    });
  } catch (_) { /* noop */ }
}

function escapeAttr(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount);
} else {
  autoMount();
}

/* Expose for inline / non-module callers */
if (typeof window !== 'undefined') {
  window.NCAppSwitcher = { mount: mountSwitcher, open: openSwitcher, close: closeSwitcher, APPS: NC_APPS, ICONS: NC_APP_ICONS };
}
