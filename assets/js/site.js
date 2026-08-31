const burger = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector("[data-menu]");

if (burger && navLinks) {
  function closeMenu() {
    navLinks.classList.remove("show");
    burger.setAttribute("aria-expanded", "false");
    navLinks.querySelectorAll("[data-submenu-button]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
    navLinks.querySelectorAll("[data-submenu]").forEach((submenu) => {
      submenu.hidden = true;
    });
  }

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navLinks.classList.toggle("show");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", closeMenu);
  navLinks.addEventListener("click", (event) => event.stopPropagation());
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}
