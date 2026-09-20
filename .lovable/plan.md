# TrueNorth page-wide smooth scrolling

## Goal
Add restrained, page-wide smooth scrolling without changing the hero film, delayed reveal, typography, editorial sections, colors, links, or responsive layouts.

## Implementation
- Add Lenis as a lightweight dependency and initialize it once in a small client-only scroll component mounted at the shared page shell.
- Run Lenis through one `requestAnimationFrame` loop on desktop widths only (`min-width: 768px`). Cleanly stop and destroy it when the component unmounts or the viewport changes.
- Preserve native scrolling on mobile and touch-focused small screens to avoid lag or delayed gestures.
- Respect `prefers-reduced-motion`: skip Lenis entirely and keep immediate native scrolling.
- Handle same-page hash links through Lenis on desktop while retaining standard browser anchor behavior, URL hashes, keyboard activation, and focus semantics. Existing TrueNorth anchors (`#top`, `#inside`, `#how`, `#founding`) remain unchanged.
- Keep CSS smooth scrolling as the no-JavaScript/native fallback, but disable that animation for reduced-motion users as the current design already does.

## Validation
- Verify desktop wheel, trackpad, keyboard, and anchor navigation are smooth and land on the correct sections.
- Verify tablet/mobile below 768px use native touch scrolling with no delay.
- Verify reduced-motion bypasses animated scrolling.
- Verify progress, navigation emphasis, and one-time line drawing remain subtle and accurately follow the current chapter.
- Confirm the hero timing and video playback remain unchanged, all links still work, and there are no console errors, horizontal overflow, or layout shifts.

## Restrained scroll details
- Add a very thin reading-progress line using the existing clay/sage palette, driven from the same animation frame without triggering layout work.
- Add subtle active-state emphasis for the current navigation chapter, with `aria-current` support where appropriate.
- Gently draw the existing compass and directional lines once as each chapter enters view; no parallax, scroll-jacking, or repeated animation.
- Disable these animated treatments for reduced-motion users and keep every element fully visible.
