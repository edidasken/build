import { defineCommentarySource } from './commentary-source.js';

export const commentaryWesleyExplanatoryNotes = defineCommentarySource({
  id: 'wesley_explanatory_notes',
  scriptName: 'commentaryWesleyExplanatoryNotes',
  name: "Wesley's Explanatory Notes",
  worlddicCode: 'Wesley',
  chunkPath: './chunks/wesley_explanatory_notes/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    5,
    6,
    9,
    10,
    11,
    12,
    13,
    14,
    16,
    17,
    18,
    19,
    20
  ]
},
});

export default commentaryWesleyExplanatoryNotes;
