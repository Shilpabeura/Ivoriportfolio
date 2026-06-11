## Dubai 2040 Investment Map — Plan

### Placement
Insert a new `<DubaiInvestmentMap />` section in `src/pages/Index.tsx` between `InvestorBenefits` and `ROICalculator`. Narrative flow becomes: why Dubai → what's in it for you → **where to invest** → model your returns → city comparison → contact.

### Section structure (on-brand, editorial)
- Eyebrow: "Dubai 2040 Master Plan"
- H2 (Playfair): "Where The Smart Money Is Going"
- Sub (DM Sans, muted): 1–2 lines on growth corridors, urban centers, future value.
- Two-column layout on desktop (split 60/40), stacked on mobile:
  - **Left:** Custom minimal SVG map of Dubai (white/grey background, gold accents, soft elevated shadow card) with 10 colored zones.
  - **Right:** Info panel — when nothing is selected, shows tier legend + short instruction. When a zone is hovered/selected, panel cross-fades to that zone's details.

### SVG map
- Hand-built abstract SVG (`viewBox` ~ 1000×700) showing Dubai coastline, Palm Jumeirah silhouette, Sheikh Zayed Road line, and 10 zone polygons positioned to match the reference image.
- Tier colors (semantic tokens added to `index.css`):
  - Tier 1: warm gold `--tier-1` (primary brand gold)
  - Tier 2: muted terracotta `--tier-2`
  - Tier 3: sage/grey-green `--tier-3`
- Each zone: numbered circular badge (1–10) at centroid, soft fill at ~35% opacity, stronger stroke on hover/selected. Hover scales slightly + raises z-order; selected gets gold ring.
- Compass + minimal labels (Palm Jumeirah, Downtown, Sheikh Zayed Rd) in very light grey type — kept sparse so it doesn't feel like an infographic.
- All interactions keyboard-accessible (`<button>` wrapping each zone path, `aria-label`, focus ring).

### Info panel (right side)
For the selected zone, shows:
- Tier chip (color-coded) + zone name (Playfair)
- One-line positioning ("Next-gen lifestyle & tourism destination")
- 5Y / 10Y outlook as gold star rows
- Risk level + "Ideal for" line
- **Key projects** list — 2–3 named developments per zone with small thumbnail (square, rounded, elevated shadow). Thumbnails are sourced from a typed data file so you can swap images later.

A small tier filter row above the map ("All · Tier 1 · Tier 2 · Tier 3") dims non-matching zones — optional polish, kept minimal.

### Data source
New file `src/lib/dubaiZones.ts` exporting a typed array:
```ts
export type Zone = {
  id: number; name: string; tier: 1|2|3;
  positioning: string;
  outlook5y: number; outlook10y: number; // 1–5 stars
  riskLevel: "Low"|"Low–Medium"|"Medium";
  idealFor: string;
  projects: { name: string; developer: string; image: string }[];
  svgPath: string; // polygon points
  badge: { x: number; y: number };
};
```
Seeded with all 10 zones from the reference. Project thumbnails left as placeholder asset URLs you can replace; structure is ready.

### Files
- **Create** `src/components/DubaiInvestmentMap.tsx` — section component
- **Create** `src/components/DubaiMapSVG.tsx` — SVG map with hover/select callbacks
- **Create** `src/lib/dubaiZones.ts` — zone data
- **Edit** `src/pages/Index.tsx` — import + insert section
- **Edit** `src/index.css` — add `--tier-1/2/3` semantic tokens
- **Edit** `tailwind.config.ts` — expose tier colors

### Out of scope (can do later)
- Real geo-accurate map (would require Mapbox/Leaflet — breaks minimal aesthetic)
- Real project photography (placeholders until you supply images)
