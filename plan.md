# Deep Planning: Herald-Theme Integration Across All New_Covenant Apps

## What We’re Working With

### The Reference — `app.flocknews` (Herald)
The Herald is a newspaper-style PWA with its own self-contained CSS (`flocknews.css`) loaded inside an iframe in `New_Covenant/index.html`. Its visual identity:

| Element | Herald Value |
|---------|-------------|
| Page background | `#f8fafc` with blue/gold radial gradients |
| Card background | `#ffffff` |
| Ink color | `#111827` (near-black) |
| Muted/label color | `#64748b` (slate) |
| **Navy brand** | `#0f172a` / `#162235` |
| **Gold accent** | `#f7c756` |
| **Cyan accent** | `#48d3d9` |
| Borders/rules | `rgba(15,23,42,.1)` (very subtle) |
| Serif font | Merriweather |
| Sans font | Inter |
| Layout | CSS Grid: sidebar (238px) + main column, max-width 1540px |
| Topbar | Sticky navy gradient with gold back-button, app switcher dropdown, rounded pills |

Critically, the Herald CSS **overwrites** `:root` tokens at the bottom of `flocknews.css` with its own Herald palette. This is the visual spec to replicate.

### New Covenant’s Existing Theme System
`Styles/new_covenant.css` is a ~20,000-line monolith that merges american_garments.css, FlockChat styles, FlockStand styles, GROW styles, and all view-specific components. Its design tokens:

| Token | NC Value | Herald Value |
|-------|---------|-------------|
| `--gold` | `#e8a838` | `#f7c756` |
| `--side-bg` | `linear-gradient(170deg, #0c1445, #1a0e3c, #0a1128)` | `#0f172a` solid |
| `--top-bg` | `linear-gradient(90deg, #0c1445, #14103a, #0a1128)` | `linear-gradient(180deg, #0f172a, #162235)` |
| `--bg` | theme-driven (cream `#faf9f6` by default) | `#f8fafc` |
| `--ink` | theme-driven (`#2c2c2c` by default) | `#111827` |
| `--font-ui` | Plus Jakarta Sans | Inter |
| `--font-serif` | Noto Serif | Merriweather |

**Both systems already share dark-navy chrome + gold accents.** They’re cousins, not strangers. The Herald is the polished, opinionated public-facing newspaper. The NC apps are the administrative/functional tools.

---

## The Integration Spectrum

There are **three levels** of integration possible, from lightest to heaviest:

### Level 1 — Topbar & Sidebar Unification (quick win)
Every NC app that mounts `the_unity_header.js` already gets a shared topbar. The Herald also has its own topbar with the app switcher, back button, and share. **Unify these** so the topbar looks identical across all apps — same navy gradient, same gold glow on the avatar, same rainbow accent line.

### Level 2 — Token Alignment (medium effort)
Make every NC app use the **same CSS custom properties** as the Herald. This means overriding `new_covenant.css` tokens for the Herald visual spec — not replacing the whole stylesheet, just the token values. Apps that already use `--gold`, `--bg`, `--ink` etc. will automatically pick up the Herald look.

### Level 3 — Full Component Restyling (heavy effort)
Restyle every card, button, form input, and section in `new_covenant.css` to match the Herald’s specific aesthetic: 
- White cards with very subtle borders (`rgba(15,23,42,.1)`)
- Navy gradient topbars
- Gold decorative accents (not just functional gold)
- Merriweather headlines
- Newspaper-style rule lines (double rules, thick rules)
- The Herald’s specific border-radius and shadow language

---

## The Recommended Strategy: Level 2 + Targeted Level 3

A full Level 3 rewrite of `new_covenant.css` is dangerous — it’s a 20,000-line file that every app depends on. Instead:

### Phase A: Token Bridge (one CSS file, high impact)
Create a **Herald token override** stylesheet that redefines CSS custom properties to the Herald palette. Drop it into the `<head>` of each NC app shell after `new_covenant.css`:

```css
/* herald-tokens.css — makes all NC apps look Herald-adjacent */
:root {
  --gold:            #f7c756;
  --gold-soft:       rgba(247,199,86,0.15);
  --gold-glow:       rgba(247,199,86,0.32);
  --gold-text:       #b8871e;
  --gold-shadow:     0 4px 20px rgba(247,199,86,0.42);
  
  --bg:              #f8fafc;
  --bg-raised:       #ffffff;
  --bg-sunken:       #f1f5f9;
  --bg-hover:        #e2e8f0;
  
  --ink:             #111827;
  --ink-muted:       #334155;
  --ink-faint:       #64748b;
  
  --line:            rgba(15,23,42,.1);
  --line-strong:     rgba(15,23,42,.18);
  
  --accent:          #f7c756;
  --accent-soft:     rgba(247,199,86,0.12);
  
  --font-ui:         'Inter', system-ui, sans-serif;
  --font-serif:      'Merriweather', Georgia, serif;
  
  /* Sidebar — Herald navy */
  --side-0:          #0f172a;
  --side-1:          #162235;
  --side-2:          #0a1128;
  --side-bg:         linear-gradient(180deg, #0f172a, #162235);
  --side-ink:        rgba(255,255,255,.62);
  --side-ink-hi:     rgba(255,255,255,.92);
  --side-line:       rgba(255,255,255,.08);
  
  /* Topbar — Herald navy */
  --top-bg:          linear-gradient(180deg, #0f172a, #162235);
  --top-ink:         #f8fafc;
  --top-ink-muted:   rgba(255,255,255,.62);
  --top-line:        rgba(255,255,255,.08);
}
```

**Impact:** Every app that uses these tokens (FlockOS, GROW, FEED, FlockStand, FlockChat) immediately shifts to the Herald color palette. Cards turn white on a subtle-blue page. Gold accents match. Navy sidebars match. This is ~90% of the visual integration.

### Phase B: Component Hardening (per-app, as needed)
Some components use hardcoded colors or gradients that don't flow through tokens. Audit each app:

| App | Hardcoded Colors to Fix |
|-----|------------------------|
| **FlockOS** | `.page-hero` gradient, `.stat-card` accent bars, `.flock-btn--primary` gradient, `.garments-card` gradient |
| **GROW** | `.grow-hero` gradient, `.grow-card` backgrounds, navy/gold devo cards, reading plan cards |
| **FEED** | `.bm-land-hero` background (#1a2555), `.bm-land-card` backgrounds (all hardcoded #1a2555), `.bm-auth-card` |
| **FlockStand** | `--ms-bg-card` hardcoded navy gradient, `.ms-dash-hero`, `.ms-stat-card` |
| **FlockChat** | `.topbar` accent background overrides, `.sidebar` colors |

Each of these needs its hardcoded values replaced with token references. This is surgical — change `#1a2555` to `var(--side-bg)` or `var(--herald-navy)`.

### Phase C: Typography Alignment
The Herald uses Inter + Merriweather. NC apps use Plus Jakarta Sans + Noto Serif. Both are Google Fonts. The cleanest approach:

1. Load **both** Inter and Merriweather in each app shell (add to existing `<link>` tags)
2. Set `--font-ui: 'Inter'` and `--font-serif: 'Merriweather'` in the token override
3. Let existing CSS rules cascade — they reference `var(--font-ui)` and `var(--font-serif)` in many places

Areas that use explicit `font-family` strings (like `'Plus Jakarta Sans'`) will need grep-and-replace, but most are already tokenized.

### Phase D: Herald as the Launcher Shell
Currently `index.html` loads the Herald in an iframe. For a **truly unified** experience:

1. The launcher (`index.html`) should use the **same navy topbar** as the NC apps (already has the Unity Header available)
2. The iframe Herald should inherit the **launcher’s topbar** instead of rendering its own, or
3. Better: **extract** the Herald content sections into the FlockOS `the_veil` shell as a dedicated view, removing the iframe entirely. This is a bigger architectural change but the right long-term move.

---

## What NOT to Do

1. **Don’t rewrite `new_covenant.css`.** It’s too large and shared. Token overrides achieve the same result with zero risk.
2. **Don’t change `Nations/`.** Per your instructions.
3. **Don’t touch the repo root.**
4. **Don’t change the Herald’s own `flocknews.css`** — it’s the spec, not the target.
5. **Don’t force identical layouts.** FlockOS is a dashboard; GROW is a learning hub; FEED is a document editor. They should *feel* like the same brand, not look like clones.

---

## Implementation Order (Recommended Sequence)

| Step | Files | Effort | Risk |
|------|-------|--------|------|
| 1. Create `Styles/herald-tokens.css` | 1 new file | Low | None |
| 2. Load tokens in `app.flockos/app.flockos.html` | 1 line added | Low | None |
| 3. Load tokens in `app.grow/app.grow.html` | 1 line added | Low | None |
| 4. Load tokens in `app.feed/feed.html` | 1 line added | Low | None |
| 5. Audit FlockOS for hardcoded colors | grep `.css` + visual review | Medium | Low |
| 6. Audit GROW for hardcoded colors | grep `.css` + visual review | Medium | Low |
| 7. Audit FEED for hardcoded colors | grep `feed.html` inline styles | High (many hardcoded navy values) | Medium |
| 8. Audit FlockStand (in `new_covenant.css`) | grep for `--ms-` tokens | Medium | Low |
| 9. Audit FlockChat (in `new_covenant.css`) | grep for `.flockchat-app` overrides | Low | Low |
| 10. Font loading: add Inter + Merriweather to shell HTMLs | 3 files | Low | None |
| 11. Typography grep-and-replace for hardcoded font stacks | ~20 files | Medium | Medium |
| 12. Launcher shell unification | `index.html` | Medium | Medium |

---

## Key Files to Touch

```
New_Covenant/
  Styles/
    herald-tokens.css          ← NEW — token override
  app.flockos/app.flockos.html ← add <link> to herald-tokens.css
  app.grow/app.grow.html       ← add <link> to herald-tokens.css  
  app.feed/feed.html           ← add <link> to herald-tokens.css
  index.html                   ← launcher unification (Phase D)
```

The 20,000-line `new_covenant.css` remains **untouched**. All visual change flows through token redefinition.

---

## Estimated Time

| Phase | Hours |
|-------|-------|
| A — Token bridge creation + wiring | 1–2 |
| B — Hardcoded color audits (6 apps) | 4–6 |
| C — Typography alignment | 1–2 |
| D — Launcher shell | 2–3 |
| **Total** | **8–13 hours** |

This is a phased, reversible, token-driven approach. Every step can be tested independently. The token bridge alone gets you 80%+ visual integration.

Shall I proceed to ACT MODE and begin with Phase A (creating `herald-tokens.css` and wiring it into the three main app shells)?