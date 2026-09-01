const carousel = document.querySelector("[data-project-carousel]");

if (carousel) {
  const slides = [...carousel.querySelectorAll("[data-project-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let rotation;
  let pointerInside = false;
  let changeTimer;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const fadeDuration = 900;
  const blankInterval = 180;

  function showSlide(index) {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === activeIndex) return;

    window.clearTimeout(changeTimer);
    slides.forEach((slide, slideIndex) => {
      slide.classList.remove("is-active");
      slide.setAttribute("aria-hidden", "true");
      slide.querySelector("a").tabIndex = -1;
    });

    changeTimer = window.setTimeout(() => {
      activeIndex = nextIndex;
      const nextSlide = slides[activeIndex];
      nextSlide.classList.add("is-active");
      nextSlide.setAttribute("aria-hidden", "false");
      nextSlide.querySelector("a").tabIndex = 0;
      dots.forEach((dot, dotIndex) => {
        dot.setAttribute("aria-current", String(dotIndex === activeIndex));
      });
    }, reducedMotion.matches ? 0 : fadeDuration + blankInterval);
  }

  function stopRotation() {
    window.clearInterval(rotation);
  }

  function startRotation() {
    stopRotation();
    if (!reducedMotion.matches && !document.hidden && !pointerInside) {
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
    if (canHover.matches) {
      pointerInside = true;
      stopRotation();
    }
  });
  carousel.addEventListener("pointerleave", () => {
    if (canHover.matches) {
      pointerInside = false;
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
