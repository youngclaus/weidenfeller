import { useEffect } from 'react';

const clientId = 'f10ec379f4d244e5ae18c8c171c04fc6'; // just a client id, nothing secret
const redirectUri = 'http://localhost:3000/music';
const scopes = 'user-read-private user-read-email';
const authEndpoint = 'https://accounts.spotify.com/authorize';

function getAccessTokenFromUrl() {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.substring(1).split('&').reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';
    return hash.access_token;
  }
}

function setTokenToLocalStorage(token) {
  if (typeof window !== 'undefined' && token) {
    window.localStorage.setItem('spotify-token', token);
  } else {
    console.error('No token found in the URL');
  }
}

function redirectToSpotifyAuth() {
  if (typeof window !== 'undefined') {
    window.location.href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}`;
  }
}

function checkTokenAndAuthenticate() {
  if (typeof window !== 'undefined') {
    const token = getAccessTokenFromUrl();
    if (token) {
      setTokenToLocalStorage(token);
    } else if (!window.localStorage.getItem('spotify-token')) {
      redirectToSpotifyAuth();
    }
  }
}

export function useSpotifyAuth() {
  useEffect(() => {
    checkTokenAndAuthenticate();
  }, []);
}
