# Ludic Acid website

A dependency-free static website built with plain HTML, CSS, and JavaScript.

## Structure

- `index.html` — homepage and project links
- `about/index.html` — minimal About desktop and notes viewer
- `people/index.html` — core team and external collaborator links
- `jonah/index.html` — responsive Jonah Russell profile and selected CV
- `catsith/index.html` — Cat Sith production page
- `newprojectmedia/index.html` — supporting media page
- `assets/css/site.css` — shared navigation, typography, and base styles
- `assets/js/site.js` — shared menu behaviour
- `assets/js/catsith.js` — Cat Sith page interactions
- `notes.md` — working notes displayed from the About page

Large videos are served from `assets.ludicacid.com` and must not be committed to
this repository. Images, the local font, and the touring pack remain under
`assets/`.

Run locally with any static file server, for example:

```sh
python3 -m http.server 8000
```
