import { useEffect } from 'react';

const clientId = 'f10ec379f4d244e5ae18c8c171c04fc6'; // just a client id, nothing secret
const redirectUri = 'http://localhost:3000/music';
const scopes = 'user-read-private user-read-email user-read-recently-played playlist-read-private user-top-read';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenLifetime = 3600 * 1000; // 1 hour in milliseconds

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
    window.localStorage.setItem('spotify-token-timestamp', Date.now()); // Store the time the token was received
  } else {
    console.error('No token found in the URL');
  }
}

function getStoredToken() {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('spotify-token');
  }
  return null;
}

function getTokenExpirationTime() {
  if (typeof window !== 'undefined') {
    const storedTimestamp = window.localStorage.getItem('spotify-token-timestamp');
    return storedTimestamp ? parseInt(storedTimestamp) + tokenLifetime : null;
  }
  return null;
}

function isTokenExpired() {
  const expirationTime = getTokenExpirationTime();
  return !expirationTime || Date.now() > expirationTime;
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
      // Token found
      setTokenToLocalStorage(token);
    } else {
      const storedToken = getStoredToken();
      
      if (!storedToken || isTokenExpired()) {
        // No valid token or token expired
        redirectToSpotifyAuth();
      } else {
        console.log('token found in LocalStorage:', storedToken);
      }
    }
  }
}

export function useSpotifyAuth() {
  useEffect(() => {
    checkTokenAndAuthenticate();
  }, []);
}