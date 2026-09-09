# CalcForHome (Astro) — Concrete & Gravel Calculator Hub

Free DIY calculator hub for home-improvement material estimates, built with
[Astro](https://astro.build). Output is **fully static HTML** (identical SEO to hand-written pages)
but maintainable: header, footer, canonical URL and JSON-LD all live in one `BaseLayout`.

## Cluster strategy (verified 2026-09-09, 哥飞 KD + GKP US)

- Head terms like `concrete calculator` / `gravel calculator` are **KD 35–58** → too hard for a new
  site, kept only as hub / authority pages.
- The real money is in **long-tail sub-terms**, which are **KD 4.5–11.5** with real volume:
  - `how many bags of concrete do i need` → **KD 4.5, GKP 1000–1万/mo** (priority money page)
  - `how much gravel do i need for a driveway` → KD 11.5, GKP 10–100/mo
  - `concrete calculator for fence post` → KD 31.2 (borderline, needs more authority)
- Monetization: AdSense (in-content slots) + Home Depot / Lowe's affiliate links on material pages.

## Project layout
```
astro-site/
├── astro.config.mjs        # site domain + static output + trailingSlash:'always'
├── src/
│   ├── layouts/BaseLayout.astro   # ← shared head/header/footer. Edit once, applies everywhere
│   ├── lib/site.ts                # site name, domain, and contact email
│   ├── lib/tools.ts               # tool list: drives homepage grid + sitemap
│   ├── styles/global.css          # shared stylesheet
│   └── pages/
│       ├── index.astro
│       ├── concrete-calculator.astro            (head hub, KD 58 — authority only)
│       ├── concrete-bags-calculator.astro       (MONEY PAGE, KD 4.5 / 1000-1万)
│       ├── gravel-driveway-calculator.astro     (long-tail, KD 11.5)
│       ├── concrete-fence-post-calculator.astro (borderline, KD 31.2)
│       ├── about.astro / privacy.astro / contact.astro
│       └── sitemap.xml.js        # auto-generated from tools.ts + static pages
└── public/robots.txt
```

## Local dev / build
```bash
npm install
npm run dev       # preview at http://localhost:4321
npm run build     # outputs static site to dist/
npm run preview   # serve the built dist/ locally
```

## Deploy
`dist/` is plain static HTML — upload to Cloudflare Pages (or any static host).
- Build output directory: `dist`
- No build command needed if you connect the repo; otherwise `npm run build`.

## Launch checklist
1. Domain is configured as `https://calcforhome.com` in `astro.config.mjs`.
2. `src/lib/site.ts` centralizes the site name, canonical domain, and contact email.
   Update `CONTACT_EMAIL` after you create or forward `hello@calcforhome.com`.
3. `src/lib/tools.ts` drives the homepage grid and sitemap; add new tools there.
4. AdSense: each page has a `<!-- ===== AdSense ... -->` comment block. After your
   AdSense account is approved, paste the `<ins>` snippet there.
5. Affiliate: add Home Depot / Lowe's affiliate links on the material pages.

## Adding a new calculator (the maintenance win)
1. Add an entry to `src/lib/tools.ts` (title, blurb, canonical).
2. Copy an existing `src/pages/<slug>.astro`, change the title/description/formula/script.
3. That's it — it appears on the homepage grid and in the sitemap automatically.
   No more editing 5 footers by hand.
