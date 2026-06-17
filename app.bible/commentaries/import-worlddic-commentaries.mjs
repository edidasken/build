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

for (const source of sources) {
  if (!source.worlddicCode) continue;
  if (sourceFilter && source.id !== sourceFilter && source.scriptName !== sourceFilter && source.worlddicCode !== sourceFilter) continue;
  const entries = [];
  let checked = 0;
  let imported = 0;
  for (const [book, config] of selectedBooks) {
    for (const chapter of config.chapters) {
      checked += 1;
      process.stdout.write(`Importing ${source.name} ${config.name} ${chapter}... `);
      const entry = await fetchChapter(source, book, chapter);
      if (entry) {
        entries.push(entry);
        imported += 1;
        process.stdout.write(`${entry.text.length} chars\n`);
      } else {
        process.stdout.write('missing\n');
      }
      await pause(80);
    }
  }
  await updateModule(source, entries);
  console.log(`${source.name}: imported ${imported} of ${checked} checked chapters.`);
}

console.log('Commentary import complete. Splitting source modules into offline chunks...');
await import(`./split-commentary-chunks.mjs?run=${Date.now()}`);
