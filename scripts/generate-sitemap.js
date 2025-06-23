const fs   = require('fs');
const path = require('path');

const BASE = 'https://jacobdeanr.github.io/Source_Skyboxes';
const ROOT = process.cwd();

const indexPath = path.join(ROOT, 'public', 'data', 'index.json');
const index     = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const pages = [
  '',
  '/archive',
  ...Object.keys(index).map((s) => `/skyboxes/${s}/`)
];

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages
    .map(
      (p) => `  <url>\n    <loc>${BASE}${p}</loc>\n  </url>`
    )
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(ROOT, 'out', 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml generated with ${pages.length} URLs`);