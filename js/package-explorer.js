/**
 * Benita Makeup Academy - Interactive "Find Your Look" Bridal Package Explorer
 * Grounded in verified pricing and real Benita bride photos
 */
const packagesData = {
  wedding: {
    title: "HD Bridal Signature Makeup",
    price: "₹12,000",
    note: "Per bride • Signature Telugu Muhurtham or Christian look",
    image: "assets/real_muhurtham_bride.png",
    alt: "Real South Indian Muhurtham Bride by Benita Make-up Academy",
    description: "Our signature camera-ready HD bridal experience crafted with 18+ years of cinema and South Indian bridal expertise. Designed to withstand 12+ hours under intense wedding mandap lights.",
    inclusions: [
      "HD Airbrush / Silicone Base",
      "Custom Bridal Hairstyle",
      "Saree / Lehenga Draping",
      "Jewellery & Flower Styling",
      "False Lashes & Long-wear Lip Prep",
      "Mandap-proof 12hr Touch-up Kit"
    ],
    duration: "Approx. 3.5 Hours"
  },
  engagement: {
    title: "Engagement / Ring Ceremony Makeup",
    price: "₹10,000",
    note: "Per look • Elegant radiance",
    image: "assets/real_engagement_bride.png",
    alt: "Real Engagement Bride by Benita Make-up Academy",
    description: "Radiant, dewy occasion makeup that captures the romance of your engagement ring ceremony. Balanced soft glam that looks luminous in both daylight and evening photography.",
    inclusions: [
      "Dewy HD Base & Glow Prep",
      "Designer Textured Hairstyle",
      "Saree / Gown Draping",
      "Lashes & Soft Winged Liner",
      "Rose Champagne Highlighter",
      "Long-wear Setting Shield"
    ],
    duration: "Approx. 2.5 Hours"
  },
  reception: {
    title: "Reception Glam Makeup",
    price: "₹10,000",
    note: "Per look • High-fashion evening glam",
    image: "assets/reception_glam.jpg",
    alt: "Reception Glam Makeup by Benita",
    description: "Sophisticated modern glamour designed for the reception stage. Features sculpted glass skin, subtle smoky champagne tones, and iconic voluminous Hollywood waves.",
    inclusions: [
      "Sculpted HD Contour & Glow",
      "Hollywood Waves / Textured Bun",
      "Evening Gown / Lehenga Draping",
      "Dramatic 3D Bridal Lashes",
      "Smudge-proof Lip Sculpting",
      "Stage Lighting Optimization"
    ],
    duration: "Approx. 2.5 Hours"
  },
  prewedding: {
    title: "Bridal Pre-Wedding Events",
    price: "₹12,000",
    note: "Per event (Haldi / Mehendi / Sangeet)",
    image: "assets/real_bridal_hairstyle.png",
    alt: "Pre-wedding & Haldi Artistry by Benita",
    description: "Fresh, vibrant, sweat-resistant makeovers tailored for joyous festivities like Haldi, Mehendi, or energetic Sangeet dancing.",
    inclusions: [
      "Waterproof & Sweat-proof Base",
      "Floral Hairstyle / Textured Braids",
      "Casual / Modern Draping",
      "Vibrant Eyeshadow Accents",
      "Skin Glow Finishing Mist",
      "Comfort-first Long Wear"
    ],
    duration: "Approx. 3 Hours"
  },
  saree_ceremony: {
    title: "Saree Ceremony / Seemantham / House Warming",
    price: "₹10,000",
    note: "Per auspicious ritual makeover",
    image: "assets/real_saree_ceremony.png",
    alt: "Real Saree Ceremony Makeover by Benita",
    description: "Traditional auspicious styling honouring cultural ceremonies. Soft, respectful, timeless beauty paired with authentic South Indian jasmine garland styling.",
    inclusions: [
      "Natural HD Radiant Finish",
      "Traditional South Indian Hairstyle",
      "Razor-sharp Box Pleat Draping",
      "Temple Jewellery Placement",
      "Fresh Jasmine Malli Pinning",
      "Auspicious Bindi Styling"
    ],
    duration: "Approx. 2.5 Hours"
  },
  bridesmaid: {
    title: "Bridesmaids Makeover (HD / Classic)",
    price: "₹4,000 - ₹6,000",
    note: "₹4,000 Classic • ₹6,000 HD Base per person",
    image: "assets/real_bridesmaid_look.png",
    alt: "Real Bridesmaid Makeover by Benita",
    description: "Cohesive, flattering makeovers for the sister-of-the-bride, mother, and bridesmaids so the entire bridal party looks stunning in photos.",
    inclusions: [
      "HD / Classic Flawless Base",
      "Party Hairstyle / Soft Curls",
      "Saree / Dupatta Draping",
      "Eye Makeup & Natural Lashes",
      "Coordinated Color Palette",
      "Fast & Efficient Group Prep"
    ],
    duration: "Approx. 1.5 Hours per person"
  },
  groom: {
    title: "Groom Makeup & Camera Grooming",
    price: "₹5,000",
    note: "Per groom • Undetectable HD correction",
    image: "assets/after_transform.jpg",
    alt: "Groom Grooming & HD Makeup",
    description: "Subtle, camera-ready HD grooming that reduces shine, evens skin tone, and tames hair and beard for high-definition 4K photography without looking made-up.",
    inclusions: [
      "Anti-shine HD Primer & Conceal",
      "Skin Tone Evening & Blemish Cover",
      "Beard Styling & Edge Taming",
      "Professional Hair Setting",
      "Matte Lip Hydration",
      "Under-eye De-puffing Prep"
    ],
    duration: "Approx. 1 Hour"
  }
};

function initPackageExplorer() {
  const tabs = document.querySelectorAll('.occasion-tab-btn');
  const container = document.getElementById('explorer-result-mount');
  if (!tabs.length || !container) return;

  function renderPackage(key) {
    const pkg = packagesData[key] || packagesData.wedding;

    container.innerHTML = `
      <div class="explorer-result-card animate-fade-in">
        <div class="explorer-preview-image-frame">
          <img src="${pkg.image}" alt="${pkg.alt}" class="explorer-preview-image" loading="lazy" />
        </div>
        <div class="explorer-result-info">
          <span class="dual-tag">RECOMMENDED PACKAGE</span>
          <h3 class="explorer-result-title">${pkg.title}</h3>
          <div class="service-price-wrap">
            <span class="explorer-result-price">${pkg.price}</span>
            <span class="service-price-note">${pkg.note}</span>
          </div>
          <p class="section-description" style="margin-bottom: 1.25rem; font-size: 0.95rem; color: #cfdedd;">
            ${pkg.description}
          </p>
          <div class="explorer-result-inclusions">
            ${pkg.inclusions.map(inc => `<div class="explorer-inclusion-badge">✓ ${inc}</div>`).join('')}
          </div>
          <div style="display: flex; gap: 0.85rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button class="btn btn-primary btn-sm" onclick="openBridalEnquiry('${pkg.title.replace(/'/g, "\\'")}')">
              Check Availability on WhatsApp
            </button>
            <a href="tel:8688106490" class="btn btn-secondary btn-sm">
              Call Bridal Desk: 8688106490
            </a>
          </div>
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const occasionKey = tab.getAttribute('data-occasion');
      renderPackage(occasionKey);
    });
  });

  // Initial render
  renderPackage('wedding');
}

document.addEventListener('DOMContentLoaded', initPackageExplorer);
