// Archived from New_Covenant/index.html.
// Superseded by Scripts/the_herald_unity_header.js.

import { mountUnityHeader } from './Scripts/the_unity_header.js';

const HERALD_ICON = '<svg class="unity-brand-logo-svg" viewBox="0 0 100 100" role="img" aria-label="Herald"><rect width="100" height="100" rx="22" fill="#0c1445"/><path d="M50 18a32 32 0 1 1 0 64 32 32 0 0 1 0-64Z" fill="none" stroke="#e8a838" stroke-width="8"/><path d="M35 29h10v42H35zM55 29h10v42H55zM40 45h20v10H40z" fill="#fffaf0"/></svg>';

function setHeraldSidebar(open) {
  var nav = document.getElementById('fn-side-nav');
  var isOpen = document.documentElement.getAttribute('data-fn-sidebar') === 'open';
  var next = typeof open === 'boolean' ? open : !isOpen;
  document.documentElement.setAttribute('data-fn-sidebar', next ? 'open' : 'closed');
  if (nav) nav.setAttribute('aria-hidden', next ? 'false' : 'true');
  try { localStorage.setItem('fn_sidebar_open', next ? 'true' : 'false'); } catch (_) {}
  return next;
}

mountUnityHeader(document.getElementById('fn-unity-topbar'), {
  appId:       'flocknews',
  appName:     'Herald',
  appIconSvg:  HERALD_ICON,
  appAccent:   '#f7c756',
  appAccentDk: '#b8871e',
  homeHref:    'index.html',
  avatarSrc:   'Images/icon-pwa.svg',
  signInHref:  new URL('app.flocknews/index.html?return=index.html', document.baseURI).href,
  onHamburger: () => setHeraldSidebar(),
  extras: [
    {
      html: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
      aria: 'Share this edition',
      title: 'Share',
      onClick: () => window.shareHerald?.(),
    },
  ],
  features: [
    { id: 'front', label: 'Front Page', hint: 'Today in Herald', run: () => document.getElementById('fn-section-front')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'missions', label: 'Missions', hint: 'Mission report', run: () => document.getElementById('fn-section-missions')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'suite', label: 'FlockOS Suite', hint: 'App overview', run: () => document.getElementById('fn-section-suite')?.scrollIntoView({ behavior: 'smooth' }) },
  ],
});
