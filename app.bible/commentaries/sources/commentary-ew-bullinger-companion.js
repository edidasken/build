import { defineCommentarySource } from './commentary-source.js';

export const commentaryEwBullingerCompanion = defineCommentarySource({
  id: 'ew_bullinger_companion',
  scriptName: 'commentaryEwBullingerCompanion',
  name: "E.W. Bullinger's Companion",
  worlddicCode: 'Bullinger',
  chunkPath: './chunks/ew_bullinger_companion/{book}/{chapter}.json',
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
    17,
    18,
    20,
    21
  ]
},
});

export default commentaryEwBullingerCompanion;
