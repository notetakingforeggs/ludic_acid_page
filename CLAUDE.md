# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static multi-page website for **Ludic Acid**, a theatre group. No build tools, no framework, no package manager — plain HTML, CSS, and JavaScript files served directly.

## Development

Open files directly in a browser or use any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

No build step, no compilation, no dependencies to install.

## Architecture

Three pages, each a self-contained HTML file with all styles and scripts inlined:

- `index.html` — Homepage with nav and link to Cat Sith production
- `catsith/index.html` — Main production page (~620 lines); the most complex file
- `newprojectmedia/index.html` — Media showcase with video grid

Shared assets live in `assets/`: custom font (`Lithops-Regular.woff`), images, videos, and a PDF touring pack.

## Key Patterns in `catsith/index.html`

- **Collapsible sections**: each `<section>` has a `<h2>` header that toggles `.open` on click via JS
- **Testimonial carousel**: auto-scrolls every 3.5s, ping-pongs direction at edges; uses CSS mask gradients for fade effect at edges
- **Responsive**: single breakpoint at `768px`; mobile gets a burger menu and a different background video
- **Video autoplay**: background video uses `muted playsinline autoplay loop`; iOS required additional JS workarounds (see recent commits)

## Styling Conventions

- Dark theme: `#140b0c` background, light text
- `Lithops-Regular.woff` (local) for headings; Inter (Google Fonts) for body
- Flexbox and CSS Grid for layout
- `backdrop-filter: blur()` on the sticky nav header
