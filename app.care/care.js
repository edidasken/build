import { mountUnityHeader } from '../Scripts/the_unity_header.js';
import { whoAmI } from '../Scripts/the_priesthood/index.js';

const APP = {
  id: 'care',
  name: 'Pastoral Care',
  loginHref: 'app.care/index.html',
  homeHref: 'app.care/app.care.html',
  accent: '#22c55e',
  accentDk: '#14532d',
};

const CARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/><path d="M12 8v6"/><path d="M9 11h6"/></svg>';

boot().catch((err) => {
  const main = document.getElementById('sub-app-main');
  if (main) main.innerHTML = `<div class="sub-app-error">${escapeHtml(err?.message || 'Pastoral Care could not start.')}</div>`;
  console.error('[Care] boot failed:', err);
});

async function boot() {
  await waitForAuth();
  await ensureUpperRoomReady();
  const user = await whoAmI();
  mountHeader(user);

  const view = await import('../Views/the_life/index.js');
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
    appIconSvg: CARE_ICON,
    appAccent: APP.accent,
    appAccentDk: APP.accentDk,
    homeHref: APP.homeHref,
    signInHref: APP.loginHref,
    user: user || readStoredUser(),
    hideHamburger: true,
    onSignOut: signOut,
    features: [
      { id: 'care-new', label: 'New Care Item', hint: 'Create a pastoral care item', run: () => document.querySelector('[data-care-new]')?.click() },
      { id: 'care-all', label: 'All Care', hint: 'Show all pastoral care items', run: () => document.querySelector('[data-life-filter="all"]')?.click() },
      { id: 'care-prayer', label: 'Prayer Care', hint: 'Show prayer-related care items', run: () => document.querySelector('[data-life-filter="prayer"]')?.click() },
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
    console.warn('[Care] UpperRoom authentication deferred:', err);
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
