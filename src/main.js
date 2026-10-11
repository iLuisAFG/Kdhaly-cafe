import Lenis from 'lenis';
import { HeroCanvasScroller } from './canvas-hero.js';
import { setupParallax } from './parallax.js';
import { setupInteractions } from './interactions.js';
import { setupOrderModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Initialize Hero Canvas Scroller
  const heroScroller = new HeroCanvasScroller({
    canvasId: 'hero-canvas',
    containerId: 'hero-scroll-track',
    stickyId: 'hero-sticky',
    loaderId: 'hero-loader',
    loaderBarId: 'loader-bar',
    loaderPercentId: 'loader-percent',
  });

  // Connect Lenis scroll callback to canvas scrub
  lenis.on('scroll', () => {
    heroScroller.onScroll();
  });

  // 3. Initialize Parallax Effects
  setupParallax();

  // 4. Initialize Interactive UI Components
  setupInteractions();

  // 5. Initialize Quick Order Modal
  setupOrderModal();

  console.log('Kdhaly El Rincón del café Experience initialized successfully.');
});
