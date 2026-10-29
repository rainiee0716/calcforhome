import { defineConfig } from 'astro/config';

// `site` is the single source of truth for canonical URLs and the sitemap.
export default defineConfig({
  // Must match the host Vercel actually serves. The apex domain 308-redirects to
  // www, so canonical/sitemap/og:url all have to say www or Google sees two hosts.
  site: 'https://www.calcforhome.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'never',
  },
});
