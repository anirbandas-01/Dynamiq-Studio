import sharp from 'sharp';

const sizes = [192, 512];
const backgroundColor = '#2F3645';
const textColor = '#FFFFFF';

async function generateIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size * 0.1}"/>
      <text 
        x="50%" 
        y="52%" 
        font-size="${size * 0.35}" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
        font-family="Arial, sans-serif"
        font-weight="bold">
        DS
      </text>
    </svg>
  `;
  
  await sharp(Buffer.from(svg))
    .png()
    .toFile(`public/icon-${size}.png`);
  
  console.log(`Generated icon-${size}.png (${size}x${size})`);
}

async function generateAllIcons() {
  for (const size of sizes) {
    await generateIcon(size);
  }
  console.log('\n All PWA icons generated successfully!');
}

generateAllIcons();