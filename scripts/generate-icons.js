// Simple script to generate PWA icons
// Run: node scripts/generate-icons.js

import { writeFileSync } from 'fs';
import { join } from 'path';

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1f2937"/>
  <g transform="translate(256, 256) scale(10)">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" 
          fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="9" cy="10" r="1" fill="#ef4444"/>
    <circle cx="12" cy="10" r="1" fill="#ef4444"/>
    <circle cx="15" cy="10" r="1" fill="#ef4444"/>
  </g>
</svg>`;

console.log('Icon SVG created. You can use online tools to convert this to PNG:');
console.log('1. Visit: https://cloudconvert.com/svg-to-png');
console.log('2. Or use: https://svgtopng.com/');
console.log('3. Generate 192x192 and 512x512 versions');
console.log('4. Save them as public/icon-192.png and public/icon-512.png');

// Save the SVG for reference
writeFileSync('public/icon-source.svg', iconSvg);
console.log('\nSource SVG saved to: public/icon-source.svg');