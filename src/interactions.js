/**
 * Menu filtering, testimonial slider, mobile drawer, and newsletter feedback
 */

export function setupInteractions() {
  setupMenuFilter();
  setupTestimonialSlider();
  setupMobileNav();
  setupNewsletter();
}

function setupMenuFilter() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const items = document.querySelectorAll('.menu-item-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      // Update active tab styling
      tabs.forEach((t) => {
        t.classList.remove('bg-forest-800', 'text-cream-100');
        t.classList.add('bg-cream-200', 'text-forest-900');
      });
      tab.classList.remove('bg-cream-200', 'text-forest-900');
      tab.classList.add('bg-forest-800', 'text-cream-100');

      // Filter items
      items.forEach((item) => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px) scale(0.98)';
          void item.offsetWidth;
          item.style.transition = 'opacity 250ms cubic-bezier(0.23, 1, 0.32, 1), transform 250ms cubic-bezier(0.23, 1, 0.32, 1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0) scale(1)';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function setupTestimonialSlider() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('btn-prev-testimonial');
  const nextBtn = document.getElementById('btn-next-testimonial');
  const cards = document.querySelectorAll('.testimonial-slide');
  
  if (!track || cards.length === 0) return;

  let currentIndex = 0;
  const maxIndex = cards.length - 1;

  function updateSlide(index) {
    currentIndex = Math.max(0, Math.min(maxIndex, index));
    const offset = currentIndex * 100;
    track.style.transform = `translateX(-${offset}%)`;
    track.style.transition = 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1)';

    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
    if (nextBtn) nextBtn.style.opacity = currentIndex === maxIndex ? '0.4' : '1';
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }

  // Mobile touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        updateSlide(currentIndex + 1);
      } else {
        updateSlide(currentIndex - 1);
      }
    }
  }, { passive: true });

  updateSlide(0);
}

function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-menu-drawer');
  const links = document.querySelectorAll('.mobile-nav-link');
  let isOpen = false;

  if (!toggleBtn || !menu) return;

  function toggle() {
    isOpen = !isOpen;
    if (isOpen) {
      menu.classList.remove('hidden');
      void menu.offsetWidth;
      menu.classList.add('opacity-100', 'translate-y-0');
      menu.classList.remove('opacity-0', '-translate-y-4');
    } else {
      menu.classList.add('opacity-0', '-translate-y-4');
      menu.classList.remove('opacity-100', 'translate-y-0');
      setTimeout(() => {
        if (!isOpen) menu.classList.add('hidden');
      }, 250);
    }
  }

  toggleBtn.addEventListener('click', toggle);
  links.forEach((l) => l.addEventListener('click', () => {
    isOpen = true;
    toggle();
  }));
}

function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const feedback = document.getElementById('newsletter-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      form.classList.add('hidden');
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.textContent = `¡Bienvenido al club, ${input.value}! Revisa tu bandeja de entrada para recibir tu primer obsequio de café.`;
      }
    }
  });
}
