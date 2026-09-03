document.querySelectorAll("[data-media-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-media-slide]"));
  const previous = carousel.querySelector("[data-media-previous]");
  const next = carousel.querySelector("[data-media-next]");
  const status = carousel.querySelector("[data-media-status]");
  let current = 0;
  let autoplay;
  let touchStartX = 0;

  if (slides.length < 2 || !previous || !next) return;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === current;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    if (status) status.textContent = `${current + 1} / ${slides.length}`;
  }

  function stopAutoplay() {
    window.clearInterval(autoplay);
  }

  function startAutoplay() {
    stopAutoplay();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoplay = window.setInterval(() => showSlide(current + 1), 5000);
    }
  }

  previous.addEventListener("click", () => {
    showSlide(current - 1);
    startAutoplay();
  });
  next.addEventListener("click", () => {
    showSlide(current + 1);
    startAutoplay();
  });
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);
  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  carousel.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) showSlide(current + (distance < 0 ? 1 : -1));
    startAutoplay();
  }, { passive: true });
  startAutoplay();
});
