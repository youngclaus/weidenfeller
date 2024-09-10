import { useSpotifyAuth } from '../src/script';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../components/ThemeContext';

export default function Music() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

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

  const getRecentlyPlayedTrack = async () => {
    if (typeof window !== 'undefined') {
      let token = window.localStorage.getItem('spotify-token');
      if (!token) {
        console.log('No token found in LocalStorage. You may need to authenticate.');
        return;
      }

      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log('Full response:', data);
        if (response.ok) {
          if (data.items.length > 0) {
            console.log('Recently Played:', data);
            setRecentlyPlayed(data.items[0]);
          } else {
            console.error('No recently played tracks found.');
          }
        } else {
          console.error('Failed to fetch recently played:', data);
        }
      } catch (error) {
        console.error('Error fetching recently played:', error);
      }
    }
  };


  useEffect(() => {
    getSpotifyProfile();
    getRecentlyPlayedTrack();

    if (recentlyPlayed && typeof window !== 'undefined') {
      const songTitleElement = document.querySelector('.song-title');
      if (songTitleElement && songTitleElement.offsetWidth > 250) { 
        songTitleElement.classList.add('scrolled');
      } else {
        songTitleElement.classList.remove('scrolled');  // Remove the class if the title doesn't overflow
      }
    }
  }, [recentlyPlayed]);

  return (
    <Container>
      <Header />
      <ContentContainer>
        {profile ? (
          <ProfileContainer>
            <ProfileImage src={profile.images[1]?.url} alt="Profile Image" />
          </ProfileContainer>
        ) : (
          <p>Loading...</p>
        )}
        <ProfileText>dublecy</ProfileText>

        {recentlyPlayed ? (
  <RecentlyPlayedContainer>
    <img src={recentlyPlayed.track.album.images[0].url} alt="Album Art" />
    <h2>now bumpin</h2>
    <RecentText>
      <p className="song-title">{recentlyPlayed.track.name}</p>
      <p className="artist-name">{recentlyPlayed.track.artists.map(artist => artist.name).join(', ')}</p>
    </RecentText>
  </RecentlyPlayedContainer>
) : (
  <p>Loading recently played track...</p>
)}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.bodyBg};
  user-select: none;
  -webkit-user-drag: none;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: calc(100vh - 60px);
  flex-direction: column;
  align-items: center;
  top: 60px;
  z-index: 2;
`;

const ProfileContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 200px;
  transform: translateY(-50%);
  top: 55%;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.03);
  }
  20% {
    transform: scale(1);

  }
`;

const ProfileImage = styled.img`
  display: flex;
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  z-index: 5;
  animation: ${pulse} 0.5s infinite;
`;

const ProfileText = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  transform: translateY(-10%);
  opacity: 10%;
  font-size: 300px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-family: "DM Mono", monospace;
  z-index: 1;
`;

const RecentlyPlayedContainer = styled.div`
  display: flex;
  position: absolute;
  left: 20px;
  top: 50px;
  height: 80px;
  align-items: center;

  img {
    width: 130px;
    height: 130px;
    border-radius: 15px;
    animation: ${pulse} 0.5s infinite;
    z-index: 4;
  }

  h2 {
    position: absolute;
    left: 54%;
    top: -63%;
    z-index: 4;
    font-family: 'DM Mono', monospace;
    font-size: 24px;
    color: ${({ theme }) => theme.text};
  }

  p {
    font-family: 'DM Mono', monospace;
    font-size: 16px;
    color: ${({ theme }) => theme.text};

  }
`;

const RecentText = styled.div`
  background-color: ${({ theme }) => theme.buttonBg};
  padding-left: 20px;
  transform: translateX(-30px);
  border-radius: 30px;
  min-width: 300px;
  max-width: 300px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .song-title {
    display: inline-block;
    white-space: nowrap;
    text-overflow: clip;
    margin-left: 25px;
    position: relative;
    text-align: left;
  }

  .scrolled {
    animation: scrollText 10s linear forwards;
    transform: translateX(0%);
  }

  .artist-name {
    margin-top: 5px;
    margin-left: 25px;
    white-space: normal;
    text-align: left;
  }

  @keyframes scrollText {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(0);
    }
    99% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;
