import { defineCommentarySource } from './commentary-source.js';

export const commentaryArnoGaebeleinAnnotatedBible = defineCommentarySource({
  id: 'arno_gaebelein_annotated_bible',
  scriptName: 'commentaryArnoGaebeleinAnnotatedBible',
  name: "Arno Gaebelein's Annotated Bible",
  worlddicCode: 'Arno_Gae',
  chunkPath: './chunks/arno_gaebelein_annotated_bible/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    4,
    5,
    6,
    7,
    8,
    9,
    11,
    12,
    13,
    14,
    15,
    17,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryArnoGaebeleinAnnotatedBible;
