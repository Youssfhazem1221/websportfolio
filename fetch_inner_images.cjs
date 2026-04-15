const https = require('https');
const fs = require('fs');

const fetchProjectInnerImages = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = Array.from(data.matchAll(/(https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/fs\\\/[a-zA-Z0-9\._]+)/g));
        let urls = matches.map(m => m[1].replace(/\\\//g, '/'));
        
        // Sometimes they only have 1400 if 'fs' is not available
        if (urls.length === 0) {
            const matches1400 = Array.from(data.matchAll(/(https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/1400\\\/[a-zA-Z0-9\._]+)/g));
            urls = matches1400.map(m => m[1].replace(/\\\//g, '/'));
        }

        const unique = [...new Set(urls)];
        resolve(unique);
      });
    }).on('error', reject);
  });
};

async function updateProjects() {
  const existingPath = 'c:/Users/youss/Desktop/portfolio/src/data/projects.json';
  let projects = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`Fetching inner images for: ${p.title}`);
    const images = await fetchProjectInnerImages(p.link);
    p.presentationImages = images;
    console.log(`Found ${images.length} presentation images.`);
  }

  fs.writeFileSync(existingPath, JSON.stringify(projects, null, 2));
  console.log('Successfully updated projects.json with all inner presentation images.');
}

updateProjects().catch(console.error);
