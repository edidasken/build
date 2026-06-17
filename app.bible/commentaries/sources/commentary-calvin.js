import { defineCommentarySource } from './commentary-source.js';

export const commentaryCalvin = defineCommentarySource({
  id: 'calvin_commentary',
  scriptName: 'commentaryCalvin',
  name: "Calvin's Commentary",
  worlddicCode: 'Calvin',
  chunkPath: './chunks/calvin_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    2,
    3,
    4,
    5,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    15,
    16,
    17,
    18,
    20,
    21
  ]
},
});

export default commentaryCalvin;
