import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcesPath = path.join(__dirname, 'commentary-sources.js');
const sourceText = await fs.readFile(sourcesPath, 'utf8');
const sourceMod = await import(`data:text/javascript;base64,${Buffer.from(sourceText).toString('base64')}`);
const sources = sourceMod.default;

const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, value = 'true'] = arg.replace(/^--/, '').split('=');
  return [key, value];
}));

const sourceFilter = args.get('source') || '';
const scope = args.get('scope') || (args.has('all') ? 'all' : 'john');
const refresh = args.has('refresh');
const concurrency = Math.max(1, Number.parseInt(args.get('concurrency') || '8', 10) || 8);
const pauseMs = Math.max(0, Number.parseInt(args.get('pause') || '0', 10) || 0);

const bookChapters = [
  ['Genesis', 'genesis', 50], ['Exodus', 'exodus', 40], ['Leviticus', 'leviticus', 27],
  ['Numbers', 'numbers', 36], ['Deuteronomy', 'deuteronomy', 34], ['Joshua', 'joshua', 24],
  ['Judges', 'judges', 21], ['Ruth', 'ruth', 4], ['1 Samuel', '1-samuel', 31],
  ['2 Samuel', '2-samuel', 24], ['1 Kings', '1-kings', 22], ['2 Kings', '2-kings', 25],
  ['1 Chronicles', '1-chronicles', 29], ['2 Chronicles', '2-chronicles', 36], ['Ezra', 'ezra', 10],
  ['Nehemiah', 'nehemiah', 13], ['Esther', 'esther', 10], ['Job', 'job', 42],
  ['Psalms', 'psalms', 150], ['Proverbs', 'proverbs', 31], ['Ecclesiastes', 'ecclesiastes', 12],
  ['Song of Solomon', 'song-of-solomon', 8], ['Isaiah', 'isaiah', 66], ['Jeremiah', 'jeremiah', 52],
  ['Lamentations', 'lamentations', 5], ['Ezekiel', 'ezekiel', 48], ['Daniel', 'daniel', 12],
  ['Hosea', 'hosea', 14], ['Joel', 'joel', 3], ['Amos', 'amos', 9],
  ['Obadiah', 'obadiah', 1], ['Jonah', 'jonah', 4], ['Micah', 'micah', 7],
  ['Nahum', 'nahum', 3], ['Habakkuk', 'habakkuk', 3], ['Zephaniah', 'zephaniah', 3],
  ['Haggai', 'haggai', 2], ['Zechariah', 'zechariah', 14], ['Malachi', 'malachi', 4],
  ['Matthew', 'matthew', 28], ['Mark', 'mark', 16], ['Luke', 'luke', 24],
  ['John', 'john', 21], ['Acts', 'acts', 28], ['Romans', 'romans', 16],
  ['1 Corinthians', '1-corinthians', 16], ['2 Corinthians', '2-corinthians', 13],
  ['Galatians', 'galatians', 6], ['Ephesians', 'ephesians', 6], ['Philippians', 'philippians', 4],
  ['Colossians', 'colossians', 4], ['1 Thessalonians', '1-thessalonians', 5],
  ['2 Thessalonians', '2-thessalonians', 3], ['1 Timothy', '1-timothy', 6], ['2 Timothy', '2-timothy', 4],
  ['Titus', 'titus', 3], ['Philemon', 'philemon', 1], ['Hebrews', 'hebrews', 13],
  ['James', 'james', 5], ['1 Peter', '1-peter', 5], ['2 Peter', '2-peter', 3],
  ['1 John', '1-john', 5], ['2 John', '2-john', 1], ['3 John', '3-john', 1],
  ['Jude', 'jude', 1], ['Revelation', 'revelation', 22],
];

const selectedBooks = new Map(
  bookChapters
    .filter(([, slug]) => scope === 'all' || slug === 'john')
    .map(([name, slug, chapterCount]) => [
      slug,
      { name, chapters: Array.from({ length: chapterCount }, (_, index) => index + 1) },
    ])
);

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const importBooks = bookChapters.map(([name, slug, chapterCount]) => ({
  name,
  slug,
  chapterCount,
  aliases: [
    name,
    slug.replace(/-/g, ' '),
    slug.replace(/-/g, ''),
  ],
}));
for (const book of importBooks) {
  if (book.slug === 'psalms') book.aliases.push('Psalm', 'Ps');
  if (book.slug === 'song-of-solomon') book.aliases.push('Song of Songs', 'Songs');
}
const importBookAliases = importBooks
  .flatMap((book) => [...new Set(book.aliases)].map((alias) => ({ alias, book })))
  .sort((a, b) => b.alias.length - a.alias.length);

async function runLimited(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function readExistingChunkEntries() {
  const chunksDir = path.join(__dirname, 'chunks');
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
        if (!bySource.has(sourceId)) bySource.set(sourceId, new Map());
        const sourceEntries = bySource.get(sourceId);
        for (const item of chunk.entries) {
          if (!item?.book || !item?.chapter) continue;
          const key = `${item.book}:${Number(item.chapter)}`;
          if (!sourceEntries.has(key)) sourceEntries.set(key, []);
          sourceEntries.get(key).push(item);
        }
      } catch (_) {}
    }
  }
  await visit(chunksDir);
  return bySource;
}

function decodeDocumentWrite(html) {
  const match = String(html || '').match(/document\.write\(unescape\('([\s\S]*?)'\)\)/i);
  if (!match) return html;
  return match[1]
    .replace(/%u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/%([0-9a-f]{2})/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)));
}

function extractBody(html) {
  return decodeDocumentWrite(html)
    .replace(/^\uFEFF/, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<button\b[^>]*>[\s\S]*?<\/button>/gi, '')
    .replace(/<div class="area-zoom-btn"[\s\S]*?<body>/i, '<body>')
    .replace(/^[\s\S]*?<body[^>]*>/i, '')
    .replace(/<\/body>[\s\S]*$/i, '')
    .replace(/<p\b[^>]*>\s*<span\b[^>]*>\s*&nbsp;\s*<\/span>\s*<\/p>/gi, '')
    .replace(/\s(?:class|style|onclick)="[^"]*"/gi, '')
    .replace(/<span\b[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<p\b[^>]*>/gi, '<p>')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 10)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&lsquo;|&rsquo;/gi, "'")
    .replace(/&hellip;/gi, '...')
    .replace(/&mdash;/gi, '-')
    .replace(/&ndash;/gi, '-');
}

function textFromHtml(value) {
  return decodeHtmlEntities(String(value || '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function extractArticleHtml(html) {
  const decoded = decodeDocumentWrite(html);
  const articleStart = decoded.search(/<p\b[^>]*class=["']?cs/i);
  let body = articleStart >= 0 ? decoded.slice(articleStart) : extractBody(decoded);
  const articleEnd = body.search(/<\/body>/i);
  if (articleEnd >= 0) body = body.slice(0, articleEnd);
  return body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<ins\b[^>]*>[\s\S]*?<\/ins>/gi, '')
    .replace(/<button\b[^>]*>[\s\S]*?<\/button>/gi, '')
    .replace(/<span\b[^>]*>/gi, '')
    .replace(/<\/span>/gi, '')
    .replace(/<p\b[^>]*>/gi, '<p>')
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

function articleParagraphs(articleHtml) {
  const paragraphs = [...String(articleHtml || '').matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => textFromHtml(match[1]))
    .filter((text) => text && text !== 'worlddic.com');
  return paragraphs.length ? paragraphs : [textFromHtml(articleHtml)].filter(Boolean);
}

function parseImportReference(value) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  for (const { alias, book } of importBookAliases) {
    const pattern = new RegExp(`(?:^|\\b)${escapeRegExp(alias)}\\.?\\s+(\\d{1,3})(?:\\s*:\\s*(\\d{1,3})(?:\\s*[-–—]\\s*(?:(\\d{1,3})\\s*:\\s*)?(\\d{1,3}))?)?`, 'i');
    const match = text.match(pattern);
    if (!match) continue;
    const chapter = Number(match[1]);
    const verseStart = match[2] ? Number(match[2]) : null;
    const endChapter = match[3] ? Number(match[3]) : chapter;
    const verseEnd = match[4] ? Number(match[4]) : verseStart;
    if (!Number.isFinite(chapter) || chapter < 1 || chapter > book.chapterCount) continue;
    return { book, chapter, verseStart, endChapter, verseEnd };
  }
  return null;
}

function formatImportReference(ref) {
  if (!ref?.book) return '';
  if (!ref.verseStart) return `${ref.book.name} ${ref.chapter}`;
  if (ref.verseEnd && ref.verseEnd !== ref.verseStart) {
    if (ref.endChapter && ref.endChapter !== ref.chapter) return `${ref.book.name} ${ref.chapter}:${ref.verseStart}-${ref.endChapter}:${ref.verseEnd}`;
    return `${ref.book.name} ${ref.chapter}:${ref.verseStart}-${ref.verseEnd}`;
  }
  return `${ref.book.name} ${ref.chapter}:${ref.verseStart}`;
}

function findEntryReference(paragraphs) {
  for (const paragraph of paragraphs.slice(0, 12)) {
    const ref = parseImportReference(paragraph);
    if (ref) return ref;
  }
  return parseImportReference(paragraphs.join(' '));
}

function mergeEntries(entries) {
  const byKey = new Map();
  for (const entry of entries) {
    if (!entry?.book || !entry?.chapter) continue;
    const key = `${entry.book}:${Number(entry.chapter)}:${entry.sourceUrl || ''}`;
    byKey.set(key, entry);
  }
  return [...byKey.values()].sort((a, b) => (
    String(a.book).localeCompare(String(b.book)) ||
    Number(a.chapter) - Number(b.chapter) ||
    String(a.sourceUrl || '').localeCompare(String(b.sourceUrl || ''))
  ));
}

function updateModule(source, entries) {
  const modulePath = path.join(__dirname, source.modulePath.replace(/^\.\//, ''));
  const body = `import { defineCommentarySource } from './commentary-source.js';

export const ${source.scriptName} = defineCommentarySource({
  id: '${source.id}',
  scriptName: '${source.scriptName}',
  name: ${JSON.stringify(source.name)},
  worlddicCode: '${source.worlddicCode}',
  entries: ${JSON.stringify(entries, null, 2)},
});

export default ${source.scriptName};
`;
  return fs.writeFile(modulePath, body);
}

function remoteBookSlug(slug) {
  return slug.replace(/-/g, '_');
}

async function fetchChapter(source, book, chapter) {
  const sourceUrl = `https://worlddic.com/xe/sermon4/${source.worlddicCode}_${remoteBookSlug(book)}_${chapter}.html`;
  const response = await fetch(sourceUrl);
  if (!response.ok) return null;
  const html = await response.text();
  const text = extractBody(html);
  if (!text || text.length < 80 || /404|not found/i.test(text.slice(0, 200))) return null;
  return {
    ref: `${selectedBooks.get(book).name} ${chapter}`,
    book,
    chapter,
    sourceUrl,
    text,
  };
}

function listFileUrl(source, file) {
  const folder = source.listFolder || 'sermon31';
  return `https://worlddic.com/xe/view_file.php?folder=${encodeURIComponent(folder)}&file=${encodeURIComponent(file)}`;
}

async function fetchListFiles(source) {
  const folder = source.listFolder || 'sermon31';
  const keyword = source.listKeyword || source.worlddicCode;
  const files = [];
  const seen = new Set();
  for (let page = 1; page <= 50; page += 1) {
    const listUrl = `https://worlddic.com/xe/file_list.php?folder=${encodeURIComponent(folder)}&keyword=${encodeURIComponent(keyword)}&page=${page}`;
    const response = await fetch(listUrl);
    if (!response.ok) break;
    const html = await response.text();
    const pageFiles = [...html.matchAll(/file=([^"'&<>]+\.html)/g)]
      .map((match) => match[1])
      .filter((file) => file.startsWith(`${source.worlddicCode}_`));
    let added = 0;
    for (const file of pageFiles) {
      if (seen.has(file)) continue;
      seen.add(file);
      files.push(file);
      added += 1;
    }
    if (!pageFiles.length || (page > 1 && !added)) break;
  }
  return files;
}

async function fetchListEntry(source, file) {
  const sourceUrl = listFileUrl(source, file);
  const response = await fetch(sourceUrl);
  if (!response.ok) return null;
  const html = await response.text();
  const text = extractArticleHtml(html);
  if (!text || textFromHtml(text).length < 80) return null;
  const paragraphs = articleParagraphs(text);
  const ref = findEntryReference(paragraphs);
  if (!ref) return null;
  const title = paragraphs.find((paragraph) => !parseImportReference(paragraph)) || source.name;
  return {
    ref: formatImportReference(ref),
    book: ref.book.slug,
    chapter: ref.chapter,
    sourceUrl,
    title,
    text,
  };
}

const existingBySource = await readExistingChunkEntries();

for (const source of sources) {
  if (!source.worlddicCode) continue;
  if (sourceFilter && source.id !== sourceFilter && source.scriptName !== sourceFilter && source.worlddicCode !== sourceFilter) continue;
  const entries = [];
  const existingSourceEntries = existingBySource.get(source.id) || new Map();
  let checked = 0;
  let imported = 0;
  let reused = 0;
  if (source.importStrategy === 'list') {
    for (const existing of existingSourceEntries.values()) {
      entries.push(...existing);
      reused += existing.length;
    }
    const existingUrls = new Set(entries.map((entry) => entry.sourceUrl).filter(Boolean));
    const files = await fetchListFiles(source);
    const fetchTasks = refresh ? files : files.filter((file) => !existingUrls.has(listFileUrl(source, file)));
    checked = files.length;
    console.log(`${source.name}: checking ${fetchTasks.length} list files with ${reused} cached entries.`);
    const fetched = await runLimited(fetchTasks, concurrency, async (file) => {
      const entry = await fetchListEntry(source, file);
      if (pauseMs) await pause(pauseMs);
      if (entry) {
        process.stdout.write(`Importing ${source.name} ${entry.ref}... ${textFromHtml(entry.text).length} chars\n`);
      }
      return entry;
    });
    for (const entry of fetched) {
      if (!entry) continue;
      entries.push(entry);
      imported += 1;
    }
    const merged = mergeEntries(entries);
    await updateModule(source, merged);
    console.log(`${source.name}: imported ${imported} new, reused ${reused} existing entries, ${merged.length} bundled entries after ${checked} listed files.`);
    continue;
  }
  const fetchTasks = [];
  for (const [book, config] of selectedBooks) {
    for (const chapter of config.chapters) {
      checked += 1;
      const existingKey = `${book}:${chapter}`;
      if (!refresh && existingSourceEntries.has(existingKey)) {
        const existing = existingSourceEntries.get(existingKey);
        entries.push(...existing);
        reused += existing.length;
        continue;
      }
      fetchTasks.push({ book, chapter, bookName: config.name });
    }
  }
  console.log(`${source.name}: checking ${fetchTasks.length} remote chapters with ${reused} cached entries.`);
  const fetched = await runLimited(fetchTasks, concurrency, async (task) => {
    const entry = await fetchChapter(source, task.book, task.chapter);
    if (pauseMs) await pause(pauseMs);
    if (entry) {
      process.stdout.write(`Importing ${source.name} ${task.bookName} ${task.chapter}... ${entry.text.length} chars\n`);
    }
    return entry;
  });
  for (const entry of fetched) {
    if (!entry) continue;
    entries.push(entry);
    imported += 1;
  }
  const merged = mergeEntries(entries);
  await updateModule(source, merged);
  console.log(`${source.name}: imported ${imported} new, reused ${reused} existing entries, ${merged.length} bundled entries after ${checked} checked chapters.`);
}

console.log('Commentary import complete. Splitting source modules into offline chunks...');
await import(`./split-commentary-chunks.mjs?run=${Date.now()}`);
