const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('e:/benita/index.html', 'utf-8');

// Extract all src, href, and url references
const srcMatches = Array.from(html.matchAll(/src=["']([^"']+)["']/g)).map(m => m[1]);
const hrefMatches = Array.from(html.matchAll(/href=["']([^"']+\.(css|svg|png|jpg|ico))["']/g)).map(m => m[1]);

const allAssets = [...new Set([...srcMatches, ...hrefMatches])].filter(url => !url.startsWith('http') && !url.startsWith('#') && url.trim() !== '');

console.log(`Checking ${allAssets.length} local assets referenced in HTML...`);

let checked = 0;
let errors = 0;

for (const asset of allAssets) {
  const reqUrl = 'http://127.0.0.1:8080/' + asset;
  http.get(reqUrl, (res) => {
    checked++;
    if (res.statusCode !== 200) {
      console.error(`FAILED (${res.statusCode}): ${asset}`);
      errors++;
    } else {
      console.log(`✓ 200 OK: ${asset}`);
    }
    if (checked === allAssets.length) {
      if (errors === 0) {
        console.log(`\nALL ${checked} ASSETS LOADED WITH HTTP 200 OK! ZERO BROKEN ASSETS!`);
      } else {
        console.error(`\nFound ${errors} broken assets.`);
      }
    }
  }).on('error', (err) => {
    checked++;
    errors++;
    console.error(`ERROR fetching ${asset}:`, err.message);
  });
}
