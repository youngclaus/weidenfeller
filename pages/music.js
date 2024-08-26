import { useEffect, useState } from 'react';

export default function Music() {
  const [topArtists, setTopArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const response = await fetch('/api/spotify/fetchSpotifyData');
        if (!response.ok) {
          throw new Error('Failed to fetch top artists');
        }

        const data = await response.json();
        setTopArtists(data.items);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchTopArtists();
  }, []);

  return (
    <div>
      <h1>Top Spotify Artists</h1>
      {error && <p>{error}</p>}
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}