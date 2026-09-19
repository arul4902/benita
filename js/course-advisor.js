/**
 * Benita Makeup Academy - Course Comparison & Academy Advisor
 */
function initCourseAdvisor() {
  const talkBtn = document.getElementById('btn-talk-academy');
  if (talkBtn) {
    talkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '919652050987';
      const message = encodeURIComponent(
        "Hi Benita Makeup Academy,\nI'm interested in your professional makeup course.\nCould you help me choose the right course?"
      );
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
  }
}

document.addEventListener('DOMContentLoaded', initCourseAdvisor);
