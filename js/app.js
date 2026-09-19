/**
 * Benita Makeup Academy - Main App Coordinator
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.site-header');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    toggleBtn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    toggleBtn.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Portfolio Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Contextual Mobile Sticky Bar Switcher
  const mobileBar = document.getElementById('mobile-sticky-bar');
  const stickyBtn = document.getElementById('sticky-cta-btn');
  const stickyTitle = document.getElementById('sticky-cta-title');
  const stickySub = document.getElementById('sticky-cta-sub');

  const bridalSection = document.getElementById('bridal');
  const academySection = document.getElementById('academy');

  if (mobileBar && stickyBtn && window.IntersectionObserver) {
    let currentMode = 'bridal';

    function setBridalMode() {
      if (currentMode === 'bridal') return;
      currentMode = 'bridal';
      stickyTitle.textContent = 'BRIDAL APPOINTMENTS';
      stickySub.textContent = 'Dates filling fast for 2026-27';
      stickyBtn.textContent = 'CHECK AVAILABILITY';
      stickyBtn.className = 'btn btn-wine btn-sm';
      stickyBtn.onclick = () => openBridalEnquiry();
    }

    function setAcademyMode() {
      if (currentMode === 'academy') return;
      currentMode = 'academy';
      stickyTitle.textContent = 'PROFESSIONAL ACADEMY';
      stickySub.textContent = 'Limited to 20 seats per batch';
      stickyBtn.textContent = 'JOIN NEXT BATCH';
      stickyBtn.className = 'btn btn-primary btn-sm';
      stickyBtn.onclick = () => openAcademyEnquiry();
    }

    const academyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAcademyMode();
        } else {
          // If scrolled above academy, revert to bridal
          if (entry.boundingClientRect.top > 0) {
            setBridalMode();
          }
        }
      });
    }, { threshold: 0.15 });

    if (academySection) {
      academyObserver.observe(academySection);
    }
  }
});
