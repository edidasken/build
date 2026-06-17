import { defineCommentarySource } from './commentary-source.js';

export const commentaryBridgewayBible = defineCommentarySource({
  id: 'bridgeway_bible_commentary',
  scriptName: 'commentaryBridgewayBible',
  name: "The Bridgeway Bible Commentary",
  worlddicCode: 'Bridgeway',
  chunkPath: './chunks/bridgeway_bible_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    5,
    6,
    7,
    8,
    10,
    11,
    12,
    14,
    15,
    16,
    17,
    19,
    20,
    21
  ]
},
});

export default commentaryBridgewayBible;
