import { defineCommentarySource } from './commentary-source.js';

export const commentarySpurgeonDailyDevotion = defineCommentarySource({
  id: 'spurgeon_daily_devotion',
  scriptName: 'commentarySpurgeonDailyDevotion',
  name: "Spurgeon's Daily Devotion",
  worlddicCode: 'Spurgeon_Daily',
  chunkPath: './chunks/spurgeon_daily_devotion/{book}/{chapter}.json',
  books: {
  "1-chronicles": [
    4,
    5,
    9
  ],
  "1-corinthians": [
    1,
    2,
    3,
    7,
    9,
    10,
    11,
    15
  ],
  "1-john": [
    1,
    2,
    3,
    4
  ],
  "1-kings": [
    17,
    18,
    19,
    22
  ],
  "1-peter": [
    1,
    2,
    5
  ],
  "1-samuel": [
    1,
    7,
    13,
    15,
    18,
    30
  ],
  "1-thessalonians": [
    1,
    2,
    4,
    5
  ],
  "1-timothy": [
    3,
    6
  ],
  "2-chronicles": [
    25,
    30,
    31,
    32
  ],
  "2-corinthians": [
    1,
    4,
    5,
    6,
    7,
    8,
    11,
    12
  ],
  "2-kings": [
    3,
    6,
    7,
    25
  ],
  "2-peter": [
    1,
    3
  ],
  "2-samuel": [
    1,
    2,
    5,
    7,
    9,
    11,
    15,
    18,
    21,
    23
  ],
  "2-thessalonians": [
    2
  ],
  "2-timothy": [
    1,
    2,
    4
  ],
  "acts": [
    1,
    2,
    4,
    5,
    8,
    9,
    10,
    13,
    14,
    16,
    18,
    27
  ],
  "amos": [
    9
  ],
  "colossians": [
    1,
    2,
    3,
    4
  ],
  "daniel": [
    3,
    5,
    9,
    10,
    11
  ],
  "deuteronomy": [
    1,
    5,
    32,
    33
  ],
  "ecclesiastes": [
    1,
    7,
    9,
    10,
    11
  ],
  "ephesians": [
    1,
    2,
    3,
    4,
    5,
    6
  ],
  "esther": [
    10
  ],
  "exodus": [
    3,
    7,
    8,
    14,
    17,
    20,
    22,
    25,
    28,
    34,
    35
  ],
  "ezekiel": [
    3,
    15,
    16,
    20,
    33,
    34,
    35,
    36
  ],
  "ezra": [
    8
  ],
  "galatians": [
    2,
    3,
    5
  ],
  "genesis": [
    1,
    3,
    4,
    7,
    8,
    9,
    21,
    24,
    25,
    29,
    32,
    35,
    39,
    41,
    42,
    46,
    49
  ],
  "habakkuk": [
    1,
    3
  ],
  "haggai": [
    1,
    2
  ],
  "hebrews": [
    1,
    2,
    4,
    5,
    9,
    11,
    12,
    13
  ],
  "hosea": [
    3,
    5,
    7,
    10,
    12,
    13,
    14
  ],
  "isaiah": [
    2,
    3,
    7,
    14,
    21,
    26,
    30,
    32,
    33,
    36,
    37,
    40,
    41,
    43,
    44,
    45,
    48,
    49,
    51,
    53,
    54,
    58,
    59,
    62,
    63,
    64,
    65
  ],
  "james": [
    5
  ],
  "jeremiah": [
    2,
    3,
    8,
    15,
    16,
    17,
    23,
    31,
    32,
    33,
    49,
    51
  ],
  "job": [
    1,
    7,
    8,
    10,
    13,
    14,
    19,
    22,
    23,
    29,
    35,
    36,
    38,
    40
  ],
  "joel": [
    1,
    2
  ],
  "john": [
    1,
    3,
    4,
    5,
    6,
    7,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21
  ],
  "jonah": [
    1,
    2,
    4
  ],
  "joshua": [
    1,
    2,
    5,
    6,
    20
  ],
  "jude": [
    1
  ],
  "judges": [
    7,
    15,
    16
  ],
  "lamentations": [
    3
  ],
  "leviticus": [
    1,
    6,
    13,
    19
  ],
  "luke": [
    2,
    3,
    4,
    5,
    6,
    8,
    10,
    11,
    14,
    15,
    18,
    19,
    22,
    23,
    24
  ],
  "malachi": [
    3
  ],
  "mark": [
    1,
    2,
    3,
    4,
    8,
    9,
    10,
    11,
    14,
    15,
    16
  ],
  "matthew": [
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
    14,
    15,
    19,
    22,
    24,
    26,
    27,
    28
  ],
  "micah": [
    2,
    5
  ],
  "nahum": [
    1
  ],
  "nehemiah": [
    3,
    9
  ],
  "numbers": [
    2,
    6,
    11,
    12,
    14,
    21,
    32
  ],
  "obadiah": [
    1
  ],
  "philippians": [
    1,
    2,
    3,
    4
  ],
  "proverbs": [
    11,
    15,
    16,
    18,
    24,
    30
  ],
  "psalms": [
    4,
    5,
    9,
    10,
    11,
    12,
    17,
    18,
    19,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    35,
    36,
    37,
    38,
    39,
    42,
    45,
    46,
    47,
    51,
    52,
    55,
    56,
    61,
    62,
    65,
    66,
    67,
    68,
    72,
    73,
    74,
    76,
    84,
    89,
    91,
    92,
    93,
    97,
    100,
    101,
    102,
    103,
    104,
    107,
    109,
    111,
    112,
    113,
    118,
    119,
    120,
    126,
    138,
    139,
    148,
    149
  ],
  "revelation": [
    1,
    2,
    3,
    4,
    5,
    11,
    12,
    14,
    16,
    21,
    22
  ],
  "romans": [
    1,
    3,
    4,
    6,
    7,
    8,
    9,
    11,
    12,
    14
  ],
  "ruth": [
    1,
    2
  ],
  "song-of-solomon": [
    1,
    2,
    3,
    4,
    5,
    7,
    8
  ],
  "titus": [
    3
  ],
  "zechariah": [
    1,
    3,
    4,
    6,
    11,
    14
  ],
  "zephaniah": [
    1
  ]
},
});

export default commentarySpurgeonDailyDevotion;
