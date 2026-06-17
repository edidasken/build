import { defineCommentarySource } from './commentary-source.js';

export const commentaryJosephBenson = defineCommentarySource({
  id: 'joseph_benson_commentary',
  scriptName: 'commentaryJosephBenson',
  name: "Joseph Benson's Commentary",
  worlddicCode: 'Joseph_Ben',
  chunkPath: './chunks/joseph_benson_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    4,
    5,
    6,
    7,
    9,
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

export default commentaryJosephBenson;
