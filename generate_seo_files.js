import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '');
const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

async function generateSeoFiles() {
  console.log('[SEO Pipeline] Generating sitemap and SEO files...');

  const staticPages = [
    '',
    '/about-us',
    '/blog',
    '/courses',
    '/contact-us',
    '/dashboard',
    '/disclaimer',
    '/privacy-policy',
    '/terms-and-conditions-enrolment',
    '/search'
  ];

  let dynamicRoutes = [];

  try {
    const [blogsRes, coursesRes, locationsRes] = await Promise.all([
      fetch(`${API_URL}/blogs`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_URL}/courses`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API_URL}/locations`).then(r => r.ok ? r.json() : []).catch(() => [])
    ]);

    if (Array.isArray(blogsRes)) {
      blogsRes.forEach(b => {
        if (b.slug || b._id) dynamicRoutes.push(`/blog/${b.slug || b._id}`);
      });
    }

    if (Array.isArray(coursesRes)) {
      coursesRes.forEach(c => {
        if (c.slug || c._id) dynamicRoutes.push(`/courses/${c.slug || c._id}`);
      });
    }

    if (Array.isArray(locationsRes)) {
      locationsRes.forEach(loc => {
        if (Array.isArray(loc.items)) {
          loc.items.forEach(item => {
            if (item.slug || item._id) dynamicRoutes.push(`/location/${item.slug || item._id}`);
          });
        }
      });
    }
  } catch (err) {
    console.warn('[SEO Pipeline] Could not fetch dynamic routes from API during prebuild:', err.message);
  }

  const allUrls = [...staticPages, ...dynamicRoutes];

  // 1. Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  // 2. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  // 3. Generate urllist.txt
  const urllistTxt = allUrls.map(url => `${SITE_URL}${url}`).join('\n');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  fs.writeFileSync(path.join(publicDir, 'urllist.txt'), urllistTxt);

  console.log(`[SEO Pipeline] Successfully generated SEO files for ${allUrls.length} routes.`);
}

generateSeoFiles();
