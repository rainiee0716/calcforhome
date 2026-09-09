export interface Tool {
  slug: string;      // matches the .astro page file name, e.g. "concrete-calculator"
  title: string;
  blurb: string;
  canonical: string; // trailing-slash URL path used in sitemap
}

// Hub tool list — drives the homepage grid AND the sitemap. Add a new tool here,
// create the matching src/pages/<slug>.astro, and it appears in both places.
//
// Cluster strategy (verified 2026-09-09, 哥飞 KD + GKP US):
//   - Head terms (concrete/gravel "X calculator") are KD 35-58 → too hard for a new site,
//     kept as hub/authority pages only.
//   - Long-tail sub-terms are KD 4.5-11.5 with real volume (e.g. "how many bags of
//     concrete do i need" = KD 4.5, GKP 1000-10000/mo) → these are the real money pages.
export const tools: Tool[] = [
  { slug: 'concrete-calculator', title: 'Concrete Calculator', blurb: 'Slab & footing volume in cubic feet and cubic yards', canonical: '/concrete-calculator/' },
  { slug: 'concrete-bags-calculator', title: 'Concrete Bags Calculator', blurb: 'Exactly how many 80/60/40 lb bags you need', canonical: '/concrete-bags-calculator/' },
  { slug: 'gravel-driveway-calculator', title: 'Gravel for Driveway Calculator', blurb: 'Cubic yards & tons of gravel for any driveway', canonical: '/gravel-driveway-calculator/' },
  { slug: 'concrete-fence-post-calculator', title: 'Concrete for Fence Post Calculator', blurb: 'Bags of concrete per post hole', canonical: '/concrete-fence-post-calculator/' },
];
