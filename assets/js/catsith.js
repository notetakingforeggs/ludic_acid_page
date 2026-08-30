const heroVideo = document.querySelector(".hero video");

if (heroVideo && window.matchMedia("(max-width: 768px)").matches) {
  heroVideo.innerHTML = `
    <source src="https://assets.ludicacid.com/images/background-mobile.mp4" type="video/mp4">
    <source src="https://assets.ludicacid.com/images/background-mobile.webm" type="video/webm">
  `;
  heroVideo.load();
}

document.querySelectorAll(".carousel").forEach((carousel) => {
  let direction = 1;
  let timer;

  function hop() {
    const card = carousel.querySelector(".testimonial");
    const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
    carousel.scrollBy({ left: (card.offsetWidth + gap) * direction, behavior: "smooth" });

    window.setTimeout(() => {
      const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1;
      const atStart = carousel.scrollLeft <= 0;
      if (atEnd || atStart) direction *= -1;
    }, 600);
  }

  function startCarousel() {
    window.clearInterval(timer);
    timer = window.setInterval(hop, 3500);
  }

  startCarousel();
  carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
  carousel.addEventListener("mouseleave", startCarousel);
});

const sections = Array.from(document.querySelectorAll(".content-section"));

sections.forEach((section) => {
  if (section.id !== "about") section.classList.add("collapsed");
});

function openSection(id) {
  sections.forEach((section) => {
    const opening = section.id === id;
    section.classList.toggle("collapsed", !opening);
    if (opening) section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    if (!document.getElementById(targetId)) return;
    event.preventDefault();
    openSection(targetId);
  });
});

sections.forEach((section) => {
  const heading = section.querySelector("h2");
  if (!heading) return;

  heading.addEventListener("click", () => {
    if (section.classList.contains("collapsed")) openSection(section.id);
    else section.classList.add("collapsed");
  });
});

document.getElementById("scroll-cue")?.addEventListener("click", () => openSection("about"));
