const slides = [...document.querySelectorAll('.hero-image')];
const controls = document.querySelector('.carousel-controls');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentSlide = 0;
let paused = reducedMotion.matches;
let carouselTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === currentSlide);
    slide.setAttribute('aria-hidden', String(i !== currentSlide));
  });
  const isDocument = slides[currentSlide].hasAttribute('data-document-slide');
  document.querySelector('.hero').classList.toggle('is-document', isDocument);
  document.querySelector('.document-link').hidden = !isDocument;
  controls.querySelector('[data-slide-count]').textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}
function scheduleSlide() {
  window.clearTimeout(carouselTimer);
  if (!paused && !document.hidden) {
    const delay = slides[currentSlide].hasAttribute('data-document-slide') ? 20000 : 6500;
    carouselTimer = window.setTimeout(() => { showSlide(currentSlide + 1); scheduleSlide(); }, delay);
  }
}
function updatePause() {
  const button = controls.querySelector('[data-pause]');
  button.textContent = paused ? 'Play' : 'Pause';
  button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} background slideshow`);
  scheduleSlide();
}
if (slides.length && controls) {
  controls.hidden = false;
  controls.querySelector('[data-previous]').addEventListener('click', () => { showSlide(currentSlide - 1); scheduleSlide(); });
  controls.querySelector('[data-next]').addEventListener('click', () => { showSlide(currentSlide + 1); scheduleSlide(); });
  controls.querySelector('[data-pause]').addEventListener('click', () => { paused = !paused; updatePause(); });
  reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updatePause(); });
  document.addEventListener('visibilitychange', scheduleSlide);
  updatePause();
}

const sections = [...document.querySelectorAll('.content-section')];
function setSection(section, open) {
  section.classList.toggle('is-collapsed', !open);
  section.querySelector('.section-toggle').setAttribute('aria-expanded', String(open));
  section.querySelector('.section-body').hidden = !open;
}
function openSection(id) {
  const section = sections.find(item => item.id === id || item.contains(document.getElementById(id)));
  if (!section) return;
  sections.forEach(item => setSection(item, item === section));
}
sections.forEach(section => {
  setSection(section, section.id === 'about');
  section.querySelector('.section-toggle').addEventListener('click', () => {
    const opening = section.classList.contains('is-collapsed');
    if (opening) openSection(section.id);
    else setSection(section, false);
  });
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => openSection(link.hash.slice(1)));
});
window.addEventListener('hashchange', () => openSection(location.hash.slice(1)));
if (location.hash) openSection(location.hash.slice(1));

const discussionGallery = document.querySelector('[data-discussion-gallery]');
if (discussionGallery) {
  const track = discussionGallery.querySelector('[data-discussion-track]');
  const cards = [...track.querySelectorAll('figure')];
  const previous = discussionGallery.querySelector('[data-discussion-previous]');
  const next = discussionGallery.querySelector('[data-discussion-next]');
  const count = discussionGallery.querySelector('[data-discussion-count]');
  let galleryFrame;
  const updateGalleryControls = () => {
    if (!track.clientWidth) return;
    const trackLeft = track.getBoundingClientRect().left;
    const current = cards.reduce((closest, card, index) => (
      Math.abs(card.getBoundingClientRect().left - trackLeft) < closest.distance
        ? { index, distance: Math.abs(card.getBoundingClientRect().left - trackLeft) }
        : closest
    ), { index: 0, distance: Infinity }).index;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previous.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
  };
  const scrollGallery = direction => {
    const card = cards[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || track.clientWidth) + gap), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };
  previous.addEventListener('click', () => scrollGallery(-1));
  next.addEventListener('click', () => scrollGallery(1));
  track.addEventListener('scroll', () => {
    window.cancelAnimationFrame(galleryFrame);
    galleryFrame = window.requestAnimationFrame(updateGalleryControls);
  }, { passive: true });
  window.addEventListener('resize', updateGalleryControls);
  new ResizeObserver(updateGalleryControls).observe(track);
  updateGalleryControls();
}
