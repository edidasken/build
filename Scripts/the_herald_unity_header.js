import { mountUnityHeader } from './the_unity_header.js';
import { ensureUnityMinted, readUnityUser } from './the_unity_session.js';
import { warmUnityAccountRuntime } from './the_unity_runtime.js';

const APP_DEFAULTS = {
  flocknews: {
    appId: 'flocknews',
    appName: 'Herald',
    appAccent: '#f7c756',
    appAccentDk: '#b8871e',
    shareHandler: 'shareHerald',
    shareAria: 'Share this edition',
    shareTitle: 'Share',
    features: [
      { id: 'front', label: 'Front Page', hint: 'Today in Herald', target: 'fn-section-front' },
      { id: 'missions', label: 'Missions', hint: 'Mission report', target: 'fn-section-missions' },
      { id: 'suite', label: 'FlockOS Suite', hint: 'App overview', target: 'fn-section-suite' },
    ],
  },
  invite: {
    appId: 'invite',
    appName: 'The Invitation',
    appAccent: '#22c55e',
    appAccentDk: '#14532d',
    shareHandler: 'shareInvitation',
    shareAria: 'Share this page',
    shareTitle: 'Share',
    features: [
      { id: 'invitations', label: 'His Invitations', hint: 'Come to Christ', target: 'inv-invitations' },
      { id: 'identity', label: 'His Identity', hint: 'I Am', target: 'inv-iam' },
      { id: 'finished-work', label: 'Finished Work', hint: 'The Gospel', target: 'inv-work' },
    ],
  },
};

const SHARE_ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

export function mountHeraldUnityHeader(host, options = {}) {
  if (!host) return null;
  const appId = options.appId || host.dataset.heraldAppId || 'flocknews';
  const defaults = APP_DEFAULTS[appId] || APP_DEFAULTS.flocknews;
  const cfg = { ...defaults, ...options };

  const controller = mountUnityHeader(host, {
    appId: cfg.appId,
    appName: cfg.appName,
    appAccent: cfg.appAccent,
    appAccentDk: cfg.appAccentDk,
    homeHref: cfg.homeHref || resolveHomeHref(cfg.appId),
    signInHref: cfg.signInHref || buildSignInHref(cfg.returnPath),
    user: readUnityUser(),
    onHamburger: () => setHeraldSidebar(),
    extras: [
      {
        html: SHARE_ICON,
        aria: cfg.shareAria,
        title: cfg.shareTitle,
        onClick: () => runNamedHandler(cfg.shareHandler),
      },
    ],
    features: cfg.features.map(feature => ({
      id: feature.id,
      label: feature.label,
      hint: feature.hint,
      run: () => document.getElementById(feature.target)?.scrollIntoView({ behavior: 'smooth' }),
    })),
  });

  warmHeraldAccountRuntime().then(() => {
    controller?.update?.({ user: readUnityUser() });
    if (readUnityUser()) ensureUnityMinted();
  });

  return controller;
}

export function warmHeraldAccountRuntime() {
  return warmUnityAccountRuntime();
}

function setHeraldSidebar(open) {
  const nav = document.getElementById('fn-side-nav');
  const isOpen = document.documentElement.getAttribute('data-fn-sidebar') === 'open';
  const next = typeof open === 'boolean' ? open : !isOpen;
  document.documentElement.setAttribute('data-fn-sidebar', next ? 'open' : 'closed');
  if (nav) nav.setAttribute('aria-hidden', next ? 'false' : 'true');
  try { localStorage.setItem('fn_sidebar_open', next ? 'true' : 'false'); } catch (_) {}
  return next;
}

function resolveHomeHref(appId) {
  if (appId === 'flocknews') {
    return location.pathname.indexOf('/app.flocknews/') >= 0 ? '../index.html' : 'index.html';
  }
  if (appId === 'invite') return 'app.invite/app.invite.html';
  return './';
}

function buildSignInHref(returnPath) {
  const target = returnPath || currentReturnPath();
  const url = new URL('app.flocknews/index.html', document.baseURI);
  url.searchParams.set('return', target);
  return url.href;
}

function currentReturnPath() {
  try {
    const base = new URL('.', document.baseURI);
    const here = new URL(location.href);
    const rel = here.pathname.startsWith(base.pathname)
      ? here.pathname.slice(base.pathname.length)
      : 'index.html';
    return (rel || 'index.html') + here.search + here.hash;
  } catch (_) {
    return 'index.html';
  }
}

function runNamedHandler(name) {
  const fn = name && window[name];
  if (typeof fn === 'function') fn();
}

function autoMount() {
  document.querySelectorAll('[data-herald-unity-header]').forEach(host => {
    if (host.__heraldUnityMounted) return;
    host.__heraldUnityMounted = true;
    mountHeraldUnityHeader(host);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoMount);
else autoMount();
