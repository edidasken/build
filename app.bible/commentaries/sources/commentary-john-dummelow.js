import { defineCommentarySource } from './commentary-source.js';

export const commentaryJohnDummelow = defineCommentarySource({
  id: 'john_dummelow_commentary',
  scriptName: 'commentaryJohnDummelow',
  name: "John Dummelow's Commentary",
  worlddicCode: 'John_Dum',
  chunkPath: './chunks/john_dummelow_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    3,
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
    19,
    20,
    21
  ]
},
});

export default commentaryJohnDummelow;
