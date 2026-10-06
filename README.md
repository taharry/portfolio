# Tazrian Ahsan — Portfolio

A Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.

## What's in here

- **`/` — Menu** — the hub page. Tilted ransom-note nav items, keyboard roving focus (arrow keys move, Tab still works natively, Enter/Space select), a résumé CTA, and the Calling Card tab.
- **`/about`** — torn-paper bio card + short paragraphs (what I build, relevant experience, interests, current opportunities) + a "RANK"-style scrolling skills menu.
- **`/projects`** — tilted "case file" project cards, each with a distinct motif (speech bubbles, a route line, a chord-chart grid) and a link to its own dossier page.
- **`/projects/:slug`** — a full write-up per project (problem, intended users, tech stack). Add a project in `src/data/projects.js` and both this route and the listing pick it up.
- **`/experience`** — internships and roles as a numbered dossier timeline. Data lives in `src/data/experience.js`.
- **`/education`** — a timeline with diamond markers.
- **`/contact`** — contact info + a validated form with live status/error states that hands off to a `mailto:` draft (see **Contact form** below).
- **GitHub / LinkedIn** — external links from the menu, open in a new tab.
- **Calling Card** — a small "★ Card" tab on every page opens a Persona-style calling-card dialog (name, role, intro, Contact action). Focus-trapped, Escape-to-close, restores focus on close.
- **Easter egg** — type "joker" anywhere outside a form field for a brief flourish; it also unlocks an alternate Calling Card border permanently (stored in `localStorage`).

## Interactions

- **Idle wiggle** — each menu item gently rotates/bobs on a loop, staggered per item; pauses on hover/focus so it doesn't fight the click target.
- **Keyboard nav** — menu items are real links in native Tab order; ArrowUp/ArrowDown additionally rove focus between them. Escape returns to the menu from any interior page, unless a dialog (Calling Card, the Easter egg flourish) is open, in which case Escape closes that first.
- **Stripe page transitions** — a short (~300ms) diagonal-stripe wipe on every route change; skipped entirely under `prefers-reduced-motion`.
- **Sound** — short synthesized UI blips (Web Audio API, no audio files), mutable via the speaker toggle; preference persists in `localStorage`.

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

To run the test suite:

```bash
npm test
```

## Résumé

There's no résumé button in the UI right now (removed for the time being). The path config (`SITE.resumeUrl` in `src/data/site.js`, defaulting to `/resume.pdf`) is still there if you want to wire a download/view action back in later.

## Contact form

The form validates inline (name / valid email / message required), shows a live status region (`role="status"`), and disables the submit button while the mailto hand-off is in flight to avoid duplicate submissions. There's no backend configured in this repo, so it's honest about what it can promise: it opens a `mailto:` draft to `tazrianahsan148@gmail.com` and says so, rather than claiming a guaranteed "message sent." To get real delivery confirmation, wire `handleSubmit` in `src/pages/Contact.jsx` to a form backend (e.g. Formspree, a serverless function, EmailJS) and only set the "opened" status after that request actually succeeds. Don't put API keys or secrets directly in that file — use a server-side endpoint or the provider's public-safe client config.

## Customizing

- **Name / role / contact / résumé path** — `src/data/site.js`
- **Projects** — `src/data/projects.js` (used by both `/projects` and `/projects/:slug`)
- **Experience** — `src/data/experience.js`
- **Bio + skills** — `src/pages/About.jsx`
- **Education** — `src/pages/Education.jsx`
- **Menu items / order** — `src/pages/Menu.jsx`, the `ITEMS` array at the top
- **Colors / fonts / spacing** — `src/index.css`, the `:root` variables at the top control the whole palette

## Notes

This design is inspired by Persona 5's UI language (bold diagonal cuts, red/black/cream palette, comic-style halftone texture) but is built entirely from original CSS/SVG — no game assets, fonts, or audio are included.
