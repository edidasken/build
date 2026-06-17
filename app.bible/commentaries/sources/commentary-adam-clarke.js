import { defineCommentarySource } from './commentary-source.js';

export const commentaryAdamClarke = defineCommentarySource({
  id: 'adam_clarke_commentary',
  scriptName: 'commentaryAdamClarke',
  name: "Adam Clarke Commentary",
  worlddicCode: 'Adam_Cla',
  chunkPath: './chunks/adam_clarke_commentary/{book}/{chapter}.json',
  books: {},
});

export default commentaryAdamClarke;
