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

## Second Sight

The project page uses `assets/css/second-sight.css` and
`assets/js/second-sight.js`. Its hero rotates the four images in the order listed
in `second-sight/index.html`: feet, 0M8A3026, negtall, fhd-5. The second and
fourth images fit without vertical cropping and fade into black at the sides.
`fwd.jpg` is the team photograph. Media embeds YouTube video `4wDHJncDc10`
and `/images/second-sight/sharing.mp4` from the asset server.

The page-specific `second-sight/favicon.svg` adapts the [Lucide eye icon](https://github.com/lucide-icons/lucide/blob/main/icons/eye.svg) with a white eye, thin black outline and solid black pupil. Its license is in `second-sight/favicon-LICENSE.txt`.

Supporter logos are saved locally from their official sites:

- The Work Room: https://theworkroom.org.uk/assets/logos/theworkroom.png
- Kelburn Garden Party (undated wordmark): https://www.kelburngardenparty.com/wp-content/uploads/2026/05/sticky-nav-logo.svg

The Neverending Glen link points to https://www.neverendingglen.com/.
The About copy draws on the [Work Room residency announcement](https://theworkroom.org.uk/events/residency-sharing-with-jonah-russell-choreography-theatrical-acrobatics-an-xxxl-jumper).
