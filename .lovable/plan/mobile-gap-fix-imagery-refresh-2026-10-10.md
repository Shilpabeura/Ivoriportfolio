# Mobile Gap Fix + Imagery Refresh

## 1. Fix the mobile gap between section 1 and 2

**What you'll see:** On mobile, the hero no longer stretches to a full screen height. Content ends right after the Shekhar intro strip, and the next section starts immediately below — no odd empty band.

**How:**
- Hero: `min-h-screen` applies only on desktop (`lg:min-h-screen`); mobile height fits content naturally.
- Reduce hero bottom padding on mobile (`pb-20` → `pb-12`, desktop unchanged).
- Hide the bouncing scroll arrow on small screens (it points into empty space).
- Reduce the next section's top padding on mobile (`py-24` → `py-16`, desktop unchanged).

## 2. Imagery refresh

**What you'll see:** Sharper, higher-contrast Dubai photos — crisp golden-hour architecture instead of the current hazy, yellow-grey shots. The site instantly feels more premium.

**How:**
- Replace the hero image with a cinematic golden-hour architectural shot.
- Replace the Why Dubai skyline and the investor-section interior with high-contrast terrace/interior-with-skyline views.
- Warm golden-hour grading only — no blue tones, no AI-looking renders.

## Guardrails

- No gold/amber/bronze in the UI palette; warm tones live only inside the photography.
- No copy, contact, pricing, or data changes. Growth map untouched.

## Verification

Playwright pass on desktop (1280px) and mobile (390px): the section 1→2 gap is gone, images render, no console errors, build log clean.
