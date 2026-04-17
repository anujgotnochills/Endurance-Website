const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace colors
  content = content.replace(/orange/g, 'purple');
  content = content.replace(/#FF6B00/gi, '#a855f7');
  
  // To make everything dark:
  // We need to replace light classes broadly if they represent main backgrounds
  content = content.replace(/bg-white/g, 'bg-black');
  content = content.replace(/bg-gray-50/g, 'bg-[#0a0a0a]');
  content = content.replace(/bg-gray-100/g, 'bg-[#111111]');
  content = content.replace(/bg-gray-200/g, 'bg-[#1a1a1a]');
  
  content = content.replace(/text-black/g, 'text-white');
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/text-gray-800/g, 'text-gray-200');
  content = content.replace(/text-gray-700/g, 'text-gray-300');
  content = content.replace(/border-gray-200/g, 'border-gray-800');
  content = content.replace(/border-gray-300/g, 'border-gray-700');

  if (file.endsWith('index.css')) {
      // Overwrite colors in index.css
      content = content.replace(/--background:\s*0 0% 100%;/g, '--background: 0 0% 4%;');
      content = content.replace(/--foreground:\s*0 0% 5%;/g, '--foreground: 0 0% 97%;');
      content = content.replace(/--card:\s*0 0% 100%;/g, '--card: 0 0% 8%;');
      content = content.replace(/--card-foreground:\s*0 0% 5%;/g, '--card-foreground: 0 0% 97%;');
      content = content.replace(/--popover:\s*0 0% 100%;/g, '--popover: 0 0% 8%;');
      content = content.replace(/--popover-foreground:\s*0 0% 5%;/g, '--popover-foreground: 0 0% 97%;');
      content = content.replace(/--primary:\s*25 100% 50%;/g, '--primary: 270 100% 60%;');
      content = content.replace(/--ring:\s*25 100% 50%;/g, '--ring: 270 100% 60%;');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
