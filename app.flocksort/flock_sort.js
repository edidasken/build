import { GAME_COLORS, LEVELS } from './levels.js';

export const COLOR_MAP = {
  RED: '#ff3b5c',
  ORANGE: '#ff9f0a',
  YELLOW: '#ffd60a',
  LIME: '#a3e635',
  GREEN: '#30d158',
  TEAL: '#00c7be',
  CYAN: '#32ade6',
  BLUE: '#0a84ff',
  PURPLE: '#bf5af2',
  PINK: '#ff2d92',
  BROWN: '#b7791f',
  GRAY: '#8e9aaf',
};

export const COLOR_LIGHT = {
  RED: '#ff8aa0',
  ORANGE: '#ffc76d',
  YELLOW: '#fff07a',
  LIME: '#d5ff70',
  GREEN: '#76f293',
  TEAL: '#73f4e2',
  CYAN: '#8de4ff',
  BLUE: '#78b7ff',
  PURPLE: '#dfa6ff',
  PINK: '#ff8dca',
  BROWN: '#e0ad5f',
  GRAY: '#d4dbe7',
};

export const COLOR_DEEP = {
  RED: '#c1123a',
  ORANGE: '#c76a00',
  YELLOW: '#c99700',
  LIME: '#65a30d',
  GREEN: '#0f9f45',
  TEAL: '#008c86',
  CYAN: '#0277bd',
  BLUE: '#0057d9',
  PURPLE: '#7e22ce',
  PINK: '#c01472',
  BROWN: '#7c470f',
  GRAY: '#5f6f8a',
};

export const COLOR_SHAPES = {
  RED: 'circle',
  ORANGE: 'triangle',
  YELLOW: 'star',
  LIME: 'plus',
  GREEN: 'diamond',
  TEAL: 'hexagon',
  CYAN: 'crescent',
  BLUE: 'square',
  PURPLE: 'pentagon',
  PINK: 'heart',
  BROWN: 'x',
  GRAY: 'wave',
};

const PROGRESS_KEY = 'flocksort_progress';
const SETTINGS_KEY = 'flocksort_settings';
const HISTORY_LIMIT = 50;

const DEFAULT_PROGRESS = {
  lastLevel: 1,
  levelsUnlocked: LEVELS.length,
  levelStars: {},
  totalMoves: 0,
  solvedMoves: {},
};

const DEFAULT_SETTINGS = {
  colorBlind: false,
  soundEnabled: false,
  theme: 'covenant',
};

export const state = {
  currentLevel: 0,
  bottles: [],
  history: [],
  selectedBottle: null,
  moveCount: 0,
  progress: readStorage(PROGRESS_KEY, DEFAULT_PROGRESS),
  settings: readStorage(SETTINGS_KEY, DEFAULT_SETTINGS),
  view: 'game',
  justCompleted: false,
  invalidBottle: null,
};

function readStorage(key, fallback) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    return saved ? { ...fallback, ...saved } : { ...fallback };
  } catch (_) {
    return { ...fallback };
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {}
}

export function cloneBottles(bottles) {
  return bottles.map((bottle, index) => ({
    id: bottle.id ?? index,
    slots: [...bottle.slots],
    capacity: bottle.capacity || 4,
  }));
}

export function createBottles(level) {
  const filled = level.bottles.map((slots, index) => ({
    id: index,
    slots: [...slots],
    capacity: 4,
  }));
  const empty = Array.from({ length: level.emptyBottles || 0 }, (_, offset) => ({
    id: filled.length + offset,
    slots: [],
    capacity: 4,
  }));
  return [...filled, ...empty];
}

export function getTopBlock(bottle) {
  if (!bottle || bottle.slots.length === 0) return { color: null, count: 0 };
  const color = bottle.slots[bottle.slots.length - 1];
  let count = 0;

  for (let index = bottle.slots.length - 1; index >= 0; index -= 1) {
    if (bottle.slots[index] !== color) break;
    count += 1;
  }

  return { color, count };
}

export function isValidPour(bottlesOrFrom, fromOrTo, maybeTo) {
  const bottles = Array.isArray(bottlesOrFrom) ? bottlesOrFrom : state.bottles;
  const fromIndex = Array.isArray(bottlesOrFrom) ? fromOrTo : bottlesOrFrom;
  const toIndex = Array.isArray(bottlesOrFrom) ? maybeTo : fromOrTo;
  const source = bottles[fromIndex];
  const target = bottles[toIndex];

  if (!source || !target || fromIndex === toIndex) return false;
  if (source.slots.length === 0) return false;
  if (target.slots.length >= target.capacity) return false;

  const block = getTopBlock(source);
  if (!block.color) return false;
  if (target.slots.length === 0) return true;

  return target.slots[target.slots.length - 1] === block.color;
}

export function pour(fromIndex, toIndex, options = {}) {
  if (!isValidPour(state.bottles, fromIndex, toIndex)) return false;

  const snapshot = cloneBottles(state.bottles);
  if (options.recordHistory !== false) {
    if (state.history.length >= HISTORY_LIMIT) state.history.shift();
    state.history.push({ bottles: snapshot, moveCount: state.moveCount });
  }

  applyPour(state.bottles, fromIndex, toIndex);
  state.selectedBottle = null;
  state.invalidBottle = null;
  state.moveCount += options.countMove === false ? 0 : 1;
  render();

  if (isSolved(state.bottles)) completeLevel();
  else playSound('pour');

  return { before: snapshot, after: cloneBottles(state.bottles) };
}

export function applyPour(bottles, fromIndex, toIndex) {
  if (!isValidPour(bottles, fromIndex, toIndex)) return false;

  const source = bottles[fromIndex];
  const target = bottles[toIndex];
  const block = getTopBlock(source);
  const amount = Math.min(block.count, target.capacity - target.slots.length);

  for (let index = 0; index < amount; index += 1) {
    target.slots.push(source.slots.pop());
  }

  return amount;
}

export function undoMove() {
  const previous = state.history.pop();
  if (!previous) return false;

  state.bottles = cloneBottles(previous.bottles);
  state.moveCount = previous.moveCount;
  state.selectedBottle = null;
  state.invalidBottle = null;
  state.justCompleted = false;
  render();
  return true;
}

export function restartLevel() {
  loadLevel(state.currentLevel);
}

export function loadLevel(index) {
  const bounded = Math.max(0, Math.min(index, LEVELS.length - 1));
  const level = LEVELS[bounded];

  state.currentLevel = bounded;
  state.bottles = createBottles(level);
  state.history = [];
  state.selectedBottle = null;
  state.invalidBottle = null;
  state.moveCount = 0;
  state.view = 'game';
  state.justCompleted = false;
  state.progress.lastLevel = level.id;
  writeStorage(PROGRESS_KEY, state.progress);
  syncUrlLevel(level.id);
  render();
}

export function isSolved(bottles) {
  return bottles.every((bottle) => {
    if (bottle.slots.length === 0) return true;
    if (bottle.slots.length !== bottle.capacity) return false;
    return bottle.slots.every((color) => color === bottle.slots[0]);
  });
}

export function starsFor(level, moves) {
  if (!level || !moves) return 0;
  if (moves <= level.optimalMoves) return 3;
  if (moves <= Math.ceil(level.optimalMoves * 1.5)) return 2;
  return 1;
}

export function solveLevelWithSolution(level) {
  const bottles = createBottles(level);
  for (const [from, to] of level.solution || []) {
    if (!applyPour(bottles, from, to)) return false;
  }
  return isSolved(bottles);
}

function completeLevel() {
  if (state.justCompleted) return;

  const level = LEVELS[state.currentLevel];
  const stars = starsFor(level, state.moveCount);
  const id = String(level.id);
  const priorStars = state.progress.levelStars[id] || 0;
  const priorMoves = state.progress.solvedMoves[id] || 0;

  state.progress.levelStars[id] = Math.max(priorStars, stars);
  state.progress.solvedMoves[id] = priorMoves ? Math.min(priorMoves, state.moveCount) : state.moveCount;
  state.progress.levelsUnlocked = LEVELS.length;
  state.progress.totalMoves += state.moveCount;
  state.progress.lastLevel = Math.min(level.id + 1, LEVELS.length);
  state.justCompleted = true;
  writeStorage(PROGRESS_KEY, state.progress);
  playSound('complete');
  burstConfetti();
  render();
}

function handleBottleClick(index) {
  if (state.justCompleted) return;

  if (state.selectedBottle === null) {
    if (state.bottles[index].slots.length > 0) {
      state.selectedBottle = index;
      state.invalidBottle = null;
      render();
    }
    return;
  }

  if (state.selectedBottle === index) {
    state.selectedBottle = null;
    render();
    return;
  }

  if (isValidPour(state.bottles, state.selectedBottle, index)) {
    pour(state.selectedBottle, index);
    return;
  }

  state.invalidBottle = index;
  state.selectedBottle = null;
  playSound('invalid');
  render();
  setTimeout(() => {
    if (state.invalidBottle === index) {
      state.invalidBottle = null;
      render();
    }
  }, 360);
}

function setView(view) {
  state.view = view;
  state.selectedBottle = null;
  render();
}

function nextLevel() {
  loadLevel((state.currentLevel + 1) % LEVELS.length);
}

function continueLevel() {
  loadLevel((state.progress.lastLevel || 1) - 1);
}

function saveSettings() {
  writeStorage(SETTINGS_KEY, state.settings);
  render();
}

function syncUrlLevel(levelId) {
  const url = new URL(window.location.href);
  url.searchParams.set('level', String(levelId));
  window.history.replaceState({}, '', url);
}

function selectedThemeClass() {
  return `theme-${state.settings.theme || 'covenant'}`;
}

function progressSummary() {
  const solved = Object.keys(state.progress.levelStars || {}).length;
  const pct = Math.round((solved / LEVELS.length) * 100);
  return { solved, pct };
}

function bestMovesFor(level) {
  return state.progress.solvedMoves[String(level.id)] || null;
}

function render() {
  const app = document.getElementById('app');
  if (!app) return;

  document.body.className = [
    selectedThemeClass(),
    state.settings.colorBlind ? 'is-colorblind' : '',
  ].filter(Boolean).join(' ');

  const level = LEVELS[state.currentLevel];
  const summary = progressSummary();

  app.innerHTML = `
    <header class="fs-topbar">
      <button class="fs-icon-btn" data-action="levels" aria-label="Level select" title="Level select">
        <span aria-hidden="true">&#9776;</span>
      </button>
      <div class="fs-brand">
        <span class="fs-mark" aria-hidden="true"></span>
        <div>
          <h1>FlockSort</h1>
          <p>${escapeHtml(level.name)} / ${summary.pct}% complete</p>
        </div>
      </div>
      <div class="fs-stats" aria-label="Current level status">
        <span>Level ${level.id}</span>
        <span>${state.moveCount} moves</span>
      </div>
      <div class="fs-actions">
        <button class="fs-icon-btn" data-action="undo" aria-label="Undo" title="Undo" ${state.history.length ? '' : 'disabled'}>
          <span aria-hidden="true">&#8630;</span>
        </button>
        <button class="fs-icon-btn" data-action="restart" aria-label="Restart" title="Restart">
          <span aria-hidden="true">&#8635;</span>
        </button>
        <button class="fs-icon-btn" data-action="settings" aria-label="Settings" title="Settings">
          <span aria-hidden="true">&#9881;</span>
        </button>
      </div>
    </header>
    <main class="fs-main">
      ${state.view === 'levels' ? renderLevelSelect(summary) : ''}
      ${state.view === 'settings' ? renderSettings(summary) : ''}
      ${state.view === 'game' ? renderGame(level) : ''}
    </main>
  `;

  bindEvents(app);
}

function renderGame(level) {
  const columns = columnsForBoard(state.bottles.length);
  const summary = progressSummary();
  const best = bestMovesFor(level);
  const earnedStars = state.progress.levelStars[String(level.id)] || 0;
  const boardClass = [
    'fs-board',
    state.bottles.length <= 4 ? 'is-focus-board' : '',
    state.bottles.length >= 9 ? 'is-dense-board' : '',
    state.bottles.length >= 11 ? 'is-ultra-dense-board' : '',
  ].filter(Boolean).join(' ');

  return `
    <section class="fs-game" aria-label="FlockSort game board">
      <div class="fs-stage">
        <div class="fs-level-panel">
          <div class="fs-level-kicker">${escapeHtml(level.tier || 'Puzzle')}</div>
          <div class="fs-level-title">
            <span>Level ${level.id}</span>
            <strong>${escapeHtml(level.name)}</strong>
          </div>
          <div class="fs-progress-track" aria-label="${summary.pct}% complete">
            <span style="width:${summary.pct}%"></span>
          </div>
          <div class="fs-level-metrics">
            <span>${state.moveCount} moves</span>
            <span>${level.optimalMoves} par</span>
            <span>${best ? `${best} best` : `${earnedStars ? '&#9733;'.repeat(earnedStars) : 'new'}`}</span>
          </div>
        </div>
        <div class="fs-board-wrap">
          <span class="fs-stage-glow fs-stage-glow-a" aria-hidden="true"></span>
          <span class="fs-stage-glow fs-stage-glow-b" aria-hidden="true"></span>
          <div class="${boardClass}" style="--columns:${columns}">
            ${state.bottles.map(renderBottle).join('')}
          </div>
          <div class="fs-board-shelf" aria-hidden="true"></div>
        </div>
      </div>
      <div class="fs-game-footer">
        <button class="fs-command" data-action="levels">Levels</button>
        <button class="fs-command" data-action="continue">Continue</button>
        <button class="fs-command" data-action="next">Skip</button>
      </div>
      ${state.justCompleted ? renderComplete(level) : ''}
    </section>
  `;
}

function columnsForBoard(count) {
  const isWide = typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches;
  if (isWide) {
    if (count <= 8) return count;
    if (count <= 10) return 5;
    return 6;
  }

  if (count <= 4) return count;
  if (count <= 6) return 3;
  if (count <= 8) return 4;
  if (count <= 10) return 5;
  return 4;
}

function renderBottle(bottle, index) {
  const slots = Array.from({ length: bottle.capacity }, (_, slotIndex) => bottle.slots[slotIndex] || null);
  const top = bottle.slots[bottle.slots.length - 1];
  const classes = [
    'fs-bottle',
    state.selectedBottle === index ? 'is-selected' : '',
    state.invalidBottle === index ? 'is-invalid' : '',
    bottle.slots.length === 0 ? 'is-empty' : '',
  ].filter(Boolean).join(' ');

  return `
    <button class="${classes}" data-bottle="${index}" aria-label="Bottle ${index + 1}${top ? `, top color ${top}` : ', empty'}">
      <span class="fs-neck" aria-hidden="true"></span>
      <span class="fs-glass">
        <span class="fs-glass-shine" aria-hidden="true"></span>
        ${slots.map((color, slotIndex) => renderSegment(color, slotIndex, bottle.slots)).join('')}
      </span>
      <span class="fs-bottle-shadow" aria-hidden="true"></span>
    </button>
  `;
}

function renderSegment(color, slotIndex = 0, filledSlots = []) {
  if (!color) return '<span class="fs-segment is-blank" aria-hidden="true"></span>';
  const classes = [
    'fs-segment',
    `fs-color-${color.toLowerCase()}`,
    slotIndex === 0 ? 'is-liquid-bottom' : '',
    slotIndex === filledSlots.length - 1 ? 'is-liquid-top' : '',
    filledSlots[slotIndex - 1] && filledSlots[slotIndex - 1] !== color ? 'has-lower-boundary' : '',
    filledSlots[slotIndex + 1] && filledSlots[slotIndex + 1] !== color ? 'has-upper-boundary' : '',
  ].filter(Boolean).join(' ');

  return `
    <span class="${classes}" style="--water:${COLOR_MAP[color]};--water-light:${COLOR_LIGHT[color]};--water-deep:${COLOR_DEEP[color]}" data-shape="${COLOR_SHAPES[color]}" title="${color}">
      <span class="fs-shape" data-shape="${COLOR_SHAPES[color]}" aria-hidden="true"></span>
      <span class="fs-liquid-gloss" aria-hidden="true"></span>
    </span>
  `;
}

function renderComplete(level) {
  const stars = starsFor(level, state.moveCount);
  return `
    <div class="fs-complete" role="dialog" aria-modal="true" aria-labelledby="fs-complete-title">
      <div class="fs-complete-panel">
        <p class="fs-stars" aria-label="${stars} stars">${'&#9733;'.repeat(stars)}${'&#9734;'.repeat(3 - stars)}</p>
        <h2 id="fs-complete-title">Well Done!</h2>
        <p>Level ${level.id} / ${state.moveCount} moves</p>
        <div class="fs-complete-actions">
          <button class="fs-command" data-action="restart">Replay</button>
          <button class="fs-command is-primary" data-action="next">Next</button>
        </div>
      </div>
    </div>
  `;
}

function renderLevelSelect(summary) {
  return `
    <section class="fs-levels" aria-label="Level select">
      <div class="fs-panel-head">
        <div>
          <h2>Levels</h2>
          <p>${summary.pct}% complete</p>
        </div>
        <button class="fs-command" data-action="continue">Continue</button>
      </div>
      <div class="fs-level-grid">
        ${LEVELS.map((level) => {
          const stars = state.progress.levelStars[String(level.id)] || 0;
          const active = level.id === state.currentLevel + 1 ? 'is-current' : '';
          return `
            <button class="fs-level-card ${active}" data-level="${level.id}">
              <span class="fs-level-num">${level.id}</span>
              <span class="fs-level-name">${escapeHtml(level.name)}</span>
              <span class="fs-level-stars" aria-label="${stars} stars">${stars ? '&#9733;'.repeat(stars) : 'Ready'}</span>
            </button>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderSettings(summary) {
  return `
    <section class="fs-settings" aria-label="Settings">
      <div class="fs-panel-head">
        <div>
          <h2>Settings</h2>
          <p>${summary.solved} solved / ${state.progress.totalMoves || 0} total moves</p>
        </div>
        <button class="fs-command" data-action="game">Done</button>
      </div>
      <label class="fs-toggle">
        <span>Color-blind mode</span>
        <input type="checkbox" data-setting="colorBlind" ${state.settings.colorBlind ? 'checked' : ''}>
      </label>
      <label class="fs-toggle">
        <span>Sound</span>
        <input type="checkbox" data-setting="soundEnabled" ${state.settings.soundEnabled ? 'checked' : ''}>
      </label>
      <label class="fs-field">
        <span>Theme</span>
        <select data-setting="theme">
          <option value="covenant" ${state.settings.theme === 'covenant' ? 'selected' : ''}>Covenant</option>
          <option value="linen" ${state.settings.theme === 'linen' ? 'selected' : ''}>Linen</option>
          <option value="night" ${state.settings.theme === 'night' ? 'selected' : ''}>Night</option>
        </select>
      </label>
    </section>
  `;
}

function bindEvents(root) {
  root.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action');
      if (action === 'undo') undoMove();
      if (action === 'restart') restartLevel();
      if (action === 'levels') setView('levels');
      if (action === 'settings') setView('settings');
      if (action === 'game') setView('game');
      if (action === 'next') nextLevel();
      if (action === 'continue') continueLevel();
    });
  });

  root.querySelectorAll('[data-bottle]').forEach((button) => {
    button.addEventListener('click', () => handleBottleClick(Number(button.getAttribute('data-bottle'))));
  });

  root.querySelectorAll('[data-level]').forEach((button) => {
    button.addEventListener('click', () => loadLevel(Number(button.getAttribute('data-level')) - 1));
  });

  root.querySelectorAll('[data-setting]').forEach((field) => {
    field.addEventListener('change', () => {
      const key = field.getAttribute('data-setting');
      state.settings[key] = field.type === 'checkbox' ? field.checked : field.value;
      saveSettings();
    });
  });
}

function playSound(kind) {
  if (!state.settings.soundEnabled) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const settings = {
      pour: [180, 0.055, 'sine'],
      complete: [520, 0.12, 'triangle'],
      invalid: [90, 0.07, 'square'],
    }[kind] || [220, 0.05, 'sine'];

    oscillator.type = settings[2];
    oscillator.frequency.setValueAtTime(settings[0], now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + settings[1]);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + settings[1] + 0.02);
  } catch (_) {}
}

function burstConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const layer = document.createElement('div');
  layer.className = 'fs-confetti';
  layer.setAttribute('aria-hidden', 'true');

  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement('span');
    const color = GAME_COLORS[index % GAME_COLORS.length];
    piece.style.setProperty('--x', `${Math.round(Math.random() * 220 - 110)}px`);
    piece.style.setProperty('--r', `${Math.round(Math.random() * 360)}deg`);
    piece.style.setProperty('--water', COLOR_MAP[color]);
    piece.style.left = `${Math.round(Math.random() * 100)}%`;
    piece.style.animationDelay = `${Math.random() * 120}ms`;
    layer.appendChild(piece);
  }

  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 1200);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initialLevelFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = Number(params.get('level') || state.progress.lastLevel || 1);
  if (!Number.isFinite(raw)) return 0;
  return Math.max(0, Math.min(LEVELS.length - 1, raw - 1));
}

if (typeof document !== 'undefined') {
  window.FlockSort = {
    LEVELS,
    state,
    loadLevel,
    pour,
    undoMove,
    restartLevel,
    isSolved,
    isValidPour,
    solveLevelWithSolution,
  };

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => render(), 120);
  });

  loadLevel(initialLevelFromUrl());
}
