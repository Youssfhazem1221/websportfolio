const fs = require('fs');

const extractImages = () => {
    const js = fs.readFileSync('c:/Users/youss/Desktop/portfolio/script_block.js', 'utf-8');
    // Using advanced regex to find all fully qualified URLs pointing to Behance project modules
    const matches = Array.from(js.matchAll(/(https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/(?:disp|1400|max_1200|fs)\\\/[^\s'"]+)/g));
    
    // De-escape slashes
    const urls = matches.map(m => m[1].replace(/\\\//g, '/'));
    const unique = [...new Set(urls)];
    
    // Prefer highest resolution possible (1400 or fs usually, or whatever is found)
    console.log("Found image urls:", unique.slice(0, 5)); // Just show first 5
};

extractImages();
