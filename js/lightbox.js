/**
 * Benita Makeup Academy - Accessible Portfolio Lightbox (<dialog>)
 * Enhanced with verified real client transformations
 */
const portfolioItems = [
  {
    id: 1,
    category: 'BRIDAL',
    title: 'Traditional Telugu Muhurtham Bride',
    image: 'assets/real_muhurtham_bride.png',
    description: 'Authentic Telugu Muhurtham bride styled in radiant parrot green and magenta Kanjeevaram silk saree. Flawless HD skin finish, antique gold temple jewellery, bridal nath, and auspicious red bindi.'
  },
  {
    id: 2,
    category: 'HAIRSTYLING',
    title: 'Intricate Bridal Braid & Floral Styling',
    image: 'assets/real_bridal_hairstyle.png',
    description: 'Masterful bridal hairstyling showcasing a voluminous textured fishtail braid with floral accents, ornate karnaphool ear chains (mattal), and bespoke maggam work blouse alignment.'
  },
  {
    id: 3,
    category: 'BRIDAL',
    title: 'Signature Diamond Jewellery Bridal Look',
    image: 'assets/real_bride_diamond.png',
    description: 'Luminous bridal glam paired with handcrafted diamond and silver bridal choker, layered haram, matching maang tikka, and dual-toned silk saree.'
  },
  {
    id: 4,
    category: 'ENGAGEMENT',
    title: 'Royal Purple & Emerald Choker Look',
    image: 'assets/real_engagement_bride.png',
    description: 'Radiant engagement celebration look in royal purple and antique gold zari silk saree, paired with an exquisite emerald droplet choker and soft dewy complexion.'
  },
  {
    id: 5,
    category: 'DRAPING',
    title: 'Saree Ceremony & Gold Vaddanam Styling',
    image: 'assets/real_saree_ceremony.png',
    description: 'Traditional Saree Ceremony / Seemantham perfection. Lilac and emerald silk saree with precision box pleats, temple gold necklace, and authentic gold vaddanam (waist belt).'
  },
  {
    id: 6,
    category: 'BRIDAL',
    title: 'Modern Party & Bridesmaid Updo',
    image: 'assets/real_bridesmaid_look.png',
    description: 'Soft glam party makeover featuring a chic modern textured updo with face-framing tendrils and rich wine embroidered saree.'
  },
  {
    id: 7,
    category: 'BRIDAL',
    title: 'Christian Bridal Elegance',
    image: 'assets/christian_bride.jpg',
    description: 'Pure white lace wedding gown with sheer cathedral veil. Delicate glass-skin glow, subtle champagne highlighter, and soft romantic bridal waves.'
  },
  {
    id: 8,
    category: 'RECEPTION',
    title: 'Hollywood Waves Reception Glam',
    image: 'assets/reception_glam.jpg',
    description: 'High-impact reception glamour featuring voluminous sculpted Hollywood waves, subtle smoky eye, champagne shimmer, and diamond chandelier earrings.'
  }
];

let currentLightboxIndex = 0;

function openLightbox(index) {
  const dialog = document.getElementById('portfolio-lightbox');
  if (!dialog) return;

  currentLightboxIndex = index;
  const item = portfolioItems[index] || portfolioItems[0];

  document.getElementById('lightbox-img').src = item.image;
  document.getElementById('lightbox-img').alt = item.title;
  document.getElementById('lightbox-cat').textContent = item.category;
  document.getElementById('lightbox-title').textContent = item.title;
  document.getElementById('lightbox-desc').textContent = item.description;

  const bookBtn = document.getElementById('lightbox-book-btn');
  if (bookBtn) {
    bookBtn.onclick = () => {
      dialog.close();
      if (typeof openBridalEnquiry === 'function') {
        openBridalEnquiry(item.title);
      }
    };
  }

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }
}

function closeLightbox() {
  const dialog = document.getElementById('portfolio-lightbox');
  if (dialog) {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }
}

function initLightbox() {
  const dialog = document.getElementById('portfolio-lightbox');
  if (!dialog) return;

  // Backdrop click light-dismiss
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!dialog.open) return;
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % portfolioItems.length;
      openLightbox(currentLightboxIndex);
    } else if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
      openLightbox(currentLightboxIndex);
    }
  });
}

document.addEventListener('DOMContentLoaded', initLightbox);
