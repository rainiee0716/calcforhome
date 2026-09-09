import { defineConfig } from 'astro/config';

// `site` is used for canonical URLs and sitemap. Replace with your real domain before launch.
export default defineConfig({
  site: 'https://calcforhome.com',
  output: 'static',
  trailingSlash: 'always',
});
