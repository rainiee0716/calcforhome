// Data-driven long-tail pages: "how much gravel for a {L} ft driveway".
// Matches the assumptions on gravel-driveway-calculator: a standard 10 ft
// wide driveway, crushed stone at 1.4 tons per cubic yard.

export interface GravelLength {
  lengthFt: number;
}

const LENGTHS = [50, 60, 80, 100, 150, 200, 300, 400];

const TONS_PER_CUBIC_YARD = 1.4;
const WIDTH_FT = 10;
const TON_COST_LOW = 30;
const TON_COST_HIGH = 60;

export interface GravelDepthRow {
  depthIn: number;
  cubicFeet: number;
  cubicYards: number;
  tons: number;
  costLow: number;
  costHigh: number;
  /** Truck loads at ~20 tons per delivery truck (long driveways only). */
  truckLoads: number;
}

export interface GravelPageData {
  slug: string;
  lengthFt: number;
  widthFt: number;
  squareFeet: number;
  depthRows: GravelDepthRow[];
  /** The 4-inch single-layer headline numbers. */
  answer: {
    cubicYards: number;
    tons: number;
    costLow: number;
    costHigh: number;
  };
  /** The recommended two-layer build: 4" base + 2" #57 surface. */
  twoLayer: {
    baseYards: number;
    baseTons: number;
    surfaceYards: number;
    surfaceTons: number;
    totalTons: number;
  };
  /** Editorial branch for copy and FAQ selection. */
  lengthVerdict: 'short' | 'medium' | 'long';
  siblings: number[];
}

export function gravelPagePath(lengthFt: number): string {
  return `/how-much-gravel-for-a-${lengthFt}-ft-driveway/`;
}

export function getGravelLengths(): number[] {
  return LENGTHS;
}

function depthRow(lengthFt: number, depthIn: number): GravelDepthRow {
  const squareFeet = lengthFt * WIDTH_FT;
  const cubicFeet = squareFeet * (depthIn / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * TONS_PER_CUBIC_YARD;
  return {
    depthIn,
    cubicFeet,
    cubicYards,
    tons,
    costLow: Math.round(tons * TON_COST_LOW),
    costHigh: Math.round(tons * TON_COST_HIGH),
    truckLoads: Math.ceil(tons / 20),
  };
}

export function buildGravelPage(lengthFt: number): GravelPageData | undefined {
  if (!LENGTHS.includes(lengthFt)) return undefined;

  const depthRows = [4, 6, 8].map((d) => depthRow(lengthFt, d));
  const answer = depthRows[0];
  const baseRow = depthRow(lengthFt, 4);
  const surfaceRow = depthRow(lengthFt, 2);

  const lengthVerdict: GravelPageData['lengthVerdict'] =
    lengthFt <= 60 ? 'short' : lengthFt <= 200 ? 'medium' : 'long';

  const siblings = LENGTHS.filter((l) => l !== lengthFt)
    .map((l) => ({ l, diff: Math.abs(l - lengthFt) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 3)
    .map((s) => s.l);

  return {
    slug: `${lengthFt}`,
    lengthFt,
    widthFt: WIDTH_FT,
    squareFeet: lengthFt * WIDTH_FT,
    depthRows,
    answer: {
      cubicYards: answer.cubicYards,
      tons: answer.tons,
      costLow: answer.costLow,
      costHigh: answer.costHigh,
    },
    twoLayer: {
      baseYards: baseRow.cubicYards,
      baseTons: baseRow.tons,
      surfaceYards: surfaceRow.cubicYards,
      surfaceTons: surfaceRow.tons,
      totalTons: baseRow.tons + surfaceRow.tons,
    },
    lengthVerdict,
    siblings,
  };
}
