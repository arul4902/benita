/**
 * Benita Makeup Academy - Smart WhatsApp Enquiry Dispatchers
 * Verified Numbers:
 * - Bridal Desk: 8688106490 (from verified bridal promo post)
 * - Academy & General: 9652050987 (from verified profile)
 */

const BRIDAL_PHONE = '918688106490';
const ACADEMY_PHONE = '919652050987';

function openBridalEnquiry(presetService = '') {
  const dialog = document.getElementById('bridal-enquiry-dialog');
  if (!dialog) return;

  const serviceInput = document.getElementById('bridal-service-input');
  if (serviceInput && presetService) {
    serviceInput.value = presetService;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

function closeBridalEnquiry() {
  const dialog = document.getElementById('bridal-enquiry-dialog');
  if (dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
}

function openAcademyEnquiry(presetCourse = '') {
  const dialog = document.getElementById('academy-enquiry-dialog');
  if (!dialog) return;

  const courseInput = document.getElementById('academy-course-input');
  if (courseInput && presetCourse) {
    courseInput.value = presetCourse;
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

function closeAcademyEnquiry() {
  const dialog = document.getElementById('academy-enquiry-dialog');
  if (dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
}

function initWhatsAppDispatchers() {
  // 1. Bridal Form Submission
  const bridalForm = document.getElementById('bridal-enquiry-form');
  if (bridalForm) {
    bridalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bridal-name').value.trim() || 'Bride';
      const phone = document.getElementById('bridal-phone').value.trim() || 'Not specified';
      const event = document.getElementById('bridal-event').value || 'Wedding';
      const date = document.getElementById('bridal-date').value || 'Upcoming Date';
      const location = document.getElementById('bridal-location').value.trim() || 'Hyderabad';
      const service = document.getElementById('bridal-service-input').value || 'HD Bridal Signature Makeup';

      const messageText = 
`Hi Benita Makeup Academy 👋
I'm interested in bridal makeup.

Name: ${name}
Phone: ${phone}
Event: ${event}
Date: ${date}
Location: ${location}
Service: ${service}

Could you please confirm availability and details?`;

      const encoded = encodeURIComponent(messageText);
      window.open(`https://wa.me/${BRIDAL_PHONE}?text=${encoded}`, '_blank');
      closeBridalEnquiry();
    });
  }

  // 2. Academy Form Submission
  const academyForm = document.getElementById('academy-enquiry-form');
  if (academyForm) {
    academyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('academy-name').value.trim() || 'Student';
      const phone = document.getElementById('academy-phone').value.trim() || 'Not specified';
      const course = document.getElementById('academy-course-input').value || '20-Day Extended Professional Makeup Course';
      const batch = document.getElementById('academy-batch').value || 'Ask About The Next Batch';
      const exp = document.getElementById('academy-exp').value || 'Complete Beginner';

      const messageText = 
`Hi Benita Makeup Academy 👋
I'm interested in joining your professional makeup course.

Name: ${name}
Phone: ${phone}
Course: ${course}
Preferred Batch: ${batch}
Experience: ${exp}

Please share the next batch details.`;

      const encoded = encodeURIComponent(messageText);
      window.open(`https://wa.me/${ACADEMY_PHONE}?text=${encoded}`, '_blank');
      closeAcademyEnquiry();
    });
  }

  // Modal Backdrop Click Listeners
  const bridalDialog = document.getElementById('bridal-enquiry-dialog');
  if (bridalDialog) {
    bridalDialog.addEventListener('click', (e) => {
      const rect = bridalDialog.getBoundingClientRect();
      const isIn = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isIn) closeBridalEnquiry();
    });
  }

  const academyDialog = document.getElementById('academy-enquiry-dialog');
  if (academyDialog) {
    academyDialog.addEventListener('click', (e) => {
      const rect = academyDialog.getBoundingClientRect();
      const isIn = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isIn) closeAcademyEnquiry();
    });
  }
}

document.addEventListener('DOMContentLoaded', initWhatsAppDispatchers);
