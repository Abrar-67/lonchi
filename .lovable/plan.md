# Lonchi site improvement plan

## Goal
Make the Lonchi site look more premium and professional, then add two small features that help customers trust and return: a daily-special banner and a live Google Reviews section.

## Current state
- Single-page site with hero, trust badges, "What we serve", menu boards, order/social links, payment badges, gallery, reviews placeholder, visit section and mobile bottom nav.
- Theme is already purple/pink/blue/white, but the user feels it still looks green-leaning and not polished enough.
- Real customer content (reviews, new photos, updated menu boards) is not available yet.

## Proposed improvements

### 1. Visual direction refresh (high impact, medium effort)
Generate three refined design directions for the hero/brand feel, then implement the chosen one.

```text
Direction A: "Creamy boutique" — soft lavender, warm white, elegant serif-like display type, generous whitespace, subtle grain.
Direction B: "Neon dessert bar" — bold purple/pink/cyan gradients, glass cards, glow shadows, playful but premium.
Direction C: "Clean scoop lab" — white-first, deep purple accents, crisp sans-serif, rounded pill UI, scientific/fresh aesthetic.
```

Commitments:
- Use only semantic tokens in `src/styles.css`; no hardcoded colors in components.
- Keep dark-mode tokens valid.
- Preserve the existing content and sections; this is a visual restyling, not a rewrite.

### 2. Hero upgrade (high impact, low effort)
- Tighten the headline and subhead.
- Add a stronger primary CTA ("Get directions") and a secondary CTA ("View menu").
- Introduce a hero image/collage or keep the current layout if a better photo is not available.
- Add a small "Daily special" chip/pill under the headline that can be updated easily.

### 3. Daily special / flavour banner (medium impact, low effort)
- Add a configurable banner near the top of the page.
- For now it reads from a constant in `src/routes/index.tsx` so you can edit the text any time.
- Future option: move it to a backend table so you can update it without redeploying.

### 4. Live Google Reviews section (high impact, medium effort)
- Add a "What customers say" section that fetches real Google reviews for the Lonchi listing.
- Implementation path:
  - Server route under `src/routes/api/public/reviews.ts` that calls the Google Places API (New) using an API key stored as a secret.
  - Client calls that endpoint and renders up to 5 reviews with star ratings and relative dates.
  - Graceful fallback to a "Be the first to review" state if no reviews are returned.
- Note: this requires a Google Places API key. If you do not have one, we can build the UI with sample data and switch it on later.

### 5. Menu presentation polish (medium impact, medium effort)
- Keep the menu board photos, but add a cleaner layout: larger images, lightbox on click, and a short text summary of each board below the photo.
- Optional: extract the readable prices from the boards into a small categorized list (Scoops, Waffles, McFlurry, Drinks) so mobile users do not have to zoom into photos.

### 6. Premium micro-interactions (medium impact, low effort)
- Softer scroll-reveal timing.
- Hover lift/glow on cards and buttons.
- Staggered entrance for the "What we serve" cards and gallery.
- Respect `prefers-reduced-motion`.

### 7. SEO & local discovery (medium impact, low effort)
- Add LocalBusiness JSON-LD schema with name, address, phone, opening hours, map URL, price range, and cuisine type.
- Add canonical tag and improve Open Graph metadata.
- Lazy-load all menu/gallery images.

### 8. Mobile polish (high impact, low effort)
- Ensure the bottom nav does not cover content.
- Make tap targets at least 44 px.
- Keep the sticky header compact on scroll.

## Suggested build order
1. Visual direction vote (generate three prototypes, you pick one).
2. Apply chosen direction + hero upgrade + daily special banner.
3. Add live Google Reviews section (or placeholder UI if no API key).
4. Polish menu layout + add LocalBusiness schema.
5. Mobile pass and final build check.

## What I need from you
- A Google Places API key if you want live reviews. Otherwise I will build the UI with placeholder reviews.
- Any updated menu board photos or real customer reviews/photos you want added later.

## Technical notes
- All styling stays in `src/styles.css` using the existing Tailwind v4 token system.
- Google Reviews will use a public TanStack Start server route (`/api/public/reviews`) so the API key never reaches the browser.
- The daily special will be a constant first; moving it to the backend is a separate follow-up.
