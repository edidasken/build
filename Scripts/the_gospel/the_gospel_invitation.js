/* ══════════════════════════════════════════════════════════════════════════════
   THE GOSPEL · INVITATION — A Hope-Filled View of Jesus Christ
   "Come to me, all who labour and are heavy laden, and I will give you rest."
   — Matthew 11:28

   Three pillars of hope:
     1. The Great Invitations  — His personal calls of grace
     2. The "I AM" Declarations — His identity in John's Gospel
     3. The Finished Work       — The historical progression of redemption

   Share button: opens native share / SMS so friends receive the gospel link.
   ══════════════════════════════════════════════════════════════════════════════ */

export const name        = 'the_gospel_invitation';
export const title       = 'The Invitation';
export const description = 'Three pillars of hope — His invitations, His identity, and His finished work.';
export const icon        = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>`;
export const accent      = '#7eaacc';

/* ── Data ────────────────────────────────────────────────────────────────── */

const INVITATIONS = [
  {
    title:   'The Call to the Exhausted',
    quote:   'Come to me, all who labor and are heavy laden, and I will give you rest.',
    ref:     'Matthew 11:28',
    icon:    '🕊️',
    insight: 'Jesus does not demand more religious striving. He identifies the exhaustion of trying to earn worth and offers Himself as the antidote.',
  },
  {
    title:   'The Call to the Thirsty',
    quote:   'If anyone thirsts, let him come to me and drink.',
    ref:     'John 7:37–38',
    icon:    '💧',
    insight: 'Addressed to human dissatisfaction. Jesus promises a qualitative kind of life that provides an internal, eternal satisfaction.',
  },
  {
    title:   'The Call to Intimacy',
    quote:   'Behold, I stand at the door and knock.',
    ref:     'Revelation 3:20',
    icon:    '🚪',
    insight: 'A picture of divine pursuit. God does not force His way in; He knocks and offers friendship and reconciliation.',
  },
];

const IAM = [
  { label: 'Bread of Life',       need: 'Spiritual Hunger',      verse: 'John 6:35',  icon: '🍞', color: '#7eaacc', description: 'Just as physical bread sustains the body, Jesus is the essential nutrient for the soul. Without Him, the spirit starves; with Him, there is enduring life.' },
  { label: 'Light of the World',  need: 'Guidance in Darkness',  verse: 'John 8:12',  icon: '🕯️', color: '#8B7028', description: 'In a world of confusion, Jesus provides absolute clarity. Following Him guarantees you will walk in the light of life.' },
  { label: 'Door of the Sheep',   need: 'Security & Access',     verse: 'John 10:9',  icon: '🚪', color: '#7eaacc', description: 'Jesus is the singular entry point to safety. Through Him, one finds protection from spiritual predators and the freedom of abundant life.' },
  { label: 'Good Shepherd',       need: 'Care & Protection',     verse: 'John 10:11', icon: '🐑', color: '#3d8b4f', description: 'Unlike a hired hand, the Good Shepherd loves so profoundly that He willingly lays down His life for the vulnerable.' },
  { label: 'Resurrection & Life', need: 'Victory over Death',    verse: 'John 11:25', icon: '🌱', color: '#7e57c2', description: 'Faced with the terror of death, Jesus claims total authority. He is the resurrection; in Him, death is merely a doorway.' },
  { label: 'Way, Truth & Life',   need: 'Direction & Reality',   verse: 'John 14:6',  icon: '🧭', color: '#2563eb', description: 'The embodiment of ultimate reality and the source of all existence. All human searching ends in Him.' },
  { label: 'True Vine',           need: 'Purpose & Fruitfulness', verse: 'John 15:1', icon: '🍇', color: '#7eaacc', description: 'By abiding in Jesus, believers draw on His endless grace and strength to produce enduring fruit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.' },
];

const WORK = [
  { title: 'The Incarnation', sub: 'God With Us',          summary: 'The Creator took on human flesh, experiencing our pains and limitations without sin.',                         hope: 'God knows exactly what it feels like to be human. You are deeply understood.' },
  { title: 'The Crucifixion', sub: 'The Atonement',        summary: 'On the cross, Jesus absorbed the debt of sin and guilt, declaring "It is finished."',                          hope: 'Your failures are paid for. There is no condemnation left for those who trust Him.' },
  { title: 'The Resurrection', sub: 'Victory Over Death',  summary: 'Three days later, Jesus rose, defeating the finality of death and inaugurating a new creation.',               hope: 'Death is not the end. The worst things are never the last things.' },
  { title: 'The Ascension',   sub: 'The Eternal Advocate', summary: 'Jesus ascended to the Father, where He currently reigns and intercedes for His people.',                       hope: 'You have a perfect representative in the highest court of reality.' },
];

/* Accent colors for each invitation card */
const INV_COLORS = ['#7eaacc', '#34d399', '#a78bfa'];

/* ── Render ──────────────────────────────────────────────────────────────── */

export function render() {
  return /* html */`
    <style data-module="gi">
      /* ═══ Animations ═══════════════════════════════════════════ */
      @keyframes gi-fadein { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      .gi-fadein { animation:gi-fadein .3s ease both; }

      /* ═══ Page hero overrides — invitation-specific ════════════ */
      [data-grow="the_gospel_invitation"] .grow-hero {
        background:linear-gradient(150deg,#0c1445 0%,#1a2260 55%,#2d1a6e 100%);
        border:none; border-radius:0; padding:40px 28px 36px;
        margin:-0px; position:relative;
      }
      [data-grow="the_gospel_invitation"] .grow-hero::before {
        content:''; position:absolute; inset:0; pointer-events:none;
        background:
          radial-gradient(ellipse at 85% 30%,rgba(232,168,56,.22),transparent 52%),
          radial-gradient(ellipse at 5% 90%,rgba(126,170,204,.15),transparent 48%);
      }
      [data-grow="the_gospel_invitation"] .grow-hero::after { display:none; }
      [data-grow="the_gospel_invitation"] .grow-hero-icon {
        width:72px; height:72px; border-radius:18px;
        background:rgba(232,168,56,.18); border:2px solid rgba(232,168,56,.4);
        box-shadow:0 6px 20px rgba(232,168,56,.2);
      }
      [data-grow="the_gospel_invitation"] .grow-hero-icon svg { width:36px; height:36px; }
      [data-grow="the_gospel_invitation"] .grow-hero-title {
        font-size:2rem; font-weight:800; color:#fff;
        letter-spacing:-.02em; line-height:1.1;
      }
      @media(min-width:560px){
        [data-grow="the_gospel_invitation"] .grow-hero-title { font-size:2.4rem; }
      }
      [data-grow="the_gospel_invitation"] .grow-hero-sub {
        font-size:1.05rem; color:rgba(255,255,255,.75); opacity:1; line-height:1.7;
        margin-top:8px;
      }

      /* ═══ Section chrome — Herald card panels ═════════════════ */
      .gi-section {
        margin-top:1.35rem;
        position:relative; overflow:hidden;
        border:1px solid var(--rule, rgba(15,23,42,.1));
        border-radius:var(--herald-radius-xl, 24px);
        background:
          radial-gradient(circle at top right, rgba(72,211,217,.10), transparent 12rem),
          rgba(255,255,255,.72);
        box-shadow:var(--herald-shadow-soft, 0 12px 30px rgba(15,23,42,.08));
        backdrop-filter:blur(16px);
        padding:1.25rem;
      }
      .gi-section::before {
        content:''; position:absolute; top:-72px; right:-72px;
        width:150px; height:150px; border-radius:999px;
        background:rgba(72,211,217,.13); pointer-events:none;
      }
      .gi-section > * { position:relative; z-index:1; }

      .gi-section-head {
        display:flex; align-items:center; gap:16px; margin-bottom:24px;
        padding-bottom:0; border-bottom:none;
      }
      .gi-section-num {
        flex:none; width:fit-content; height:auto; border-radius:999px;
        display:flex; align-items:center; justify-content:center;
        padding:.38rem .72rem;
        font-weight:900; font-size:.72rem; color:#8a5f0a; letter-spacing:.08em;
        text-transform:uppercase;
        background:rgba(247,199,86,.14); border:1px solid rgba(247,199,86,.22);
        box-shadow:none;
      }
      .gi-section-num--1 { background:rgba(247,199,86,.14); border-color:rgba(247,199,86,.22); color:#8a5f0a; }
      .gi-section-num--2 { background:rgba(167,139,250,.14); border-color:rgba(167,139,250,.22); color:#6d28d9; }
      .gi-section-num--3 { background:rgba(245,158,11,.14); border-color:rgba(245,158,11,.22); color:#b45309; }
      .gi-section-title  { flex:1; }
      .gi-section-title h2 {
        font-family:'Merriweather', Georgia, serif;
        font-size:1.35rem; font-weight:800; color:var(--ink,#111827);
        margin:0 0 5px; letter-spacing:-.01em;
      }
      @media(min-width:600px){ .gi-section-title h2{ font-size:1.6rem; } }
      .gi-section-title p {
        font-size:.9rem; color:var(--ink-mid,#334155); line-height:1.55; margin:0;
      }

      /* ═══ Invitation cards — Herald paper-card treatment ═════ */
      .gi-grid { display:grid; grid-template-columns:1fr; gap:1rem; }
      @media(min-width:560px){ .gi-grid{ grid-template-columns:repeat(3,1fr); gap:1rem; } }

      .gi-card {
        position:relative; overflow:hidden;
        border-radius:var(--herald-radius-lg, 18px);
        box-shadow:0 10px 28px rgba(15,23,42,.06);
        cursor:pointer; transition:box-shadow .25s, transform .25s, border-color .2s;
        text-align:left; display:flex; flex-direction:column;
        border:1px solid var(--rule, rgba(15,23,42,.08));
        background:
          radial-gradient(circle at top right, rgba(247,199,86,.12), transparent 9rem),
          #ffffff;
      }
      .gi-card:hover {
        box-shadow:0 16px 34px rgba(15,23,42,.10);
        transform:translateY(-2px);
        border-color:rgba(247,199,86,.42);
      }
      .gi-card::before {
        content:''; position:absolute; top:-72px; right:-72px;
        width:150px; height:150px; border-radius:999px;
        background:rgba(72,211,217,.12); pointer-events:none;
      }
      .gi-card > * { position:relative; z-index:1; }

      /* Gold left-border accent — Herald style integrates into card */
      .gi-card-hero {
        background:transparent;
        padding:24px 22px 16px;
        position:relative; overflow:hidden; flex:none;
        border-left:4px solid var(--herald-gold, #f7c756);
        margin:0;
        border-radius:0;
      }
      .gi-card-hero-inner { position:relative; }

      .gi-card-icon { font-size:2.2rem; margin-bottom:10px; display:block; line-height:1; }
      .gi-card h3 {
        font-family:'Merriweather', Georgia, serif;
        font-size:1.15rem; font-weight:700;
        color:var(--ink,#111827); margin:0; line-height:1.25;
        letter-spacing:-.005em;
      }
      @media(min-width:560px) and (max-width:759px){ .gi-card h3 { font-size:1rem; } }
      @media(min-width:760px){ .gi-card h3 { font-size:1.1rem; } }

      .gi-card-body {
        background:transparent;
        padding:16px 22px 18px;
        flex:1; display:flex; flex-direction:column;
      }

      .gi-card-quote {
        color:var(--ink,#111827); font-style:italic;
        font-size:1.05rem; margin:0 0 14px; line-height:1.75;
        flex:1; font-family:'Merriweather', Georgia, serif;
      }
      @media(min-width:560px){ .gi-card-quote{ font-size:.92rem; } }
      @media(min-width:760px){ .gi-card-quote{ font-size:1rem; } }

      .gi-card-ref {
        display:inline-flex; align-items:center; gap:.35rem;
        padding:.38rem .65rem;
        background:rgba(247,199,86,.14); border:1px solid rgba(247,199,86,.22);
        border-radius:999px;
        font-family:Inter, system-ui, sans-serif;
        font-size:.72rem; font-weight:900; color:#8a5f0a;
        letter-spacing:.04em; margin-bottom:12px; align-self:flex-start;
      }

      .gi-card-insight {
        display:none; padding:14px 0 4px;
        border-top:1px solid rgba(15,23,42,.08);
        font-family:Inter, system-ui, sans-serif;
        font-size:.92rem; line-height:1.7; color:var(--ink-mid,#334155);
      }
      .gi-card-insight.open { display:block; animation:gi-fadein .25s ease; }
      .gi-insight-label {
        display:inline-flex; align-items:center; gap:.35rem;
        padding:.32rem .58rem; margin-bottom:10px;
        border:1px solid rgba(247,199,86,.22);
        border-radius:999px;
        background:rgba(247,199,86,.14);
        color:#8a5f0a;
        font-family:Inter, system-ui, sans-serif;
        font-size:.68rem; font-weight:900;
        text-transform:uppercase; letter-spacing:.08em;
      }

      .gi-toggle {
        text-align:center; font-size:1.5rem; margin-top:4px;
        color:var(--herald-gold,#e8a838); opacity:.5;
        transition:opacity .2s, transform .3s cubic-bezier(.34,1.56,.64,1);
        user-select:none; line-height:1;
      }
      .gi-card:hover .gi-toggle { opacity:.85; }
      .gi-toggle.open { transform:rotate(45deg); opacity:1; color:#c97d10; }

      /* ═══ I AM section — Herald card wrap ══════════════════════ */
      .gi-iam-wrap {
        border-radius:var(--herald-radius-lg, 18px); overflow:hidden;
        border:1px solid var(--rule, rgba(15,23,42,.08));
        box-shadow:0 10px 28px rgba(15,23,42,.06);
        background:#ffffff;
      }
      .gi-iam-wrap::before {
        content:''; position:absolute; top:-72px; right:-72px;
        width:150px; height:150px; border-radius:999px;
        background:rgba(167,139,250,.10); pointer-events:none; z-index:0;
      }
      .gi-iam-grid { display:grid; grid-template-columns:1fr; position:relative; z-index:1; }
      @media(min-width:680px){ .gi-iam-grid{ grid-template-columns:240px 1fr; } }

      /* Mobile: stacked sidebar above content */
      .gi-iam-sidebar {
        background:linear-gradient(160deg,#1a1152,#0c1445);
        padding:16px 14px; display:flex; flex-direction:column; gap:6px;
      }
      @media(min-width:680px){
        .gi-iam-sidebar {
          border-right:1.5px solid rgba(255,255,255,.08);
          min-height:480px; justify-content:center; padding:24px 16px;
        }
      }
      @media(max-width:679px){
        .gi-iam-sidebar {
          flex-direction:row; overflow-x:auto; gap:8px;
          padding:14px; scrollbar-width:none; -webkit-overflow-scrolling:touch;
        }
        .gi-iam-sidebar::-webkit-scrollbar { display:none; }
      }

      .gi-iam-nav {
        padding:11px 16px; cursor:pointer; border-radius:12px;
        font-size:.92rem; font-weight:600; color:rgba(255,255,255,.6);
        border:1.5px solid rgba(255,255,255,.08);
        transition:background .18s, border-color .18s, color .18s;
        display:flex; align-items:center; gap:10px; white-space:nowrap; flex:none;
      }
      @media(min-width:680px){
        .gi-iam-nav { white-space:normal; flex:none; border-radius:12px; font-size:.88rem; }
      }
      .gi-iam-nav:hover { color:#fff; background:rgba(255,255,255,.07); }
      .gi-iam-nav.active {
        background:rgba(167,139,250,.25);
        border-color:rgba(167,139,250,.6);
        color:#fff; font-weight:700;
      }

      .gi-iam-content {
        padding:28px 24px; min-height:320px;
        display:flex; flex-direction:column; justify-content:center;
        background:
          radial-gradient(circle at top right, rgba(247,199,86,.08), transparent 10rem),
          #ffffff;
      }
      @media(min-width:680px){ .gi-iam-content{ padding:40px 36px; } }

      .gi-iam-badge {
        display:inline-flex; align-items:center; gap:6px;
        padding:.38rem .72rem; border-radius:999px; margin-bottom:18px;
        background:rgba(167,139,250,.14); border:1px solid rgba(167,139,250,.35);
        font-size:.72rem; font-weight:900; letter-spacing:.08em;
        text-transform:uppercase; color:#7c3aed;
      }
      .gi-iam-title {
        font-size:2rem; font-weight:800; color:var(--ink,#111827);
        line-height:1.1; margin-bottom:22px; letter-spacing:-.01em;
      }
      @media(min-width:680px){ .gi-iam-title{ font-size:2.5rem; } }

      .gi-iam-meta {
        display:grid; grid-template-columns:1fr 1fr; gap:16px;
        padding:18px 0; border-top:1.5px solid var(--rule, rgba(15,23,42,.1));
        border-bottom:1.5px solid var(--rule, rgba(15,23,42,.1)); margin-bottom:20px;
      }
      .gi-iam-meta-label {
        font-size:.68rem; font-weight:800; text-transform:uppercase;
        letter-spacing:.08em; color:var(--ink-label,#64748b); margin-bottom:6px;
      }
      .gi-iam-need  { font-size:1.05rem; color:var(--ink,#111827); font-style:italic; font-weight:500; line-height:1.45; }
      .gi-iam-verse { font-size:1rem; color:#7c3aed; font-family:monospace; font-weight:700; }
      .gi-iam-desc  { font-size:1.05rem; color:var(--ink-mid,#334155); line-height:1.85; }

      /* ═══ Timeline — Herald card panels ═══════════════════════ */
      .gi-tl-wrap {
        display:grid; grid-template-columns:1fr; gap:1rem;
      }
      @media(min-width:580px){ .gi-tl-wrap{ grid-template-columns:210px 1fr; gap:1rem; } }

      .gi-tl-nav {
        display:grid; grid-template-columns:1fr 1fr; gap:10px;
      }
      @media(min-width:580px){
        .gi-tl-nav { display:flex; flex-direction:column; gap:8px; }
      }

      .gi-tl-item {
        padding:18px 16px; border-radius:var(--herald-radius-md, 14px); cursor:pointer;
        border:1px solid var(--rule, rgba(15,23,42,.08));
        background:#ffffff;
        box-shadow:0 4px 12px rgba(15,23,42,.04);
        transition:all .2s; text-align:center;
      }
      @media(min-width:580px){ .gi-tl-item{ text-align:left; } }
      .gi-tl-item:hover  { border-color:rgba(247,199,86,.42); background:#fffdf7; }
      .gi-tl-item.active {
        background:rgba(232,168,56,.12);
        border-color:rgba(247,199,86,.5);
        box-shadow:0 3px 12px rgba(232,168,56,.22);
      }
      .gi-tl-item h4 {
        font-weight:700; font-size:1rem;
        color:var(--ink-label,#64748b); margin:0 0 4px; line-height:1.2;
        transition:color .2s;
      }
      .gi-tl-item.active h4 { color:#b45309; }
      .gi-tl-item-sub {
        font-size:.72rem; text-transform:uppercase; letter-spacing:.08em;
        color:var(--ink-label,#64748b);
      }
      .gi-tl-item.active .gi-tl-item-sub { color:#b45309; opacity:.75; }

      .gi-tl-panel {
        border-radius:var(--herald-radius-lg, 18px); padding:28px 24px;
        border:1px solid var(--rule, rgba(15,23,42,.08));
        background:
          radial-gradient(circle at top right, rgba(247,199,86,.10), transparent 10rem),
          #ffffff;
        box-shadow:0 10px 28px rgba(15,23,42,.06);
        position:relative; overflow:hidden;
      }
      .gi-tl-panel::before {
        content:''; position:absolute; top:-72px; right:-72px;
        width:150px; height:150px; border-radius:999px;
        background:rgba(72,211,217,.10); pointer-events:none;
      }
      .gi-tl-panel > * { position:relative; z-index:1; }
      @media(min-width:580px){ .gi-tl-panel{ padding:36px 32px; } }

      .gi-tl-panel h3 {
        font-size:1.8rem; font-weight:800; color:var(--ink,#111827);
        margin:0 0 6px; letter-spacing:-.01em;
      }
      @media(min-width:580px){ .gi-tl-panel h3{ font-size:2.1rem; } }
      .gi-tl-panel-sub {
        color:#b45309; font-weight:700;
        text-transform:uppercase; letter-spacing:.1em; font-size:.8rem;
        margin-bottom:22px; display:block;
      }
      .gi-mission-label {
        display:inline-flex; align-items:center; gap:.35rem;
        padding:.32rem .58rem; margin-bottom:10px;
        border:1px solid rgba(247,199,86,.22);
        border-radius:999px;
        background:rgba(247,199,86,.14);
        color:#8a5f0a;
        font-size:.68rem; font-weight:900;
        text-transform:uppercase; letter-spacing:.08em;
      }
      .gi-mission-text {
        color:var(--ink-mid,#334155); font-size:1.05rem; line-height:1.85; margin-bottom:24px;
      }
      .gi-tl-hope {
        background:
          radial-gradient(circle at top right, rgba(247,199,86,.16), transparent 9rem),
          #fffdf7;
        padding:20px 22px; border-radius:var(--herald-radius-md, 14px);
        border:1px solid var(--rule, rgba(15,23,42,.08));
        border-left:4px solid var(--herald-gold, #f7c756);
        box-shadow:0 8px 22px rgba(15,23,42,.05);
      }
      .gi-tl-hope-label {
        display:inline-flex; align-items:center; gap:.35rem;
        padding:.32rem .58rem; margin-bottom:8px;
        border:1px solid rgba(247,199,86,.22);
        border-radius:999px;
        background:rgba(247,199,86,.14);
        color:#8a5f0a;
        font-size:.68rem; font-weight:900;
        text-transform:uppercase; letter-spacing:.08em;
      }
      .gi-tl-hope p {
        color:var(--ink,#111827); font-weight:600; font-style:italic;
        font-size:1.1rem; line-height:1.8; margin:0;
      }

      /* ═══ Church map — Herald card panel ══════════════════════ */
      .gi-map-section {
        margin-top:1.35rem;
        border-radius:var(--herald-radius-xl, 24px); overflow:hidden;
        border:1px solid var(--rule, rgba(15,23,42,.08));
        box-shadow:var(--herald-shadow-soft, 0 12px 30px rgba(15,23,42,.08));
        background:#ffffff;
      }
      .gi-map-header {
        background:linear-gradient(135deg,#0c1445 0%,#1a2260 60%,#0f1f5c 100%);
        padding:28px 28px 26px; position:relative; overflow:hidden;
      }
      .gi-map-header::before {
        content:''; position:absolute; inset:0;
        background:
          radial-gradient(ellipse at 85% 40%,rgba(232,168,56,.22),transparent 55%),
          radial-gradient(ellipse at 10% 80%,rgba(56,189,248,.12),transparent 50%);
      }
      .gi-map-header-inner { position:relative; display:flex; align-items:center; gap:18px; }
      .gi-map-header-icon {
        width:60px; height:60px; flex:none; border-radius:16px;
        background:rgba(232,168,56,.18); border:2px solid rgba(232,168,56,.45);
        display:flex; align-items:center; justify-content:center; font-size:1.7rem;
        box-shadow:0 4px 14px rgba(232,168,56,.2);
      }
      .gi-map-header h3 { font-size:1.45rem; font-weight:800; color:#fff; margin:0 0 5px; letter-spacing:-.01em; }
      @media(min-width:560px){ .gi-map-header h3{ font-size:1.65rem; } }
      .gi-map-header p  { font-size:.95rem; color:rgba(255,255,255,.7); margin:0; line-height:1.5; }

      .gi-map-body { padding:26px 24px 8px; background:#ffffff; }

      .gi-map-pin-banner {
        width:100%; border-radius:16px; overflow:hidden; margin-bottom:24px;
        background:linear-gradient(135deg,#0c1445 0%,#1e2d7a 100%);
        display:flex; align-items:center;
        padding:22px 20px; gap:16px; cursor:pointer; text-decoration:none;
        transition:transform .2s, box-shadow .2s;
        border:1.5px solid rgba(56,189,248,.22);
        box-shadow:0 3px 14px rgba(12,20,69,.22);
      }
      .gi-map-pin-banner:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(12,20,69,.3); }
      .gi-map-pin-icon {
        width:56px; height:56px; flex:none; border-radius:50%;
        background:rgba(232,168,56,.2); border:2px solid rgba(232,168,56,.5);
        display:flex; align-items:center; justify-content:center; font-size:1.6rem;
      }
      .gi-map-pin-text { color:#fff; flex:1; min-width:0; }
      .gi-map-pin-text strong { display:block; font-size:1.15rem; font-weight:800; margin-bottom:4px; letter-spacing:-.01em; }
      .gi-map-pin-text span { font-size:.92rem; color:rgba(255,255,255,.65); line-height:1.4; }
      .gi-map-pin-arrow {
        margin-left:auto; flex:none;
        width:40px; height:40px; border-radius:50%;
        background:rgba(56,189,248,.18); border:1.5px solid rgba(56,189,248,.4);
        display:flex; align-items:center; justify-content:center;
        color:#38bdf8;
      }

      .gi-map-info {
        display:flex; flex-direction:column; gap:20px;
      }
      @media(min-width:540px){
        .gi-map-info{ display:grid; grid-template-columns:1fr 1fr; gap:18px 32px; }
      }
      .gi-map-row { display:flex; align-items:flex-start; gap:14px; }
      .gi-map-row-icon {
        width:42px; height:42px; flex:none; border-radius:12px;
        display:flex; align-items:center; justify-content:center;
        font-size:1.1rem;
      }
      .gi-map-row-icon--addr { background:rgba(56,189,248,.12); }
      .gi-map-row-icon--time { background:rgba(232,168,56,.12); }
      .gi-map-row-icon--phone{ background:rgba(52,211,153,.12); }
      .gi-map-row-icon--web  { background:rgba(167,139,250,.12); }
      .gi-map-row-body { flex:1; min-width:0; }
      .gi-map-row-label { font-size:.72rem; font-weight:900; text-transform:uppercase; letter-spacing:.08em; color:var(--ink-label,#64748b); margin-bottom:5px; }
      .gi-map-row-value { font-size:1.05rem; color:var(--ink,#111827); font-weight:600; line-height:1.45; word-break:break-word; }
      .gi-map-row-value a { color:#7c3aed; text-decoration:none; font-weight:700; }
      .gi-map-row-value a:hover { text-decoration:underline; }

      .gi-map-directions {
        display:flex; align-items:center; gap:10px; justify-content:center;
        margin:20px 24px 24px; padding:16px;
        background:linear-gradient(135deg,rgba(56,189,248,.12),rgba(56,189,248,.06));
        border:2px solid rgba(56,189,248,.3); border-radius:14px;
        font:700 1rem var(--font-ui,sans-serif);
        color:var(--c-sky,#38bdf8); text-decoration:none; cursor:pointer;
        transition:background .2s, transform .15s;
        letter-spacing:.01em;
      }
      .gi-map-directions:hover { background:rgba(56,189,248,.2); transform:translateY(-1px); }

      .gi-map-skeleton {
        padding:40px 24px; text-align:center;
        color:var(--ink-mid,#334155); font-size:1rem; line-height:1.65;
      }
      .gi-map-skeleton svg { opacity:.35; margin-bottom:12px; }

      /* ═══ Share banner ══════════════════════════════════════════ */
      .gi-share-banner {
        margin-top:1.35rem; margin-bottom:24px;
        background:linear-gradient(150deg,#0c1445 0%,#1a2260 45%,#2d1a6e 100%);
        border-radius:var(--herald-radius-xl, 24px); padding:48px 28px 44px; text-align:center;
        box-shadow:0 8px 40px rgba(12,20,69,.32);
        position:relative; overflow:hidden;
      }
      .gi-share-banner::before {
        content:''; position:absolute; inset:0;
        background:
          radial-gradient(ellipse at 75% 20%,rgba(232,168,56,.24),transparent 55%),
          radial-gradient(ellipse at 15% 85%,rgba(126,170,204,.18),transparent 50%),
          radial-gradient(ellipse at 50% 110%,rgba(167,139,250,.15),transparent 45%);
      }
      .gi-share-banner::after {
        content:''; position:absolute; inset:0; pointer-events:none;
        background-image:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px);
        background-size:28px 28px;
      }
      .gi-share-banner-inner { position:relative; }
      .gi-share-icon {
        width:72px; height:72px; border-radius:50%;
        background:rgba(232,168,56,.18); border:2px solid rgba(232,168,56,.45);
        display:flex; align-items:center; justify-content:center;
        margin:0 auto 20px; font-size:2rem;
        box-shadow:0 0 0 10px rgba(232,168,56,.07), 0 6px 22px rgba(232,168,56,.22);
      }
      .gi-share-tagline {
        display:inline-block;
        font-size:.72rem; font-weight:800; letter-spacing:.22em;
        text-transform:uppercase; color:rgba(232,168,56,.9);
        margin-bottom:14px;
      }
      .gi-share-banner h3 {
        font-size:1.7rem; font-weight:800; color:#fff; margin:0 0 14px;
        line-height:1.2; letter-spacing:-.02em;
      }
      @media(min-width:560px){ .gi-share-banner h3{ font-size:2.1rem; } }
      .gi-share-banner p {
        font-size:1.05rem; color:rgba(255,255,255,.75); margin:0 auto 28px;
        line-height:1.75; max-width:360px;
      }
      .gi-share-btn {
        display:inline-flex; align-items:center; gap:10px;
        background:var(--herald-gold,#e8a838); color:#0c1445; border:none;
        border-radius:999px; padding:16px 36px;
        font:800 1.05rem var(--font-ui,sans-serif); cursor:pointer;
        box-shadow:0 6px 24px rgba(232,168,56,.45);
        transition:background .2s, transform .18s, box-shadow .2s;
        letter-spacing:.01em;
      }
      .gi-share-btn:hover {
        background:#fbbf24;
        box-shadow:0 10px 36px rgba(232,168,56,.6); transform:translateY(-2px);
      }
      .gi-share-btn:active { transform:scale(.95); }
    </style>

    <section class="grow-page" data-grow="the_gospel_invitation">

      <header class="grow-hero" style="--grow-accent:${accent}">
        <div class="grow-hero-icon">${icon}</div>
        <div class="grow-hero-text">
          <h1 class="grow-hero-title">${title}</h1>
          <p class="grow-hero-sub">Three pillars of hope — His invitations, His identity, and His finished work.</p>
        </div>
      </header>

      <!-- § 1: The Great Invitations -->
      <div class="gi-section" id="inv-invitations">
        <div class="gi-section-head">
          <div class="gi-section-num gi-section-num--1">1</div>
          <div class="gi-section-title">
            <h2>The Great Invitations</h2>
            <p>Personal calls of grace — tap each card to uncover the hope He offers.</p>
          </div>
        </div>
        <div class="gi-grid">
          ${INVITATIONS.map((c, i) => _invCard(c, INV_COLORS[i])).join('')}
        </div>
      </div>

      <!-- § 2: The I AM Declarations -->
      <div class="gi-section" id="inv-iam">
        <div class="gi-section-head">
          <div class="gi-section-num gi-section-num--2">2</div>
          <div class="gi-section-title">
            <h2>The &ldquo;I AM&rdquo; Declarations</h2>
            <p>Seven metaphors from John&rsquo;s Gospel — select one to explore His identity.</p>
          </div>
        </div>
        <div class="gi-iam-wrap">
          <div class="gi-iam-grid">
            <div class="gi-iam-sidebar" data-bind="iam-nav"></div>
            <div class="gi-iam-content" data-bind="iam-panel"></div>
          </div>
        </div>
      </div>

      <!-- § 3: The Finished Work -->
      <div class="gi-section" id="inv-work">
        <div class="gi-section-head">
          <div class="gi-section-num gi-section-num--3">3</div>
          <div class="gi-section-title">
            <h2>The Finished Work</h2>
            <p>What He accomplished — tap each event to walk through His redemptive mission.</p>
          </div>
        </div>
        <div class="gi-tl-wrap">
          <div class="gi-tl-nav" data-bind="tl-nav"></div>
          <div data-bind="tl-panel"></div>
        </div>
      </div>

      <!-- Church map -->
      <div class="gi-map-section">
        <div class="gi-map-header">
          <div class="gi-map-header-inner">
            <div class="gi-map-header-icon">⛪</div>
            <div>
              <h3>Come Join Us</h3>
              <p>You&rsquo;re always welcome. See you Sunday.</p>
            </div>
          </div>
        </div>
        <div data-bind="church-map-body">
          <div class="gi-map-skeleton">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <p>Loading church info&hellip;</p>
          </div>
        </div>
      </div>

      <!-- Share with a friend -->
      <div class="gi-share-banner">
        <div class="gi-share-banner-inner">
          <div class="gi-share-icon">✉️</div>
          <span class="gi-share-tagline">Pass It On</span>
          <h3>Know Someone Who Needs This?</h3>
          <p>Send them a hope-filled look at Jesus Christ — His invitations, His identity, and what He accomplished for them.</p>
          <button class="gi-share-btn" data-act="share-sms">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91A16 16 0 0 0 16 17l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Send via Text Message
          </button>
        </div>
      </div>

    </section>
  `;
}

/* ── Mount ───────────────────────────────────────────────────────────────── */

export function mount(root) {
  _wireCards(root);
  _initIAM(root);
  _initTimeline(root);
  _wireShare(root);
  _loadChurchMap(root);
  return () => {};
}

function _waitForUpperRoom(ms) {
  return new Promise(resolve => {
    const end = Date.now() + ms;
    const tick = () => {
      const UR = window.UpperRoom;
      if (UR && typeof UR.getAppConfig === 'function') return resolve(UR);
      if (Date.now() >= end) return resolve(null);
      setTimeout(tick, 250);
    };
    tick();
  });
}

/** Read a single appConfig key directly from Firestore (no auth needed — public project). */
async function _readAppConfigDirect(key) {
  const fb = window.firebase;
  if (!fb) return '';
  try {
    const cfg = window.FLOCK_FIREBASE_CONFIG || {
      apiKey:    'AIzaSyBA-fkxjABbwIHn0i6MPiXbGwahfJmuJeo',
      authDomain:'flockos-notify.firebaseapp.com',
      projectId: 'flockos-notify',
    };
    const appName = 'grow-church-info';
    const app = fb.apps.find(a => a.name === appName) || fb.initializeApp(cfg, appName);
    const db  = app.firestore();
    const doc = await db.collection('appConfig').doc(key).get();
    return doc.exists ? (doc.data().value || '') : '';
  } catch (_) { return ''; }
}

async function _loadChurchMap(root) {
  const bodyEl = root.querySelector('[data-bind="church-map-body"]');
  if (!bodyEl) return;

  const UR = await _waitForUpperRoom(5000);
  const keys = ['church_name','church_address','church_gathering','church_phone','church_website'];

  try {
    let cfg = {};
    if (UR) {
      // Authenticated app — use UpperRoom
      const results = await Promise.all(keys.map(k => UR.getAppConfig({ key: k }).catch(() => ({ value: '' }))));
      keys.forEach((k, i) => { cfg[k] = (results[i]?.value || '').trim(); });
    } else {
      // Public GROW — read directly from Firestore compat SDK
      const results = await Promise.all(keys.map(k => _readAppConfigDirect(k)));
      keys.forEach((k, i) => { cfg[k] = (results[i] || '').trim(); });
    }

    if (!cfg.church_address) {
      bodyEl.innerHTML = _mapSkeletonMsg('Service location not configured yet.');
      return;
    }

    const encodedAddr  = encodeURIComponent(cfg.church_address);
    const mapsLink     = `https://maps.google.com/maps?q=${encodedAddr}`;
    const appleMaps    = `https://maps.apple.com/?q=${encodedAddr}`;
    const directionsHref = /iPad|iPhone|iPod/.test(navigator.userAgent) ? appleMaps : mapsLink;

    bodyEl.innerHTML = /* html */`
      <div class="gi-map-body">
        <a class="gi-map-pin-banner" href="${directionsHref}" target="_blank" rel="noopener" aria-label="Open in Maps">
          <div class="gi-map-pin-icon">📍</div>
          <div class="gi-map-pin-text">
            <strong>${_esc(cfg.church_name || 'Our Church')}</strong>
            <span>${_esc(cfg.church_address)}</span>
          </div>
          <div class="gi-map-pin-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </a>
        <div class="gi-map-info">
          ${cfg.church_gathering ? `
          <div class="gi-map-row">
            <div class="gi-map-row-icon gi-map-row-icon--time">⏰</div>
            <div class="gi-map-row-body">
              <p class="gi-map-row-label">Service Times</p>
              <p class="gi-map-row-value">${_esc(cfg.church_gathering)}</p>
            </div>
          </div>` : ''}
          ${cfg.church_phone ? `
          <div class="gi-map-row">
            <div class="gi-map-row-icon gi-map-row-icon--phone">📞</div>
            <div class="gi-map-row-body">
              <p class="gi-map-row-label">Phone</p>
              <p class="gi-map-row-value"><a href="tel:${_esc(cfg.church_phone)}">${_esc(cfg.church_phone)}</a></p>
            </div>
          </div>` : ''}
          ${cfg.church_website ? `
          <div class="gi-map-row">
            <div class="gi-map-row-icon gi-map-row-icon--web">🌐</div>
            <div class="gi-map-row-body">
              <p class="gi-map-row-label">Website</p>
              <p class="gi-map-row-value"><a href="${_esc(cfg.church_website)}" target="_blank" rel="noopener">${_esc(cfg.church_website.replace(/^https?:\/\//, ''))}</a></p>
            </div>
          </div>` : ''}
        </div>
      </div>
      <a class="gi-map-directions" href="${directionsHref}" target="_blank" rel="noopener">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
        Get Directions
      </a>
    `;
  } catch (err) {
    console.warn('[TheInvitation] church map load failed:', err);
    bodyEl.innerHTML = _mapSkeletonMsg('Could not load church info right now.');
  }
}



function _mapSkeletonMsg(msg) {
  return /* html */`
    <div class="gi-map-skeleton">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
      <p>${_esc(msg)}</p>
    </div>
  `;
}

/* ── Private helpers ─────────────────────────────────────────────────────── */

function _esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function _invCard(c, color) {
  return /* html */`
    <div class="gi-card" style="--gi-c:${color}">
      <div class="gi-card-hero">
        <div class="gi-card-hero-inner">
          <span class="gi-card-icon">${c.icon}</span>
          <h3>${_esc(c.title)}</h3>
        </div>
      </div>
      <div class="gi-card-body">
        <p class="gi-card-quote">&ldquo;${_esc(c.quote)}&rdquo;</p>
        <p class="gi-card-ref">${_esc(c.ref)}</p>
        <div class="gi-card-insight">
          <span class="gi-insight-label">The Hope</span>${_esc(c.insight)}
        </div>
        <div class="gi-toggle">+</div>
      </div>
    </div>
  `;
}

function _wireCards(root) {
  root.querySelectorAll('.gi-card').forEach(card => {
    card.addEventListener('click', () => {
      const insight = card.querySelector('.gi-card-insight');
      const toggle  = card.querySelector('.gi-toggle');
      const wasOpen = insight.classList.contains('open');
      // collapse all
      root.querySelectorAll('.gi-card-insight').forEach(el => el.classList.remove('open'));
      root.querySelectorAll('.gi-toggle').forEach(el => el.classList.remove('open'));
      if (!wasOpen) { insight.classList.add('open'); toggle.classList.add('open'); }
    });
  });
}

function _initIAM(root) {
  const navEl   = root.querySelector('[data-bind="iam-nav"]');
  const panelEl = root.querySelector('[data-bind="iam-panel"]');
  if (!navEl || !panelEl) return;

  navEl.innerHTML = IAM.map((d, i) => /* html */`
    <div class="gi-iam-nav${i === 0 ? ' active' : ''}" data-iam="${i}">
      <span>${d.icon}</span><span>${_esc(d.label)}</span>
    </div>
  `).join('');

  function showIAM(idx) {
    const d = IAM[idx];
    navEl.querySelectorAll('.gi-iam-nav').forEach((el, i) => el.classList.toggle('active', i === idx));
    panelEl.innerHTML = /* html */`
      <div class="gi-fadein">
        <div class="gi-iam-badge">✦ The Declaration</div>
        <div class="gi-iam-title">I AM<br><span style="color:${d.color}">${_esc(d.label)}</span></div>
        <div class="gi-iam-meta">
          <div>
            <p class="gi-iam-meta-label">The Need Met</p>
            <p class="gi-iam-need">${_esc(d.need)}</p>
          </div>
          <div>
            <p class="gi-iam-meta-label">The Reference</p>
            <p class="gi-iam-verse">${_esc(d.verse)}</p>
          </div>
        </div>
        <p class="gi-iam-desc">${_esc(d.description)}</p>
      </div>
    `;
  }

  navEl.querySelectorAll('.gi-iam-nav').forEach((el, i) => {
    el.addEventListener('click', () => showIAM(i));
  });
  showIAM(0);
}

function _tlPanel(item) {
  return /* html */`
    <div class="gi-tl-panel">
      <h3>${_esc(item.title)}</h3>
      <p class="gi-tl-panel-sub">${_esc(item.sub)}</p>
      <p class="gi-mission-label">The Mission</p>
      <p class="gi-mission-text">${_esc(item.summary)}</p>
      <div class="gi-tl-hope">
        <p class="gi-tl-hope-label">The Hope</p>
        <p>&ldquo;${_esc(item.hope)}&rdquo;</p>
      </div>
    </div>
  `;
}

function _initTimeline(root) {
  const navEl   = root.querySelector('[data-bind="tl-nav"]');
  const panelEl = root.querySelector('[data-bind="tl-panel"]');
  if (!navEl || !panelEl) return;

  navEl.innerHTML = WORK.map((item, i) => /* html */`
    <div class="gi-tl-item${i === 0 ? ' active' : ''}" data-tl="${i}">
      <h4>${_esc(item.title)}</h4>
      <p class="gi-tl-item-sub">${_esc(item.sub)}</p>
    </div>
  `).join('');
  function showWork(idx) {
    navEl.querySelectorAll('.gi-tl-item').forEach((el, i) => el.classList.toggle('active', i === idx));
    panelEl.innerHTML = _tlPanel(WORK[idx]);
  }

  navEl.querySelectorAll('.gi-tl-item').forEach((el, i) => {
    el.addEventListener('click', () => showWork(i));
  });
  showWork(0);
}

function _wireShare(root) {
  const btn = root.querySelector('[data-act="share-sms"]');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // When running standalone (app.invite), use the current page URL directly.
    // When running inside GROW (app.flockos), build the public GROW share URL.
    let shareUrl;
    if (window._INVITE_SHARE_URL) {
      shareUrl = window._INVITE_SHARE_URL;
    } else {
      const appRoot = window.location.origin +
                      window.location.pathname.replace(/\/app\.[^/]+\/[^/]*$/, '/');
      shareUrl = appRoot + 'app.grow/app.grow.html#the_gospel_invitation';
    }
    const shareMsg = 'I thought you\u2019d appreciate this \u2014 a hope-filled look at Jesus Christ:';

    // Use the native Web Share sheet when available (iOS/Android opens SMS, AirDrop, etc.)
    if (navigator.share) {
      navigator.share({
        title: 'A Hope-Filled View of Jesus Christ',
        text:  shareMsg,
        url:   shareUrl,
      }).catch(() => { /* user cancelled — silent */ });
    } else {
      // Desktop fallback: open the SMS URL scheme directly
      const body = encodeURIComponent(shareMsg + '\n' + shareUrl);
      window.location.href = `sms:?body=${body}`;
    }
  });
}
