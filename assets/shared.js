/* assets/shared.js — Ludic Acid shared scripts */

(function () {
  var burger   = document.getElementById('burger');
  var navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.toggle('show');
  });

  document.addEventListener('click', function () {
    navLinks.classList.remove('show');
  });

  navLinks.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}());
