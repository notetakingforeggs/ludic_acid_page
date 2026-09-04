document.querySelectorAll("[data-media-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-media-slide]"));
  const previous = carousel.querySelector("[data-media-previous]");
  const next = carousel.querySelector("[data-media-next]");
  const status = carousel.querySelector("[data-media-status]");
  let current = 0;

  if (slides.length < 2 || !previous || !next) return;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === current;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
    });
    if (status) status.textContent = `${current + 1} / ${slides.length}`;
  }

  previous.addEventListener("click", () => showSlide(current - 1));
  next.addEventListener("click", () => showSlide(current + 1));
});
