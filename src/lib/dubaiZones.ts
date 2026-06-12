export type Tier = 1 | 2 | 3;

export type Zone = {
  id: number;
  name: string;
  shortName?: string;
  tier: Tier;
  positioning: string;
  /** Position over the map, as % of the map container (0-100) */
  pos: { x: number; y: number };
};

export const TIER_META: Record<
  Tier,
  {
    label: string;
    sub: string;
    outlook5y: number;
    outlook10y: number;
    riskLevel: string;
    idealFor: string;
  }
> = {
  1: {
    label: "Tier 1",
    sub: "Highest Growth Potential",
    outlook5y: 5,
    outlook10y: 5,
    riskLevel: "Medium",
    idealFor: "Capital Appreciation (Long Term)",
  },
  2: {
    label: "Tier 2",
    sub: "Strong Growth Potential",
    outlook5y: 4,
    outlook10y: 4.5,
    riskLevel: "Low – Medium",
    idealFor: "Balance of Yield & Growth",
  },
  3: {
    label: "Tier 3",
    sub: "Mature Growth Potential",
    outlook5y: 4,
    outlook10y: 4.5,
    riskLevel: "Low",
    idealFor: "Income & Wealth Preservation",
  },
};

export const DUBAI_ZONES: Zone[] = [
  { id: 1, name: "Dubai South", shortName: "Al Maktoum Airport City", tier: 1,
    positioning: "Future aviation, logistics and residential hub anchored by Al Maktoum International Airport.",
    pos: { x: 64, y: 84 } },
  { id: 2, name: "Expo City Dubai", tier: 1,
    positioning: "Sustainable mixed-use district built on the Expo 2020 legacy.",
    pos: { x: 56, y: 78 } },
  { id: 3, name: "Dubai Land", tier: 1,
    positioning: "Next-generation lifestyle, leisure and tourism destination.",
    pos: { x: 78, y: 48 } },
  { id: 4, name: "Dubai Hills Estate", tier: 2,
    positioning: "Master-planned green community alongside an 18-hole championship golf course.",
    pos: { x: 45, y: 56 } },
  { id: 5, name: "Dubai Silicon Oasis", tier: 2,
    positioning: "Integrated tech park and residential community with steady rental demand.",
    pos: { x: 72, y: 58 } },
  { id: 6, name: "Meydan / MBR City", tier: 2,
    positioning: "Premium villa and lagoon living minutes from Downtown.",
    pos: { x: 56, y: 54 } },
  { id: 7, name: "Downtown Dubai", tier: 3,
    positioning: "Iconic centre anchored by Burj Khalifa and Dubai Mall.",
    pos: { x: 50, y: 44 } },
  { id: 8, name: "Business Bay", tier: 3,
    positioning: "Central business and lifestyle district along the Dubai Water Canal.",
    pos: { x: 49, y: 48 } },
  { id: 9, name: "Dubai Marina", tier: 3,
    positioning: "Waterfront skyline with the city's strongest short-stay rental market.",
    pos: { x: 28, y: 42 } },
  { id: 10, name: "Palm Jumeirah", tier: 3,
    positioning: "Iconic man-made island synonymous with branded beachfront residences.",
    pos: { x: 31, y: 37 } },
];
