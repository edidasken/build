export function defineCommentarySource(source) {
  return Object.freeze({
    entries: [],
    books: {},
    ...source,
  });
}
