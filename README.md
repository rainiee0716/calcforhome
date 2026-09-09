# CalcForHome (Astro) — Concrete & Gravel Calculator Hub

Free DIY calculator hub for home-improvement material estimates, built with
[Astro](https://astro.build). The output is fully static HTML, and calculator logic is extracted into
testable TypeScript modules.

## Features

- Four focused calculators:
  - Concrete slab/footing volume
  - Concrete bags by 80/60/40 lb bag size
  - Gravel driveway volume and weight
  - Fence post concrete, including buried-post volume subtraction
- Shared calculation module with Node tests
- Semantic forms, keyboard submission, validation errors, and `aria-live` results
- Canonical URLs, sitemap, JSON-LD, breadcrumbs, FAQ schema, Open Graph, and Twitter metadata
- 404 page, favicon, apple touch icon, and social share image
- Privacy policy, terms/disclaimer, and affiliate disclosure
- Cloudflare Pages `_headers` with security headers and immutable asset caching
- GitHub Actions workflow that runs tests and builds the site

## Project layout

```text
astro-site/
├── astro.config.mjs
├── public/
│   ├── _headers
│   ├── ads.txt
│   ├── robots.txt
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── og-image.png
├── src/
│   ├── components/Breadcrumbs.astro
│   ├── layouts/BaseLayout.astro
│   ├── lib/
│   │   ├── calculations.ts
│   │   ├── schema.ts
│   │   ├── site.ts
│   │   └── tools.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── concrete-calculator.astro
│   │   ├── concrete-bags-calculator.astro
│   │   ├── gravel-driveway-calculator.astro
│   │   ├── concrete-fence-post-calculator.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── affiliate-disclosure.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── sitemap.xml.js
│   └── styles/global.css
└── tests/calculations.test.js
```

## Local development

```bash
npm install
npm run dev
```

## Test and build

```bash
npm test
npm run build
npm run preview
```

Tests compile `src/lib/calculations.ts` to `dist-test/` and run the Node test runner. The `dist-test/`
directory is ignored.

## Deploy to Cloudflare Pages

When connecting this GitHub repository to Cloudflare Pages, use:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20

Cloudflare will read `.nvmrc`, and `public/_headers` will be copied into the deployment.

## Launch checklist

1. Register and connect `calcforhome.com`.
2. Create or forward `hello@calcforhome.com`; update `CONTACT_EMAIL` in `src/lib/site.ts` if needed.
3. Submit `https://calcforhome.com/sitemap.xml` to Google Search Console.
4. After AdSense approval, replace the placeholder publisher ID in `public/ads.txt`.
5. Add real Home Depot or Lowe's affiliate links with clear disclosure.
6. Update `LAST_UPDATED` in `src/lib/site.ts` when formulas or content change.

## Adding a calculator

1. Add a pure calculation function to `src/lib/calculations.ts`.
2. Add a test in `tests/calculations.test.js`.
3. Add the tool to `src/lib/tools.ts`.
4. Copy an existing calculator page and connect it to the shared calculation function.
