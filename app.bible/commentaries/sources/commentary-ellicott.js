import { defineCommentarySource } from './commentary-source.js';

export const commentaryEllicott = defineCommentarySource({
  id: 'ellicott_commentary',
  scriptName: 'commentaryEllicott',
  name: "Ellicott's Commentary",
  worlddicCode: 'Ellicott',
  chunkPath: './chunks/ellicott_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    4,
    5,
    7,
    9,
    10,
    11,
    12,
    14,
    15,
    16,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryEllicott;
