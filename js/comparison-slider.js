/**
 * Benita Makeup Academy - Accessible Before/After Image Comparison Slider
 */
function initComparisonSlider() {
  const container = document.querySelector('.slider-container');
  const beforeWrap = document.querySelector('.slider-img-before-wrap');
  const beforeImg = document.querySelector('.slider-img-before');
  const handle = document.querySelector('.slider-handle');
  const rangeInput = document.querySelector('.slider-range-input');

  if (!container || !beforeWrap || !handle) return;

  function updateSlider(percentage) {
    // Clamp between 0 and 100
    const clamped = Math.max(0, Math.min(100, percentage));
    beforeWrap.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    if (rangeInput) rangeInput.value = clamped;
  }

  // Adjust inner image width to match container width on resize
  function resizeSlider() {
    const width = container.offsetWidth;
    if (beforeImg) {
      beforeImg.style.width = `${width}px`;
    }
  }

  window.addEventListener('resize', resizeSlider);
  resizeSlider();

  // Range input event (accessible keyboard + mobile fallback)
  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      updateSlider(parseFloat(e.target.value));
    });
  }

  // Mouse / Touch drag interaction
  let isDragging = false;

  function onPointerMove(e) {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    updateSlider(percentage);
  }

  function onPointerStart(e) {
    isDragging = true;
    onPointerMove(e);
  }

  function onPointerEnd() {
    isDragging = false;
  }

  container.addEventListener('mousedown', onPointerStart);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerEnd);

  container.addEventListener('touchstart', onPointerStart, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerEnd);

  // Initialize at 50%
  updateSlider(50);
}

document.addEventListener('DOMContentLoaded', initComparisonSlider);
