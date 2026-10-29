export type PostShape = 'square' | 'round';

export interface ConcreteInput {
  lengthFt: number;
  widthFt: number;
  thicknessIn: number;
  wastePercent?: number;
}

export interface ConcreteResult {
  cubicFeet: number;
  volumeWithWaste: number;
  cubicYards: number;
  eightyPoundBags: number;
}

export interface ConcreteBagsInput extends ConcreteInput {
  bagYieldCubicFeet: number;
}

export interface ConcreteBagsResult extends ConcreteResult {
  selectedBagCount: number;
}

export interface GravelInput extends ConcreteInput {
  densityTonsPerCubicYard?: number;
}

export interface GravelResult {
  cubicFeet: number;
  volumeWithWaste: number;
  cubicYards: number;
  tons: number;
}

export interface FencePostInput {
  postCount: number;
  holeDiameterIn: number;
  holeDepthIn: number;
  postShape?: PostShape;
  postWidthIn: number;
  postThicknessIn: number;
  postBuriedDepthIn: number;
  wastePercent?: number;
}

export interface FencePostResult {
  concretePerPostCubicFeet: number;
  totalConcreteCubicFeet: number;
  cubicYards: number;
  bagsPerPost: number;
  totalEightyPoundBags: number;
}

const CUBIC_FEET_PER_CUBIC_YARD = 27;
const EIGHTY_POUND_BAG_YIELD = 0.6;

function assertPositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be greater than 0.`);
  }
}

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} cannot be negative.`);
  }
}

function applyWaste(volumeCubicFeet: number, wastePercent: number): number {
  assertNonNegative(wastePercent, 'Waste');
  return volumeCubicFeet * (1 + wastePercent / 100);
}

export function calculateConcreteVolume({
  lengthFt,
  widthFt,
  thicknessIn,
}: Pick<ConcreteInput, 'lengthFt' | 'widthFt' | 'thicknessIn'>): number {
  assertPositive(lengthFt, 'Length');
  assertPositive(widthFt, 'Width');
  assertPositive(thicknessIn, 'Thickness');
  return lengthFt * widthFt * (thicknessIn / 12);
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const cubicFeet = calculateConcreteVolume(input);
  const volumeWithWaste = applyWaste(cubicFeet, input.wastePercent ?? 0);
  return {
    cubicFeet,
    volumeWithWaste,
    cubicYards: volumeWithWaste / CUBIC_FEET_PER_CUBIC_YARD,
    eightyPoundBags: Math.ceil(volumeWithWaste / EIGHTY_POUND_BAG_YIELD),
  };
}

export function calculateConcreteBags(input: ConcreteBagsInput): ConcreteBagsResult {
  assertPositive(input.bagYieldCubicFeet, 'Bag yield');
  const concrete = calculateConcrete(input);
  return {
    ...concrete,
    selectedBagCount: Math.ceil(concrete.volumeWithWaste / input.bagYieldCubicFeet),
  };
}

export function calculateGravel(input: GravelInput): GravelResult {
  const density = input.densityTonsPerCubicYard ?? 1.4;
  assertPositive(density, 'Gravel density');
  const cubicFeet = calculateConcreteVolume(input);
  const volumeWithWaste = applyWaste(cubicFeet, input.wastePercent ?? 0);
  const cubicYards = volumeWithWaste / CUBIC_FEET_PER_CUBIC_YARD;
  return {
    cubicFeet,
    volumeWithWaste,
    cubicYards,
    tons: cubicYards * density,
  };
}

export function calculateFencePostConcrete(input: FencePostInput): FencePostResult {
  const {
    postCount,
    holeDiameterIn,
    holeDepthIn,
    postShape = 'square',
    postWidthIn,
    postThicknessIn,
    postBuriedDepthIn,
    wastePercent = 0,
  } = input;

  assertPositive(postCount, 'Post count');
  assertPositive(holeDiameterIn, 'Hole diameter');
  assertPositive(holeDepthIn, 'Hole depth');
  assertPositive(postWidthIn, 'Post width');
  assertPositive(postThicknessIn, 'Post thickness');
  assertPositive(postBuriedDepthIn, 'Post buried depth');

  if (postBuriedDepthIn > holeDepthIn) {
    throw new RangeError('Post buried depth cannot be greater than hole depth.');
  }

  const holeRadiusFt = holeDiameterIn / 2 / 12;
  const holeVolume = Math.PI * holeRadiusFt ** 2 * (holeDepthIn / 12);

  const postWidthFt = postWidthIn / 12;
  const postThicknessFt = postThicknessIn / 12;
  const buriedDepthFt = postBuriedDepthIn / 12;

  const postVolume =
    postShape === 'round'
      ? Math.PI * (postWidthFt / 2) ** 2 * buriedDepthFt
      : postWidthFt * postThicknessFt * buriedDepthFt;

  const concretePerPost = holeVolume - postVolume;
  if (concretePerPost <= 0) {
    throw new RangeError('The post fills the entire hole. Increase the hole diameter.');
  }

  const concretePerPostWithWaste = applyWaste(concretePerPost, wastePercent);
  const totalConcrete = concretePerPostWithWaste * postCount;

  return {
    concretePerPostCubicFeet: concretePerPostWithWaste,
    totalConcreteCubicFeet: totalConcrete,
    cubicYards: totalConcrete / CUBIC_FEET_PER_CUBIC_YARD,
    bagsPerPost: Math.ceil(concretePerPostWithWaste / EIGHTY_POUND_BAG_YIELD),
    totalEightyPoundBags: Math.ceil(totalConcrete / EIGHTY_POUND_BAG_YIELD),
  };
}

export interface FramingInput {
  wallLengthFt: number;
  wallHeightFt: number;
  /** Center-to-center stud spacing in inches: 12, 16, 19.2 or 24. */
  studSpacingIn?: number;
  /** Parallel runs of plate: 3 for a single bottom plus double top plate. */
  plateRuns?: number;
  /** Doors and windows. Each one replaces line studs with king and jack studs. */
  openings?: number;
  /** Average rough opening width in inches, used to drop the studs it covers. */
  openingWidthIn?: number;
  /** Corners and wall intersections. Each one adds a third stud. */
  corners?: number;
  wastePercent?: number;
  /** Nominal width in inches: 4 for 2x4, 6 for 2x6. */
  nominalWidthIn?: number;
}

export interface FramingResult {
  /** Studs the layout spacing asks for, before openings, corners and waste. */
  lineStuds: number;
  /** Net studs added by openings and corners. */
  extraStuds: number;
  studsBeforeWaste: number;
  /** Studs to buy, waste included. */
  studs: number;
  /** Shortest stock length that still covers the wall height, in feet. */
  buyLengthFt: number;
  plateLinearFeet: number;
  /** Plate boards, bought at buyLengthFt and cut down. */
  plateBoards: number;
  totalBoards: number;
  linearFeet: number;
  boardFeet: number;
}

/** Stock lengths stocked by every yard and home center. */
const LUMBER_LENGTHS_FT = [8, 10, 12, 14, 16];

/**
 * Framing takeoff for one straight wall.
 *
 * Studs land on a layout spacing measured from one end, plus one closing stud
 * at the far end, which is why an 8 ft wall at 16 in on center takes 7 and not
 * 6. Openings are handled as a swap rather than an addition: four studs (two
 * king, two jack) go in around the opening, and the layout studs the opening
 * covers come out. Plates are bought as whole boards at the same stock length
 * as the studs, so a 20 ft wall at 8 ft stock means three boards per run no
 * matter how the cuts fall.
 */
export function calculateFraming(input: FramingInput): FramingResult {
  const {
    wallLengthFt,
    wallHeightFt,
    studSpacingIn = 16,
    plateRuns = 3,
    openings = 0,
    openingWidthIn = 36,
    corners = 0,
    wastePercent = 10,
    nominalWidthIn = 4,
  } = input;

  assertPositive(wallLengthFt, 'Wall length');
  assertPositive(wallHeightFt, 'Wall height');
  assertPositive(studSpacingIn, 'Stud spacing');
  assertPositive(plateRuns, 'Plate runs');
  assertNonNegative(openings, 'Openings');
  assertNonNegative(corners, 'Corners');
  assertNonNegative(wastePercent, 'Waste');

  const buyLengthFt = LUMBER_LENGTHS_FT.find((length) => length >= wallHeightFt);
  if (buyLengthFt === undefined) {
    throw new RangeError('Wall height above 16 ft needs engineered studs, not stock lumber.');
  }

  const lineStuds = Math.ceil((wallLengthFt * 12) / studSpacingIn) + 1;

  // A 36 in door at 16 in on center covers two layout studs; the four that
  // frame it back in are the net addition. Windows behave the same way.
  const studsReplacedPerOpening = Math.floor(openingWidthIn / studSpacingIn);
  const extraPerOpening = Math.max(4 - studsReplacedPerOpening, 1);
  const extraStuds = openings * extraPerOpening + corners;

  const studsBeforeWaste = lineStuds + extraStuds;
  const studs = Math.ceil(studsBeforeWaste * (1 + wastePercent / 100));

  const plateLinearFeet = plateRuns * wallLengthFt;
  const plateBoards = Math.ceil(wallLengthFt / buyLengthFt) * plateRuns;

  const linearFeet = studs * buyLengthFt + plateLinearFeet;
  const boardFeet = (linearFeet * 2 * nominalWidthIn) / 12;

  return {
    lineStuds,
    extraStuds,
    studsBeforeWaste,
    studs,
    buyLengthFt,
    plateLinearFeet,
    plateBoards,
    totalBoards: studs + plateBoards,
    linearFeet,
    boardFeet,
  };
}

export interface FootingDepthInput {
  /** Frost depth the jurisdiction enforces, in inches. */
  frostDepthIn: number;
  holeDiameterIn: number;
  /** Footing count. */
  count: number;
  /** Buried post size in inches; 0 means a solid concrete footing with no post. */
  postWidthIn?: number;
  postThicknessIn?: number;
  wastePercent?: number;
}

export interface FootingDepthResult {
  /** Frost depth plus the 6 in bearing layer. */
  digDepthIn: number;
  /** Shortest standard Sonotube length that reaches the dig depth, in feet. */
  tubeLengthFt: number;
  concretePerFootingCubicFeet: number;
  totalConcreteCubicFeet: number;
  cubicYards: number;
  bagsPerFooting: number;
  totalEightyPoundBags: number;
}

/** Standard Sonotube lengths sold at home centers. */
const TUBE_LENGTHS_FT = [4, 6, 8, 12];

/**
 * Footing depth from a published frost depth.
 *
 * Dig depth is frost depth plus 6 in of bearing below it, which is the usual
 * cushion poured below the frost line so the footing bears on soil that never
 * freezes. The hole is a cylinder; when a post sits in it the buried post
 * volume comes out of the concrete.
 */
export function calculateFootingDepth(input: FootingDepthInput): FootingDepthResult {
  const { frostDepthIn, holeDiameterIn, count, postWidthIn = 0, postThicknessIn = 0, wastePercent = 0 } = input;

  assertNonNegative(frostDepthIn, 'Frost depth');
  assertPositive(holeDiameterIn, 'Hole diameter');
  assertPositive(count, 'Footing count');

  const digDepthIn = frostDepthIn + 6;
  const holeRadiusFt = holeDiameterIn / 2 / 12;
  const holeVolume = Math.PI * holeRadiusFt ** 2 * (digDepthIn / 12);

  const postVolume =
    postWidthIn > 0 && postThicknessIn > 0
      ? (postWidthIn / 12) * (postThicknessIn / 12) * (digDepthIn / 12)
      : 0;

  const concretePerFooting = holeVolume - postVolume;
  if (concretePerFooting <= 0) {
    throw new RangeError('The post fills the entire hole. Increase the hole diameter.');
  }

  const perFootingWithWaste = applyWaste(concretePerFooting, wastePercent);
  const total = perFootingWithWaste * count;

  const tubeLengthFt = TUBE_LENGTHS_FT.find((length) => length * 12 >= digDepthIn) ?? 12;

  return {
    digDepthIn,
    tubeLengthFt,
    concretePerFootingCubicFeet: perFootingWithWaste,
    totalConcreteCubicFeet: total,
    cubicYards: total / CUBIC_FEET_PER_CUBIC_YARD,
    bagsPerFooting: Math.ceil(perFootingWithWaste / EIGHTY_POUND_BAG_YIELD),
    totalEightyPoundBags: Math.ceil(total / EIGHTY_POUND_BAG_YIELD),
  };
}
