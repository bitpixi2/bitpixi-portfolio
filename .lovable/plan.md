

## Dithered Stars Enhancement Plan

This plan adds three features to the DitheredStars component on the Resume page: a border frame, a save/share button, and an animated ASCII night sky background.

---

### 1. Thin Border Frame Around the Star Canvas

Add a `border border-border` class to the canvas container div, giving it a subtle square outline consistent with the site's monochromatic aesthetic.

---

### 2. Save Star Image + Share Portfolio

A "SAVE + SHARE" button below the sliders that:

- Uses `canvas.toDataURL()` to capture the current star art
- Creates a new offscreen canvas that composites:
  - Black background
  - The star art centered
  - A footer line: "bitpixi.com" in monospace text and a small star glyph
- Triggers a file download of the composited PNG (`star-art.png`)
- Also copies `https://bitpixi.com` to the clipboard and shows a toast notification: "Image saved! Portfolio link copied."

This approach requires no external services -- it's purely client-side using Canvas API and the existing `sonner` toast library.

---

### 3. ASCII Night Sky Background with Animation

A new "SKY" toggle/slider control that, when enabled:

- Renders a field of twinkling ASCII characters (`.`, `*`, `+`, `o`) behind the stars on the same canvas
- Characters are randomly placed and their opacity oscillates using sine waves at different frequencies, creating a twinkling effect
- The background animates continuously alongside the existing star auto-rotation
- A slider controls the density of background sky elements (from sparse to dense)

---

### Technical Details

**Files modified:**
- `src/components/DitheredStars.tsx` -- all changes are in this single component

**Implementation approach:**

1. **Border**: Add `border border-border` to the `flex-1 relative min-h-[180px]` container div.

2. **Sky background**: 
   - Add state: `skyEnabled` (boolean), `skyDensity` (number)
   - Generate a stable array of random "twinkle" positions on mount (seeded by canvas size)
   - In the `render` function, before drawing stars, iterate twinkle points and draw characters with opacity based on `Math.sin(time * frequency + phase)`
   - The animation loop already exists (auto-rotation); extend it to also update a `timeRef` used for twinkle phase

3. **Save/Share button**:
   - Add a button row below the sliders
   - On click: create an offscreen canvas (e.g. 800x600), fill black, draw the star canvas content centered, add "bitpixi.com" text at the bottom
   - Call `canvas.toBlob()` then trigger download via a temporary anchor element
   - Use `navigator.clipboard.writeText('https://bitpixi.com')` and fire a `toast()` from sonner

4. **New slider row** for "SKY" density control, matching the existing slider styling.

**No new dependencies required.** Uses existing Canvas API, sonner toast, and clipboard API.

