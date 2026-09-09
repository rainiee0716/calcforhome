import { tools } from '../lib/tools';
import { SITE_URL } from '../lib/site';

const SITE = SITE_URL;

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about/', changefreq: 'yearly', priority: '0.3' },
  { loc: '/privacy/', changefreq: 'yearly', priority: '0.3' },
  { loc: '/contact/', changefreq: 'yearly', priority: '0.3' },
];

export function GET() {
  const all = [
    ...staticPages,
    ...tools.map((t) => ({ loc: t.canonical, changefreq: 'monthly', priority: '0.9' })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
    .map(
      (p) =>
        `  <url><loc>${SITE}${p.loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
    )
    .join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
