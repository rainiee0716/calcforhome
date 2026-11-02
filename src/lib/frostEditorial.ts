// Per-state editorial context for the frost-depth state pages.
//
// Every entry restates facts that are already in FROST_REGIONS (zones, code
// citations, depths) in prose, plus uncontroversial geography. The point is
// that each state page opens with something unique to it, not that these are
// independent research claims — where a number appears here, the table above
// it on the page is the source of truth.

export const FROST_EDITORIAL: Record<string, string> = {
  Alabama:
    'Alabama sits on the Gulf Coast, and the code acknowledges it: there is no frost requirement at all, only the IRC\'s 12-inch minimum so a footing bears on solid soil. What Alabama footings have to resist is water and wind, not ice.',

  Alaska:
    'Alaska has the deepest footing requirements in the country. Anchorage and the southern coast sit at 42 inches thanks to the moderating ocean, but Fairbanks and the North Slope — where the ground stays frozen for months — set the national ceiling at 72 inches, and boroughs can require more.',

  Arizona:
    "Elevation, not latitude, writes Arizona's frost rule. The Phoenix and Tucson desert floor almost never freezes past a few inches, so 12 inches suffices there, while Flagstaff and the Show Low high country at 6,000 to 7,000 feet demand 30.",

  Arkansas:
    "Arkansas sits just deep enough into the South to catch an occasional Ozark freeze, and its statewide code responds with 14 inches — two inches past the Deep South minimum, and rarely the binding constraint on a dig.",

  California:
    "California's rule is really two climates under one code: 12 inches across the coastal, valley and desert counties where a hard freeze is news, and 30 inches in the Tahoe and Sierra mountain counties where snowpack sits for months.",

  Colorado:
    "Colorado's Front Range runs a chinook-moderated 36 inches in Denver and Colorado Springs, but the mountain towns above 7,500 feet want 60 — and up there a geotechnical engineer's sign-off is common, because mountain soil freezes unevenly.",

  Connecticut:
    'Connecticut keeps it simple: 42 inches everywhere, one number for one New England winter. The state building code sets it, so every town building department measures the same depth.',

  Delaware:
    'Delaware is a mid-Atlantic transition state: 30 inches, set county by county through Table R301.2(1) amendments — deep enough for Delmarva cold snaps, shallow enough that dig season runs most of the year.',

  'District of Columbia':
    'The District sets 30 inches through its construction codes — a mid-Atlantic value enforced inside one jurisdiction rather than ninety-five counties, which makes it one of the easier answers to confirm: one building department, one number.',

  Florida:
    'Florida has no frost line to speak of, and the code says so explicitly. Footings there are engineered against wind uplift and saturated sand, which is why the 12-inch minimum comes with a "no frost requirement" note rather than a climate table.',

  Georgia:
    'Georgia barely splits in two: 12 inches across most of the state including Atlanta, and 14 inches in the north-Georgia mountains where elevation buys a slightly colder winter. The two-inch spread is the smallest of any split state.',

  Hawaii:
    'Hawaii is the easiest frost answer in the country: none. The 12-inch value is the IRC bearing minimum, not a climate number — tropical ground never freezes at footing depth.',

  Idaho:
    'The Rockies split Idaho in two: the Boise and Treasure Valley side of the state digs 30 inches, while the northern and mountain counties — farther north and higher — dig 48.',

  Illinois:
    'Illinois runs on two depths: 42 inches in Chicago and the northeast, where the city writes its own building code, and 30 inches across central and southern Illinois where winters moderate.',

  Indiana:
    'Indiana keeps one number for the whole state: 36 inches, set by the state residential code. Continental winters reach every county, and the flat ground gives frost nowhere to hide.',

  Iowa:
    "Iowa's 42 inches is a prairie number — no mountains to shelter a county and no coast to moderate it, so the state code applies one deep value everywhere.",

  Kansas:
    'Kansas slides from 36 inches in the north to 30 in Wichita, set locally through Table R301.2(1) amendments. The southern counties catch enough warm air that the code lets them dig shallower.',

  Kentucky:
    'Kentucky is upper-South country: 24 inches, one number statewide — deep enough for the bluegrass cold snaps, shallow enough that footing season never really closes.',

  Louisiana:
    'Like its Gulf neighbors, Louisiana has no frost requirement — the 12-inch code value is a bearing minimum. Ice storms occasionally reach Baton Rouge, but they never reach footing depth.',

  Maine:
    "Maine splits New England's coldest state in two: 48 inches along the southern coast, and 72 in the northern and western mountains — tied with interior Alaska for the deepest requirement in the country.",

  Maryland:
    'Maryland compresses a lot of climate into 30 inches: Chesapeake shore, Baltimore, and the western panhandle all dig the same depth under the state performance standards.',

  Massachusetts:
    'Massachusetts writes its frost rule into state law at 48 inches — 780 CMR, four feet even — one number from the Berkshires to Cape Cod.',

  Michigan:
    "Michigan's 42-inch statewide number is a Great Lakes number: the lakes bury the shoreline in snow and keep the air humid, but they do not stop the ground from freezing past three and a half feet.",

  Minnesota:
    'Minnesota is the textbook two-zone state. Minnesota Rules 1303.1600 draws a line across the state: 42 inches through the Twin Cities and the south, 60 in the northern and central counties — Duluth digs a foot deeper than Rochester.',

  Mississippi:
    'Mississippi is a Gulf state with no frost requirement — 12 inches is bearing, not climate. The design loads that matter there are hurricane wind and wet clay soil.',

  Missouri:
    'Missouri follows the Ozark line: 30 inches in St. Louis and the east, 36 in Kansas City and the north, where the state starts to feel like the plains.',

  Montana:
    "Montana's mountains set the split: 42 inches on the eastern plains around Billings, 60 in the mountain valleys — Bozeman and Missoula dig as deep as Minnesota's north.",

  Nebraska:
    'Nebraska is a plains state with one answer: 42 inches, set through Omaha\'s municipal code and Lincoln\'s amendments — deep enough for a state where arctic fronts sweep south unchecked.',

  Nevada:
    "Nevada is a Sierra rain-shadow state: 12 inches in Las Vegas and the southern desert, 24 around Reno, Tahoe and the north, where elevation does the work that latitude can't.",

  'New Hampshire':
    'New Hampshire runs 48 inches under the state residential code — standard New England depth, applied from the seacoast to the White Mountains.',

  'New Jersey':
    "New Jersey's 36 inches is a mid-Atlantic-to-northeast transition number, set through the state uniform construction code and applied in every municipality.",

  'New Mexico':
    'New Mexico climbs from 18 inches around Albuquerque and the south to 30 in Santa Fe and the northern mountains — high-desert elevation again, drawn in two code zones.',

  'New York':
    'New York is really two codes: New York City and Long Island run their own building code at 48 inches — section 1809.5, four feet even — while upstate, the Catskills and the Adirondacks follow the state residential code at 60.',

  'North Carolina':
    'North Carolina is a coastal state with an Appalachian exception: 12 inches across the Piedmont and coast, 24 in the mountain counties around Asheville and Boone.',

  'North Dakota':
    'North Dakota is second only to Alaska in frost severity. Fargo and the southern tier dig 48 inches; the northern tier — Minot, Grand Forks — goes to 60, and anyone who has left a shallow fence post out through a prairie winter has watched the ground push it back up.',

  Ohio:
    'Ohio sets an unusual number: 32 inches, statewide — neither the 30 of its southern neighbors nor the 36 next door. The state residential code simply publishes its own value.',

  Oklahoma:
    'Oklahoma is southern-plains country: 18 inches through Oklahoma City and Tulsa, set locally, with the code acknowledging that arctic fronts reach the state but rarely stay.',

  Oregon:
    'The Cascades are Oregon\'s frost line: 12 inches west of them in the maritime Willamette Valley, 24 east of them in Bend and Pendleton, where the climate turns continental.',

  Pennsylvania:
    "Pennsylvania runs 36 inches under the state's uniform construction code — one value covering Philadelphia's mild winters and the colder Poconos alike.",

  'Rhode Island':
    'Rhode Island is small enough for one number: 36 inches, coastal New England, set by the state residential code.',

  'South Carolina':
    'South Carolina is a no-frost Atlantic state: the 12-inch value is a bearing minimum, and the loads that matter are hurricane wind and sandy coastal soil.',

  'South Dakota':
    'South Dakota digs 48 inches in Sioux Falls under IRC amendments, with Rapid City and the Black Hills edge at 42 — plains cold, moderated slightly by the hills.',

  Tennessee:
    "Tennessee's number is set locally and mostly lands at 18 inches, with Nashville's amendments at 12 — a mid-South state where the memory of an ice storm, not the average winter, writes the code.",

  Texas:
    'Texas is one state with two winters: 12 inches across most of it, and 24 in the Panhandle, where Amarillo catches the arctic fronts sliding down the Rockies. On the Gulf coast, frost is not a design consideration at all.',

  Utah:
    'Utah splits along the Wasatch: 30 inches on the Salt Lake valley floor, 48 in the mountain counties — Park City and Logan dig a foot and a half deeper than Salt Lake City.',

  Vermont:
    'Vermont leaves the number to its towns, and they land on 48 inches as the practical standard — rural New England, enforced one municipal office at a time.',

  Virginia:
    "Virginia steps up as you drive north: 18 inches around Richmond and the east, 24 in Northern Virginia, where the DC suburbs' winters run colder than the coast's.",

  Washington:
    "Washington's frost rule is the Cascade crest: 12 inches in Seattle and everywhere the Pacific moderates, 24 in Spokane and the east side, where winters turn continental.",

  'West Virginia':
    'West Virginia sets 30 inches statewide through its building code — Appalachian terrain under one value, from the Ohio River valley to the high eastern peaks.',

  Wisconsin:
    'Wisconsin runs 48 inches statewide under its UDC, with one wrinkle: SPS 321.16 lets some southern counties go to 40. Lake-effect winters keep the state firmly in deep-frost country.',

  Wyoming:
    "Wyoming's high plains step from 36 inches in Cheyenne and the southeast to 42 around Casper, Laramie and the west — elevation again, drawn in two local-code zones.",
};
