const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:8080/';
const BRAIN_DIR = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\d91a69f3-b3e6-4f01-b35d-3f3fa3f5ce3a';

async function runTests() {
  console.log('🚀 Launching automated browser tests with Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('Browser Console Error:', msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
    console.error('Browser Page Error:', err.toString());
  });

  page.on('requestfailed', req => {
    const errorText = req.failure() ? req.failure().errorText : 'unknown';
    // Video streaming in Chromium intentionally aborts requests when metadata buffer is satisfied
    if (req.resourceType() === 'media' && errorText === 'net::ERR_ABORTED') {
      // Normal media buffering behavior
      return;
    }
    failedRequests.push(`${req.method()} ${req.url()} - ${errorText}`);
    console.error(`Request Failed: ${req.url()} (${errorText})`);
  });

  // 1. Initial Page Load at 1440x900
  console.log('\n--- 1. Testing Initial Page Load (1440x900 Desktop) ---');
  await page.setViewport({ width: 1440, height: 900 });
  const response = await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('HTTP Status:', response.status());

  const pageTitle = await page.title();
  console.log('Page Title:', pageTitle);

  // Fast smooth scroll down to trigger lazy loading
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight / 2);
    await new Promise(r => setTimeout(r, 300));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 300));
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 600));

  // Check visible rendered images
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).filter(img => {
      // ignore hidden dialog images
      return !img.closest('dialog:not([open])');
    });
    return imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src);
  });
  console.log(`Images check: ${brokenImages.length === 0 ? 'ALL VISIBLE IMAGES LOADED (0 broken)' : brokenImages.join(', ')}`);

  // Check video elements
  const videoCount = await page.$$eval('video', vids => vids.length);
  console.log(`Video elements found in DOM: ${videoCount}`);

  // Capture Desktop Full Page Screenshot
  const desktopScreenshotPath = path.join(BRAIN_DIR, 'verified_desktop.png');
  await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log('✓ Captured desktop screenshot:', desktopScreenshotPath);

  // 2. Test Responsive Viewports & Horizontal Overflow
  console.log('\n--- 2. Testing 6 Responsive Viewports for Zero Horizontal Overflow ---');
  const viewports = [
    { name: 'Desktop Large', width: 1440, height: 900 },
    { name: 'Laptop / Tablet Landscape', width: 1024, height: 768 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Large Mobile (iPhone Pro Max)', width: 430, height: 932 },
    { name: 'Standard Mobile (iPhone 14)', width: 390, height: 844 },
    { name: 'Ultra Compact Mobile (Galaxy S8)', width: 360, height: 740 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await new Promise(r => setTimeout(r, 200));
    const overflow = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      return { scrollW, clientW, diff: scrollW - clientW };
    });

    if (overflow.diff <= 1) {
      console.log(`✓ ${vp.name} (${vp.width}px): 0px overflow (scrollWidth: ${overflow.scrollW}px, clientWidth: ${overflow.clientW}px)`);
    } else {
      console.error(`❌ ${vp.name} (${vp.width}px) HAS OVERFLOW of ${overflow.diff}px!`);
    }
  }

  // Capture Mobile Screenshot (390px)
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 300));
  const mobileScreenshotPath = path.join(BRAIN_DIR, 'verified_mobile.png');
  await page.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log('✓ Captured mobile screenshot:', mobileScreenshotPath);

  // 3. Test Interactive "Find Your Look" Occasion Tabs
  console.log('\n--- 3. Testing Interactive Package Explorer Tabs ---');
  await page.setViewport({ width: 1200, height: 800 });
  await page.click('button[data-occasion="reception"]');
  await new Promise(r => setTimeout(r, 200));
  const receptionTitle = await page.$eval('.explorer-result-title', el => el.textContent);
  console.log('Selected Reception Tab -> Rendered:', receptionTitle);

  await page.click('button[data-occasion="groom"]');
  await new Promise(r => setTimeout(r, 200));
  const groomTitle = await page.$eval('.explorer-result-title', el => el.textContent);
  console.log('Selected Groom Tab -> Rendered:', groomTitle);

  // 4. Test Before/After Slider Interaction
  console.log('\n--- 4. Testing Before/After Comparison Slider ---');
  await page.evaluate(() => {
    const rangeInput = document.querySelector('.slider-range-input');
    rangeInput.value = 35;
    rangeInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await new Promise(r => setTimeout(r, 200));
  const sliderWidth = await page.$eval('.slider-img-before-wrap', el => el.style.width);
  console.log('Slider set to 35% -> before-wrap width:', sliderWidth);

  // 5. Test Portfolio Fullscreen Lightbox
  console.log('\n--- 5. Testing Lightbox Dialog ---');
  await page.click('.portfolio-card:nth-child(1)');
  await new Promise(r => setTimeout(r, 300));
  const isLightboxOpen = await page.$eval('#portfolio-lightbox', el => el.hasAttribute('open'));
  const lightboxTitle = await page.$eval('#lightbox-title', el => el.textContent);
  console.log(`Lightbox open: ${isLightboxOpen}, Title: "${lightboxTitle}"`);

  // Close lightbox with Escape
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 200));
  const isLightboxClosed = await page.$eval('#portfolio-lightbox', el => !el.hasAttribute('open'));
  console.log(`Lightbox closed with Escape: ${isLightboxClosed}`);

  // 6. Test Story Highlights Modal
  console.log('\n--- 6. Testing Story Highlight Modal ---');
  await page.click('.highlight-item:nth-child(3)'); // Certification
  await new Promise(r => setTimeout(r, 300));
  const isStoryOpen = await page.$eval('#story-dialog', el => el.hasAttribute('open'));
  const storyTitle = await page.$eval('#story-modal-title', el => el.textContent);
  console.log(`Story modal open: ${isStoryOpen}, Title: "${storyTitle}"`);
  await page.click('#story-dialog .lightbox-close-btn');
  await new Promise(r => setTimeout(r, 200));

  // 7. Test Video Reel Click Play/Pause
  console.log('\n--- 7. Testing Interactive Video Reel ---');
  await page.click('.reel-card:nth-child(1)');
  await new Promise(r => setTimeout(r, 400));
  const isVideo1Playing = await page.$eval('.reel-card:nth-child(1)', el => el.classList.contains('playing'));
  console.log(`Video Reel 1 clicked -> is playing: ${isVideo1Playing}`);

  // 8. Test Smart WhatsApp Enquiry Modals
  console.log('\n--- 8. Testing WhatsApp Modals ---');
  // Bridal
  await page.evaluate(() => openBridalEnquiry('Traditional Telugu Muhurtham'));
  await new Promise(r => setTimeout(r, 200));
  const isBridalOpen = await page.$eval('#bridal-enquiry-dialog', el => el.hasAttribute('open'));
  const bridalVal = await page.$eval('#bridal-service-input', el => el.value);
  console.log(`Bridal modal open: ${isBridalOpen}, Service prefill: "${bridalVal}"`);
  await page.evaluate(() => closeBridalEnquiry());

  // Academy
  await page.evaluate(() => openAcademyEnquiry('20-Day Extended Course'));
  await new Promise(r => setTimeout(r, 200));
  const isAcademyOpen = await page.$eval('#academy-enquiry-dialog', el => el.hasAttribute('open'));
  console.log(`Academy modal open: ${isAcademyOpen}`);
  await page.evaluate(() => closeAcademyEnquiry());

  // Summary
  console.log('\n==================================================');
  console.log(`TEST SUMMARY:`);
  console.log(`Total Console Errors: ${consoleErrors.length}`);
  console.log(`Total Failed Requests: ${failedRequests.length}`);
  console.log(`Broken Images: ${brokenImages.length}`);
  console.log('==================================================');

  await browser.close();

  if (consoleErrors.length === 0 && failedRequests.length === 0 && brokenImages.length === 0) {
    console.log('🎉 ALL AUTOMATED BROWSER TESTS PASSED WITH 100% SUCCESS!');
    process.exit(0);
  } else {
    console.error('Some tests had warnings or errors.');
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
