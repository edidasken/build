/* ============================================================================
   THE BIBLE REFERENCE - local scripture lookup over imported MDBible modules
   ============================================================================ */

const MANIFEST_URL = new URL('../../Data/bible/mdbible/manifest.js', import.meta.url).href;

let _manifestPromise = null;
const _bookCache = new Map();
let _aliasList = null;

function _norm(s) {
  return String(s || '')
    .replace(/[.\u2019']/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function _displayRef(book, chapter, verse, verseEnd) {
  let out = `${book} ${chapter}`;
  if (verse) {
    out += `:${verse}`;
    if (verseEnd && verseEnd !== verse) out += `-${verseEnd}`;
  }
  return out;
}

async function _manifest() {
  if (!_manifestPromise) {
    _manifestPromise = import(MANIFEST_URL).then((m) => m.default || m);
  }
  return _manifestPromise;
}

async function _aliases() {
  if (_aliasList) return _aliasList;
  const manifest = await _manifest();
  _aliasList = Object.keys(manifest.aliases || {})
    .sort((a, b) => b.length - a.length)
    .map((alias) => ({ alias, slug: manifest.aliases[alias] }));
  return _aliasList;
}

async function _book(slug) {
  if (!slug) return null;
  if (_bookCache.has(slug)) return _bookCache.get(slug);
  const manifest = await _manifest();
  const meta = (manifest.books || []).find((b) => b.slug === slug);
  if (!meta) return null;
  const promise = import(new URL(`../../Data/bible/mdbible/${meta.file}`, import.meta.url).href)
    .then((m) => m.default || m);
  _bookCache.set(slug, promise);
  return promise;
}

export async function getBibleManifest() {
  return _manifest();
}

export async function parseReference(rawRef) {
  const source = String(rawRef || '').trim();
  const normalized = _norm(source);
  if (!normalized) return null;

  const aliases = await _aliases();
  const match = aliases.find((entry) =>
    normalized === entry.alias || normalized.startsWith(`${entry.alias} `)
  );
  if (!match) return null;

  const rest = normalized.slice(match.alias.length).trim();
  const range = rest.match(/^(\d+)(?::(\d+)(?:-(\d+))?)?(?:-(\d+))?$/);
  if (!range) return null;

  const chapter = Number(range[1]);
  const verse = range[2] ? Number(range[2]) : null;
  const verseEnd = range[3] ? Number(range[3]) : verse;
  const chapterEnd = !verse && range[4] ? Number(range[4]) : chapter;

  if (!chapter || chapter < 1) return null;
  if (chapterEnd < chapter) return null;
  if (verse != null && verse < 1) return null;
  if (verseEnd != null && verseEnd < verse) return null;

  const book = await _book(match.slug);
  if (!book) return null;

  return {
    raw: source,
    book: book.name,
    slug: book.slug,
    chapter,
    chapterEnd,
    verse,
    verseEnd,
    version: book.version || 'ESV',
    versionName: book.versionName || '',
    reference: _displayRef(book.name, chapter, verse, verseEnd),
  };
}

function _versesFromBook(book, parsed, maxVerses) {
  const out = [];
  const chapterEnd = Math.min(parsed.chapterEnd, book.chapters.length);
  for (let ch = parsed.chapter; ch <= chapterEnd; ch++) {
    const verses = book.chapters[ch - 1] || [];
    if (!verses.length) continue;
    let start = 1;
    let end = verses.length;
    if (ch === parsed.chapter && parsed.verse) start = parsed.verse;
    if (ch === parsed.chapter && parsed.verseEnd) end = parsed.verseEnd;
    end = Math.min(end, verses.length);
    for (let v = start; v <= end; v++) {
      if (maxVerses && out.length >= maxVerses) {
        out.truncated = true;
        return out;
      }
      out.push({
        book: book.name,
        chapter: ch,
        verse: v,
        reference: `${book.name} ${ch}:${v}`,
        text: verses[v - 1] || '',
        strongs: book.strongs && book.strongs[ch - 1] ? (book.strongs[ch - 1][v - 1] || []) : [],
      });
    }
  }
  return out;
}

export async function lookupPassage(rawRef, options = {}) {
  const refs = String(rawRef || '').split(/\s*;\s*/).filter(Boolean);
  if (refs.length > 1) {
    const parts = await Promise.all(refs.map((ref) => lookupPassage(ref, options)));
    const good = parts.filter((p) => p && p.ok);
    const verses = good.flatMap((p) => p.verses || []);
    return {
      ok: good.length > 0,
      raw: rawRef,
      reference: good.map((p) => p.reference).join('; '),
      version: good[0] ? good[0].version : '',
      versionName: good[0] ? good[0].versionName : '',
      verses,
      truncated: good.some((p) => p.truncated),
      text: formatPassage(verses, { includeNumbers: options.includeNumbers !== false }),
    };
  }

  const parsed = await parseReference(rawRef);
  if (!parsed) {
    return { ok: false, raw: rawRef, error: 'Reference not recognized' };
  }

  const book = await _book(parsed.slug);
  if (!book) return { ok: false, raw: rawRef, error: 'Book not found' };

  const verses = _versesFromBook(book, parsed, options.maxVerses || 0);
  return {
    ok: verses.length > 0,
    ...parsed,
    verses,
    truncated: !!verses.truncated,
    copyright: (await _manifest()).source?.originalMeta?.copyright || '',
    text: formatPassage(verses, { includeNumbers: options.includeNumbers !== false }),
  };
}

export async function lookupChapter(bookName, chapter, options = {}) {
  return lookupPassage(`${bookName} ${chapter}`, options);
}

export function formatPassage(verses, options = {}) {
  const includeNumbers = options.includeNumbers !== false;
  return (verses || []).map((v) => (
    includeNumbers ? `[${v.reference}] ${v.text}` : v.text
  )).join('\n');
}

if (typeof window !== 'undefined') {
  window.FlockBible = {
    getBibleManifest,
    parseReference,
    lookupPassage,
    lookupChapter,
    formatPassage,
  };
}
