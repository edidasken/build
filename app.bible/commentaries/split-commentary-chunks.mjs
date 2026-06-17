import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.dirname(__dirname);
const sourcesDir = path.join(__dirname, 'sources');
const chunksDir = path.join(__dirname, 'chunks');
const cacheManifestPath = path.join(__dirname, 'commentary-cache-manifest.json');
const offlineManifestPath = path.join(appDir, 'offline-assets.json');

async function readExistingChunkEntries() {
  const bySource = new Map();
  async function visit(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (_) {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(fullPath);
        continue;
      }
      if (!entry.name.endsWith('.json')) continue;
      try {
        const chunk = JSON.parse(await fs.readFile(fullPath, 'utf8'));
        const sourceId = chunk?.source?.id;
        if (!sourceId || !Array.isArray(chunk.entries)) continue;
        if (!bySource.has(sourceId)) bySource.set(sourceId, []);
        bySource.get(sourceId).push(...chunk.entries);
      } catch (_) {}
    }
  }
  await visit(chunksDir);
  return bySource;
}

function extractEntries(sourceText) {
  const marker = 'entries: ';
  const start = sourceText.indexOf(marker);
  if (start === -1) return [];
  const arrayStart = sourceText.indexOf('[', start);
  const arrayEnd = sourceText.indexOf('\n],\n});', arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return [];
  return JSON.parse(sourceText.slice(arrayStart, arrayEnd + 2));
}

function extractSingleQuoted(sourceText, key) {
  const match = sourceText.match(new RegExp(`${key}: '([^']*)'`));
  return match ? match[1] : '';
}

function extractJsonString(sourceText, key) {
  const match = sourceText.match(new RegExp(`${key}: ("(?:[^"\\\\]|\\\\.)*")`));
  return match ? JSON.parse(match[1]) : '';
}

function groupEntriesByBookAndChapter(entries) {
  const groups = new Map();
  for (const entry of entries) {
    if (!entry?.book) continue;
    const chapter = Number(entry.chapter || 0);
    if (!chapter) continue;
    if (!groups.has(entry.book)) groups.set(entry.book, new Map());
    const book = groups.get(entry.book);
    if (!book.has(chapter)) book.set(chapter, []);
    book.get(chapter).push(entry);
  }
  return groups;
}

function buildSourceModule({ exportName, id, scriptName, name, worlddicCode, books }) {
  return `import { defineCommentarySource } from './commentary-source.js';

export const ${exportName} = defineCommentarySource({
  id: '${id}',
  scriptName: '${scriptName}',
  name: ${JSON.stringify(name)},
  worlddicCode: '${worlddicCode}',
  chunkPath: './chunks/${id}/{book}/{chapter}.json',
  books: ${JSON.stringify(books, null, 2)},
});

export default ${exportName};
`;
}

async function collectBibleRuntimeAssets() {
  const assets = [];
  const allowed = /\.(html|css|js|json|svg|png|webp|woff2?|dic)$/i;
  async function visit(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch (_) {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relative = path.relative(appDir, fullPath).replace(/\\/g, '/');
      if (entry.isDirectory()) {
        if (relative === 'commentaries/chunks' || relative === 'commentaries/sources') continue;
        if (relative === 'commentaries/bible-commentaries-english') continue;
        await visit(fullPath);
        continue;
      }
      if (!allowed.test(entry.name)) continue;
      if (relative === 'offline-assets.json') continue;
      if (relative.startsWith('commentaries/') && relative.endsWith('.mjs')) continue;
      const stats = await fs.stat(fullPath);
      assets.push({
        path: `app.bible/${relative}`,
        source: 'app.bible',
        bytes: stats.size,
      });
    }
  }
  await visit(appDir);
  return assets;
}

const existingChunkEntries = await readExistingChunkEntries();
await fs.rm(chunksDir, { recursive: true, force: true });
await fs.mkdir(chunksDir, { recursive: true });
const sourceFiles = (await fs.readdir(sourcesDir))
  .filter((file) => file.endsWith('.js') && file !== 'commentary-source.js')
  .sort();

const manifest = {
  version: new Date().toISOString(),
  strategy: 'deferred-cache',
  description: 'Book-level local commentary chunks for offline app.bible use.',
  assets: [
    { path: 'app.bible/commentaries/sources/commentary-source.js', source: 'runtime', bytes: 0 },
  ],
  sources: {},
};

for (const file of sourceFiles) {
  const filePath = path.join(sourcesDir, file);
  const sourceText = await fs.readFile(filePath, 'utf8');
  const id = extractSingleQuoted(sourceText, 'id');
  const scriptName = extractSingleQuoted(sourceText, 'scriptName');
  const worlddicCode = extractSingleQuoted(sourceText, 'worlddicCode');
  const name = extractJsonString(sourceText, 'name') || extractSingleQuoted(sourceText, 'name');
  const exportName = (sourceText.match(/export const ([a-zA-Z0-9_$]+)/) || [])[1] || scriptName;
  if (!id || !scriptName || !exportName) continue;
  const entries = extractEntries(sourceText);
  if (!entries.length && existingChunkEntries.has(id)) {
    entries.push(...existingChunkEntries.get(id));
  }

  const sourceChunkDir = path.join(chunksDir, id);
  await fs.rm(sourceChunkDir, { recursive: true, force: true });
  await fs.mkdir(sourceChunkDir, { recursive: true });

  const books = {};
  const groups = groupEntriesByBookAndChapter(entries);
  for (const [book, chapters] of groups) {
    books[book] = [];
    const bookDir = path.join(sourceChunkDir, book);
    await fs.mkdir(bookDir, { recursive: true });
    for (const [chapter, chapterEntries] of [...chapters].sort((a, b) => a[0] - b[0])) {
      const chunk = {
        source: { id, name, worlddicCode },
        book,
        chapter,
        entries: chapterEntries,
      };
      const relativePath = `commentaries/chunks/${id}/${book}/${chapter}.json`;
      const outputPath = path.join(bookDir, `${chapter}.json`);
      const payload = `${JSON.stringify(chunk)}\n`;
      await fs.writeFile(outputPath, payload);
      books[book].push(chapter);
      manifest.assets.push({
        path: `app.bible/${relativePath}`,
        source: id,
        book,
        chapter,
        entries: chapterEntries.length,
        bytes: Buffer.byteLength(payload),
      });
    }
  }

  manifest.sources[id] = {
    name,
    modulePath: `app.bible/commentaries/sources/${file}`,
    chunks: Object.keys(books).length,
    entries: entries.length,
  };
  manifest.assets.push({
    path: `app.bible/commentaries/sources/${file}`,
    source: id,
    bytes: Buffer.byteLength(buildSourceModule({ exportName, id, scriptName, name, worlddicCode, books })),
  });

  await fs.writeFile(filePath, buildSourceModule({ exportName, id, scriptName, name, worlddicCode, books }));
}

manifest.assets.sort((a, b) => {
  const aModule = a.path.includes('/sources/') ? 0 : 1;
  const bModule = b.path.includes('/sources/') ? 0 : 1;
  return aModule - bModule || a.path.localeCompare(b.path);
});
await fs.writeFile(cacheManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const runtimeAssets = await collectBibleRuntimeAssets();
const offlineAssets = new Map();
for (const asset of [...runtimeAssets, ...manifest.assets]) {
  if (!offlineAssets.has(asset.path)) offlineAssets.set(asset.path, asset);
}
const offlineManifest = {
  version: manifest.version,
  strategy: 'deferred-cache',
  description: 'Deferred app.bible assets for complete offline use after PWA installation.',
  assets: [...offlineAssets.values()].sort((a, b) => {
    const aChunk = a.path.includes('/chunks/') ? 1 : 0;
    const bChunk = b.path.includes('/chunks/') ? 1 : 0;
    const aSource = a.path.includes('/sources/') ? 0 : 1;
    const bSource = b.path.includes('/sources/') ? 0 : 1;
    return aChunk - bChunk || aSource - bSource || a.path.localeCompare(b.path);
  }),
};
await fs.writeFile(offlineManifestPath, `${JSON.stringify(offlineManifest, null, 2)}\n`);

console.log(`Split ${manifest.assets.length} commentary chunks for ${Object.keys(manifest.sources).length} sources.`);
