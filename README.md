# Your Name — Portfolio

A Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.

## What's in here

- **`/` — Menu** — the hub page. Skewed banner-style nav items with an idle wiggle animation, keyboard navigation (up/down to move, Enter to select), and a hover-fill red wipe.
- **`/about`** — bio + a "RANK"-style skills list with fill bars.
- **`/projects`** — tilted "case file" project cards.
- **`/education`** — a timeline with diamond markers.
- **GitHub / LinkedIn** — external links from the menu, open in a new tab.

## Interactions

- **Idle wiggle** — each menu item gently rotates/bobs on a loop, staggered per item.
- **Keyboard nav** — on the menu page: up/down arrows to move between items, Enter to select. On interior pages, Escape returns to the menu.
- **Stripe page transitions** — vertical bars wipe across the screen on every route change (`StripeTransition.jsx`).

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

This outputs a static site to `dist/` that you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## Customizing

All placeholder content is marked and easy to find:

- **Name / role** — `src/pages/Menu.jsx` (the name heading and role paragraph)
- **Bio + skills** — `src/pages/About.jsx`
- **Projects** — `src/pages/Projects.jsx`, edit the `PROJECTS` array at the top
- **Education** — `src/pages/Education.jsx`
- **GitHub / LinkedIn URLs** — `src/pages/Menu.jsx`, the `ITEMS` array at the top
- **Colors / fonts / spacing** — `src/index.css`, the `:root` variables at the top control the whole palette

## Notes

This design is inspired by Persona 5's UI language (bold diagonal cuts, red/black/cream palette, comic-style halftone texture) but is built entirely from original CSS/SVG — no game assets, fonts, or audio are included.
