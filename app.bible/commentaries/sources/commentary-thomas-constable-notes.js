import { defineCommentarySource } from './commentary-source.js';

export const commentaryThomasConstableNotes = defineCommentarySource({
  id: 'thomas_constable_notes',
  scriptName: 'commentaryThomasConstableNotes',
  name: "Thomas Constable",
  worlddicCode: 'Dr_Thomas',
  chunkPath: './chunks/thomas_constable_notes/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    4,
    5,
    6,
    7,
    8,
    10,
    11,
    12,
    13,
    14,
    16,
    17,
    18,
    19,
    21
  ]
},
});

export default commentaryThomasConstableNotes;
