const fs = require('fs');
const path = require('path');

const dir = 'e:/benita/assets';

const mappings = [
  { from: 'image copy 5.png', to: 'real_muhurtham_bride.png' },
  { from: 'image copy 2.png', to: 'real_bridal_hairstyle.png' },
  { from: 'image.png', to: 'real_bride_diamond.png' },
  { from: 'image copy 3.png', to: 'real_engagement_bride.png' },
  { from: 'image copy 4.png', to: 'real_bridesmaid_look.png' },
  { from: 'image copy.png', to: 'real_saree_ceremony.png' },
  { from: 'instagram-media.mp4', to: 'reel_video_1.mp4' },
  { from: 'instagram-media (1).mp4', to: 'reel_video_2.mp4' },
  { from: 'instagram-media (2).mp4', to: 'reel_video_3.mp4' },
  { from: 'instagram-media (3).mp4', to: 'reel_video_4.mp4' }
];

mappings.forEach(m => {
  const src = path.join(dir, m.from);
  const dest = path.join(dir, m.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${m.from} -> ${m.to}`);
  } else {
    console.log(`Missing source: ${m.from}`);
  }
});

console.log('All files organized successfully!');
