export interface PlayerContent {
  images: string[];
  titles: string[];
  artists: string[];
}

export const homeContent: PlayerContent = {
  images: [
    '/Hero/claus.png',
    '/Hero/school.jpg',
    '/Hero/dortmund.png',
    '/Hero/spotify.png',
  ],
  titles: [
    'welcome to the portfolio',
    'masters in A.I.',
    'echte liebe',
    'too many playlists',
  ],
  artists: [
    'claus',
    'stevens institute of technology',
    'borussia dortmund fan',
    'dublecy on spotify',
  ],
};
