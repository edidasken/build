import { defineCommentarySource } from './commentary-source.js';

export const commentaryCriticalExplanatory = defineCommentarySource({
  id: 'commentary_critical_explanatory',
  scriptName: 'commentaryCriticalExplanatory',
  name: "Commentary Critical and Explanatory",
  worlddicCode: 'Critical_Expl',
  chunkPath: './chunks/commentary_critical_explanatory/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    3,
    4,
    6,
    8,
    9,
    11,
    12,
    13,
    14,
    16,
    17,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryCriticalExplanatory;
