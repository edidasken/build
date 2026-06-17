const DEFAULT_SHARED_DATA_BASE_URL = 'https://raw.githubusercontent.com/edidasken/do/main/shared-data/v1/';

const SHARED_DATA_BASE_URL = normalizeSharedDataBaseUrl(
  globalThis.FLOCK_SHARED_DATA_BASE_URL || DEFAULT_SHARED_DATA_BASE_URL
);

const genealogyChunkCache = new Map();
let genealogyManifestPromise = null;
let genealogyRowsPromise = null;

function normalizeSharedDataBaseUrl(value) {
  const base = String(value || DEFAULT_SHARED_DATA_BASE_URL).trim() || DEFAULT_SHARED_DATA_BASE_URL;
  return base.endsWith('/') ? base : `${base}/`;
}

export function sharedDataUrl(path) {
  return new URL(String(path || '').replace(/^\/+/, ''), SHARED_DATA_BASE_URL).href;
}

export async function loadGenealogyManifest() {
  if (!genealogyManifestPromise) {
    genealogyManifestPromise = fetch(sharedDataUrl('genealogy/manifest.json'), { cache: 'force-cache' }).then((res) => {
      if (!res.ok) throw new Error(`Genealogy manifest failed (${res.status})`);
      return res.json();
    });
  }
  return genealogyManifestPromise;
}

async function loadGenealogyChunk(chunk) {
  const key = typeof chunk === 'string' ? chunk : chunk && chunk.key;
  const file = typeof chunk === 'string' ? `genealogy/chunks/${chunk}.json` : `genealogy/${chunk.file}`;
  if (!key || !file) return [];
  if (!genealogyChunkCache.has(key)) {
    genealogyChunkCache.set(key, fetch(sharedDataUrl(file), { cache: 'force-cache' }).then((res) => {
      if (!res.ok) throw new Error(`Genealogy chunk ${key} failed (${res.status})`);
      return res.json();
    }));
  }
  return genealogyChunkCache.get(key);
}

export async function loadGenealogyRows() {
  if (!genealogyRowsPromise) {
    genealogyRowsPromise = loadGenealogyManifest()
      .then((manifest) => Promise.all((manifest.chunks || []).map(loadGenealogyChunk)))
      .then((chunks) => chunks.flat());
  }
  return genealogyRowsPromise;
}

export async function loadGenealogyFeaturedPerson(day, preferredIndex) {
  const manifest = await loadGenealogyManifest();
  const featured = Array.isArray(manifest.featured) ? manifest.featured : [];
  if (!featured.length) return null;
  const rawIndex = preferredIndex != null ? Number(preferredIndex) : Number(day || 0);
  const index = Number.isFinite(rawIndex) ? Math.abs(Math.trunc(rawIndex)) % featured.length : 0;
  const pick = featured[index];
  const rows = await loadGenealogyChunk(pick.chunk);
  return rows.find((row) => (
    (pick.personId && row.personId === pick.personId)
    || (pick.docId && row._docId === pick.docId)
    || row.name === pick.name
  )) || null;
}

