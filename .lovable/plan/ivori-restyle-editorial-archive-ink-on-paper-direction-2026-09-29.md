# Ivori restyle — "Editorial archive" ink-on-paper direction

Replaces the current gold-on-white look (which reads as generic AI branding) with the selected "Editorial archive" direction: warm paper, ink black, one slate accent, print-shop details. All content, sections, and functionality stay identical. The hand-drawn ivori logo remains the only handwriting on the site.

## Design system changes

**Palette (index.css tokens + tailwind.config.ts)**
- Background/paper: `#FDFCF8` (warm vellum white)
- Surface & hairline borders: `#E5E2D9` / soft `#F3F1EA`
- Ink (text, primary buttons): `#1A1A1A`
- Slate accent (links, highlights, hover states): `#2C3E50`
- Muted text: `#4A4A4A` body, `#6B6B6B` labels
- Remove every gold token usage: gradient text, gold buttons, gold shadows, gold icons. Section alternation becomes paper / slightly deeper paper.

**Typography**
- Headings: Crimson Pro (serif, with *italic* serif accent words replacing the gold-gradient words)
- Body & labels: Inter; small uppercase tracked labels (0.2em, 10px) replace the gold eyebrow styling
- Remove Playfair Display and DM Sans imports; keep the ivori logo image untouched

**Component language**
- Buttons: ink-black pills with a letterpress feel — subtle offset shadow `2px 2px 0` + slight press-down on active; secondary buttons are ink-outlined
- Cards: sharp corners (0–2px radius), hairline borders, soft paper shadows; the oversized rounded-2xl look goes
- Floating stat cards and tags get the editorial "folio tag" treatment: small bordered label chips (e.g. uppercase micro-type) instead of gold accents
- WhatsApp buttons: ink-black with white icon/text (no gold, no green)

**Photography**
- Keep the existing warm golden-hour Dubai photos — no grayscale/duotone; photos stay the only color-rich element against the paper/ink UI, which makes them pop more

## Files touched

- `src/index.css` — tokens, font imports, replace gold utilities (text-gradient-gold → italic-accent usage, shadow utilities)
- `tailwind.config.ts` — font families, keep semantic color mapping
- `src/components/` — restyle Navbar, Hero, WhyDifferent, InvestorBenefits, GrowthMap, ROICalculator, MarketComparison, ContactCTA to the new tokens/component language (no copy or logic changes)
- ROI calculator, growth map, and markets data logic untouched
- `index.html` — metadata unchanged (title/description stay as the SEO version)

## Verification

- Playwright pass on desktop + mobile: no gold pixels, fonts loading, all sections render, calculator and map still work
- Build log clean

## Guardrails

- No gold/amber/bronze anywhere; no script webfonts; logo untouched
- No content, pricing, contact, or data changes
