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
