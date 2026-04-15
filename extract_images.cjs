const fs = require('fs');
const html = fs.readFileSync('c:/Users/youss/Desktop/portfolio/scratch_behance.html', 'utf-8');

// Find all src="https://mir-s3-cdn-cf.behance.net/project_modules/..."
const regex = /src="(https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/(?:fs|1400|disp|max_\d+)\/[^"]+)"/g;
let match;
const images = new Set();
while ((match = regex.exec(html)) !== null) {
  images.add(match[1]);
}

// Find published date
const dateRegex = /"publishedOn":(\d+),/g;
let dates = [];
while ((match = dateRegex.exec(html)) !== null) {
  dates.push(new Date(parseInt(match[1]) * 1000));
}

console.log('Images:', Array.from(images).filter(url => url.includes('/fs/') || url.includes('/1400/'))); // High res
console.log('Published Date:', dates[0]);
