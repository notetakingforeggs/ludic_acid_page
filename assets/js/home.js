const carousel = document.querySelector("[data-project-carousel]");

if (carousel) {
  const slides = [...carousel.querySelectorAll("[data-project-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let rotation;
  let pointerInside = false;
  let focusInside = false;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.querySelector("a").tabIndex = isActive ? 0 : -1;
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === activeIndex));
    });
  }

  function stopRotation() {
    window.clearInterval(rotation);
  }

  function startRotation() {
    stopRotation();
    if (!reducedMotion.matches && !document.hidden && !pointerInside && !focusInside) {
      rotation = window.setInterval(() => showSlide(activeIndex + 1), 5000);
    }
  }

  carousel.querySelector("[data-carousel-previous]")?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startRotation();
  });
  carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startRotation();
  });
  dots.forEach((dot) => dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.carouselDot));
    startRotation();
  }));

  carousel.addEventListener("pointerenter", () => {
    pointerInside = true;
    stopRotation();
  });
  carousel.addEventListener("pointerleave", () => {
    pointerInside = false;
    startRotation();
  });
  carousel.addEventListener("focusin", () => {
    focusInside = true;
    stopRotation();
  });
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      focusInside = false;
      startRotation();
    }
  });
  document.addEventListener("visibilitychange", startRotation);
  reducedMotion.addEventListener("change", startRotation);
  startRotation();
}

const submenuButton = document.querySelector("[data-submenu-button]");
const submenu = document.querySelector("[data-submenu]");

if (submenuButton && submenu) {
  submenuButton.addEventListener("click", () => {
    const willOpen = submenuButton.getAttribute("aria-expanded") !== "true";
    submenuButton.setAttribute("aria-expanded", String(willOpen));
    submenu.hidden = !willOpen;
  });
}
