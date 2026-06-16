const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://onepickauto.co.kr';
const PAGES = [
  '/reviews/',
  '/reviews/?page=2',
  '/reviews/?page=3',
  '/reviews/?page=4'
];

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

async function scrape() {
  let reviews = [];
  
  for (const page of PAGES) {
    if (reviews.length >= 15) break;
    
    console.log(`Fetching ${BASE_URL}${page}...`);
    const res = await axiosInstance.get(`${BASE_URL}${page}`);
    const $ = cheerio.load(res.data);
    
    $('.review-item').each((i, el) => {
      if (reviews.length >= 15) return false;
      
      const title = $(el).find('.title').text().trim();
      const name = $(el).find('.brand').text().trim();
      const location = $(el).find('.location').text().trim();
      const type = $(el).find('.tag').text().trim(); // "장기렌트" or similar
      const desc = $(el).find('.desc').text().trim();
      
      // Main image
      let imgSrc = $(el).find('.swiper-slide img').first().attr('src');
      if (imgSrc) {
        if (!imgSrc.startsWith('http')) {
          imgSrc = BASE_URL + imgSrc;
        }
      }
      
      reviews.push({
        id: reviews.length + 1,
        title,
        name: name ? name + "님의 후기" : "고객님의 후기",
        regionCar: `${location || '전국'} | ${title || '차량'}`,
        type: type || '장기렌트',
        saved: "상담 확인", // They don't have this explicit field in the HTML easily, we'll placeholder or just leave
        date: "2025-07-17",
        quote: desc,
        originalImage: imgSrc
      });
    });
  }
  
  console.log(`Found ${reviews.length} reviews.`);
  
  // Download and convert images
  const publicDir = path.join(__dirname, 'public', 'reviews');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  for (let i = 0; i < reviews.length; i++) {
    const r = reviews[i];
    if (r.originalImage) {
      const imgPath = path.join(publicDir, `review_${r.id}.webp`);
      console.log(`Downloading image for review ${r.id}...`);
      try {
        const response = await axiosInstance({
          url: r.originalImage,
          responseType: 'arraybuffer'
        });
        await sharp(response.data)
          .webp({ quality: 80 })
          .toFile(imgPath);
        r.image = `/reviews/review_${r.id}.webp`;
      } catch (err) {
        console.error(`Failed to download/convert image for review ${r.id}:`, err.message);
        r.image = '/images/placeholder.webp';
      }
    } else {
      r.image = '/images/placeholder.webp';
    }
  }
  
  fs.writeFileSync('reviews_data.json', JSON.stringify(reviews, null, 2));
  console.log('Successfully saved to reviews_data.json');
}

scrape().catch(console.error);
