import fs from 'fs';
import path from 'path';
import { listSlugs } from '@/app/lib/skybox';

const BASE = 'https://jacobdeanr.github.io/Source_Skyboxes';

const pages = [
  '',                // home
  '/archive',        // if you keep an archive route
  ...listSlugs({ includeArchived: true }).map(
    (s) => `/skyboxes/${s}/`
  ),
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

fs.writeFileSync(
  path.join(process.cwd(), 'out', 'sitemap.xml'),
  xml,
  'utf8'
);

console.log(`sitemap.xml with ${pages.length} URLs`);
