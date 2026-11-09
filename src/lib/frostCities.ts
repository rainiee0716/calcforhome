// Major-city quick reference for state frost pages. Each city maps to a zone
// row in frost.ts so the depth shown always matches the page's code table.
// Only states with confidently assignable cities are listed — others simply
// don't render the block. Confirm with the local building department applies.

export interface FrostCity {
  city: string;
  zoneLabel: string; // must match a frost.ts zone string for the state
}

export const frostCityZones: Record<string, FrostCity[]> = {
  Minnesota: [
    { city: 'Minneapolis', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Saint Paul', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Rochester', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Mankato', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Winona', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Faribault', zoneLabel: 'Zone II, Twin Cities & south' },
    { city: 'Duluth', zoneLabel: 'Zone I, north & central' },
    { city: 'Brainerd', zoneLabel: 'Zone I, north & central' },
    { city: 'Bemidji', zoneLabel: 'Zone I, north & central' },
    { city: 'Grand Rapids', zoneLabel: 'Zone I, north & central' },
    { city: 'International Falls', zoneLabel: 'Zone I, north & central' },
    { city: 'Moorhead', zoneLabel: 'Zone I, north & central' },
  ],
};

// State pages with a YouTube explainer embedded (video id only; iframe is
// rendered lazy via youtube-nocookie and carries VideoObject schema).
export const frostVideos: Record<string, string> = {
  Minnesota: 'VvyJPt92GiE',
};

// Statewide states (single depth, no zone rows) use the label 'Statewide'.
export const frostCityZonesMore: Record<string, FrostCity[]> = {
  Michigan: [
    { city: 'Detroit', zoneLabel: 'Statewide' },
    { city: 'Grand Rapids', zoneLabel: 'Statewide' },
    { city: 'Ann Arbor', zoneLabel: 'Statewide' },
    { city: 'Lansing', zoneLabel: 'Statewide' },
    { city: 'Kalamazoo', zoneLabel: 'Statewide' },
    { city: 'Traverse City', zoneLabel: 'Statewide' },
  ],
  Wisconsin: [
    { city: 'Milwaukee', zoneLabel: 'Statewide' },
    { city: 'Madison', zoneLabel: 'Statewide' },
    { city: 'Green Bay', zoneLabel: 'Statewide' },
    { city: 'Appleton', zoneLabel: 'Statewide' },
    { city: 'Eau Claire', zoneLabel: 'Statewide' },
    { city: 'La Crosse', zoneLabel: 'Statewide' },
  ],
  Pennsylvania: [
    { city: 'Philadelphia', zoneLabel: 'Statewide' },
    { city: 'Pittsburgh', zoneLabel: 'Statewide' },
    { city: 'Allentown', zoneLabel: 'Statewide' },
    { city: 'Harrisburg', zoneLabel: 'Statewide' },
    { city: 'Erie', zoneLabel: 'Statewide' },
    { city: 'Scranton', zoneLabel: 'Statewide' },
  ],
  'New York': [
    { city: 'New York City', zoneLabel: 'New York City & Long Island' },
    { city: 'Brooklyn', zoneLabel: 'New York City & Long Island' },
    { city: 'Queens', zoneLabel: 'New York City & Long Island' },
    { city: 'Hempstead (Long Island)', zoneLabel: 'New York City & Long Island' },
    { city: 'Buffalo', zoneLabel: 'Upstate, Catskills & Adirondacks' },
    { city: 'Rochester', zoneLabel: 'Upstate, Catskills & Adirondacks' },
    { city: 'Albany', zoneLabel: 'Upstate, Catskills & Adirondacks' },
    { city: 'Syracuse', zoneLabel: 'Upstate, Catskills & Adirondacks' },
    { city: 'Binghamton', zoneLabel: 'Upstate, Catskills & Adirondacks' },
  ],
  Colorado: [
    { city: 'Denver', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Colorado Springs', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Aurora', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Fort Collins', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Boulder', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Pueblo', zoneLabel: 'Front Range (Denver, Colorado Springs)' },
    { city: 'Aspen', zoneLabel: 'Mountain towns above 7,500 ft' },
    { city: 'Vail', zoneLabel: 'Mountain towns above 7,500 ft' },
    { city: 'Breckenridge', zoneLabel: 'Mountain towns above 7,500 ft' },
    { city: 'Leadville', zoneLabel: 'Mountain towns above 7,500 ft' },
  ],
  'North Carolina': [
    { city: 'Wilmington', zoneLabel: 'Piedmont & coast' },
    { city: 'Charlotte', zoneLabel: 'Piedmont & coast' },
    { city: 'Raleigh', zoneLabel: 'Piedmont & coast' },
    { city: 'Durham', zoneLabel: 'Piedmont & coast' },
    { city: 'Greensboro', zoneLabel: 'Piedmont & coast' },
    { city: 'Fayetteville', zoneLabel: 'Piedmont & coast' },
    { city: 'Asheville', zoneLabel: 'Mountain counties (Asheville, Boone)' },
    { city: 'Boone', zoneLabel: 'Mountain counties (Asheville, Boone)' },
  ],
  'North Dakota': [
    { city: 'Fargo', zoneLabel: 'Fargo & southern tier' },
    { city: 'West Fargo', zoneLabel: 'Fargo & southern tier' },
    { city: 'Grand Forks', zoneLabel: 'Northern tier (Minot, Grand Forks)' },
    { city: 'Minot', zoneLabel: 'Northern tier (Minot, Grand Forks)' },
    { city: 'Williston', zoneLabel: 'Northern tier (Minot, Grand Forks)' },
  ],
  Ohio: [
    { city: 'Columbus', zoneLabel: 'Statewide' },
    { city: 'Cleveland', zoneLabel: 'Statewide' },
    { city: 'Cincinnati', zoneLabel: 'Statewide' },
    { city: 'Toledo', zoneLabel: 'Statewide' },
    { city: 'Akron', zoneLabel: 'Statewide' },
    { city: 'Dayton', zoneLabel: 'Statewide' },
  ],
};

// 合并视图：州页模板只查这一个表
export const frostCityZonesAll: Record<string, FrostCity[]> = {
  ...frostCityZones,
  ...frostCityZonesMore,
};
