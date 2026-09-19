const fs = require('fs');
const path = require('path');

const reels = [
  {
    id: 1,
    category: 'BRIDAL TRANSFORMATION',
    title: 'Flawless HD Muhurtham Look',
    meta: 'Airbrush base • Temple Jewellery • 18+ Yrs Artistry',
    bgGrad: ['#063F42', '#76204F', '#2A0819'],
    iconText: 'BRIDAL REEL'
  },
  {
    id: 2,
    category: 'HAIRSTYLE MASTERCLASS',
    title: '20+ Hairstyles Hands-on Demo',
    meta: 'Russian Updos • Saree Pleating • Academy Session',
    bgGrad: ['#521536', '#075D60', '#032022'],
    iconText: 'HAIRSTYLE REEL'
  },
  {
    id: 3,
    category: 'INSIDE THE CLASSROOM',
    title: 'Student Hands-on Vanity Practice',
    meta: 'Batch Mentorship • Colour Theory • Live Models',
    bgGrad: ['#075D60', '#3D0E26', '#05292B'],
    iconText: 'ACADEMY REEL'
  },
  {
    id: 4,
    category: 'CONVOCATION & CEREMONY',
    title: 'ISO Certificate Distribution Ceremony',
    meta: 'Certified Artists • Lifetime ID • Career Launch',
    bgGrad: ['#3A0E23', '#063F42', '#021819'],
    iconText: 'CERTIFICATE REEL'
  }
];

for (const r of reels) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
  <defs>
    <linearGradient id="rBg${r.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${r.bgGrad[0]}"/>
      <stop offset="50%" stop-color="${r.bgGrad[1]}"/>
      <stop offset="100%" stop-color="${r.bgGrad[2]}"/>
    </linearGradient>
    <linearGradient id="rGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5E4BE"/>
      <stop offset="50%" stop-color="#C8A66A"/>
      <stop offset="100%" stop-color="#9E7A3E"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="540" height="960" fill="url(#rBg${r.id})"/>
  
  <!-- Subtle luxury grain / borders -->
  <rect x="18" y="18" width="504" height="924" rx="20" fill="none" stroke="url(#rGold)" stroke-width="1.2" opacity="0.6"/>

  <!-- Top Instagram Reel badge -->
  <g transform="translate(30, 40)">
    <rect width="180" height="34" rx="17" fill="rgba(0,0,0,0.5)" stroke="url(#rGold)" stroke-width="1"/>
    <circle cx="20" cy="17" r="5" fill="#E1306C"/>
    <text x="35" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#FAF6ED">@benitamakeupacademy</text>
  </g>

  <!-- Centered Play Icon -->
  <g transform="translate(270, 450)">
    <circle cx="0" cy="0" r="48" fill="rgba(6,63,66,0.75)" stroke="url(#rGold)" stroke-width="2.5"/>
    <polygon points="-12,-20 20,0 -12,20" fill="#FAF6ED"/>
  </g>

  <!-- Category & Details -->
  <g transform="translate(35, 740)">
    <rect width="210" height="30" rx="15" fill="#042F32" stroke="url(#rGold)" stroke-width="1"/>
    <text x="105" y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" letter-spacing="2.5" fill="#F5E4BE" text-anchor="middle">${r.category}</text>
    
    <text x="0" y="70" font-family="'Cormorant Garamond', Georgia, serif" font-size="28" font-weight="700" fill="#FAF6ED">${r.title}</text>
    <text x="0" y="100" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="#D9B7B1">${r.meta}</text>
    
    <!-- Reel Action Link Prompt -->
    <text x="0" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="url(#rGold)">WATCH ON INSTAGRAM ↗</text>
  </g>
</svg>`;
  fs.writeFileSync(`e:/benita/assets/reel_${r.id}.svg`, svg, 'utf-8');
}

console.log('Successfully generated reel poster SVGs!');
