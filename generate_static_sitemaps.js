import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '');
const API_URL = (process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

// ----------------------------------------------------------------
// 1. Read UrlRedirection.md to avoid putting 301 redirected URLs in sitemap
// ----------------------------------------------------------------
const redirectionMap = {};
const redirectionFile = path.join(__dirname, 'UrlRedirection.md');
if (fs.existsSync(redirectionFile)) {
    const lines = fs.readFileSync(redirectionFile, 'utf8').split('\n');
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        const parts = line.split(/\s+/);
        if (parts.length >= 2) {
            let oldUrl = parts[0].replace(SITE_URL, '').replace(/\/$/, '');
            if (!oldUrl.startsWith('/')) oldUrl = '/' + oldUrl;
            let newUrl = parts[1].replace(SITE_URL, '').replace(/\/$/, '');
            if (!newUrl.startsWith('/')) newUrl = '/' + newUrl;
            redirectionMap[oldUrl] = newUrl;
        }
    }
}

function getFinalUrl(rawPath) {
    let normalized = rawPath.replace(/\/$/, '');
    if (!normalized.startsWith('/')) normalized = '/' + normalized;
    return redirectionMap[normalized] || normalized;
}

// Helper: HTTP/HTTPS JSON fetcher
async function fetchJson(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

function slugToTitle(slug = "") {
    const acronyms = new Set(["ui", "ux", "ai", "php", "saas", "seo", "gen", "e-commerce"]);
    return String(slug)
        .split('-')
        .filter(Boolean)
        .map(word => {
            const lower = word.toLowerCase();
            if (acronyms.has(lower)) {
                if (lower === 'e-commerce') return 'E-Commerce';
                return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

// ----------------------------------------------------------------
// Main Generation Function
// ----------------------------------------------------------------
async function generate() {
    console.log("[Sitemap Generator] Fetching API data for sitemaps & SEO files...");

    const [blogsRes, coursesRes, locationsRes] = await Promise.all([
        fetchJson(`${API_URL}/blogs`),
        fetchJson(`${API_URL}/courses`),
        fetchJson(`${API_URL}/locations`)
    ]);

    const blogs = Array.isArray(blogsRes) ? blogsRes : (blogsRes?.blogs || blogsRes?.data || []);
    const courses = Array.isArray(coursesRes) ? coursesRes : (coursesRes?.courses || coursesRes?.data || []);
    const locations = Array.isArray(locationsRes) ? locationsRes : (locationsRes?.locations || locationsRes?.data || []);

    const urls = new Set();
    const addUrl = (p) => {
        urls.add(SITE_URL + getFinalUrl(p));
    };

    // 1. Static Pages
    const staticPages = [
        '/',
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
    staticPages.forEach(addUrl);

    // 2. Blog Posts
    const blogList = [];
    blogs.forEach(b => {
        const slug = b.slug || b._id;
        if (slug) {
            const routePath = `/blog/${slug}`;
            addUrl(routePath);
            blogList.push({
                title: b.title || slugToTitle(slug),
                url: SITE_URL + getFinalUrl(routePath),
                description: b.seoDescription || b.description || "Article on Shiksha Design"
            });
        }
    });

    // 3. Courses
    const courseList = [];
    courses.forEach(c => {
        const slug = c.slug || c._id;
        if (slug) {
            const routePath = `/courses/${slug}`;
            addUrl(routePath);
            courseList.push({
                title: c.title || c.hero?.title || slugToTitle(slug),
                url: SITE_URL + getFinalUrl(routePath),
                description: c.seoDescription || c.description || "Industry leading certification course at Shiksha Design"
            });
        }
    });

    // 4. Locations
    locations.forEach(loc => {
        if (Array.isArray(loc.items)) {
            loc.items.forEach(item => {
                const slug = item.slug || item._id;
                if (slug) addUrl(`/location/${slug}`);
            });
        }
    });

    const uniqueUrls = Array.from(urls);

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // 📄 1. Generate urllist.txt
    fs.writeFileSync(path.join(publicDir, 'urllist.txt'), uniqueUrls.join('\n'));

    // 📄 2. Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    // 📄 3. Generate llms.txt (For AI Search Engines & LLMs)
    let llmsTxt = `# Shiksha Design\n\n`;
    llmsTxt += `> Shiksha Design is an industry-leading education and skill training platform offering certified courses in UI/UX Design, Web Development, Graphic Design, and AI tools.\n\n`;
    
    llmsTxt += `## Main Pages\n\n`;
    const staticPageMap = [
        { path: '/', title: 'Home Page', desc: 'Official Homepage of Shiksha Design' },
        { path: '/courses', title: 'Courses', desc: 'Browse all certified skill development courses' },
        { path: '/about-us', title: 'About Us', desc: 'Learn about Shiksha Design, our mission, and faculty' },
        { path: '/contact-us', title: 'Contact Us', desc: 'Get in touch for course admissions and inquiries' },
        { path: '/blog', title: 'Blog', desc: 'Articles and insights on design, tech, and career growth' },
        { path: '/privacy-policy', title: 'Privacy Policy', desc: 'Shiksha Design privacy policy guidelines' },
        { path: '/disclaimer', title: 'Disclaimer', desc: 'Website disclaimer and liability terms' },
        { path: '/terms-and-conditions-enrolment', title: 'Terms & Conditions Enrolment', desc: 'Official enrolment rules and student terms' }
    ];

    staticPageMap.forEach(sp => {
        const fullUrl = SITE_URL + getFinalUrl(sp.path);
        llmsTxt += `- [${sp.title}](${fullUrl}): ${sp.desc}\n`;
    });
    llmsTxt += `\n`;

    if (courseList.length > 0) {
        llmsTxt += `## Featured Courses\n\n`;
        courseList.forEach(c => {
            llmsTxt += `- [${c.title}](${c.url}): ${c.description}\n`;
        });
        llmsTxt += `\n`;
    }

    if (blogList.length > 0) {
        llmsTxt += `## Latest Blog Posts\n\n`;
        blogList.forEach(b => {
            llmsTxt += `- [${b.title}](${b.url}): ${b.description}\n`;
        });
        llmsTxt += `\n`;
    }

    llmsTxt += `## Sitemaps & Resources\n\n`;
    llmsTxt += `- [XML Sitemap](${SITE_URL}/sitemap.xml): Standard XML Sitemap for search engine indexers\n`;
    llmsTxt += `- [ROR Sitemap](${SITE_URL}/ror.xml): RSS-based ROR sitemap\n`;
    llmsTxt += `- [URL List](${SITE_URL}/urllist.txt): Plain text list of all URLs\n\n`;

    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);

    // 📄 4. Generate sitemap.xml (with IST +05:30 timestamp)
    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Generate IST Timestamp (+05:30)
    const d = new Date();
    const utcTime = d.getTime() + (d.getTimezoneOffset() * 60000);
    const istTime = new Date(utcTime + (330 * 60000));
    const pad = (n) => n < 10 ? '0' + n : n;
    const today = `${istTime.getFullYear()}-${pad(istTime.getMonth()+1)}-${pad(istTime.getDate())}T${pad(istTime.getHours())}:${pad(istTime.getMinutes())}:${pad(istTime.getSeconds())}+05:30`;

    uniqueUrls.forEach(url => {
        sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
    });
    sitemapXml += '</urlset>';
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

    // 📄 5. Generate ror.xml (RSS-based ROR Sitemap)
    let rorXml = '<?xml version="1.0" encoding="UTF-8"?>\n<rss xmlns:ror="http://rorweb.com/0.1/" version="2.0">\n<channel>\n  <title>ROR Sitemap for ' + SITE_URL + '/</title>\n  <link>' + SITE_URL + '/</link>\n';
    uniqueUrls.forEach((url, i) => {
        rorXml += `  <item>\n    <link>${url}</link>\n    <title>Shiksha Design Page</title>\n    <ror:sortOrder>${i}</ror:sortOrder>\n    <ror:resourceOf>sitemap</ror:resourceOf>\n  </item>\n`;
    });
    rorXml += '</channel>\n</rss>';
    fs.writeFileSync(path.join(publicDir, 'ror.xml'), rorXml);

    console.log(`[Sitemap Generator] ✅ Successfully generated ${uniqueUrls.length} URLs in sitemap.xml, ror.xml, llms.txt, urllist.txt & robots.txt!`);
}

generate();
