import confetti from 'canvas-confetti';

export function setupOrderModal() {
  const modal = document.getElementById('order-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const panel = document.getElementById('modal-panel');
  const closeBtn = document.getElementById('btn-close-modal');
  const openButtons = document.querySelectorAll('[data-open-order]');
  const form = document.getElementById('order-form');
  const orderSuccess = document.getElementById('order-success');
  const resetOrderBtn = document.getElementById('btn-reset-order');

  if (!modal || !panel) return;

  function openModal(preselectedItem = '') {
    modal.classList.remove('hidden');
    // Force browser reflow to allow transition from starting style
    void modal.offsetWidth;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (preselectedItem) {
      const select = document.getElementById('order-item-select');
      if (select) {
        select.value = preselectedItem;
      }
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.classList.add('hidden');
      if (orderSuccess) orderSuccess.classList.add('hidden');
      if (form) form.classList.remove('hidden');
    }, 280);
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const item = btn.getAttribute('data-item') || '';
      openModal(item);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form) form.classList.add('hidden');
      if (orderSuccess) orderSuccess.classList.remove('hidden');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#1A3B2B', '#8B5A2B', '#C28B47', '#F7F4EB'],
      });
    });
  }

  if (resetOrderBtn) {
    resetOrderBtn.addEventListener('click', () => {
      closeModal();
    });
  }
}
