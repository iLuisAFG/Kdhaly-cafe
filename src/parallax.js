/**
 * Parallax and floating micro-motion controller
 * Follows Emil Kowalski guidelines: subtle, composite-only transforms, lerp physics
 */

export function setupParallax() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return;

  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isTouch) return;

  const floatingItems = document.querySelectorAll('[data-parallax-speed]');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const LERP = 0.05;

  window.addEventListener('mousemove', (e) => {
    // Normalized coordinates (-1 to 1)
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function tick() {
    currentX += (mouseX - currentX) * LERP;
    currentY += (mouseY - currentY) * LERP;

    floatingItems.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || '15');
      const rotate = parseFloat(el.getAttribute('data-parallax-rotate') || '0');
      const offsetX = currentX * speed;
      const offsetY = currentY * speed;
      
      el.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) rotate(${rotate}deg)`;
    });

    requestAnimationFrame(tick);
  }

  tick();
}
