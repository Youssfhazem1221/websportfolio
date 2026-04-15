const https = require('https');
const fs = require('fs');

const extractMeta = (html, property) => {
  const match = html.match(new RegExp(`<meta[^>]*property="${property}"[^>]*content="([^"]+)"`, 'i')) || 
                html.match(new RegExp(`<meta[^>]*content="([^"]+)"[^>]*property="${property}"`, 'i'));
  return match ? match[1] : null;
};

const fetchProjectInfo = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?) :: Behance<\/title>/);
        let title = titleMatch ? titleMatch[1] : url.split('/').pop().replace(/-/g, ' ');
        const image = extractMeta(data, 'og:image');
        const description = extractMeta(data, 'og:description');
        
        // Find published date if exists
        const dateMatch = /"publishedOn":(\d+),/.exec(data);
        const date = dateMatch ? new Date(parseInt(dateMatch[1]) * 1000).getFullYear().toString() : '2024';

        // Extract Behance numeric ID
        const behanceIdMatch = url.match(/\/gallery\/(\d+)\//);
        const behanceId = behanceIdMatch ? behanceIdMatch[1] : null;

        resolve({ title, image, description, link: url, date, behanceId });
      });
    }).on('error', reject);
  });
};

const urls = [
  'https://www.behance.net/gallery/237994351/Women-Fashion-Brand-Profile',
  'https://www.behance.net/gallery/236248469/Doctor-Appointment-App-UX-Case-Study',
  'https://www.behance.net/gallery/235671415/CIB-Mobile-Banking-App-UXUI-Redesign',
  'https://www.behance.net/gallery/204435779/Musician-single-page-site-concept',
  'https://www.behance.net/gallery/204375077/Netlink-Logo-concept',
  'https://www.behance.net/gallery/201553545/Maxmus-Logo-concept',
  'https://www.behance.net/gallery/140312583/Music-Application',
  'https://www.behance.net/gallery/194838401/Mix-redesign'
];

async function main() {
  const results = [];
  for (const url of urls) {
    const info = await fetchProjectInfo(url);
    const id = url.split('/').pop().toLowerCase();
    
    results.push({
      id: id,
      title: info.title,
      behanceId: info.behanceId,
      subtitle: info.description ? info.description.substring(0, 80) + (info.description.length > 80 ? '...' : '') : 'A comprehensive design project showcasing modern aesthetics and user-centered design principles.',
      description: info.description || 'This presentation highlights the creative process, UI/UX methodologies, and the systematic design language implemented to achieve a cohesive brand identity and user experience.',
      image: info.image || '',
      tags: url.includes('Logo') ? ['Branding', 'Logo Design'] : url.includes('Brand') ? ['Branding', 'Fashion'] : ['UI/UX', 'Product Design'],
      year: info.date,
      role: 'Designer',
      link: info.link
    });
    console.log(`Fetched ${info.title} (${info.date}) - ID: ${info.behanceId}`);
  }
  
  fs.writeFileSync('c:/Users/youss/Desktop/portfolio/src/data/projects.json', JSON.stringify(results, null, 2));
  console.log('Saved to projects.json');
}

main().catch(console.error);
