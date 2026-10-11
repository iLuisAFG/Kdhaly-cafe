/**
 * Kdhaly El Rincón del café - Hero Canvas Scroller
 * Implements smooth frame scrubbing with preloading, HiDPI scaling, and Emil Kowalski motion physics
 */

export class HeroCanvasScroller {
  constructor(options = {}) {
    this.canvas = document.getElementById(options.canvasId || 'hero-canvas');
    this.container = document.getElementById(options.containerId || 'hero-scroll-track');
    this.stickyWrap = document.getElementById(options.stickyId || 'hero-sticky');
    this.loader = document.getElementById(options.loaderId || 'hero-loader');
    this.loaderBar = document.getElementById(options.loaderBarId || 'loader-bar');
    this.loaderPercent = document.getElementById(options.loaderPercentId || 'loader-percent');
    
    // Elements to animate along scroll
    this.heroTitle = document.getElementById('hero-title');
    this.badgeLeft = document.getElementById('hero-badge-left');
    this.badgeRight = document.getElementById('hero-badge-right');
    this.scrollIndicator = document.getElementById('scroll-indicator');
    this.sleeveNameEl = document.getElementById('sleeve-custom-text');

    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.totalFrames = 240;
    this.frames = new Array(this.totalFrames);
    this.loadedCount = 0;
    this.isLoaded = false;
    
    // Scrub physics
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.lastRenderedIndex = -1;
    this.lerpFactor = 0.085; // Emil Kowalski responsive smooth easing

    this.init();
  }

  async init() {
    if (!this.canvas || !this.ctx || !this.container) {
      console.warn('Hero canvas elements not found');
      return;
    }

    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
    
    // Start asynchronous frame preloading
    this.preloadFrames();
    
    // Setup scroll tracking
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Start RAF render loop
    this.rafLoop();
  }

  handleResize() {
    if (!this.canvas) return;
    const rect = this.stickyWrap ? this.stickyWrap.getBoundingClientRect() : this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.displayWidth = rect.width || window.innerWidth;
    this.displayHeight = rect.height || window.innerHeight;
    
    this.canvas.width = this.displayWidth * dpr;
    this.canvas.height = this.displayHeight * dpr;
    
    this.ctx.resetTransform?.();
    this.ctx.scale(dpr, dpr);
    
    if (this.lastRenderedIndex >= 0 && this.frames[this.lastRenderedIndex]) {
      this.renderFrame(this.lastRenderedIndex, true);
    }
  }

  getFrameUrl(index) {
    const padded = String(index + 1).padStart(3, '0');
    return `/assets/hero-frames/frame_${padded}.webp`;
  }

  async preloadFrames() {
    const batchSize = 12; // Load in smooth staggered batches
    const loadPromises = [];

    for (let i = 0; i < this.totalFrames; i++) {
      const img = new Image();
      img.src = this.getFrameUrl(i);
      
      const p = new Promise((resolve) => {
        img.onload = () => {
          this.frames[i] = img;
          this.loadedCount++;
          this.updateLoaderProgress();
          
          // Render initial frame as soon as first frame is ready
          if (i === 0 && this.lastRenderedIndex === -1) {
            this.renderFrame(0);
          }
          resolve(true);
        };
        img.onerror = () => {
          // Fallback to relative path if served directly
          const fallback = new Image();
          const padded = String(i + 1).padStart(3, '0');
          fallback.src = `./assets/hero-frames/frame_${padded}.webp`;
          fallback.onload = () => {
            this.frames[i] = fallback;
            this.loadedCount++;
            this.updateLoaderProgress();
            resolve(true);
          };
          fallback.onerror = () => {
            resolve(false);
          };
        };
      });
      loadPromises.push(p);
    }

    await Promise.all(loadPromises);
    this.isLoaded = true;
    this.finishLoading();
  }

  updateLoaderProgress() {
    const pct = Math.floor((this.loadedCount / this.totalFrames) * 100);
    if (this.loaderBar) {
      this.loaderBar.style.width = `${pct}%`;
    }
    if (this.loaderPercent) {
      this.loaderPercent.textContent = `${pct}%`;
    }
    
    // Once 80% is ready, we can already unlock smooth interaction
    if (pct >= 80 && !this.isUnlocked) {
      this.isUnlocked = true;
      this.finishLoading();
    }
  }

  finishLoading() {
    if (this.loader && !this.loaderHidden) {
      this.loaderHidden = true;
      setTimeout(() => {
        this.loader.style.opacity = '0';
        this.loader.style.transition = 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => {
          this.loader.style.display = 'none';
        }, 520);
      }, 300);
    }
  }

  onScroll() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    const scrollDistance = this.container.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;
    
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));
    this.targetProgress = progress;
  }

  rafLoop() {
    // Emil Kowalski smooth interpolation
    const diff = this.targetProgress - this.currentProgress;
    if (Math.abs(diff) > 0.0001) {
      this.currentProgress += diff * this.lerpFactor;
    } else {
      this.currentProgress = this.targetProgress;
    }

    const frameIndex = Math.min(
      this.totalFrames - 1,
      Math.max(0, Math.round(this.currentProgress * (this.totalFrames - 1)))
    );

    if (frameIndex !== this.lastRenderedIndex) {
      this.renderFrame(frameIndex);
      this.updateOverlays(this.currentProgress);
    }

    requestAnimationFrame(() => this.rafLoop());
  }

  renderFrame(index, force = false) {
    if (!this.ctx || (!force && index === this.lastRenderedIndex)) return;
    const img = this.frames[index];
    if (!img || !img.complete) return;

    this.lastRenderedIndex = index;
    const w = this.displayWidth;
    const h = this.displayHeight;

    this.ctx.clearRect(0, 0, w, h);

    // Responsive aspect ratio scaling
    // Image base: 1280x720
    const imgW = img.width || 1280;
    const imgH = img.height || 720;
    
    // Prominent fit: scale to comfortably occupy screen while keeping cup centered
    const scale = Math.min(w / imgW, h / imgH) * (w < 768 ? 1.45 : 1.18);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    
    // Position slightly lower on desktop so title fits above
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2 + (w < 768 ? 20 : 40);

    this.ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }

  updateOverlays(progress) {
    // 0.0 -> 0.35: Hero title is prominent
    // > 0.35: Smoothly fades and shifts up
    if (this.heroTitle) {
      const fadeStart = 0.15;
      const fadeEnd = 0.55;
      let opacity = 1;
      let translateY = 0;
      
      if (progress > fadeStart) {
        const factor = (progress - fadeStart) / (fadeEnd - fadeStart);
        opacity = Math.max(0, 1 - factor);
        translateY = -factor * 60; // Emil Kowalski: subtle translation avoids sudden shifts
      }
      
      this.heroTitle.style.opacity = opacity.toFixed(3);
      this.heroTitle.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    }

    // Side badges
    if (this.badgeLeft) {
      const leftOpacity = Math.max(0, 1 - progress * 2.5);
      this.badgeLeft.style.opacity = leftOpacity.toFixed(3);
      this.badgeLeft.style.transform = `translate3d(${-progress * 40}px, 0, 0)`;
    }
    if (this.badgeRight) {
      const rightOpacity = Math.max(0, 1 - progress * 2.5);
      this.badgeRight.style.opacity = rightOpacity.toFixed(3);
      this.badgeRight.style.transform = `translate3d(${progress * 40}px, 0, 0)`;
    }

    // Scroll indicator fades out immediately on first scroll
    if (this.scrollIndicator) {
      const indOpacity = Math.max(0, 1 - progress * 4);
      this.scrollIndicator.style.opacity = indOpacity.toFixed(3);
    }
  }
}
