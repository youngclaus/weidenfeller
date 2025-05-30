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
    'welcome to my website',
    'masters in a.i.',
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
