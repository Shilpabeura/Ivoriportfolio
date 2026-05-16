## 1. Fix 3-Year ROI to match the spreadsheet

The xlsx has 5-year inflow values, but the year-by-year cells (Year 0–5) are the basis for any horizon. I'll align the 3-year horizon to read straight from the xls's Year-3 cells, using the same rules the xls applies.

**`src/lib/roiSource.ts` — `computePlan` changes:**

For off-plan with `horizon = 3`:
- Property value at exit = `1M × (1 + offPlanGrowth)^3` (= AED 1,404,928 for 1M base) — matches xls `C14`.
- Rental income = 0. (xls treats Year 3 as handover; rental starts *post-handover*, so a 3-year exit captures no rental years before sale.)
- Total invested = property + 4% DLD (unchanged).
- Net profit = exit value − invested. ROI = net / invested.
- IRR labels: add a second IRR range field per plan for the 3-year case (placeholder strings; you can fine-tune in the xls). For now I'll leave IRR blank when horizon = 3 unless you provide values.

For ready with `horizon = 3`:
- Property value at exit = xls `E14` = 1,157,625 (uses xls's explicit ready Y1–Y3 schedule: 1.05M, 1.1025M, 1.157625M — not pure compounding).
- Rental = sum of `F11+F12+F13` = AED 220,675 on a 1M base.
- Same DLD/ROI math.

**Implementation detail:** I'll extend `loadROIConfig` to also read the explicit ready-property year values (`E11:E16`) and the rental-yield-per-year column (`F11:F16`) from the xls so the calculator reproduces the spreadsheet exactly for both horizons, scaled linearly by `propertyValue / 1,000,000`. This is the simplest way to guarantee a 1:1 match with the xls at any base price.

**Headline summary card** label currently reads "Total Inflow (5Y)" hardcoded from `cfg.horizonYears` — I'll switch it to the active `horizon` state so it correctly says "(3Y)" or "(5Y)".

## 2. Branding & contact edits

**Remove "Altira Aura Real Estate" everywhere:**
- `src/components/Navbar.tsx` — remove the subtitle under the name.
- `src/components/Hero.tsx` — strip from the intro strip; replace with "Real Estate Advisor".
- `src/components/ContactCTA.tsx` — remove the company line under Shekhar's name AND from the footer (leaves just "Shekhar Beura · Real Estate Advisor").

**Add "Real Estate Advisor" as subtitle** wherever Shekhar's name appears without one:
- Hero intro strip (replaces "Altira Aura Real Estate · In Dubai since 2012" with "Real Estate Advisor").
- Navbar (replaces "Altira Aura Real Estate" with "Real Estate Advisor").
- Footer in ContactCTA.

**Email change:** `shekhar@altiraaura.com` → `beura.shekhar@gmail.com` in `ContactCTA.tsx`.

**Remove the office address block** (MapPin row) from `ContactCTA.tsx`.

## 3. Memory update

Update `mem://branding/personal-brand` and `mem://index.md` Core to drop the secondary Altira Aura branding rule and add: subtitle is "Real Estate Advisor"; email is beura.shekhar@gmail.com; no office address shown.

## Files touched

- `src/lib/roiSource.ts` — read ready year-values + rental column from xls, fix 3-year computePlan.
- `src/components/ROICalculator.tsx` — dynamic "(NY)" label.
- `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/ContactCTA.tsx` — branding + contact edits.
- Memory files.

## Confirm before I build

The 3-year off-plan ROI under this approach is ~35% on net (no rental), since rental starts at handover. If you want the 3-year off-plan to include a Year-3 rental, say the word and I'll add it — but as written the xls excludes it.