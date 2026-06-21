// Archived from New_Covenant/app.invite/app.invite.html.
// Superseded by Scripts/the_herald_unity_header.js.

import { mountUnityHeader } from './Scripts/the_unity_header.js';
import { NC_APP_ICONS } from './Scripts/the_app_switcher.js';

function setInviteSidebar(open) {
  var nav = document.getElementById('fn-side-nav');
  var isOpen = document.documentElement.getAttribute('data-fn-sidebar') === 'open';
  var next = typeof open === 'boolean' ? open : !isOpen;
  document.documentElement.setAttribute('data-fn-sidebar', next ? 'open' : 'closed');
  if (nav) nav.setAttribute('aria-hidden', next ? 'false' : 'true');
  try { localStorage.setItem('fn_sidebar_open', next ? 'true' : 'false'); } catch (_) {}
  return next;
}

mountUnityHeader(document.getElementById('fn-unity-topbar'), {
  appId:       'invite',
  appName:     'The Invitation',
  appIconSvg:  NC_APP_ICONS.invite,
  appAccent:   '#22c55e',
  appAccentDk: '#14532d',
  homeHref:    'app.invite/app.invite.html',
  avatarSrc:   'Images/icon-invite.svg',
  signInHref:  'app.flockos/',
  onHamburger: () => setInviteSidebar(),
  extras: [
    {
      html: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
      aria: 'Share this page',
      title: 'Share',
      onClick: () => window.shareInvitation?.(),
    },
  ],
  features: [
    { id: 'invitations', label: 'His Invitations', hint: 'Come to Christ', run: () => document.getElementById('inv-invitations')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'identity', label: 'His Identity', hint: 'I Am', run: () => document.getElementById('inv-iam')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'finished-work', label: 'Finished Work', hint: 'The Gospel', run: () => document.getElementById('inv-work')?.scrollIntoView({ behavior: 'smooth' }) },
  ],
});
