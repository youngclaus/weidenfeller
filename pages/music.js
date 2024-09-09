import { useSpotifyAuth } from '../src/script';
import { useEffect, useState } from 'react';

export default function Music() {
  const [profile, setProfile] = useState(null);

  useSpotifyAuth();

  const getSpotifyProfile = async () => {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem('spotify-token');
      if (!token) {
        console.log('No token found in LocalStorage. You may need to authenticate.');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          console.log('User Profile:', data);
          setProfile(data);
        } else {
          console.error('Failed to fetch profile:', data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  };

  useEffect(() => {
    getSpotifyProfile();
  }, []);

  return (
    <div>
      <h1>Spotify Profile</h1>
      {profile ? (
        <p>Welcome, {profile.display_name}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
