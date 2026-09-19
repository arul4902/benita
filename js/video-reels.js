/**
 * Benita Makeup Academy - Interactive Video Reels Controller
 * Handles 9:16 Instagram Video Reels with smooth play/pause, sound toggle, and auto-pause
 */

function initVideoReels() {
  const reelCards = document.querySelectorAll('.reel-card');

  reelCards.forEach((card) => {
    const video = card.querySelector('.reel-video-element');
    const playBtn = card.querySelector('.reel-play-btn');
    const soundBtn = card.querySelector('.reel-sound-toggle');

    if (!video) return;

    // Toggle play / pause on card or play button click
    function togglePlay(e) {
      // Don't trigger if clicked sound toggle or external link
      if (e.target.closest('.reel-sound-toggle') || e.target.closest('.reel-insta-cta')) {
        return;
      }
      e.preventDefault();

      if (video.paused) {
        // Pause all other videos first
        document.querySelectorAll('.reel-video-element').forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
            v.closest('.reel-card')?.classList.remove('playing');
            const otherBtn = v.closest('.reel-card')?.querySelector('.reel-play-btn');
            if (otherBtn) otherBtn.textContent = '▶';
          }
        });

        video.play().then(() => {
          card.classList.add('playing');
          if (playBtn) playBtn.textContent = '❚❚';
        }).catch(() => {});
      } else {
        video.pause();
        card.classList.remove('playing');
        if (playBtn) playBtn.textContent = '▶';
      }
    }

    card.addEventListener('click', togglePlay);

    // Sound toggle
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        video.muted = !video.muted;
        soundBtn.textContent = video.muted ? '🔇' : '🔊';
        soundBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      });
    }

    // When video ends or is paused
    video.addEventListener('ended', () => {
      card.classList.remove('playing');
      if (playBtn) playBtn.textContent = '▶';
    });

    video.addEventListener('pause', () => {
      card.classList.remove('playing');
      if (playBtn) playBtn.textContent = '▶';
    });
  });
}

document.addEventListener('DOMContentLoaded', initVideoReels);
