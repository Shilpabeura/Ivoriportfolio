# Ivori site — elegance & modernization pass

Goal: move the site from "clean editorial" to "modern luxury advisory" without changing content, data logic, or the ink-on-paper identity (paper #FDFCF8, ink #1A1A1A, slate #2C3E50, Crimson Pro + Inter, no gold/amber).

## 1. Imagery refresh (biggest visual win)

Current photos have a hazy, yellowed, low-contrast cast that dates the site.

- Replace hero image with a cinematic, high-contrast golden-hour Dubai architectural shot (crisp glass/travertine, deep shadows, warm but not washed out)
- Replace the Why Dubai and investor-section images with modern alternatives (terrace views, architectural detail, luxury interior with skyline)
- Reframe hero image to an elegant 4:5 vertical composition with generous margins and subtle overlap with the floating ROI stat card
- Keep the "photos are the only color-rich element" rule — richer photos, calmer UI

## 2. Layout refinement — fine-line editorial grid

- Replace heavy bordered card boxes in WhyDifferent and InvestorBenefits with open, hairline-ruled editorial columns (thin rules, bold typographic anchors, more whitespace)
- Restyle the ContactCTA WhatsApp card from the flat grey container into crisp ink-on-vellum "stationery" — refined typography, hairline frame, generous padding
- Section headers get consistent folio numbering and hairline rules for a cohesive journal feel

## 3. Financial tools polish

- ROICalculator and MarketComparison: restyle pills/buttons to a minimalist private-banking ledger look — tabular numerals, understated active states, quiet ruled separators instead of boxed controls
- Keep all XLSX-driven logic, values, and assumptions exactly as-is

## 4. Micro-polish

- Consistent vertical rhythm between sections (uniform padding scale)
- Subtle hover depth on images (soft scale/shadow, no gimmicks)
- Check mobile spacing pass after changes

## Guardrails

- No gold/amber/bronze introduced anywhere (Tier-2 copper on the map stays as-is unless you say otherwise)
- No script webfonts; ivori logo PNG remains the only handwriting
- No copy, contact, pricing, or data changes
- GrowthMap mobile crop/collapsed-legend behavior untouched

## Verification

- Playwright pass on desktop (1280px) and mobile (390px): all sections render, calculator + map + legend work, no console errors
- Build log clean
