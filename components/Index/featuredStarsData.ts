export interface FeaturedStar {
  id: string;
  label: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  size: number;
  mobileSize: number;
  central?: boolean;
  driftDuration: number;
  driftDelay: number;
}

/**
 * Add, remove, rename, resize, or reposition prominent Home-page stars here.
 * Position values are percentages of the viewport.
 */
export const featuredStars: FeaturedStar[] = [
  {
    id: 'chris-youngclaus',
    label: 'chris youngclaus',
    x: 50,
    y: 50,
    mobileX: 50,
    mobileY: 48,
    size: 42,
    mobileSize: 34,
    central: true,
    driftDuration: 20,
    driftDelay: 0,
  },
  {
    id: 'welcome',
    label: 'welcome to my website',
    x: 18,
    y: 63,
    mobileX: 23,
    mobileY: 72,
    size: 25,
    mobileSize: 20,
    driftDuration: 17,
    driftDelay: -4,
  },
  {
    id: 'masters-ai',
    label: 'masters of engineering in a.i.',
    x: 76,
    y: 24,
    mobileX: 76,
    mobileY: 24,
    size: 28,
    mobileSize: 21,
    driftDuration: 22,
    driftDelay: -8,
  },
  {
    id: 'borussia-dortmund',
    label: 'borussia dortmund',
    x: 82,
    y: 72,
    mobileX: 76,
    mobileY: 74,
    size: 23,
    mobileSize: 19,
    driftDuration: 19,
    driftDelay: -6,
  },
  {
    id: 'spotify-playlists',
    label: '150+ spotify playlists',
    x: 24,
    y: 24,
    mobileX: 24,
    mobileY: 25,
    size: 26,
    mobileSize: 20,
    driftDuration: 24,
    driftDelay: -11,
  },
];
