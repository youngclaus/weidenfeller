export type PlanetVariant = 'primary' | 'accent' | 'warm' | 'cool' | 'ringed';

export interface ProfilePlanet {
  id: string;
  label: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  size: number;
  mobileSize: number;
  variant: PlanetVariant;
  central?: boolean;
  orbitDuration: number;
  floatDelay: number;
}

/**
 * Add, remove, rename, resize, or reposition Home-page planets here.
 * Position values are percentages of the viewport.
 */
export const profilePlanets: ProfilePlanet[] = [
  {
    id: 'chris-youngclaus',
    label: 'chris youngclaus',
    x: 50,
    y: 50,
    mobileX: 50,
    mobileY: 48,
    size: 178,
    mobileSize: 136,
    variant: 'primary',
    central: true,
    orbitDuration: 24,
    floatDelay: 0,
  },
  {
    id: 'welcome',
    label: 'welcome to my website',
    x: 18,
    y: 63,
    mobileX: 24,
    mobileY: 72,
    size: 102,
    mobileSize: 76,
    variant: 'cool',
    orbitDuration: 18,
    floatDelay: -3,
  },
  {
    id: 'masters-ai',
    label: 'masters of engineering in a.i.',
    x: 76,
    y: 24,
    mobileX: 74,
    mobileY: 24,
    size: 116,
    mobileSize: 82,
    variant: 'accent',
    orbitDuration: 22,
    floatDelay: -8,
  },
  {
    id: 'borussia-dortmund',
    label: 'borussia dortmund',
    x: 82,
    y: 72,
    mobileX: 76,
    mobileY: 74,
    size: 96,
    mobileSize: 72,
    variant: 'warm',
    orbitDuration: 20,
    floatDelay: -5,
  },
  {
    id: 'spotify-playlists',
    label: '150+ spotify playlists',
    x: 24,
    y: 24,
    mobileX: 25,
    mobileY: 25,
    size: 106,
    mobileSize: 78,
    variant: 'ringed',
    orbitDuration: 26,
    floatDelay: -11,
  },
];
