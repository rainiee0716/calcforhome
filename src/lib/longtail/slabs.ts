// Data-driven long-tail pages: "how many bags of concrete for a {W}x{L} slab".
// Every number on the generated page comes from these pure functions so the
// pages and the calculators can never disagree.

export interface SlabSize {
  /** Ordered smallest-side-first, e.g. 10x12 (never 12x10). */
  size: string;
  widthFt: number;
  lengthFt: number;
}

const SIZES: SlabSize[] = [
  { size: '10x10', widthFt: 10, lengthFt: 10 },
  { size: '10x12', widthFt: 10, lengthFt: 12 },
  { size: '10x20', widthFt: 10, lengthFt: 20 },
  { size: '12x12', widthFt: 12, lengthFt: 12 },
  { size: '12x16', widthFt: 12, lengthFt: 16 },
  { size: '12x24', widthFt: 12, lengthFt: 24 },
  { size: '16x20', widthFt: 16, lengthFt: 20 },
  { size: '20x20', widthFt: 20, lengthFt: 20 },
  { size: '20x30', widthFt: 20, lengthFt: 30 },
  { size: '24x24', widthFt: 24, lengthFt: 24 },
  { size: '24x30', widthFt: 24, lengthFt: 30 },
  { size: '30x30', widthFt: 30, lengthFt: 30 },
];

const YARDS_PER_CUBIC_FOOT = 1 / 27;
const BAG_YIELD_CUBIC_FEET: Record<'80' | '60' | '40', number> = { '80': 0.6, '60': 0.45, '40': 0.3 };
const WASTE = 1.1; // 10% waste, the site-wide default advice
const READY_MIX_THRESHOLD_YARDS = 1.5;

export interface SlabThicknessRow {
  thicknessIn: number;
  squareFeet: number;
  cubicFeet: number;
  cubicYards: number;
  cubicYardsWithWaste: number;
  bags80: number;
  bags60: number;
  bags40: number;
}

export interface SlabPageData {
  slug: string;
  size: string;
  widthFt: number;
  lengthFt: number;
  squareFeet: number;
  thicknessRows: SlabThicknessRow[];
  /** The 4-inch headline numbers every page leads with. */
  answer: {
    cubicFeet: number;
    cubicYards: number;
    cubicYardsWithWaste: number;
    bags80: number;
    bags60: number;
    bags40: number;
    /** Rough material-only cost from 80 lb bags at $7–$9 each. */
    bagCostLow: number;
    bagCostHigh: number;
  };
  /** Editorial branch used for copy and FAQ selection. */
  mixVerdict: 'bags' | 'borderline' | 'readymix';
  /** Typical project label for this footprint. */
  projectLabel: string;
  /** Hand-mixing effort estimate in whole hours (small pours only). */
  mixingHours: number;
  siblings: SlabSize[];
}

export function slabPagePath(size: string): string {
  return `/how-many-bags-of-concrete-for-a-${size}-slab/`;
}

export function getSlabSizes(): SlabSize[] {
  return SIZES;
}

export function buildSlabPage(size: string): SlabPageData | undefined {
  const entry = SIZES.find((s) => s.size === size);
  if (!entry) return undefined;

  const squareFeet = entry.widthFt * entry.lengthFt;
  const thicknessRows: SlabThicknessRow[] = [4, 5, 6].map((thicknessIn) => {
    const cubicFeet = squareFeet * (thicknessIn / 12);
    const cubicYards = cubicFeet * YARDS_PER_CUBIC_FOOT;
    const cubicYardsWithWaste = cubicYards * WASTE;
    const volumeWithWasteCubicFeet = cubicFeet * WASTE;
    return {
      thicknessIn,
      squareFeet,
      cubicFeet,
      cubicYards,
      cubicYardsWithWaste,
      bags80: Math.ceil(volumeWithWasteCubicFeet / BAG_YIELD_CUBIC_FEET['80']),
      bags60: Math.ceil(volumeWithWasteCubicFeet / BAG_YIELD_CUBIC_FEET['60']),
      bags40: Math.ceil(volumeWithWasteCubicFeet / BAG_YIELD_CUBIC_FEET['40']),
    };
  });

  const answerRow = thicknessRows[0];
  const mixVerdict: SlabPageData['mixVerdict'] =
    answerRow.cubicYardsWithWaste <= READY_MIX_THRESHOLD_YARDS
      ? 'bags'
      : answerRow.cubicYardsWithWaste <= 3
        ? 'borderline'
        : 'readymix';

  let projectLabel = 'a shed floor or small patio';
  if (squareFeet >= 500) projectLabel = 'a two-car garage or driveway pad';
  else if (squareFeet >= 250) projectLabel = 'a one-car garage or large patio';
  else if (squareFeet >= 150) projectLabel = 'a large shed floor or small garage pad';

  const mixingHours = Math.max(1, Math.round((answerRow.bags80 / 14) * 10) / 10); // ~14 bags/hr with a mixer, slower by hand

  const siblings = SIZES.filter((s) => s.size !== entry.size)
    .map((s) => ({ size: s.size, diff: Math.abs(s.widthFt * s.lengthFt - squareFeet) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3)
    .map((s) => SIZES.find((x) => x.size === s.size)!);

  return {
    slug: size,
    size: entry.size,
    widthFt: entry.widthFt,
    lengthFt: entry.lengthFt,
    squareFeet,
    thicknessRows,
    answer: {
      cubicFeet: answerRow.cubicFeet,
      cubicYards: answerRow.cubicYards,
      cubicYardsWithWaste: answerRow.cubicYardsWithWaste,
      bags80: answerRow.bags80,
      bags60: answerRow.bags60,
      bags40: answerRow.bags40,
      bagCostLow: answerRow.bags80 * 7,
      bagCostHigh: answerRow.bags80 * 9,
    },
    mixVerdict,
    projectLabel,
    mixingHours,
    siblings,
  };
}
