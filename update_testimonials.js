const fs = require('fs');
const path = require('path');

const testimonialsFile = path.join(__dirname, 'components', 'TestimonialSection.tsx');
let content = fs.readFileSync(testimonialsFile, 'utf8');

const reviewsData = JSON.parse(fs.readFileSync('reviews_data.json', 'utf8'));

// Format reviewsData to be injected into the code
const formattedReviews = reviewsData.map(r => `    {
      id: ${r.id},
      name: ${JSON.stringify(r.name)},
      regionCar: ${JSON.stringify(r.regionCar)},
      type: ${JSON.stringify(r.type)},
      saved: ${JSON.stringify(r.saved)},
      date: ${JSON.stringify(r.date)},
      quote: ${JSON.stringify(r.quote)},
      image: ${JSON.stringify(r.image)}
    }`).join(',\n');

const newCode = `  const baseTestimonials = [\n${formattedReviews}\n  ];`;

// Regex to replace the baseTestimonials array
const regex = /const baseTestimonials = \[[^]*?\];/;
content = content.replace(regex, newCode);

fs.writeFileSync(testimonialsFile, content);
console.log('Successfully updated TestimonialSection.tsx');
