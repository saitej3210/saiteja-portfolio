# Kodi Saiteja — Portfolio (V4)

Static HTML/CSS/JS. No build step. Open with Live Server (VS Code) and press Ctrl+F5.

## Files you will edit
- `projects.js` — project names, text, links, tags **and the case-study popup text** (problem / role / built)
- `index.html` — hero text, journey timeline (there is a commented template to add certificates / hackathons)
- `polish.css` — latest visual layer (colours: `--red`, `--gold`)

## One-time setup (5 min) for the two things that need your accounts
1. **Real project screenshots** — `npm i -D playwright && npx playwright install chromium`, then `node tools/capture-shots.mjs`.
   Captures every live project and updates `shots.js`; cards and popups switch from icon covers to real screenshots automatically.
2. **Contact form → your inbox** — create a free form at formspree.io, copy the endpoint URL and paste it into
   `data-endpoint=""` on `<form id="cform">` in `index.html`. Until then the form opens a pre-filled email.

## What changed in V4
- Hero legible (outlined name behind the headline), frosted-glass nav, one terracotta + brass palette (loader/contact too)
- Character frames de-fringed (no grey halo) + soft shadow; work grid keeps clear of the character, solid cards
- Case-study popups, "open to internships" badge, role typer, cursor ring, magnetic buttons
- Skills tooltips ("where I used it"), visual journey timeline, working contact form, text-scramble labels, animated counters
