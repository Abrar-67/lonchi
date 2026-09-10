# ChaJoy-style Lonchi redesign

## Goal
Rebuild the Lonchi homepage to closely match ChaJoy’s visible layout, spacing, proportions, and restrained interaction style while keeping Lonchi’s identity and all current content.

## Visual direction
- Use the selected hybrid palette: `#F8FBEF`, `#DFF2D1`, `#65C800`, and restrained Lonchi purple `#9E24AD`.
- Use Sora for headings and Manrope for body text.
- Match ChaJoy’s compact header, pale-green split opening, rounded product imagery, white product cards, full-width stat band, and airy section rhythm.
- Replace the current heavy display styling and pronounced effects with subtle reveals, image lift, soft shadows, and tactile buttons.

## Page structure
1. Compact logo/navigation bar with a green “Find the shop” action.
2. ChaJoy-proportioned split opening using Lonchi’s banner and real shop copy.
3. Three equal product cards for scoops, waffles, and bubble tea.
4. Pale-green fact band using only verified Lonchi information.
5. Menu-board section using the cleaned drinks menu and ice cream board.
6. Delivery/follow section for foodpanda, Pathao, and Instagram.
7. Existing public reviews form and review list, restyled to fit the same system.
8. Visit section with shop photo, exact address, Google Maps, Apple Maps, and phone link.
9. Compact footer and five-item mobile navigation.

## Technical details
- Update global semantic color, typography, radius, and shadow tokens in `src/styles.css`.
- Restructure `src/routes/index.tsx` without changing its working links or metadata.
- Restyle `src/components/Reviews.tsx` without changing review submission behavior.
- Load Sora and Manrope through the root document head.
- Verify desktop and mobile layouts, links, review rendering, overflow, and browser errors.
