export type Tier = 1 | 2 | 3;

export type Project = {
  name: string;
  developer: string;
  image?: string;
};

export type Zone = {
  id: number;
  name: string;
  shortName?: string;
  tier: Tier;
  positioning: string;
  outlook5y: number; // 1-5
  outlook10y: number; // 1-5
  riskLevel: "Low" | "Low–Medium" | "Medium";
  idealFor: string;
  projects: Project[];
  /** SVG polygon points (in 1000x700 viewBox) */
  points: string;
  /** Badge / label centroid */
  badge: { x: number; y: number };
};

export const TIER_META: Record<Tier, { label: string; sub: string; colorVar: string }> = {
  1: { label: "Tier 1", sub: "Highest Growth Potential", colorVar: "var(--tier-1)" },
  2: { label: "Tier 2", sub: "Strong Growth Potential", colorVar: "var(--tier-2)" },
  3: { label: "Tier 3", sub: "Mature & Stable", colorVar: "var(--tier-3)" },
};

export const DUBAI_ZONES: Zone[] = [
  {
    id: 1,
    name: "Dubai South",
    shortName: "Al Maktoum Airport City",
    tier: 1,
    positioning: "Future aviation, logistics & residential hub anchored by Al Maktoum International Airport.",
    outlook5y: 5,
    outlook10y: 5,
    riskLevel: "Medium",
    idealFor: "Long-term capital appreciation",
    projects: [
      { name: "Expo Valley", developer: "Dubai South Properties" },
      { name: "The Pulse Residences", developer: "Dubai South" },
      { name: "South Bay", developer: "Dubai South" },
    ],
    points: "320,560 470,540 560,600 540,680 380,690 290,640",
    badge: { x: 420, y: 615 },
  },
  {
    id: 2,
    name: "Expo City Dubai",
    tier: 1,
    positioning: "Sustainable mixed-use district built on the Expo 2020 legacy.",
    outlook5y: 5,
    outlook10y: 5,
    riskLevel: "Medium",
    idealFor: "Long-term capital appreciation",
    projects: [
      { name: "Expo City Mangrove Residences", developer: "Expo City Dubai" },
      { name: "Expo City Valley", developer: "Expo City Dubai" },
    ],
    points: "200,490 320,470 350,540 290,600 200,580 170,520",
    badge: { x: 260, y: 530 },
  },
  {
    id: 3,
    name: "Dubai Land",
    tier: 1,
    positioning: "Next-generation lifestyle, leisure and tourism destination.",
    outlook5y: 5,
    outlook10y: 5,
    riskLevel: "Medium",
    idealFor: "Long-term capital appreciation",
    projects: [
      { name: "DAMAC Hills 2", developer: "DAMAC" },
      { name: "Arabian Ranches III", developer: "Emaar" },
      { name: "The Valley", developer: "Emaar" },
    ],
    points: "760,140 900,160 940,260 880,340 770,310 740,210",
    badge: { x: 830, y: 230 },
  },
  {
    id: 4,
    name: "Dubai Hills Estate",
    tier: 2,
    positioning: "Master-planned green community alongside an 18-hole golf course.",
    outlook5y: 4,
    outlook10y: 4,
    riskLevel: "Low–Medium",
    idealFor: "Balance of yield & growth",
    projects: [
      { name: "Park Ridge", developer: "Emaar" },
      { name: "Golf Place", developer: "Emaar" },
      { name: "Address Hillcrest", developer: "Emaar" },
    ],
    points: "490,330 620,320 660,400 590,450 500,430 460,370",
    badge: { x: 560, y: 380 },
  },
  {
    id: 5,
    name: "Dubai Silicon Oasis",
    tier: 2,
    positioning: "Integrated tech park and residential community with strong rental demand.",
    outlook5y: 3,
    outlook10y: 4,
    riskLevel: "Low–Medium",
    idealFor: "Balance of yield & growth",
    projects: [
      { name: "Cedre Villas", developer: "DSO Authority" },
      { name: "Binghatti Onyx", developer: "Binghatti" },
    ],
    points: "760,420 870,400 900,470 850,520 770,510 740,460",
    badge: { x: 810, y: 460 },
  },
  {
    id: 6,
    name: "Meydan / MBR City",
    tier: 2,
    positioning: "Premium villa and lagoon living minutes from Downtown.",
    outlook5y: 3,
    outlook10y: 4,
    riskLevel: "Low–Medium",
    idealFor: "Balance of yield & growth",
    projects: [
      { name: "District One", developer: "Meydan / Sobha" },
      { name: "Sobha Hartland", developer: "Sobha" },
      { name: "The Heart of Europe", developer: "Kleindienst" },
    ],
    points: "640,360 740,360 760,430 690,470 630,440 610,390",
    badge: { x: 690, y: 410 },
  },
  {
    id: 7,
    name: "Downtown Dubai",
    tier: 3,
    positioning: "Iconic centre anchored by Burj Khalifa and Dubai Mall.",
    outlook5y: 4,
    outlook10y: 4,
    riskLevel: "Low",
    idealFor: "Income & wealth preservation",
    projects: [
      { name: "Burj Royale", developer: "Emaar" },
      { name: "The Address Residences", developer: "Emaar" },
      { name: "IL Primo", developer: "Emaar" },
    ],
    points: "560,180 640,170 680,220 630,260 570,250 545,210",
    badge: { x: 600, y: 215 },
  },
  {
    id: 8,
    name: "Business Bay",
    tier: 3,
    positioning: "Central business and lifestyle district along the Dubai Water Canal.",
    outlook5y: 4,
    outlook10y: 4,
    riskLevel: "Low",
    idealFor: "Income & wealth preservation",
    projects: [
      { name: "DAMAC Bay", developer: "DAMAC" },
      { name: "Peninsula", developer: "Select Group" },
      { name: "SLS Dubai", developer: "WOW Investments" },
    ],
    points: "560,250 650,250 680,300 620,330 565,315 540,275",
    badge: { x: 605, y: 285 },
  },
  {
    id: 9,
    name: "Dubai Marina",
    tier: 3,
    positioning: "Waterfront skyline with the city's strongest short-stay rental market.",
    outlook5y: 4,
    outlook10y: 4,
    riskLevel: "Low",
    idealFor: "Income & wealth preservation",
    projects: [
      { name: "Marina Gate", developer: "Select Group" },
      { name: "Stella Maris", developer: "Omniyat" },
      { name: "Cavalli Tower", developer: "DAMAC" },
    ],
    points: "320,300 410,290 440,360 380,400 310,380 290,330",
    badge: { x: 370, y: 340 },
  },
  {
    id: 10,
    name: "Palm Jumeirah",
    tier: 3,
    positioning: "Iconic man-made island synonymous with branded beachfront residences.",
    outlook5y: 4,
    outlook10y: 4,
    riskLevel: "Low",
    idealFor: "Income & wealth preservation",
    projects: [
      { name: "Como Residences", developer: "Nakheel" },
      { name: "Six Senses Residences", developer: "Select Group" },
      { name: "Atlantis The Royal Residences", developer: "Kerzner" },
    ],
    points: "240,240 330,220 360,290 320,340 250,320 220,280",
    badge: { x: 285, y: 280 },
  },
];
