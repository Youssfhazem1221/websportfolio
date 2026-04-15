const https = require('https');
const fs = require('fs');

const url = 'https://www.behance.net/gallery/236248469/Doctor-Appointment-App-UX-Case-Study';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try finding JSON blobs
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let found = false;
    while ((match = scriptRegex.exec(data)) !== null) {
      if (match[1].includes('project_modules')) {
        console.log('Found project_modules in a script block!');
        fs.writeFileSync('c:/Users/youss/Desktop/portfolio/script_block.js', match[1]);
        found = true;
      }
      if (match[1].includes('__INITIAL_STATE__')) {
        console.log('Found __INITIAL_STATE__ in a script block!');
        fs.writeFileSync('c:/Users/youss/Desktop/portfolio/initial_state.js', match[1]);
        found = true;
      }
    }
    if (!found) {
        console.log('Could not find it in script tags. Looking for src="" in general...');
        const imgRegex = /src="([^"]+mir-s3-cdn-cf\.behance\.net[^"]+)"/g;
        while((match = imgRegex.exec(data)) !== null) {
            console.log("Found img:", match[1]);
        }
    }
  });
}).on('error', console.error);
