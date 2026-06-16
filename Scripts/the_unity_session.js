/* Shared account/session helpers for Unity chrome. */

const SESSION_KEY = 'flock_auth_session';
const PROFILE_KEY = 'flock_auth_profile';
const VAULT_KEY = 'flock_secure_vault';

export function readUnitySession() {
  const session = _readJson(SESSION_KEY);
  const profile = _readJson(PROFILE_KEY);
  const merged = { ...(session || {}), ...(profile || {}) };
  if (!merged.email && session?.authEmail) merged.email = session.authEmail;
  if (!merged.email) return null;
  if (merged.expiresAt && Date.now() > Number(merged.expiresAt)) {
    clearUnitySession();
    return null;
  }
  return merged;
}

export function readUnityUser(fallback = null) {
  if (fallback && fallback.email) return fallback;
  const s = readUnitySession();
  if (!s || !s.email) return null;
  return {
    uid:         s.uid || s.userId || s.memberId || '',
    displayName: s.displayName || s.name || [s.firstName, s.lastName].filter(Boolean).join(' ') || String(s.email).split('@')[0],
    email:       s.email,
    photoURL:    s.photoURL || s.photo || '',
    role:        s.role || '',
    roleLevel:   s.roleLevel || 0,
    groups:      s.groups || '',
    permissions: s.permissions || {},
  };
}

export function hasUnitySession() {
  return !!readUnitySession();
}

export function clearUnitySession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (_) {}
  try { sessionStorage.removeItem(PROFILE_KEY); } catch (_) {}
  try { sessionStorage.removeItem(VAULT_KEY); } catch (_) {}
}

export async function signOutUnitySession() {
  try {
    if (window.UpperRoom && typeof window.UpperRoom.signOut === 'function') {
      await window.UpperRoom.signOut();
    }
  } catch (_) {}
  try {
    if (window.firebase?.auth) await window.firebase.auth().signOut();
  } catch (_) {}
  clearUnitySession();
}

export function ensureUnityMinted() {
  const session = readUnitySession();
  if (!session) return Promise.resolve(false);
  const upperRoom = window.UpperRoom;
  if (!upperRoom || typeof upperRoom.authenticate !== 'function') return Promise.resolve(false);
  return Promise.resolve()
    .then(() => (typeof upperRoom.init === 'function' ? upperRoom.init() : null))
    .then(() => upperRoom.authenticate())
    .then(() => true)
    .catch(() => false);
}

export function canAccessUnityApp(app, session = readUnitySession()) {
  if (!app) return false;
  if (app.public) return true;
  if (!session || !session.email) return false;
  if (session.isSeed || Number(session.roleLevel || 0) >= 5) return true;
  if (_hasBypassGroup(session)) return true;

  const explicit = _explicitAppAccess(session);
  if (!explicit) return true;
  return explicit.has('*') || explicit.has(app.id) || explicit.has(app.name?.toLowerCase?.());
}

function _explicitAppAccess(session) {
  const raw = session.appAccess || session.allowedApps || session.apps || session.appPermissions || null;
  if (!raw) return null;
  if (Array.isArray(raw)) return new Set(raw.map(_norm).filter(Boolean));
  if (typeof raw === 'string') return new Set(raw.split(/[,\s]+/).map(_norm).filter(Boolean));
  if (typeof raw === 'object') {
    return new Set(Object.keys(raw).filter(k => raw[k] === true || raw[k] === 'true' || raw[k] === 1).map(_norm));
  }
  return null;
}

function _hasBypassGroup(session) {
  const groups = String(session.groups || '')
    .split(',')
    .map(g => g.trim().toLowerCase())
    .filter(Boolean);
  return ['seed admin', 'lead pastor', 'master', 'admin', 'timothy'].some(g => groups.includes(g));
}

function _norm(value) {
  return String(value || '').trim().toLowerCase();
}

function _readJson(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}
