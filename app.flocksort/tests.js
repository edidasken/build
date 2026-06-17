import {
  applyPour,
  cloneBottles,
  createBottles,
  getTopBlock,
  isSolved,
  isValidPour,
  solveLevelWithSolution,
  starsFor,
} from './flock_sort.js';
import { LEVELS } from './levels.js';

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function bottles(slots) {
  return slots.map((entry, index) => ({ id: index, slots: [...entry], capacity: 4 }));
}

test('getTopBlock returns contiguous top color', () => {
  const block = getTopBlock({ slots: ['RED', 'BLUE', 'BLUE', 'BLUE'], capacity: 4 });
  assert(block.color === 'BLUE', 'Expected BLUE');
  assert(block.count === 3, 'Expected count 3');
});

test('isValidPour rejects empty source', () => {
  const board = bottles([[], ['RED']]);
  assert(!isValidPour(board, 0, 1), 'Empty source should be invalid');
});

test('isValidPour rejects full target', () => {
  const board = bottles([['RED'], ['RED', 'RED', 'RED', 'RED']]);
  assert(!isValidPour(board, 0, 1), 'Full target should be invalid');
});

test('isValidPour rejects mismatched top colors', () => {
  const board = bottles([['RED'], ['BLUE']]);
  assert(!isValidPour(board, 0, 1), 'Mismatched colors should be invalid');
});

test('isValidPour accepts empty target', () => {
  const board = bottles([['RED'], []]);
  assert(isValidPour(board, 0, 1), 'Empty target should be valid');
});

test('isValidPour accepts matching target', () => {
  const board = bottles([['RED', 'BLUE'], ['BLUE']]);
  assert(isValidPour(board, 0, 1), 'Matching color should be valid');
});

test('applyPour moves only the contiguous top block that fits', () => {
  const board = bottles([
    ['RED', 'BLUE', 'BLUE', 'BLUE'],
    ['BLUE', 'BLUE'],
  ]);
  const moved = applyPour(board, 0, 1);
  assert(moved === 2, 'Expected only two units to fit');
  assert(board[0].slots.join(',') === 'RED,BLUE', 'Source should retain one BLUE');
  assert(board[1].slots.join(',') === 'BLUE,BLUE,BLUE,BLUE', 'Target should fill with BLUE');
});

test('cloneBottles makes independent copies', () => {
  const original = bottles([['RED'], []]);
  const copy = cloneBottles(original);
  copy[0].slots.push('BLUE');
  assert(original[0].slots.length === 1, 'Original should not change');
});

test('isSolved accepts empty or full single-color bottles only', () => {
  assert(isSolved(bottles([['RED', 'RED', 'RED', 'RED'], []])), 'Solved board rejected');
  assert(!isSolved(bottles([['RED', 'RED'], []])), 'Partial bottle should not be solved');
  assert(!isSolved(bottles([['RED', 'BLUE', 'RED', 'BLUE'], []])), 'Mixed bottle should not be solved');
});

test('starsFor returns 3, 2, and 1 star bands', () => {
  const level = { optimalMoves: 10 };
  assert(starsFor(level, 10) === 3, 'Expected 3 stars');
  assert(starsFor(level, 15) === 2, 'Expected 2 stars');
  assert(starsFor(level, 16) === 1, 'Expected 1 star');
});

test('LEVELS contains 100 launch levels', () => {
  assert(LEVELS.length === 100, 'Expected 100 levels');
});

test('every level has four units of each active color', () => {
  LEVELS.forEach((level) => {
    const counts = new Map();
    createBottles(level).forEach((bottle) => {
      assert(bottle.slots.length <= bottle.capacity, `Level ${level.id} has an overfilled bottle`);
      bottle.slots.forEach((color) => counts.set(color, (counts.get(color) || 0) + 1));
    });
    counts.forEach((count, color) => {
      assert(count === 4, `Level ${level.id} has ${count} units of ${color}`);
    });
  });
});

test('every generated level solves with its stored dry-run solution', () => {
  LEVELS.forEach((level) => {
    assert(solveLevelWithSolution(level), `Level ${level.id} did not solve`);
  });
});

export function runFlockSortTests() {
  const started = performance.now();
  const results = [];

  tests.forEach(({ name, fn }) => {
    try {
      fn();
      results.push({ name, ok: true });
    } catch (error) {
      results.push({ name, ok: false, error });
    }
  });

  const failed = results.filter((result) => !result.ok);
  const elapsed = Math.round(performance.now() - started);
  const summary = {
    passed: results.length - failed.length,
    failed: failed.length,
    total: results.length,
    elapsed,
    results,
  };

  if (failed.length) {
    console.error('[FlockSort tests] failed', summary);
    throw new Error(`${failed.length} FlockSort tests failed`);
  }

  console.info(`[FlockSort tests] ${summary.passed}/${summary.total} passed in ${elapsed}ms`);
  return summary;
}

if (typeof window !== 'undefined') {
  window.runFlockSortTests = runFlockSortTests;
}

if (new URL(import.meta.url).searchParams.get('autorun') === '1') {
  runFlockSortTests();
}
