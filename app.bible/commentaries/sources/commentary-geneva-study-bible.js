import { defineCommentarySource } from './commentary-source.js';

export const commentaryGenevaStudyBible = defineCommentarySource({
  id: 'geneva_study_bible',
  scriptName: 'commentaryGenevaStudyBible',
  name: "Geneva Study Bible",
  worlddicCode: 'Geneva_Stu',
  chunkPath: './chunks/geneva_study_bible/{book}/{chapter}.json',
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
    18,
    19,
    21
  ]
},
});

export default commentaryGenevaStudyBible;
