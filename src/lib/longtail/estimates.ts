// Batch-3 long-tail pages: gravel road calculator, bulk-vs-bags comparison,
// and a full gravel driveway estimate. Pure functions shared with the pages'
// client-side forms.

const YARDS_PER_CUBIC_FOOT = 1 / 27;

export interface GravelRoadInput {
  lengthFt: number;
  widthFt: number;
  depthIn: number;
}

export interface GravelRoadResult {
  squareFeet: number;
  cubicFeet: number;
  cubicYards: number;
  tons: number;
  truckLoads: number;
}

/** Gravel roads run heavier stone (road base ≈1.45 t/yd³) than landscape gravel. */
export function calculateGravelRoad(input: GravelRoadInput): GravelRoadResult {
  const { lengthFt, widthFt, depthIn } = input;
  if (!(lengthFt > 0) || !(widthFt > 0) || !(depthIn > 0)) {
    throw new RangeError('All dimensions must be greater than 0.');
  }
  const squareFeet = lengthFt * widthFt;
  const cubicFeet = squareFeet * (depthIn / 12);
  const cubicYards = cubicFeet * YARDS_PER_CUBIC_FOOT;
  const tons = cubicYards * 1.45;
  return {
    squareFeet,
    cubicFeet,
    cubicYards,
    tons,
    truckLoads: Math.ceil(tons / 20),
  };
}

export interface BulkVsBagsInput {
  cubicYards: number;
  bulkPricePerTon: number;
  bagPrice: number;
}

export interface BulkVsBagsResult {
  tons: number;
  bulkCost: number;
  bagCount: number;
  baggedCost: number;
  savings: number;
  /** True when bags are the cheaper option. */
  bagsCheaper: boolean;
  /** The cubic-yard volume where bulk starts winning (bagged $/yd ÷ bulk $/yd). */
  crossoverYards: number;
}

/** Bulk stone ≈1.4 t/yd³ delivered; individual bags hold 0.5 cu ft. */
export function calculateBulkVsBags(input: BulkVsBagsInput): BulkVsBagsResult {
  const { cubicYards, bulkPricePerTon, bagPrice } = input;
  if (!(cubicYards > 0) || !(bulkPricePerTon > 0) || !(bagPrice > 0)) {
    throw new RangeError('All values must be greater than 0.');
  }
  const tons = cubicYards * 1.4;
  const bulkCost = tons * bulkPricePerTon;
  const bagCount = Math.ceil((cubicYards * 27) / 0.5);
  const baggedCost = bagCount * bagPrice;
  const dollarsPerYardBulk = bulkPricePerTon * 1.4;
  const crossoverYards = (dollarsPerYardBulk > 0) ? 6 * bagPrice / dollarsPerYardBulk : 0;
  return {
    tons,
    bulkCost,
    bagCount,
    baggedCost,
    savings: Math.abs(baggedCost - bulkCost),
    bagsCheaper: baggedCost < bulkCost,
    crossoverYards,
  };
}

export interface DrivewayEstimateInput {
  lengthFt: number;
  widthFt: number;
  depthIn: number;
  includeGeotextile: boolean;
  includeExcavation: boolean;
}

export interface DrivewayEstimateResult {
  squareFeet: number;
  cubicYards: number;
  tons: number;
  materialCostLow: number;
  materialCostHigh: number;
  deliveryFee: number;
  geotextileCost: number;
  excavationCostLow: number;
  excavationCostHigh: number;
  totalLow: number;
  totalHigh: number;
}

/** Full gravel driveway estimate: material + delivery + optional fabric and grading. */
export function estimateDriveway(input: DrivewayEstimateInput): DrivewayEstimateResult {
  const { lengthFt, widthFt, depthIn, includeGeotextile, includeExcavation } = input;
  if (!(lengthFt > 0) || !(widthFt > 0) || !(depthIn > 0)) {
    throw new RangeError('All dimensions must be greater than 0.');
  }
  const squareFeet = lengthFt * widthFt;
  const cubicFeet = squareFeet * (depthIn / 12);
  const cubicYards = cubicFeet * YARDS_PER_CUBIC_FOOT;
  const tons = cubicYards * 1.4;
  const materialCostLow = Math.round(tons * 30);
  const materialCostHigh = Math.round(tons * 60);
  const deliveryFee = 100 + Math.round((Math.min(300, Math.max(0, tons)) / 300) * 200);
  const geotextileCost = includeGeotextile ? Math.round(squareFeet * 0.45) : 0;
  const excavationCostLow = includeExcavation ? Math.round(squareFeet * 0.5) : 0;
  const excavationCostHigh = includeExcavation ? Math.round(squareFeet * 2) : 0;
  return {
    squareFeet,
    cubicYards,
    tons,
    materialCostLow,
    materialCostHigh,
    deliveryFee,
    geotextileCost,
    excavationCostLow,
    excavationCostHigh,
    totalLow: materialCostLow + deliveryFee + geotextileCost + excavationCostLow,
    totalHigh: materialCostHigh + deliveryFee + geotextileCost + excavationCostHigh,
  };
}
