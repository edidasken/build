import { mountUnityHeader } from '../Scripts/the_unity_header.js';
import { whoAmI } from '../Scripts/the_priesthood/index.js';

const APP = {
  id: 'prayer',
  name: 'Prayer',
  loginHref: 'app.prayer/index.html',
  homeHref: 'app.prayer/app.prayer.html',
  accent: '#8b5cf6',
  accentDk: '#4c1d95',
};

const PRAYER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>';

boot().catch((err) => {
  const main = document.getElementById('sub-app-main');
  if (main) main.innerHTML = `<div class="sub-app-error">${escapeHtml(err?.message || 'Prayer could not start.')}</div>`;
  console.error('[Prayer] boot failed:', err);
});

async function boot() {
  await waitForAuth();
  await ensureUpperRoomReady();
  const user = await whoAmI();
  mountHeader(user);

  const view = await import('../Views/the_prayer_chain/index.js');
  const main = document.getElementById('sub-app-main');
  if (!main) return;
  main.innerHTML = view.render();
  view.mount(main, { go: goFlockOS });
}

function mountHeader(user) {
  const host = document.getElementById('sub-app-top');
  if (!host) return;
  mountUnityHeader(host, {
    appId: APP.id,
    appName: APP.name,
    appIconSvg: PRAYER_ICON,
    appAccent: APP.accent,
    appAccentDk: APP.accentDk,
    homeHref: APP.homeHref,
    signInHref: APP.loginHref,
    user: user || readStoredUser(),
    hideHamburger: true,
    onSignOut: signOut,
    features: [
      { id: 'prayer-add', label: 'Add Request', hint: 'Add a standing prayer request', run: () => document.querySelector('[data-act="add-request"]')?.click() },
      { id: 'prayer-care', label: 'Pastoral Care', hint: 'Open the care queue', run: () => { location.href = new URL('app.care/app.care.html', launcherRoot()).href; } },
    ],
  });
}

async function waitForAuth() {
  const N = await waitForNehemiah();
  return new Promise((resolve) => {
    if (typeof N.onAuthReady === 'function') {
      N.onAuthReady((user) => {
        if (user) resolve(user);
        else location.replace(rootHref(APP.loginHref));
      });
      return;
    }
    if (typeof N.isAuthenticated === 'function' && N.isAuthenticated()) {
      resolve(N.getSession?.() || {});
      return;
    }
    location.replace(rootHref(APP.loginHref));
  });
}

function waitForNehemiah() {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const tick = () => {
      if (window.Nehemiah) return resolve(window.Nehemiah);
      tries += 1;
      if (tries > 80) return reject(new Error('Auth system did not load.'));
      setTimeout(tick, 100);
    };
    tick();
  });
}

async function ensureUpperRoomReady() {
  if (window.Nehemiah?.isLocalBypass?.()) return;
  const UR = window.UpperRoom;
  if (!UR) return;
  try {
    if (typeof UR.init === 'function') await UR.init();
    if (typeof UR.authenticate === 'function') await UR.authenticate();
  } catch (err) {
    console.warn('[Prayer] UpperRoom authentication deferred:', err);
  }
}

function goFlockOS(view) {
  if (!view) return;
  const url = new URL('app.flockos/app.flockos.html', launcherRoot());
  url.searchParams.set('covenant', 'new');
  url.searchParams.set('view', view);
  location.href = url.href;
}

function launcherRoot() {
  const url = new URL(location.href);
  let path = url.pathname.replace(/\/[^/]*\.[^/]+$/, '/');
  if (!path.endsWith('/')) path += '/';
  path = path.replace(/\/app\.[^/]+\/.*$/, '/');
  url.pathname = path;
  url.search = '';
  url.hash = '';
  return url;
}

function rootHref(relPath) {
  return new URL(relPath, launcherRoot()).href;
}

async function signOut() {
  const N = window.Nehemiah;
  if (N && typeof N.signOut === 'function') {
    N.signOut();
    return;
  }
  if (N && typeof N.logout === 'function') {
    await N.logout();
    return;
  }
  try { sessionStorage.removeItem('flock_auth_session'); } catch (_) {}
  try { sessionStorage.removeItem('flock_auth_profile'); } catch (_) {}
  location.replace(rootHref(APP.loginHref));
}

function readStoredUser() {
  try {
    const raw = sessionStorage.getItem('flock_auth_session') || sessionStorage.getItem('flock_auth_profile');
    const s = raw ? JSON.parse(raw) : null;
    if (!s || !s.email) return null;
    return {
      displayName: s.displayName || s.name || s.email.split('@')[0],
      email: s.email,
      photoURL: s.photoURL || '',
    };
  } catch (_) {
    return null;
  }
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
