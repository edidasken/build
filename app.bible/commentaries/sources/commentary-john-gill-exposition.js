import { defineCommentarySource } from './commentary-source.js';

export const commentaryJohnGillExposition = defineCommentarySource({
  id: 'john_gill_exposition',
  scriptName: 'commentaryJohnGillExposition',
  name: "John Gill's Exposition",
  worlddicCode: 'John_Gill',
  chunkPath: './chunks/john_gill_exposition/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
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
    16,
    17,
    18,
    20,
    21
  ]
},
});

export default commentaryJohnGillExposition;
