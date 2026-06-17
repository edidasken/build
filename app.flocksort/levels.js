const COLORS = [
  'RED',
  'ORANGE',
  'YELLOW',
  'LIME',
  'GREEN',
  'TEAL',
  'CYAN',
  'BLUE',
  'PURPLE',
  'PINK',
  'BROWN',
  'GRAY',
];

const TIER_SPECS = [
  { count: 10, tier: 'Tutorial', colors: [2, 2, 2, 3, 3, 3, 4, 4, 4, 4], empty: 1, block: [2] },
  { count: 20, tier: 'Easy', colors: [3, 3, 4, 4, 4, 5, 5, 5, 4, 5], empty: 2, block: [2, 1] },
  { count: 30, tier: 'Medium', colors: [4, 5, 5, 6, 6, 5, 6, 6, 7, 7], empty: 2, block: [1, 2, 3] },
  { count: 25, tier: 'Hard', colors: [6, 6, 7, 7, 8, 8, 7, 8, 8, 6], empty: 2, block: [1, 2, 3] },
  { count: 15, tier: 'Expert', colors: [8, 8, 9, 9, 10, 10, 11, 11, 12, 12], empty: 2, block: [1, 2, 3] },
];

function makeRng(seed) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function rotate(values, offset) {
  return values.map((_, index) => values[(index + offset) % values.length]);
}

function partitionColors(colorNames, rng) {
  const cycles = [];
  let index = 0;

  while (index < colorNames.length) {
    const remaining = colorNames.length - index;
    let size;

    if (remaining <= 4) {
      size = remaining;
    } else {
      size = rng() > 0.58 ? 4 : 3;
      if (remaining - size === 1) size -= 1;
    }

    if (size < 2 && cycles.length) {
      cycles[cycles.length - 1].push(colorNames[index]);
      break;
    }

    cycles.push(colorNames.slice(index, index + size));
    index += size;
  }

  return cycles;
}

function buildCycle(cycle, blockSize, startBottle, emptyBottle) {
  const topSize = 4 - blockSize;
  const bottles = cycle.map((color, index) => {
    const next = cycle[(index + 1) % cycle.length];
    return [
      ...Array.from({ length: blockSize }, () => color),
      ...Array.from({ length: topSize }, () => next),
    ];
  });

  const solution = [];
  const last = startBottle + cycle.length - 1;
  solution.push([last, emptyBottle]);

  for (let index = cycle.length - 2; index >= 0; index -= 1) {
    solution.push([startBottle + index, startBottle + index + 1]);
  }

  solution.push([emptyBottle, startBottle]);
  return { bottles, solution };
}

function remapSolution(solution, order) {
  const indexMap = new Map();
  order.forEach((oldIndex, newIndex) => indexMap.set(oldIndex, newIndex));
  return solution.map(([from, to]) => [indexMap.get(from), indexMap.get(to)]);
}

function makeLevel(id, tier, tierIndex, colorCount, emptyBottles, blockOptions) {
  const rng = makeRng(id * 7919 + colorCount * 101 + tierIndex);
  const paletteOffset = (id * 3 + tierIndex) % COLORS.length;
  const colors = rotate(COLORS, paletteOffset).slice(0, colorCount);
  const cycles = partitionColors(colors, rng);
  const blockSize = blockOptions[(id + tierIndex) % blockOptions.length];

  const bottles = [];
  const solution = [];
  const emptyStart = colorCount;
  let startBottle = 0;

  cycles.forEach((cycle) => {
    const built = buildCycle(cycle, blockSize, startBottle, emptyStart);
    bottles.push(...built.bottles);
    solution.push(...built.solution);
    startBottle += cycle.length;
  });

  for (let index = 0; index < emptyBottles; index += 1) {
    bottles.push([]);
  }

  const filledOrder = Array.from({ length: colorCount }, (_, index) => index);
  const shuffledFilled = filledOrder
    .map((value) => ({ value, sort: rng() }))
    .sort((a, b) => a.sort - b.sort)
    .map((entry) => entry.value);
  const emptyOrder = Array.from({ length: emptyBottles }, (_, index) => colorCount + index);
  const order = [...shuffledFilled, ...emptyOrder];
  const orderedBottles = order.map((oldIndex) => bottles[oldIndex]);
  const orderedSolution = remapSolution(solution, order);

  return {
    id,
    name: `${tier} ${tierIndex + 1}`,
    tier,
    optimalMoves: orderedSolution.length,
    bottles: orderedBottles.slice(0, colorCount),
    emptyBottles,
    solution: orderedSolution,
  };
}

function buildLevels() {
  const levels = [];
  TIER_SPECS.forEach((spec) => {
    for (let index = 0; index < spec.count; index += 1) {
      const colorCount = spec.colors[index % spec.colors.length];
      levels.push(makeLevel(levels.length + 1, spec.tier, index, colorCount, spec.empty, spec.block));
    }
  });
  return levels;
}

export const LEVELS = buildLevels();
export const GAME_COLORS = COLORS;
