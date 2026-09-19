const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('index.html', 'utf8');
const regex = /(?:src|href)="([^"]+)"/g;
const paths = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  const p = match[1];
  if (!p.startsWith('http') && !p.startsWith('#') && !p.startsWith('mailto:') && !p.startsWith('tel:')) {
    paths.add(p.replace(/^\.\//, ''));
  }
}

console.log('Total local paths in index.html:', paths.size);

async function verifyPath(urlPath) {
  return new Promise((resolve) => {
    https.get('https://benita-livid.vercel.app/' + urlPath, (res) => {
      resolve({ path: urlPath, status: res.statusCode, contentType: res.headers['content-type'] });
    }).on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function run() {
  const results = [];
  for (const p of paths) {
    const res = await verifyPath(p);
    results.push(res);
  }
  const failed = results.filter(r => r.status !== 200);
  console.log('Successful assets:', results.filter(r => r.status === 200).length);
  if (failed.length > 0) {
    console.log('Failed assets:', failed);
  } else {
    console.log('ALL ASSETS LOADED 200 OK ON VERCEL!');
  }
}

run();
