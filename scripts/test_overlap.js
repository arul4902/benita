const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:8080/';

const VIEWPORTS = [
  { name: 'Desktop Ultra-Wide', width: 1920, height: 1080 },
  { name: 'Desktop Standard', width: 1440, height: 900 },
  { name: 'Laptop / Small Desktop', width: 1280, height: 800 },
  { name: 'Tablet Landscape (iPad Pro)', width: 1024, height: 768 },
  { name: 'Tablet Portrait (iPad Air)', width: 820, height: 1180 },
  { name: 'Tablet Portrait (iPad 9th gen)', width: 768, height: 1024 },
  { name: 'Phablet (iPhone 14 Pro Max)', width: 430, height: 932 },
  { name: 'Standard Mobile (iPhone 14)', width: 390, height: 844 },
  { name: 'Compact Mobile (iPhone SE / Galaxy)', width: 360, height: 740 },
  { name: 'Ultra Compact Mobile', width: 320, height: 568 }
];

async function checkOverlap() {
  console.log('🔍 Starting Comprehensive Layout & Overlap Analysis...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });

  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 200));

    const analysis = await page.evaluate(() => {
      const results = {
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
        overflowPixels: document.documentElement.scrollWidth - window.innerWidth,
        overlaps: []
      };

      function isOverlapping(rect1, rect2) {
        return !(
          rect1.right <= rect2.left ||
          rect1.left >= rect2.right ||
          rect1.bottom <= rect2.top ||
          rect1.top >= rect2.bottom
        );
      }

      // 1. Check Hero Floating Badges vs Hero Headline & Text
      const badges = Array.from(document.querySelectorAll('.hero-floating-badge'));
      const heroHeadline = document.querySelector('.hero-headline');
      const heroSubcopy = document.querySelector('.hero-subcopy');
      const heroImg = document.querySelector('.hero-portrait-img');

      if (heroHeadline && heroImg) {
        const headlineRect = heroHeadline.getBoundingClientRect();
        const imgRect = heroImg.getBoundingClientRect();
        if (isOverlapping(headlineRect, imgRect)) {
          results.overlaps.push({
            type: 'HERO_HEADLINE_OVER_IMAGE',
            desc: 'Hero headline overlaps the hero image frame'
          });
        }
      }

      badges.forEach((badge, idx) => {
        const bRect = badge.getBoundingClientRect();
        if (heroHeadline && isOverlapping(bRect, heroHeadline.getBoundingClientRect())) {
          results.overlaps.push({
            type: 'BADGE_OVER_HEADLINE',
            desc: `Floating badge ${idx} overlaps hero headline`
          });
        }
        if (heroSubcopy && isOverlapping(bRect, heroSubcopy.getBoundingClientRect())) {
          results.overlaps.push({
            type: 'BADGE_OVER_SUBCOPY',
            desc: `Floating badge ${idx} overlaps hero subcopy`
          });
        }
      });

      // 2. Check Course Badge vs Course Title & Duration Pill
      const courseCards = Array.from(document.querySelectorAll('.course-card'));
      courseCards.forEach((card, idx) => {
        const topBadge = card.querySelector('.course-badge-top');
        const duration = card.querySelector('.course-duration-pill');
        const name = card.querySelector('.course-name');
        if (topBadge && duration) {
          const bRect = topBadge.getBoundingClientRect();
          const dRect = duration.getBoundingClientRect();
          if (isOverlapping(bRect, dRect)) {
            results.overlaps.push({
              type: 'COURSE_BADGE_OVER_DURATION',
              desc: `Course card ${idx} top badge overlaps duration pill`
            });
          }
        }
        if (topBadge && name) {
          const bRect = topBadge.getBoundingClientRect();
          const nRect = name.getBoundingClientRect();
          if (isOverlapping(bRect, nRect)) {
            results.overlaps.push({
              type: 'COURSE_BADGE_OVER_NAME',
              desc: `Course card ${idx} top badge overlaps course name`
            });
          }
        }
      });

      // 3. Check Sticky Bar vs Footer on Mobile
      const stickyBar = document.querySelector('.mobile-sticky-bar');
      const footerBottom = document.querySelector('.footer-bottom');
      if (stickyBar && footerBottom && window.getComputedStyle(stickyBar).display !== 'none') {
        const sRect = stickyBar.getBoundingClientRect();
        const fRect = footerBottom.getBoundingClientRect();
      }

      // 4. Check Navigation Bar Overlap
      const header = document.querySelector('.site-header');
      const logo = document.querySelector('.brand-logo-img');
      const navMenu = document.querySelector('.nav-menu');

      if (logo && navMenu && window.getComputedStyle(navMenu).display !== 'none') {
        const lRect = logo.getBoundingClientRect();
        const mRect = navMenu.getBoundingClientRect();
        if (isOverlapping(lRect, mRect)) {
          results.overlaps.push({
            type: 'LOGO_OVER_NAVMENU',
            desc: 'Brand logo collides with desktop nav menu'
          });
        }
      }

      // 5. Check Highlights Scrollability
      const scroller = document.querySelector('.highlights-scroller');
      if (scroller) {
        const items = Array.from(scroller.querySelectorAll('.highlight-item'));
        if (items.length > 0) {
          const firstItemRect = items[0].getBoundingClientRect();
          const scrollerRect = scroller.getBoundingClientRect();
          if (firstItemRect.left < scrollerRect.left - 5 && scroller.scrollLeft === 0) {
            results.overlaps.push({
              type: 'HIGHLIGHT_CLIPPED_LEFT',
              desc: `First story highlight is cut off on the left (rect.left: ${firstItemRect.left}, scroller.left: ${scrollerRect.left})`
            });
          }
        }
      }

      return results;
    });

    console.log(`\n--- Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    if (analysis.hasHorizontalOverflow) {
      console.error(`❌ Overflow detected: ${analysis.overflowPixels}px! (scrollWidth: ${analysis.scrollWidth}px vs ${analysis.viewportWidth}px)`);
    } else {
      console.log(`✓ 0px overflow (scrollWidth: ${analysis.scrollWidth}px)`);
    }

    if (analysis.overlaps.length > 0) {
      console.warn(`⚠️ Overlaps found (${analysis.overlaps.length}):`);
      analysis.overlaps.forEach(o => console.warn(`  - [${o.type}]: ${o.desc}`));
    } else {
      console.log('✓ 0 element collisions/overlaps detected');
    }
  }

  await browser.close();
}

checkOverlap().catch(err => {
  console.error('Error running overlap analysis:', err);
});
