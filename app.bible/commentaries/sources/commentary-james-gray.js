import { defineCommentarySource } from './commentary-source.js';

export const commentaryJamesGray = defineCommentarySource({
  id: 'james_gray_commentary',
  scriptName: 'commentaryJamesGray',
  name: "James Gray",
  worlddicCode: 'James_Gray',
  chunkPath: './chunks/james_gray_commentary/{book}/{chapter}.json',
  books: {
  "1-chronicles": [
    1,
    10
  ],
  "1-corinthians": [
    1,
    5,
    7,
    11,
    12,
    15
  ],
  "1-john": [
    1,
    2,
    4
  ],
  "1-kings": [
    1,
    3,
    6,
    8,
    9,
    12,
    15,
    17,
    20
  ],
  "1-peter": [
    1,
    2,
    4
  ],
  "1-samuel": [
    1,
    2,
    3,
    7,
    9,
    10,
    13,
    15,
    16,
    18,
    21,
    25,
    28
  ],
  "1-thessalonians": [
    1,
    2,
    4,
    5
  ],
  "1-timothy": [
    1,
    2,
    4,
    5
  ],
  "2-chronicles": [
    1,
    10,
    21,
    30
  ],
  "2-corinthians": [
    1,
    2,
    4,
    6,
    8,
    10
  ],
  "2-john": [
    1
  ],
  "2-kings": [
    1,
    3,
    6,
    8,
    11,
    15,
    18,
    21,
    24
  ],
  "2-peter": [
    1,
    2
  ],
  "2-samuel": [
    1,
    5,
    8,
    11,
    13,
    19,
    22
  ],
  "2-thessalonians": [
    1,
    2,
    3
  ],
  "2-timothy": [
    1,
    2
  ],
  "3-john": [
    1
  ],
  "acts": [
    1,
    2,
    3,
    4,
    6,
    8,
    9,
    11,
    13,
    15,
    18,
    24,
    27
  ],
  "amos": [
    1
  ],
  "colossians": [
    1,
    2
  ],
  "daniel": [
    1,
    3,
    7,
    8,
    9,
    10,
    11
  ],
  "deuteronomy": [
    1,
    4,
    7,
    12,
    17,
    21,
    23,
    27,
    29,
    31,
    32
  ],
  "ecclesiastes": [
    1,
    3,
    5,
    7,
    9
  ],
  "ephesians": [
    1,
    2,
    3,
    4,
    5
  ],
  "esther": [
    1,
    8
  ],
  "exodus": [
    1,
    2,
    4,
    7,
    11,
    12,
    14,
    17,
    19,
    20,
    21,
    25,
    28,
    29,
    30,
    32,
    33,
    35
  ],
  "ezekiel": [
    1,
    4,
    8,
    12,
    16,
    19,
    25,
    33,
    38,
    40,
    44
  ],
  "ezra": [
    1,
    7
  ],
  "galatians": [
    1,
    5
  ],
  "genesis": [
    1,
    3,
    4,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    14,
    16,
    18,
    19,
    20,
    21,
    24,
    25,
    29,
    32,
    34,
    37,
    48
  ],
  "habakkuk": [
    1
  ],
  "hebrews": [
    1,
    3,
    5,
    8,
    10,
    13
  ],
  "hosea": [
    1,
    4
  ],
  "isaiah": [
    1,
    6,
    7,
    10,
    13,
    28,
    36,
    40,
    49,
    58
  ],
  "james": [
    1,
    2,
    3,
    4
  ],
  "jeremiah": [
    1,
    2,
    13,
    21,
    25,
    27,
    35,
    37
  ],
  "job": [
    1,
    4,
    15,
    22,
    32
  ],
  "joel": [
    1
  ],
  "john": [
    1,
    2,
    5,
    7,
    10,
    12,
    14,
    15,
    17,
    18,
    20
  ],
  "jonah": [
    1
  ],
  "joshua": [
    1,
    3,
    6,
    9,
    11,
    13,
    20,
    23
  ],
  "jude": [
    1
  ],
  "judges": [
    1,
    4,
    6,
    9,
    10,
    13,
    17
  ],
  "lamentations": [
    1
  ],
  "leviticus": [
    1,
    2,
    4,
    8,
    11,
    12,
    13,
    16,
    17,
    20,
    23,
    25,
    26,
    27
  ],
  "luke": [
    1,
    3,
    4,
    5,
    7,
    11,
    12,
    13,
    14,
    16,
    17,
    18,
    20,
    22,
    24
  ],
  "malachi": [
    1,
    4
  ],
  "mark": [
    1,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    15
  ],
  "matthew": [
    1,
    3,
    4,
    5,
    8,
    10,
    13,
    14,
    16,
    17,
    20,
    24,
    26,
    27,
    28
  ],
  "micah": [
    1
  ],
  "nahum": [
    1
  ],
  "nehemiah": [
    1,
    7
  ],
  "numbers": [
    1,
    5,
    9,
    11,
    13,
    15,
    20,
    22,
    25,
    32,
    35
  ],
  "obadiah": [
    1
  ],
  "philemon": [
    1
  ],
  "philippians": [
    1,
    2,
    3,
    4
  ],
  "proverbs": [
    1,
    4,
    8,
    10,
    16,
    25,
    30
  ],
  "psalms": [
    1,
    7,
    11,
    18,
    25,
    38,
    67,
    79,
    109,
    120,
    135
  ],
  "revelation": [
    1,
    2,
    4,
    8,
    12,
    15,
    17,
    19,
    21
  ],
  "romans": [
    1,
    3,
    5,
    7,
    9,
    12
  ],
  "ruth": [
    1,
    3
  ],
  "song-of-solomon": [
    1,
    3,
    6
  ],
  "titus": [
    1,
    2
  ],
  "zechariah": [
    1,
    4,
    9
  ],
  "zephaniah": [
    1
  ]
},
});

export default commentaryJamesGray;
