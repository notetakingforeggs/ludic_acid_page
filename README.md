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

## Raft

`raft/index.html`, `assets/css/raft.css` and `assets/js/raft.js` provide the
Second Sight-style gallery and folding About / Press / Team sections, retaining
Raft's Flor de Ruina font. The gallery uses the server's
`/images/raft/raftuse/1.jpg` through `9.jpg`, then `99.jpg`, in numeric order.
`/images/raft/standardraftpoem.jpg` is appended as a fully contained final slide
and repeated in Press. The file currently contains a newspaper diary clipping;
it is labelled as a clipping rather than a transcribed poem. The title overlay
is hidden on this slide and its autoplay interval is extended to 20 seconds.

About and Team are intentionally lorem ipsum. Press includes a horizontally
scrolling gallery of the 21 discussion screenshots in
`/images/raft/raftscreenshots/`; it shows multiple uncropped cards on wider
screens and one swipeable card at a time on mobile. The letter before claim
remains a placeholder until the material is supplied.

Press research, checked 6 September 2026:

- [Evening Standard, 5 February 2018](https://www.standard.co.uk/news/london/pair-forced-out-of-floating-wendy-house-with-a-roof-made-out-of-foxtons-for-sale-signs-a3757936.html): report by Barney Davis and Jonathan Prynn.
- [Makery, 6 March 2018](https://www.makery.info/en/2018/03/06/artistes-a-leau-histoire-dembarcations-pirates/): Rob La Frenais's article opens with the raft and identifies its author as an independent curator. This is a likely match for the remembered curator post. The French edition is linked alongside it.
- [Property Industry Eye, 6 February 2018](https://propertyindustryeye.com/floating-house-made-from-estate-agents-for-sale-boards-torn-down/): Neil Gerrard's follow-up, drawing on the Standard report.

Broader searches for Foxtons / raft / floating Wendy house / Regent's Canal,
and searches within ianVisits, did not establish additional distinct coverage.
The contemporary reports attribute construction to Max Bloom and Stephen Watt;
these reported names have not been used to fill in the project's team credits.
