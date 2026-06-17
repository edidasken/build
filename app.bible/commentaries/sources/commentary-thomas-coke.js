import { defineCommentarySource } from './commentary-source.js';

export const commentaryThomasCoke = defineCommentarySource({
  id: 'thomas_coke_commentary',
  scriptName: 'commentaryThomasCoke',
  name: "Thomas Coke Commentary",
  worlddicCode: 'Thomas_Coke',
  chunkPath: './chunks/thomas_coke_commentary/{book}/{chapter}.json',
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
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryThomasCoke;
