# Site Elegance & Mobile Polish Plan

## 1. Fix the mobile gap between section 1 and 2 (the issue you spotted)

**What you'll see:** On mobile, the hero no longer stretches to a full screen height. Content ends right after the Shekhar intro strip, and the next section starts immediately below — no odd empty band.

**How:**
- Hero: `min-h-screen` applies only on desktop (`lg:min-h-screen`); mobile height fits content naturally.
- Reduce hero bottom padding on mobile (`pb-20` → `pb-12`) and hide the bouncing scroll arrow on small screens (it points into empty space).
- Slightly reduce the next section's top padding on mobile (`py-24` → `py-16`, desktop unchanged).

## 2. Imagery refresh (the change you already approved)

**What you'll see:** Sharper, higher-contrast Dubai photos — crisp golden-hour architecture instead of the current hazy, yellow-grey shots. The site instantly feels more premium.

**How:**
- Replace the hero image with a cinematic golden-hour architectural shot (4:5 vertical frame on desktop).
- Replace the Why Dubai skyline and the investor-section interior with high-contrast terrace/interior-with-skyline views.
- Warm golden-hour grading only — no blue tones, no AI-looking renders.

## 3. Lighter, more modern section styling

**What you'll see:** Less "boxed-in" feeling. Sections breathe with more whitespace and thin ruled lines instead of heavy card borders — closer to a luxury editorial magazine than a corporate template.

**How:**
- Why Dubai and investor-benefit cards: replace bordered boxes with open columns separated by hairline rules.
- Contact section: restyle the WhatsApp card as crisp ink-on-paper stationery.
- Consistent small folio numbers and hairline rules on section headers.

## 4. Financial tools polish

**What you'll see:** The ROI calculator and market comparison feel like a private-banking ledger — quieter buttons, cleaner numbers, no visual noise.

**How:**
- Restyle toggle pills and plan cards with understated active states and ruled separators.
- Numbers use tabular figures so columns align.
- All XLSX-driven logic, values, and copy stay exactly as-is.

## Guardrails (unchanged)

- No gold/amber/bronze anywhere (the map's Tier-2 copper stays unless you say otherwise).
- No script webfonts — the ivori logo PNG remains the only handwriting.
- No copy, contact, pricing, or data changes.
- Growth map: full-width, mobile crop, collapsed legend — untouched.

## Verification

Playwright pass on desktop (1280px) and mobile (390px): the section 1→2 gap is gone, all sections render, calculator + map + legend work, no console errors, build log clean.
