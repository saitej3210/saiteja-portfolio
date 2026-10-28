# Kodi Saiteja — Ultimate Cinematic Portfolio V3

A responsive static HTML/CSS/JavaScript portfolio built by upgrading the existing V2.1 project. The original 240 transparent WebP character frames are preserved at their original quality and filenames. No build step, framework, API key, or backend is required.

## What changed in V3
- Kept the original identity, content, project URLs, résumé, and 240-frame character animation.
- Refined desktop layout widths and text measure to reduce collisions and improve hierarchy.
- Added a dedicated compact-laptop/tablet navigation breakpoint so the navigation does not crowd the logo.
- Reworked tablet and mobile spacing, project cards, stats, timeline, contact area, and typography.
- Improved keyboard focus, Escape-to-close mobile navigation, and fallback behavior if IntersectionObserver is unavailable.
- Strengthened reduced-motion support, content contrast, canvas layering, and interaction feedback.
- Retained project filters, theme toggle, copy-email action, scroll progress, and back-to-top control.
- Included the résumé PDF and original character frame collection.

## Run on Windows
1. Download and extract `saiteja-portfolio-ultimate-v3.zip`.
2. Open the extracted `saiteja-portfolio` folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.
4. If an older version is cached, press `Ctrl + F5`.

## Safely update the existing project
Run `REPLACE-WINDOWS.ps1` from PowerShell after the ZIP has been downloaded to your Downloads folder. The script checks the expected paths and creates a backup before copying the updated files. If your folder differs, edit the variables at the top of the script first.

## Character image quality
The 240 original 1600×900 WebP frames are included without recompression. Canvas smoothing and device-pixel-ratio rendering remain enabled. The site avoids stretching the source aspect ratio; however, no browser-side technique can recover detail that is absent from the source frames.

## Edit details
- Content and links: `index.html`
- Colors, typography, layout, breakpoints: `style.css`
- Character animation and interactions: `script.js`
- Original frames: `assets/frames/f000.webp` through `f239.webp` — keep filenames unchanged.
