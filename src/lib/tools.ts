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
    slug: 'concrete-bag-coverage-calculator',
    title: 'Concrete Bag Coverage Calculator',
    blurb: 'Square feet per 80, 60, 50 or 40 lb bag',
    updated: '2026-10-29',
  },
  {
    slug: 'concrete-slab-cost-calculator',
    title: 'Concrete Slab Cost Calculator',
    blurb: 'Yards, bags and material cost for any slab',
    updated: '2026-10-29',
  },
  {
    slug: 'gravel-driveway-cost-calculator',
    title: 'Gravel Driveway Cost Calculator',
    blurb: 'Tons and material cost for your driveway',
    updated: '2026-10-29',
  },
  {
    slug: 'gravel-driveway-depth-calculator',
    title: 'Gravel Driveway Depth Calculator',
    blurb: 'Base and surface layers for cars or trucks',
    updated: '2026-10-29',
  },
  {
    slug: 'paver-sand-calculator',
    title: 'Paver Sand Calculator',
    blurb: 'Cubic yards, cubic feet and bags for pavers',
    updated: '2026-10-29',
  },
  {
    slug: 'mulch-calculator',
    title: 'Mulch Calculator',
    blurb: 'Cubic yards and bags for garden beds',
    updated: '2026-10-29',
  },
  {
    slug: 'concrete-fence-post-calculator',
    title: 'Concrete for Fence Post Calculator',
    blurb: 'Bags of concrete per post hole',
    updated: '2026-10-29',
  },
  {
    slug: 'frost-depth-by-state',
    title: 'Frost Depth by State',
    blurb: 'Code footing depth, dig depth and bags for all 50 states',
    updated: '2026-10-29',
  },
  {
    slug: 'lumber-calculator',
    title: 'Lumber Calculator',
    blurb: 'Studs, plate boards and board feet for a wall',
    updated: '2026-10-29',
  },
  {
    slug: 'deck-board-calculator',
    title: 'Deck Board Calculator',
    blurb: 'Courses, boards per course and stock length for a deck',
    updated: '2026-10-29',
  },
];
