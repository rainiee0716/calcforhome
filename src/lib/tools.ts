export interface Tool {
  slug: string;
  title: string;
  blurb: string;
  /** Optional per-page last-modified date for the sitemap. Falls back to LAST_UPDATED. */
  updated?: string;
}

// Hub tool list — drives the homepage grid and the sitemap. Add a new tool here,
// then create the matching src/pages/<slug>.astro file.
export const tools: Tool[] = [
  {
    slug: 'concrete-calculator',
    title: 'Concrete Calculator',
    blurb: 'Slab & footing volume in cubic feet and cubic yards',
    updated: '2026-10-29',
  },
  {
    slug: 'concrete-bags-calculator',
    title: 'Concrete Bags Calculator',
    blurb: 'Exactly how many 80/60/50/40 lb bags you need',
    updated: '2026-10-29',
  },
  {
    slug: 'gravel-driveway-calculator',
    title: 'Gravel Calculator for Driveways',
    blurb: 'Cubic yards & tons of gravel by stone type',
    updated: '2026-10-29',
  },
  {
    slug: 'concrete-fence-post-calculator',
    title: 'Concrete for Fence Post Calculator',
    blurb: 'Bags of concrete per post hole',
    updated: '2026-10-29',
  },
];
