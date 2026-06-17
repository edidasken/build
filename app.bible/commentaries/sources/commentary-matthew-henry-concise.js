import { defineCommentarySource } from './commentary-source.js';

export const commentaryMatthewHenryConcise = defineCommentarySource({
  id: 'matthew_henry_concise',
  scriptName: 'commentaryMatthewHenryConcise',
  name: "Matthew Henry's Concise",
  worlddicCode: 'Matt_Hen_Con',
  chunkPath: './chunks/matthew_henry_concise/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    3,
    4,
    5,
    6,
    8,
    9,
    10,
    11,
    12,
    13,
    15,
    17,
    18,
    19,
    21
  ]
},
});

export default commentaryMatthewHenryConcise;
