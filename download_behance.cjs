const https = require('https');
const fs = require('fs');

const url = 'https://www.behance.net/gallery/236248469/Doctor-Appointment-App-UX-Case-Study';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('c:/Users/youss/Desktop/portfolio/scratch_behance.html', data);
    console.log('Saved scratch HTML');
  });
});
