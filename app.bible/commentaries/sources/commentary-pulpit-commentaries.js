import { defineCommentarySource } from './commentary-source.js';

export const commentaryPulpitCommentaries = defineCommentarySource({
  id: 'pulpit_commentaries',
  scriptName: 'commentaryPulpitCommentaries',
  name: "The Pulpit Commentaries",
  worlddicCode: 'Pulpit',
  chunkPath: './chunks/pulpit_commentaries/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    13,
    14,
    15,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryPulpitCommentaries;
