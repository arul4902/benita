/**
 * Benita Makeup Academy - Instagram Story Highlights Inspector
 */
const storyHighlightsData = {
  christian: {
    title: 'Christian Bridal Highlights',
    icon: 'assets/highlights/christian.svg',
    image: 'assets/christian_bride.jpg',
    summary: 'Spotlight on Christian bridal transformations, delicate lace veils, pure white gown styling, and dewy radiant glass-skin finishes for church weddings in Hyderabad.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  product: {
    title: 'Product Knowledge & Luxury Kit',
    icon: 'assets/highlights/product.svg',
    image: 'assets/hero_bridal.jpg',
    summary: 'Detailed look at the international cosmetic products taught and utilized at Benita Makeup Academy — including MAC, Huda Beauty, NARS, Charlotte Tilbury, Bobbi Brown, and Kryolan.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  certification: {
    title: 'ISO Certification & Convocation',
    icon: 'assets/highlights/certification.svg',
    image: 'assets/academy_course_15.svg',
    summary: 'Official student graduation ceremonies, ISO certified certificate presentations, and lifetime artist identification cards awarded upon course completion.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  seminar: {
    title: 'Seminars & Masterclasses',
    icon: 'assets/highlights/seminar.svg',
    image: 'assets/academy_course_20.svg',
    summary: 'Live stage demonstrations, beauty conventions, and mega seminars conducted across Hyderabad with hands-on learning for hundreds of aspiring artists.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  hairstyle: {
    title: 'Hairstyle Class (20+ Techniques)',
    icon: 'assets/highlights/hairstyle.svg',
    image: 'assets/after_transform.jpg',
    summary: 'Comprehensive hairstyling training covering 20+ techniques: Russian textured buns, international braids, poola jada, flower making, and hot tool mastery.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  portfolio: {
    title: 'Client Transformations Portfolio',
    icon: 'assets/highlights/portfolio.svg',
    image: 'assets/reception_glam.jpg',
    summary: 'Real bride and client transformations across Telugu Muhurtham, modern evening receptions, Sangeet parties, and saree ceremonies.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  },
  nnsm: {
    title: 'NNSM Recognitions & Industry Events',
    icon: 'assets/highlights/nnsm.svg',
    image: 'assets/cinema_badge.svg',
    summary: 'National and regional beauty associations, industry conventions, jury recognitions, and 18+ years of cinema industry awards.',
    link: 'https://www.instagram.com/benitamakeupacademy/'
  }
};

function openStoryHighlight(key) {
  const dialog = document.getElementById('story-dialog');
  if (!dialog) return;

  const data = storyHighlightsData[key] || storyHighlightsData.christian;

  document.getElementById('story-modal-title').textContent = data.title;
  document.getElementById('story-modal-img').src = data.image;
  document.getElementById('story-modal-img').alt = data.title;
  document.getElementById('story-modal-desc').textContent = data.summary;
  document.getElementById('story-modal-insta-link').href = data.link;

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

function closeStoryHighlight() {
  const dialog = document.getElementById('story-dialog');
  if (dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
}

function initStoryHighlights() {
  const dialog = document.getElementById('story-dialog');
  if (!dialog) return;

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeStoryHighlight();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (dialog.open && e.key === 'Escape') {
      closeStoryHighlight();
    }
  });
}

document.addEventListener('DOMContentLoaded', initStoryHighlights);
