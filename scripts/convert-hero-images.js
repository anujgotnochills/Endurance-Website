import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hero images that need to be converted - displayed at 208x288px (w-52 h-72)
// Original are 1024x1024 PNGs. We'll resize to 400x400 WebP (2x for retina)
const heroImages = [
  'hero_video_production_1775117056326.png',
  'hero_photography_1775117071910.png',
  'hero_audio_recording_1775117091211.png',
  'hero_post_production_1775117110944.png',
  'hero_creative_direction_1775117130177.png',
];

const brainDir = 'C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc';
const publicDir = path.join(__dirname, 'public', 'media', 'hero-opt');

// Create output directory
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function convertImages() {
  console.log('Converting hero images to WebP...\n');
  
  for (const filename of heroImages) {
    const inputPath = path.join(brainDir, filename);
    const outputFilename = filename.replace('.png', '.webp');
    const outputPath = path.join(publicDir, outputFilename);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Not found, skipping: ${filename}`);
      continue;
    }

    try {
      const inputStats = fs.statSync(inputPath);
      await sharp(inputPath)
        .resize(416, 576, { // 2x for retina of 208x288
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 }
        })
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const saving = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      console.log(`✅  ${filename}`);
      console.log(`    ${(inputStats.size / 1024).toFixed(0)}KB -> ${(outputStats.size / 1024).toFixed(0)}KB  (${saving}% saved)\n`);
    } catch (err) {
      console.error(`❌  Error converting ${filename}:`, err.message);
    }
  }

  console.log('\nDone! Update Hero.tsx to use /media/hero-opt/*.webp paths.');
  console.log('Also update the preload hint in index.html to the new .webp path.');
}

convertImages();
