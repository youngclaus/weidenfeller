export interface ConstellationPoint {
  x: number;
  y: number;
}

export interface NamedConstellation {
  id: string;
  title: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  scale: number;
  rotation: number;
  pattern: ConstellationPoint[];
}

const arc: ConstellationPoint[] = [
  { x: -0.62, y: 0.18 },
  { x: -0.32, y: -0.28 },
  { x: 0.04, y: -0.42 },
  { x: 0.38, y: -0.18 },
  { x: 0.62, y: 0.28 },
];

const crown: ConstellationPoint[] = [
  { x: -0.62, y: 0.3 },
  { x: -0.38, y: -0.42 },
  { x: 0, y: 0.08 },
  { x: 0.36, y: -0.5 },
  { x: 0.64, y: 0.28 },
];

const kite: ConstellationPoint[] = [
  { x: 0, y: -0.68 },
  { x: 0.48, y: -0.08 },
  { x: 0.08, y: 0.34 },
  { x: -0.46, y: -0.02 },
  { x: 0, y: -0.68 },
  { x: 0.08, y: 0.72 },
];

const stair: ConstellationPoint[] = [
  { x: -0.66, y: 0.42 },
  { x: -0.34, y: 0.12 },
  { x: -0.06, y: 0.26 },
  { x: 0.2, y: -0.12 },
  { x: 0.62, y: -0.42 },
];

const branch: ConstellationPoint[] = [
  { x: -0.62, y: 0.18 },
  { x: -0.22, y: 0.02 },
  { x: 0.12, y: -0.18 },
  { x: 0.58, y: -0.08 },
  { x: 0.12, y: -0.18 },
  { x: 0.32, y: 0.48 },
];

const diamond: ConstellationPoint[] = [
  { x: 0, y: -0.66 },
  { x: 0.58, y: 0 },
  { x: 0, y: 0.58 },
  { x: -0.58, y: 0 },
  { x: 0, y: -0.66 },
  { x: 0, y: 0.58 },
];

const patterns = [arc, crown, kite, stair, branch, diamond];

const titles = [
  'Ambitious Software Developer',
  'Creative Full-Stacker',
  'Artificial Intelligence Engineer',
  'Masters Degree Receiver',
  'Active Full-Time Job Seeker',
  'Licensed Bartender',
  'Constant Music Listener',
  'Lifelong Borussia Dortmund Supporter',
  'Unique Shoe Collector',
  'Yankees Supporter',
  'Soccer Player',
  'Decent Golf Player',
  'Vinyl Collector',
  'Japanese Art Enjoyer',
  'Master Lego Builder',
  'Avid Arizona Iced Tea Drinker',
  'Large Beanbag Enjoyer',
] as const;

const positions = [
  [9, 18, 15, 12],
  [24, 13, 50, 12],
  [41, 19, 85, 12],
  [59, 12, 15, 27],
  [77, 18, 50, 27],
  [92, 29, 85, 27],
  [82, 42, 15, 42],
  [64, 34, 50, 42],
  [45, 36, 85, 42],
  [27, 32, 15, 57],
  [10, 47, 50, 57],
  [15, 70, 85, 57],
  [34, 68, 15, 72],
  [52, 61, 50, 72],
  [70, 70, 85, 72],
  [88, 63, 30, 87],
  [53, 85, 70, 87],
] as const;

export const namedConstellations: NamedConstellation[] = titles.map((title, index) => {
  const [x, y, mobileX, mobileY] = positions[index];

  return {
    id: `constellation-${index + 1}`,
    title,
    x,
    y,
    mobileX,
    mobileY,
    scale: 0.038 + (index % 3) * 0.004,
    rotation: ((index * 37) % 110) - 55,
    pattern: patterns[index % patterns.length],
  };
});
