/* ══════════════════════════════════════════════════════════════════════════════
   THE UNITY HEADER — Single shared app-shell topbar
   "That they all may be one." — John 17:21

   Every New Covenant app mounts this header. Strict canonical layout:
     [☰ hamburger] [App Name] [...app extras...] [spacer]
     [🔍 search-btn] [⚏ app-switcher] [● Herald account icon]

   All buttons (search / switcher / avatar) share size + radius for visual
   parity. Avatar opens the unified profile sheet (the_unity_profile.js) which
   delegates sign-out to the app-supplied handler.

   USAGE (any app):
     import { mountUnityHeader } from '../Scripts/the_unity_header.js';
     mountUnityHeader(headerEl, {
       appId:       'flockchat',
       appName:     'FlockChat',
       appIconSvg:  '<svg ...></svg>',
       appAccent:   '#06b6d4',                  // brand-icon gradient stop
       homeHref:    './',                       // brand click destination
       features:    [{ id, label, hint, run() }],
       user:        { displayName, email, photoURL } | null,
       onSignOut:   async () => { ... },
       extras:      [{ html, onClick, aria }],  // optional app-specific buttons
     });
   ══════════════════════════════════════════════════════════════════════════════ */

import { mountSwitcher, NC_APPS, NC_APP_ICONS } from './the_app_switcher.js';
import { openUnitySearch, registerFeatures } from './the_unity_search.js';
import { openUnityProfile } from './the_unity_profile.js';

const ICONS = {
  hamburger: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  search:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
};

export const UNITY_HERALD_ICON_SRC = new URL('../Images/icon-herald.svg', import.meta.url).href;

export function mountUnityHeader(host, cfg = {}) {
  if (!host) return;
  const {
    appId      = 'flockos',
    appName    = 'FlockOS',
    appIconSvg = '',
    appAccent  = '#3b82f6',
    appAccentDk= '#1e3a8a',
    homeHref   = './',
    features   = [],
    user       = null,
    onSignOut  = null,
    onHamburger= null,
    hideHamburger = false,
    extras     = [],
    signInHref = null,    // public/unauth apps: destination for the Sign In row inside the profile sheet
    onAccount  = null,    // optional override for avatar click; if set, takes precedence over the profile sheet
  } = cfg;

  if (Array.isArray(features) && features.length) registerFeatures(appId, features);

  host.classList.add('unity-header');
  host.dataset.app = appId;

  const extrasHtml = extras.map((x, i) =>
    `<button class="unity-action unity-extra" data-extra-idx="${i}" aria-label="${(x.aria || '').replace(/"/g, '&quot;')}" title="${(x.title || x.aria || '').replace(/"/g, '&quot;')}">${x.html || ''}</button>`
  ).join('');

  const hamburgerHtml = hideHamburger ? '' : `<button class="unity-action unity-hamburger" data-act="menu" aria-label="Open navigation" aria-expanded="false" aria-controls="unity-nav-drawer">${ICONS.hamburger}</button>`;

  host.innerHTML = `
    ${hamburgerHtml}
    <a class="unity-brand" data-act="home" href="${escapeAttr(homeHref)}" aria-label="${escapeAttr(appName)} home">
      <span class="unity-brand-icon" aria-hidden="true" style="background:linear-gradient(135deg, ${escapeAttr(appAccentDk)}, ${escapeAttr(appAccent)})">${appIconSvg}</span>
      <span class="unity-brand-text">${escapeHtml(appName)}</span>
    </a>
    ${extrasHtml}
    <div class="unity-spacer"></div>
    <button class="unity-action unity-search-btn" data-act="search" aria-label="Search ${escapeAttr(appName)}" title="Search (⌘K)">${ICONS.search}</button>
    <button class="unity-action unity-switcher" data-app-switcher data-app-switcher-current="${escapeAttr(appId)}" aria-label="Switch app" title="Switch app"></button>
    <button class="unity-avatar unity-avatar--herald" data-act="account" aria-label="Herald account" title="Herald account">
      <img class="unity-avatar-img" alt="" src="${escapeAttr(UNITY_HERALD_ICON_SRC)}" onerror="this.style.display='none'">
    </button>
  `;

  // Mount cross-app switcher
  const switcherHost = host.querySelector('[data-app-switcher]');
  if (switcherHost) mountSwitcher(switcherHost, { current: appId });

  // Click delegation (with touch fallback for PWA)
  function handleAction(e) {
    const btn = e.target.closest('[data-act],[data-extra-idx]');
    if (!btn) return;

    if (btn.dataset.extraIdx != null) {
      const ex = extras[+btn.dataset.extraIdx];
      if (ex && typeof ex.onClick === 'function') ex.onClick(e);
      return;
    }

    const act = btn.dataset.act;
    if (act === 'menu') {
      e.preventDefault(); // Prevent double-fire in PWA
      let open;
      if (typeof onHamburger === 'function') open = onHamburger();
      else {
        switcherHost?.click();
        open = false;
      }
      if (typeof open === 'boolean') btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    } else if (act === 'home') {
      // Native anchor handles navigation; nothing to do
    } else if (act === 'search') {
      e.preventDefault();
      openUnitySearch({ appId, appName });
    } else if (act === 'account') {
      e.preventDefault();
      if (typeof onAccount === 'function') { onAccount(e); return; }
      openUnityProfile({ appId, appName, user: cfg.user, onSignOut, signInHref });
    }
  }

  host.addEventListener('click', handleAction);
  
  // PWA touch fallback — iOS PWAs sometimes don't convert touches to clicks
  host.addEventListener('touchend', (e) => {
    const btn = e.target.closest('[data-act],[data-extra-idx]');
    if (btn) {
      e.preventDefault(); // Prevent click from also firing
      handleAction(e);
    }
  });

  // ⌘K / Ctrl+K opens search globally for this app
  if (!host.__unityKeydown) {
    host.__unityKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        openUnitySearch({ appId, appName });
      }
    };
    document.addEventListener('keydown', host.__unityKeydown);
  }

  return {
    setUser(u) { /* user is captured in closure for profile open; update via remount if needed */ cfg.user = u; },
    update(partial) { Object.assign(cfg, partial); }
  };
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function escapeAttr(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function toggleUnityNavDrawer(currentId) {
  let drawer = document.getElementById('unity-nav-drawer');
  let backdrop = document.getElementById('unity-nav-backdrop');
  if (!drawer || !backdrop) {
    ({ drawer, backdrop } = buildUnityNavDrawer(currentId));
  }
  const open = !drawer.classList.contains('is-open');
  drawer.classList.toggle('is-open', open);
  backdrop.classList.toggle('is-open', open);
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('unity-nav-open', open);
  if (open) {
    const first = drawer.querySelector('a,button');
    setTimeout(() => first?.focus?.(), 0);
  }
  return open;
}

function closeUnityNavDrawer() {
  const drawer = document.getElementById('unity-nav-drawer');
  const backdrop = document.getElementById('unity-nav-backdrop');
  if (!drawer || !backdrop) return false;
  drawer.classList.remove('is-open');
  backdrop.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('unity-nav-open');
  document.querySelectorAll('.unity-hamburger[aria-expanded="true"]').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  return false;
}

function buildUnityNavDrawer(currentId) {
  const backdrop = document.createElement('div');
  backdrop.id = 'unity-nav-backdrop';
  backdrop.className = 'unity-nav-backdrop';
  backdrop.addEventListener('click', closeUnityNavDrawer);

  const drawer = document.createElement('aside');
  drawer.id = 'unity-nav-drawer';
  drawer.className = 'unity-nav-drawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.setAttribute('aria-label', 'App navigation');
  drawer.innerHTML = `
    <div class="unity-nav-drawer-head">
      <span>FlockOS Apps</span>
      <button class="unity-nav-close" type="button" aria-label="Close navigation">&times;</button>
    </div>
    <nav class="unity-nav-list">
      ${NC_APPS.map(app => {
        const isCurrent = app.id === currentId;
        const tag = isCurrent ? 'span' : 'a';
        const href = isCurrent ? '' : ` href="${escapeAttr(resolveAppHref(app.href))}"`;
        return `
          <${tag} class="unity-nav-item${isCurrent ? ' is-current' : ''}"${href}>
            <span class="unity-nav-icon tone-${escapeAttr(app.tone)}">${NC_APP_ICONS[app.id] || ''}</span>
            <span class="unity-nav-copy"><strong>${escapeHtml(app.name)}</strong><small>${escapeHtml(app.sub)}</small></span>
          </${tag}>`;
      }).join('')}
    </nav>`;

  drawer.querySelector('.unity-nav-close')?.addEventListener('click', closeUnityNavDrawer);
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeUnityNavDrawer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeUnityNavDrawer();
  });
  document.body.append(backdrop, drawer);
  return { drawer, backdrop };
}

function resolveAppHref(href) {
  try {
    const u = new URL(location.href);
    let p = u.pathname;
    p = p.replace(/\/[^/]*\.[^/]+$/, '/');
    if (!p.endsWith('/')) p += '/';
    p = p.replace(/\/app\.[^/]+\/.*$/, '/');
    return new URL(href, u.origin + p).href;
  } catch (_) {
    return href;
  }
}
