const http = require('http');

// Simple curl/fetch test first to make sure index.html is 200 OK and contains all sections
function checkHttp() {
  http.get('http://127.0.0.1:8080/', (res) => {
    console.log('HTTP Status:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('HTML Length:', data.length, 'bytes');
      
      const checks = [
        'Benita Make-up Academy',
        'Where Artistry Becomes Confidence',
        '18+ Years of Artistry',
        'HD Bridal Signature Makeup',
        '₹12,000',
        '15-Day Professional Course',
        '₹10,000',
        '20-Day Extended Course',
        '₹15,000',
        '9652050987',
        '8688106490',
        'SR Nagar',
        'christian',
        'certification'
      ];
      
      let allFound = true;
      for (const str of checks) {
        if (!data.includes(str)) {
          console.error('MISSING CHECK:', str);
          allFound = false;
        }
      }
      if (allFound) {
        console.log('ALL 14 CRITICAL BRAND & PRICING STRINGS VERIFIED IN DOM!');
      }
    });
  }).on('error', (err) => {
    console.error('HTTP Error:', err.message);
  });
}

checkHttp();
