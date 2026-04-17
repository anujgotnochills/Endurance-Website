const fs = require('fs');
const path = require('path');

const basePath = 'd:\\Personal Projects\\salon website\\Logic-Sync-main\\Logic-Sync-main\\public\\media\\studio\\';

const files = [
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\hero_video_production_1775117056326.png', 'hero-video-production.png'],
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\hero_photography_1775117071910.png', 'hero-photography.png'],
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\hero_audio_recording_1775117091211.png', 'hero-audio-recording.png'],
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\hero_post_production_1775117110944.png', 'hero-post-production.png'],
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\hero_creative_direction_1775117130177.png', 'hero-creative-direction.png'],
  ['C:\\Users\\ANUJ\\.gemini\\antigravity\\brain\\34c18d17-9aff-4636-814a-eeaf593d88fc\\media__1775113667964.jpg', 'studio-mix.jpg']
];

files.forEach(([src, dest]) => {
  try {
    fs.copyFileSync(src, path.join(basePath, dest));
    console.log(`Copied ${dest}`);
  } catch(e) {
    console.error(`Failed to copy ${dest}`, e);
  }
});
