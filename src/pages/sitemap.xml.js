import { tools } from '../lib/tools';
import { LAST_UPDATED } from '../lib/site';

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about/', changefreq: 'yearly', priority: '0.4' },
  { loc: '/privacy/', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms/', changefreq: 'yearly', priority: '0.3' },
  { loc: '/affiliate-disclosure/', changefreq: 'yearly', priority: '0.3' },
  { loc: '/contact/', changefreq: 'yearly', priority: '0.3' },
];

export function GET({ site }) {
  const siteBase = site?.href.replace(/\/$/, '') ?? '';
  const all = [
    ...staticPages,
    ...tools.map((tool) => ({
      loc: `/${tool.slug}/`,
      changefreq: 'monthly',
      priority: '0.9',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (page) =>
      `  <url><loc>${siteBase}${page.loc}</loc><lastmod>${LAST_UPDATED}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
