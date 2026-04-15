const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('CV3_UX_Designer.docx.pdf');

pdf(dataBuffer).then(function(data) {
  console.log(data.text);
}).catch(console.error);
