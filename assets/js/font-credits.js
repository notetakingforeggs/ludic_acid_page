document.querySelectorAll('.font-credits').forEach(credits => {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  credits.addEventListener('pointerenter', () => {
    if (canHover.matches) credits.open = true;
  });
  credits.addEventListener('pointerleave', () => {
    if (canHover.matches && !credits.contains(document.activeElement)) credits.open = false;
  });
  credits.addEventListener('focusout', event => {
    if (!credits.contains(event.relatedTarget)) credits.open = false;
  });
  document.addEventListener('click', event => {
    if (!credits.contains(event.target)) credits.open = false;
  });
  credits.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      credits.open = false;
      credits.querySelector('summary').focus();
    }
  });
});
