# Moving from personal brand to the Ivori company site

## What changes visually

- The handwritten **ivori** mark replaces "Shekhar Beura / Real Estate Advisor" in the header and in the footer. It sits left-aligned, roughly 28-32px tall, in the existing dark ink colour so it reads as a wordmark rather than an image.
- The browser tab icon becomes the ivori mark too, and the page title/description change to Ivori.
- Shekhar does not disappear — he moves from "the brand" to "the founder". His photo and name stay in the hero intro strip and the contact card, now labelled **Founder & Lead Advisor, Ivori**.
- Everything else (colours, Playfair/DM Sans, gold accents, photography) stays exactly as it is. The script logo sits naturally in that palette.

## Content recommendations

These are suggestions — tell me which ones you want.

1. **Hero sub-line becomes company voice.** Keep the headline "The Smart Money Is Moving to Dubai", but change the eyebrow line from "Dubai Real Estate · Investment Advisory" to "Ivori · Dubai Real Estate Investment Advisory", and the primary button from "Connect with Shekhar" to "Talk to Ivori".

2. **Shift "I" to "we".** The contact section currently reads "I'll guide you through it." A company site normally reads "We'll guide you through it — transparent, no pressure, no obligation." Shekhar's personal voice can stay in one place only: a short founder's note.

3. **New: a short "About Ivori" band** under the hero or before contact. Three or four lines on what the firm does (investor-first advisory, off-plan and ready, payment-plan structuring, exit planning) plus a founder's note with Shekhar's photo and a one-paragraph quote in his own voice. This is the single most useful addition for credibility.

4. **New: "How We Work" — three or four steps.** Discovery call → market and payment-plan shortlist → developer and unit selection → handover and exit support. Cheap to build, and it answers the "what do I actually get" question a company site is expected to answer.

5. **New: a small trust strip.** RERA/broker registration number, years in Dubai, developers worked with, number of investors advised. Only if you can give me the real numbers — I will not invent any.

6. **Footer grows slightly.** ivori mark, one line of positioning, quick links, WhatsApp and email, and "© Ivori. All rights reserved." A company email (e.g. hello@ivori.ae) would fit better than the Gmail address once you have one.

7. **Keep as-is:** the ROI calculator, growth map, Dubai-vs-global comparison and investor-benefits sections all work unchanged for a company site. No edits planned there.

## Technical notes

- Logo added via `lovable-assets` from the uploaded PNG, imported as a pointer and used as an `<img>` in `Navbar.tsx` and the footer in `ContactCTA.tsx`; favicon written as a real square PNG in `public/`.
- Touched files: `Navbar.tsx`, `Hero.tsx`, `ContactCTA.tsx`, `index.html`, plus a new `About.tsx` mounted in `pages/Index.tsx`.
- Project memory updated: brand is Ivori, Shekhar is Founder & Lead Advisor.

## Open questions

- The legal company name is **Ivori Portfolio Real Estate L.L.C**; the supplied **ivori** wordmark will be the primary display brand.
- Add only the **About Ivori** section with a founder's note; do not add How We Work or a trust strip.
