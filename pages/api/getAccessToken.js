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
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch access token' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch access token' });
    }
  }
  