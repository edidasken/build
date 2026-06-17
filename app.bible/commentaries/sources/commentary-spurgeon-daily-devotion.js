import { defineCommentarySource } from './commentary-source.js';

export const commentarySpurgeonDailyDevotion = defineCommentarySource({
  id: 'spurgeon_daily_devotion',
  scriptName: 'commentarySpurgeonDailyDevotion',
  name: "Spurgeon's Daily Devotion",
  worlddicCode: 'Spurgeon_Daily',
  chunkPath: './chunks/spurgeon_daily_devotion/{book}/{chapter}.json',
  books: {},
});

export default commentarySpurgeonDailyDevotion;
