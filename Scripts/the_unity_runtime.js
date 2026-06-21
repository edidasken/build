/* Shared account runtime loader for Unity profile records. */

const FIREBASE_VERSION = '10.14.1';
const FIREBASE_SCRIPTS = [
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app-compat.js`,
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth-compat.js`,
  `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore-compat.js`,
];

const LOCAL_RUNTIME_SCRIPTS = [
  'the_true_vine.js',
  'firm_foundation.js',
  'the_upper_room.js',
];

let runtimePromise = null;
const scriptPromises = {};

export function warmUnityAccountRuntime() {
  if (runtimePromise) return runtimePromise;
  runtimePromise = Promise.resolve()
    .then(loadFirebaseCompat)
    .then(loadLocalRuntime)
    .then(() => {
      if (window.UpperRoom && typeof window.UpperRoom.init === 'function') {
        return window.UpperRoom.init().catch(() => {});
      }
      return null;
    });
  return runtimePromise;
}

function loadFirebaseCompat() {
  if (window.firebase?.app && window.firebase?.auth && window.firebase?.firestore) return Promise.resolve();
  return FIREBASE_SCRIPTS.reduce((chain, src) => chain.then(() => {
    if (src.includes('firebase-app') && window.firebase?.app) return null;
    if (src.includes('firebase-auth') && window.firebase?.auth) return null;
    if (src.includes('firebase-firestore') && window.firebase?.firestore) return null;
    return loadScript(src);
  }), Promise.resolve());
}

function loadLocalRuntime() {
  return LOCAL_RUNTIME_SCRIPTS.reduce((chain, name) => chain.then(() => {
    if (name === 'the_true_vine.js' && window.TheVine) return null;
    if (name === 'firm_foundation.js' && window.Nehemiah) return null;
    if (name === 'the_upper_room.js' && window.UpperRoom) return null;
    return loadScript(new URL(name, import.meta.url).href);
  }), Promise.resolve());
}

function loadScript(src) {
  if (scriptPromises[src]) return scriptPromises[src];
  scriptPromises[src] = new Promise((resolve, reject) => {
    const settle = () => {
      const current = Array.from(document.scripts).find(script => script.src === src);
      if (current) current.dataset.loaded = 'true';
      resolve();
    };
    const existing = Array.from(document.scripts).find(script => script.src === src);
    if (existing?.dataset.loaded === 'true') { resolve(); return; }
    if (existing) {
      existing.addEventListener('load', settle, { once: true });
      existing.addEventListener('error', reject, { once: true });
      if (existing.readyState === 'complete' || existing.readyState === 'loaded') settle();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = settle;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return scriptPromises[src];
}
