import { defineConfig } from 'astro/config';

// `site` is the single source of truth for canonical URLs and the sitemap.
export default defineConfig({
  site: 'https://calcforhome.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'never',
  },
});
