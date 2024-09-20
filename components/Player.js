import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Player = () => {

    const albumImages = ["/Hero/claus.png", "/Hero/dortmund.png", "/Hero/spotify.png"];
    const albumTitles = ['welcome to the portfolio', 'echte liebe', 'too many playlists'];
    const albumArtists = ['claus', 'Dortmund', 'Spotify'];
    const [index, setIndex] = useState(0);
    const [title, setTitle] = useState(albumTitles[index]);
    const [artist, setArtist] = useState(albumArtists[index]);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex+1) % albumImages.length);
    };

    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + albumImages.length) % albumImages.length);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 950) {
                if (window.innerHeight < 600) {
                    setTitle('Break Stuff');
                    setArtist('Limp Bizkit');
                } else {
                    if (index === 0) {
                        setTitle(albumTitles[index]);
                        setArtist('chris youngclaus');
                    } else {
                        setTitle(albumTitles[index]);
                        setArtist(albumArtists[index]);
                    }
                }
            } else {
                setTitle(albumTitles[index]);
                setArtist(albumArtists[index]);
            }
            
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [index]);

    return (
        <PlayerContainer>
            <AlbumContainer>
                <AlbumArt>
                    <img src={albumImages[index]} alt="Album Art" />
                </AlbumArt>
            </AlbumContainer>
            <TrackInfo>
                <SongTitle>{title}</SongTitle>
                <Artist>{artist}</Artist>
            </TrackInfo>
            <PlaybackControls>
                <Button onClick={handlePrevious}><img src='/Player/backward.png' /></Button>
                <Button onClick={handleNext}><img src='/Player/forward.png' /></Button>
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
    box-shadow: 0px 0px 10px -5px black;
    font-family: "DM Mono", monospace;
`;

const AlbumContainer = styled.div`
    width: 100%;
    height: 300px;
    transform: translateX(1%);
    overflow: hidden;
    box-shadow: -5px 5px 0px ${({ theme }) => theme.c2};
`

const AlbumArt = styled.div`
    width: 100%;
    height: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
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
    font-size: .9rem;
    color: ${({ theme }) => theme.c4};
    margin: 0;
    white-space: nowrap;
`;

const PlaybackControls = styled.div`
    width: 80%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    backdrop-filter: blur(15px);
    border-radius: 15px;
    box-shadow: 0px 0px 10px -5px black;
    margin-top: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
`;

const Button = styled.button`
    display: flex;
    position: static;
    background: none;
    border: none;
    cursor: pointer;
    transform: scale(.6);
`;
