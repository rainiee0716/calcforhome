// Frost depth reference data.
//
// Every number here is a code value that some jurisdiction publishes and
// enforces for permit review — not a measured average. Measured frost
// penetration and the depth an inspector checks are different quantities and
// routinely differ by a foot or more, so only the code value is listed.
//
// Where a state delegates the number to local government, `basis` says so and
// the depth is the value used by the largest city that publishes one. States
// with two distinct zones get one region object per zone.

export interface FrostRegion {
  /** Stable id used by the page selector. */
  id: string;
  state: string;
  abbr: string;
  /** Zone description, e.g. "Zone I — north & central". */
  zone?: string;
  /** Required footing depth in inches below finished grade. */
  depth: number;
  /** Code section or authority that sets the number. */
  basis: string;
  /** True when the value applies statewide rather than to one city. */
  statewide: boolean;
}

export const FROST_REGIONS: FrostRegion[] = [
  { id: 'al', state: 'Alabama', abbr: 'AL', depth: 12, basis: 'IRC R403.1.4 minimum; no frost requirement', statewide: false },
  { id: 'ak-sc', state: 'Alaska', abbr: 'AK', zone: 'Southcentral & coastal (Anchorage)', depth: 42, basis: 'Anchorage Municipal Code Title 23', statewide: false },
  { id: 'ak-int', state: 'Alaska', abbr: 'AK', zone: 'Interior (Fairbanks, North Slope)', depth: 72, basis: 'Set by borough; local amendment', statewide: false },
  { id: 'az-low', state: 'Arizona', abbr: 'AZ', zone: 'Phoenix & low desert', depth: 12, basis: 'IRC R403.1.4 minimum; local Table R301.2(1)', statewide: false },
  { id: 'az-high', state: 'Arizona', abbr: 'AZ', zone: 'High country (Flagstaff, Show Low)', depth: 30, basis: 'Local amendment to IRC Table R301.2(1)', statewide: false },
  { id: 'ar', state: 'Arkansas', abbr: 'AR', depth: 14, basis: 'Arkansas Fire Prevention Code (IRC) Table R301.2(1)', statewide: false },
  { id: 'ca-coast', state: 'California', abbr: 'CA', zone: 'Coast, valley & desert', depth: 12, basis: 'CRC R403.1.4 minimum', statewide: false },
  { id: 'ca-mtn', state: 'California', abbr: 'CA', zone: 'Mountain counties (Tahoe, Sierra)', depth: 30, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'co-front', state: 'Colorado', abbr: 'CO', zone: 'Front Range (Denver, Colorado Springs)', depth: 36, basis: 'Denver amendments to IRC Table R301.2(1)', statewide: false },
  { id: 'co-mtn', state: 'Colorado', abbr: 'CO', zone: 'Mountain towns above 7,500 ft', depth: 60, basis: 'Local amendment; engineer determination common', statewide: false },
  { id: 'ct', state: 'Connecticut', abbr: 'CT', depth: 42, basis: 'Connecticut State Building Code', statewide: true },
  { id: 'de', state: 'Delaware', abbr: 'DE', depth: 30, basis: 'County Table R301.2(1)', statewide: false },
  { id: 'dc', state: 'District of Columbia', abbr: 'DC', depth: 30, basis: 'DC Construction Codes Table R301.2(1)', statewide: true },
  { id: 'fl', state: 'Florida', abbr: 'FL', depth: 12, basis: 'Florida Building Code R403.1.4 minimum; no frost', statewide: true },
  { id: 'ga-s', state: 'Georgia', abbr: 'GA', zone: 'Most of the state, including Atlanta', depth: 12, basis: 'Georgia amendment to IRC Table R301.2(1)', statewide: false },
  { id: 'ga-n', state: 'Georgia', abbr: 'GA', zone: 'North Georgia mountains', depth: 14, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'hi', state: 'Hawaii', abbr: 'HI', depth: 12, basis: 'IRC R403.1.4 minimum; no frost', statewide: true },
  { id: 'id-s', state: 'Idaho', abbr: 'ID', zone: 'Boise, Treasure Valley & south', depth: 30, basis: 'Idaho Residential Code Table R301.2(1)', statewide: false },
  { id: 'id-n', state: 'Idaho', abbr: 'ID', zone: 'Northern & mountain counties', depth: 48, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'il-chi', state: 'Illinois', abbr: 'IL', zone: 'Chicago & northeast', depth: 42, basis: 'Chicago Building Code', statewide: false },
  { id: 'il-s', state: 'Illinois', abbr: 'IL', zone: 'Central & southern Illinois', depth: 30, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'in', state: 'Indiana', abbr: 'IN', depth: 36, basis: 'Indiana Residential Code Table R301.2(1)', statewide: false },
  { id: 'ia', state: 'Iowa', abbr: 'IA', depth: 42, basis: 'Iowa State Building Code', statewide: true },
  { id: 'ks', state: 'Kansas', abbr: 'KS', depth: 36, basis: 'Local Table R301.2(1); 30 in Wichita', statewide: false },
  { id: 'ky', state: 'Kentucky', abbr: 'KY', depth: 24, basis: 'Kentucky Residential Code Table R301.2(1)', statewide: true },
  { id: 'la', state: 'Louisiana', abbr: 'LA', depth: 12, basis: 'IRC R403.1.4 minimum; no frost', statewide: true },
  { id: 'me-s', state: 'Maine', abbr: 'ME', zone: 'Southern & coastal', depth: 48, basis: 'MUBEC (IRC) Table R301.2(1)', statewide: false },
  { id: 'me-n', state: 'Maine', abbr: 'ME', zone: 'Northern & western mountains', depth: 72, basis: 'Town Table R301.2(1)', statewide: false },
  { id: 'md', state: 'Maryland', abbr: 'MD', depth: 30, basis: 'Maryland Building Performance Standards (IRC)', statewide: false },
  { id: 'ma', state: 'Massachusetts', abbr: 'MA', depth: 48, basis: '780 CMR R403.1.4.1 (4 ft)', statewide: true },
  { id: 'mi', state: 'Michigan', abbr: 'MI', depth: 42, basis: 'Michigan Residential Code R403.1.4.1', statewide: true },
  { id: 'mn-2', state: 'Minnesota', abbr: 'MN', zone: 'Zone II, Twin Cities & south', depth: 42, basis: 'Minn. R. 1303.1600', statewide: false },
  { id: 'mn-1', state: 'Minnesota', abbr: 'MN', zone: 'Zone I, north & central', depth: 60, basis: 'Minn. R. 1303.1600', statewide: false },
  { id: 'ms', state: 'Mississippi', abbr: 'MS', depth: 12, basis: 'IRC R403.1.4 minimum; no frost', statewide: true },
  { id: 'mo-stl', state: 'Missouri', abbr: 'MO', zone: 'St. Louis & east', depth: 30, basis: 'St. Louis amendments to IRC Table R301.2(1)', statewide: false },
  { id: 'mo-kc', state: 'Missouri', abbr: 'MO', zone: 'Kansas City & north', depth: 36, basis: 'Kansas City Building and Rehabilitation Code', statewide: false },
  { id: 'mt-e', state: 'Montana', abbr: 'MT', zone: 'Eastern plains (Billings)', depth: 42, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'mt-w', state: 'Montana', abbr: 'MT', zone: 'Mountain valleys (Bozeman, Missoula)', depth: 60, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'ne', state: 'Nebraska', abbr: 'NE', depth: 42, basis: 'Omaha Municipal Code Ch. 43; Lincoln amendments', statewide: false },
  { id: 'nv-s', state: 'Nevada', abbr: 'NV', zone: 'Las Vegas & southern Nevada', depth: 12, basis: 'IRC R403.1.4 minimum', statewide: false },
  { id: 'nv-n', state: 'Nevada', abbr: 'NV', zone: 'Reno, Tahoe & northern Nevada', depth: 24, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'nh', state: 'New Hampshire', abbr: 'NH', depth: 48, basis: 'NH Residential Code (IRC) Table R301.2(1)', statewide: false },
  { id: 'nj', state: 'New Jersey', abbr: 'NJ', depth: 36, basis: 'NJ Uniform Construction Code Table R301.2(1)', statewide: false },
  { id: 'nm-abq', state: 'New Mexico', abbr: 'NM', zone: 'Albuquerque & south', depth: 18, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'nm-n', state: 'New Mexico', abbr: 'NM', zone: 'Santa Fe & northern mountains', depth: 30, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'ny-nyc', state: 'New York', abbr: 'NY', zone: 'New York City & Long Island', depth: 48, basis: 'NYC Building Code 1809.5 (4 ft)', statewide: false },
  { id: 'ny-up', state: 'New York', abbr: 'NY', zone: 'Upstate, Catskills & Adirondacks', depth: 60, basis: 'NYS Residential Code Table R301.2(1)', statewide: false },
  { id: 'nc', state: 'North Carolina', abbr: 'NC', zone: 'Piedmont & coast', depth: 12, basis: 'NC Residential Code Table R301.2(1)', statewide: false },
  { id: 'nc-mtn', state: 'North Carolina', abbr: 'NC', zone: 'Mountain counties (Asheville, Boone)', depth: 24, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'nd-s', state: 'North Dakota', abbr: 'ND', zone: 'Fargo & southern tier', depth: 48, basis: 'Fargo Municipal Code (IRC amendments)', statewide: false },
  { id: 'nd-n', state: 'North Dakota', abbr: 'ND', zone: 'Northern tier (Minot, Grand Forks)', depth: 60, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'oh', state: 'Ohio', abbr: 'OH', depth: 32, basis: 'Ohio Residential Code Table R301.2(1)', statewide: true },
  { id: 'ok', state: 'Oklahoma', abbr: 'OK', depth: 18, basis: 'Local Table R301.2(1); 18 in OKC and Tulsa', statewide: false },
  { id: 'or-w', state: 'Oregon', abbr: 'OR', zone: 'West of the Cascades', depth: 12, basis: 'ORSC R403.1.4 (12 in minimum)', statewide: false },
  { id: 'or-e', state: 'Oregon', abbr: 'OR', zone: 'East of the Cascades (Bend, Pendleton)', depth: 24, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'pa', state: 'Pennsylvania', abbr: 'PA', depth: 36, basis: 'PA Uniform Construction Code Table R301.2(1)', statewide: false },
  { id: 'ri', state: 'Rhode Island', abbr: 'RI', depth: 36, basis: 'RI Residential Code Table R301.2(1)', statewide: false },
  { id: 'sc', state: 'South Carolina', abbr: 'SC', depth: 12, basis: 'IRC R403.1.4 minimum; no frost', statewide: true },
  { id: 'sd', state: 'South Dakota', abbr: 'SD', depth: 48, basis: 'Sioux Falls (IRC amendments); Rapid City 42', statewide: false },
  { id: 'tn', state: 'Tennessee', abbr: 'TN', depth: 18, basis: 'Local Table R301.2(1); Nashville 12', statewide: false },
  { id: 'tx', state: 'Texas', abbr: 'TX', zone: 'Most of the state', depth: 12, basis: 'IRC R403.1.4 minimum', statewide: false },
  { id: 'tx-pan', state: 'Texas', abbr: 'TX', zone: 'Panhandle (Amarillo)', depth: 24, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'ut', state: 'Utah', abbr: 'UT', zone: 'Salt Lake & Wasatch Front', depth: 30, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'ut-mtn', state: 'Utah', abbr: 'UT', zone: 'Mountain counties (Park City, Logan)', depth: 48, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'vt', state: 'Vermont', abbr: 'VT', depth: 48, basis: 'Set by municipality; 48 typical', statewide: false },
  { id: 'va-e', state: 'Virginia', abbr: 'VA', zone: 'Richmond & eastern Virginia', depth: 18, basis: 'Virginia Residential Code Table R301.2(1)', statewide: false },
  { id: 'va-n', state: 'Virginia', abbr: 'VA', zone: 'Northern Virginia', depth: 24, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'wa-w', state: 'Washington', abbr: 'WA', zone: 'Seattle & west of the Cascades', depth: 12, basis: 'Washington State Residential Code Table R301.2(1)', statewide: false },
  { id: 'wa-e', state: 'Washington', abbr: 'WA', zone: 'Spokane & east of the Cascades', depth: 24, basis: 'Spokane Municipal Code Table R301.2(1)', statewide: false },
  { id: 'wv', state: 'West Virginia', abbr: 'WV', depth: 30, basis: 'WV State Building Code (IRC)', statewide: false },
  { id: 'wi', state: 'Wisconsin', abbr: 'WI', depth: 48, basis: 'Wis. UDC SPS 321.16 (40 in in some southern counties)', statewide: true },
  { id: 'wy-e', state: 'Wyoming', abbr: 'WY', zone: 'Cheyenne & southeast', depth: 36, basis: 'Local Table R301.2(1)', statewide: false },
  { id: 'wy-w', state: 'Wyoming', abbr: 'WY', zone: 'Casper, Laramie & west', depth: 42, basis: 'Local Table R301.2(1)', statewide: false },
];

/** Regions grouped by state, preserving the order states first appear in FROST_REGIONS. */
export function regionsByState(): Array<{ state: string; abbr: string; regions: FrostRegion[] }> {
  const groups: Array<{ state: string; abbr: string; regions: FrostRegion[] }> = [];
  for (const region of FROST_REGIONS) {
    const last = groups[groups.length - 1];
    if (last && last.state === region.state) {
      last.regions.push(region);
    } else {
      groups.push({ state: region.state, abbr: region.abbr, regions: [region] });
    }
  }
  return groups;
}

/**
 * Air-freezing index to design frost depth, from HUD's Table 1 in the
 * Manufactured Home Construction and Safety Standards (24 CFR 3285.312),
 * published at 82 FR 28596. Values are the published pairs; between them the
 * table steps, so we return the next row at or above the index rather than
 * interpolating — a footing should not be designed from an interpolated guess.
 */
export const AFI_TABLE: Array<{ afi: number; depthIn: number }> = [
  { afi: 50, depthIn: 3 },
  { afi: 250, depthIn: 9 },
  { afi: 350, depthIn: 12 },
  { afi: 500, depthIn: 16 },
  { afi: 1000, depthIn: 24 },
  { afi: 1500, depthIn: 32 },
  { afi: 2000, depthIn: 40 },
  { afi: 2500, depthIn: 45 },
  { afi: 3000, depthIn: 52 },
  { afi: 3500, depthIn: 57 },
  { afi: 4000, depthIn: 62 },
  { afi: 4250, depthIn: 65 },
];

export function designFrostDepthFromAfi(afi: number): number | null {
  if (!Number.isFinite(afi) || afi < 0) return null;
  if (afi > 4250) return 65;
  for (const row of AFI_TABLE) {
    if (afi <= row.afi) return row.depthIn;
  }
  return 65;
}
