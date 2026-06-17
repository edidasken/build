import { defineCommentarySource } from './commentary-source.js';

export const commentaryScofieldReferenceNotes = defineCommentarySource({
  id: 'scofield_reference_notes',
  scriptName: 'commentaryScofieldReferenceNotes',
  name: "Scofield's Reference Notes",
  worlddicCode: 'Scofield',
  chunkPath: './chunks/scofield_reference_notes/{book}/{chapter}.json',
  books: {
  "john": [
    2,
    3,
    4,
    5,
    7,
    9,
    11,
    12,
    13,
    15,
    16,
    18,
    19,
    20,
    21
  ]
},
});

export default commentaryScofieldReferenceNotes;
