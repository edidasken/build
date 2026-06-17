import { defineCommentarySource } from './commentary-source.js';

export const commentarySpurgeonSermons = defineCommentarySource({
  id: 'spurgeon_sermons',
  scriptName: 'commentarySpurgeonSermons',
  name: "Spurgeon's Sermons",
  worlddicCode: 'Spurgeon_Ser',
  chunkPath: './chunks/spurgeon_sermons/{book}/{chapter}.json',
  books: {},
});

export default commentarySpurgeonSermons;
