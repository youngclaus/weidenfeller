// Spotify.js

import axios from 'axios';

export const getSpotifyProfile = async () => {
  try {
    // Request to your backend/serverless function to fetch the access token
    const { data: tokenData } = await axios.get('/api/getSpotifyToken');
    const token = tokenData.access_token;

    // Use the token to fetch profile data from Spotify
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Spotify profile:', error);
    return null;
  }
};
