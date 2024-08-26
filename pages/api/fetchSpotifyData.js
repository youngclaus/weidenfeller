export default async function handler(req, res) {
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  
    const authOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    };
  
    try {
      // Step 1: Get Access Token
      const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
      if (!tokenResponse.ok) {
        return res.status(tokenResponse.status).json({ error: 'Failed to fetch access token' });
      }
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
  
      // Step 2: Fetch Data from Spotify
      const spotifyDataResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (!spotifyDataResponse.ok) {
        return res.status(spotifyDataResponse.status).json({ error: 'Failed to fetch data from Spotify' });
      }
  
      const spotifyData = await spotifyDataResponse.json();
      res.status(200).json(spotifyData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Spotify' });
    }
  }