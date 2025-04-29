import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlayerContent } from './playerContent';

interface PlayerProps {
  content: PlayerContent;
  visible: boolean;
}

const Player: React.FC<PlayerProps> = ({ content, visible }) => {
  const [index, setIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>(content.titles[index]);
  const [artist, setArtist] = useState<string>(content.artists[index]);

  const handleNext = () => {
    const newIndex = (index + 1) % content.images.length;
    setIndex(newIndex);
  };

  const handlePrevious = () => {
    const newIndex = (index - 1 + content.images.length) % content.images.length;
    setIndex(newIndex);
  };

  const handleResize = () => {
    if (window.innerHeight < 600) {
      setTitle('Break Stuff');
      setArtist('Limp Bizkit');
    } else {
      if (window.innerWidth < 950) {
        if (index === 0) {
          setTitle(content.titles[index]);
          setArtist('chris youngclaus');
        } else {
          setTitle(content.titles[index]);
          setArtist(content.artists[index]);
        }
      } else {
        setTitle(content.titles[index]);
        setArtist(content.artists[index]);
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [index, content]);

  if (!visible) return null;

  return (
    <PlayerContainer>
      <AlbumContainer>
        <AlbumArt>
          <Image src={content.images[index]} alt="Album Art" width={300} height={300} objectFit="contain" />
        </AlbumArt>
      </AlbumContainer>
      <TrackInfo>
        <SongTitle>{title}</SongTitle>
        <Artist>{artist}</Artist>
      </TrackInfo>
      <PlaybackControls>
        <Button onClick={handlePrevious}>
          <img src="/Player/backward.png" alt="Previous" />
        </Button>
        <Image src="/logo600.png" alt="Logo" width={100} height={100} />
        <Button onClick={handleNext}>
          <img src="/Player/forward.png" alt="Next" />
        </Button>
      </PlaybackControls>
    </PlayerContainer>
  );
};

export default Player;

const PlayerContainer = styled.div`
  width: 100%;
  height: 500px;
  max-width: 300px;
  padding: 20px;
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0px 0px 10px -1px black;
  font-family: "DM Mono", monospace;
`;

const AlbumContainer = styled.div`
  width: 100%;
  height: 300px;
  transform: translateX(1%);
  overflow: hidden;
  box-shadow: -5px 5px 0px ${({ theme }) => theme.c3};
`;

const AlbumArt = styled.div`
  width: 100%;
  height: 100%;
`;

const TrackInfo = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
`;

const SongTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.c4};
  margin: 10px;
  white-space: nowrap;
  @supports (-webkit-touch-callout: none) {
      font-size: 1rem;
  }
`;

const Artist = styled.h3`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.c4};
  margin: 0;
  white-space: nowrap;
`;

const PlaybackControls = styled.div`
  width: fit-content;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  backdrop-filter: blur(15px);
  border-radius: 15px;
  box-shadow: 0px 0px 10px -5px black;
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  display: flex;
  position: static;
  background: none;
  border: none;
  cursor: pointer;
  transform: scale(0.6);
`;