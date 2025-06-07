document.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const offset = window.pageYOffset;
  hero.style.backgroundPositionY = offset * 0.5 + 'px';
  hero.style.opacity = Math.max(1 - offset / 300, 0.3);
});
