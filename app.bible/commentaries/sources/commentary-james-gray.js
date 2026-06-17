import { defineCommentarySource } from './commentary-source.js';

export const commentaryJamesGray = defineCommentarySource({
  id: 'james_gray_commentary',
  scriptName: 'commentaryJamesGray',
  name: "James Gray",
  worlddicCode: 'James_Gray',
  chunkPath: './chunks/james_gray_commentary/{book}/{chapter}.json',
  books: {
  "john": [
    1,
    2,
    5,
    7,
    12,
    14,
    15,
    18,
    20
  ]
},
});

export default commentaryJamesGray;
