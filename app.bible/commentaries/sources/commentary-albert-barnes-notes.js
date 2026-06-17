import { defineCommentarySource } from './commentary-source.js';

export const commentaryAlbertBarnesNotes = defineCommentarySource({
  id: 'albert_barnes_notes',
  scriptName: 'commentaryAlbertBarnesNotes',
  name: "Albert Barnes' Notes",
  worlddicCode: 'Albert_Bar',
  chunkPath: './chunks/albert_barnes_notes/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    5,
    7,
    8,
    9,
    10,
    12,
    13,
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

export default commentaryAlbertBarnesNotes;
