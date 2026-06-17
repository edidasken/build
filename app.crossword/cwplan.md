# FlockOS Daily Crossword — Production Build Plan

## 1. Executive Summary
The objective is to introduce a Daily Crossword puzzle embedded directly into the **Herald** (FlockNews) daily edition, with standalone PWA capabilities. The crossword serves as an interactive, gamified review of the day's discipleship and theological content. Clues and answers will be dynamically sourced from existing data modules (Spurgeon quotes, Proverbs illustrations, Bible strongs, and theology).

## 2. Architecture & File Structure
The crossword app will follow the same standalone-yet-embeddable architecture as other FlockOS apps.

**Directory: `/app.crossword/`**
*   `cwplan.md` - This planning document.
*   `crossword.html` - The standalone entry point (can be embedded via iframe).
*   `crossword.css` - Grid and clue styling, utilizing Herald's existing CSS tokens (`herald-tokens.css`).
*   `crossword.js` - App initialization, UI controllers, and `localStorage` state management.
*   `generator.js` - The pure JavaScript deterministic grid generation algorithm.
*   `data-source.js` - Fetch/parse logic to extract clue/answer pairs from GROW data files.
*   `manifest.json` - Standalone PWA manifest.

## 3. Data Integration & Sourcing
To make the crossword robust and offline-capable, the generation algorithm will pull and parse from existing local JSON/JS data stores:

1.  **Spurgeon Quotes (`spurgeon-quotes.json`)**
    *   *Parser:* Select a quote, mask a significant word (length > 4).
    *   *Clue:* "Spurgeon: 'Visit many good books, but live in the _____.'"
    *   *Answer:* "BIBLE".
2.  **Proverbs Illustrations (`proverbs-illustrations.json`)**
    *   *Parser:* Use the `title` or `tags` arrays.
    *   *Clue:* "Proverbs 11:1 Illustration: The _____ on the Scale"
    *   *Answer:* "THUMB".
3.  **Bible Data (`mdbible/books/`)**
    *   *Parser:* Use the `strongs` mappings to test vocabulary.
    *   *Clue:* "Greek: Apostolos (English translation)"
    *   *Answer:* "APOSTLE".
4.  **Theology & Apologetics (`theology.js`)**
    *   *Clue:* The category or question (e.g., "Declared righteous before God.")
    *   *Answer:* Key theological terms (e.g., "JUSTIFICATION").

### Data Normalization
*   **Sanitization:** Answers must be stripped of spaces, hyphens, and punctuation, then converted to uppercase `[A-Z]`. Max length: 15 characters.
*   **Daily Dictionary:** A daily client-side dictionary of 30-40 valid words/clues for the current `_FN_DAY` (Day of the Year) will be assembled before passing into the grid generator. 

## 4. Deterministic Grid Generation Logic
Since FlockOS apps operate offline-first without heavy backend processing, the crossword grid must be generated client-side deterministically based on the date.

**Algorithm Steps:**
1.  **Seed:** Use `window._FN_DAY` + `window._FN_YEAR` as the PRNG (Pseudo-Random Number Generator) seed. This ensures the grid is identical for every user on the same day, enabling shared experiences.
2.  **Pool Selection:** Select 25 word/clue pairs from the daily dictionary. Sort them descending by length.
3.  **Grid Placement:**
    *   Initialize a dynamic 2D array (e.g., 20x20 maximum boundary).
    *   Place the longest word across the center.
    *   Iterate through remaining words. For each word, find all possible valid intersections with already-placed words.
    *   **Validation Rules:** 
        *   Letters must match at the intersection.
        *   Words cannot lie adjacent to each other (parallel) without being part of a valid cross.
        *   "Dead ends" (words fully enclosed) are prohibited.
    *   Score potential placements based on grid compactness. Place at the highest-scoring valid intersection.
    *   If a word cannot fit, discard it and attempt the next word. Aim for 10-15 successfully placed words.
4.  **Grid Trimming:** Trim empty outer rows and columns to yield the tightest bounding box (e.g., resulting in an 11x14 grid).
5.  **Matrix Mapping:** Number the grid conventionally (top-to-bottom, left-to-right). Output the final JSON structure needed by the UI.

## 5. User Interface (UI/UX) & Mobile Handling
The UI must be fully mobile-responsive, as Herald is designed as a mobile-first PWA.

*   **Grid Layout:** Use CSS Grid (`display: grid`) for the board. Cells dynamically scale based on available width, bounded by a `max-width`.
*   **Pinch/Zoom Prevention:** Use `touch-action: pan-y;` to prevent accidental zooming when rapidly tapping cells on iOS/Android.
*   **Clues Panel:** Displayed below the grid on portrait screens, or to the right on landscape. Grouped into **Across** and **Down**.
*   **Active States:** 
    *   Tapping a cell highlights the cell (primary color) and the entire active word (secondary color).
    *   Tapping a cell *again* toggles direction between Across and Down.
    *   The corresponding clue auto-scrolls into view with a highlighted state.
*   **Native Keyboard Injection:** Utilize an invisible `<input type="text" autocomplete="off" autocorrect="off" spellcheck="false">` tethered to the active cell to seamlessly trigger mobile keyboards. Intercept `keydown` events (Backspace, Letters) and advance the cursor logic natively.
*   **State Management:** Save the user's grid state (filled letters) to `localStorage` keyed by `flockos.crossword.[YEAR].[DAY]`.
*   **Validation:** A "Check Puzzle" button highlights incorrect letters in red temporarily. Completion triggers a pure CSS/JS confetti celebration.

## 6. Herald Integration
To incorporate this into the daily paper:

1.  Update `embed-flocknews.html` to include a new section.
2.  **Sidebar Index:** Add `<li><span>Daily Crossword</span><span class="fn-index-dots"></span><span class="fn-index-pg">§ 10</span></li>`.
3.  **Main Content Section:**
    ```html
    <section data-fn-section="crossword" id="fn-section-crossword">
      <hr class="rule-double fn-section-rule">
      <p class="fn-section-label">
        <a class="fn-section-link" href="app.crossword/crossword.html">§ 10 · The Daily Crossword</a>
      </p>
      <iframe src="app.crossword/crossword.html" class="fn-crossword-embed-frame" style="width:100%; height:800px; border:none;" title="Daily Crossword"></iframe>
    </section>
    ```

## 7. Execution Order
*   **Step 1:** Create `data-source.js` (Parsers for Spurgeon, Proverbs, Theology).
*   **Step 2:** Create `generator.js` (Deterministic intersection algorithm and PRNG).
*   **Step 3:** Create `crossword.html` and `crossword.css` (Grid rendering, clues layout, Herald design tokens).
*   **Step 4:** Create `crossword.js` (State management, keyboard proxy, touch events, and validation).
*   **Step 5:** Wire into Herald via `embed-flocknews.html`.