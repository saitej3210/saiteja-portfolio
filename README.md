# Kodi Saiteja — Cinematic Portfolio Premium V2.1

A responsive static HTML/CSS/JavaScript portfolio, upgraded in place around the original 240 transparent WebP character frames. The character animation, frame names and portfolio identity are preserved. No build step, framework, or API key is needed.

## Premium upgrades
- Original 240-frame scroll-scrubbed character animation retained
- High-quality canvas smoothing and device-pixel-ratio rendering for crisp desktop/mobile display
- Responsive layouts for desktop, tablet and small phones
- Sticky navigation with mobile menu and active section state
- Scroll progress bar and back-to-top button
- Light/dark theme toggle; remembers the selection in this browser
- Project category filters (All, Web apps, AI/tools, Business)
- Scroll reveal, hover polish, animated skills orbit and reduced-motion support
- Downloadable résumé PDF included under `assets/`
- Copy-email button with visible success feedback
- Direct project demos, GitHub, LinkedIn and NOVARYX Studio links
- Accessible button labels and mobile-friendly tap targets

## Run on Windows
1. Extract the ZIP completely; do not run the site from inside the ZIP.
2. Open the extracted `saiteja-portfolio` folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. If the old version is cached, press `Ctrl + F5`.

## Safely replace your existing project
Use `REPLACE-WINDOWS.ps1` from PowerShell after downloading this ZIP into your Downloads folder. It creates a backup before replacing files. If your project folder or ZIP is in a different location, edit the variables at the top of that script first.

## Image clarity note
The character is rendered from the original 1600×900 transparent WebP frames. The canvas uses high-quality image smoothing and a device-pixel ratio capped at 2 for sharp rendering without excessive GPU load. The source frames are preserved without recompression. A website cannot recover detail that is not present in the original source frames, but it should avoid unnecessary browser blur/scaling.

## Edit your details
- Text and links: `index.html`
- Colours, typography and layout: `style.css`
- Character animation and interactions: `script.js`
- Character frames: `assets/frames/f000.webp` through `f239.webp` (do not rename)
