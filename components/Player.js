import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Player = () => {

    const albumImages = ["/Hero/claus.png", "/Hero/school.jpg", "/Hero/dortmund.png", "/Hero/spotify.png"];
    const albumTitles = ['welcome to the portfolio', 'masters in a.i.', 'echte liebe', 'too many playlists'];
    const albumArtists = ['claus', 'stevens institute of technology', 'borussia dortmund fan', 'dublecy on spotify'];
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
            if (window.innerHeight < 600) {
                setTitle('Break Stuff');
                setArtist('Limp Bizkit');
            } else {
                if (window.innerWidth < 950) {
                    if (index === 0) {
                        setTitle(albumTitles[index]);
                        setArtist('chris youngclaus');
                    } else {
                        setTitle(albumTitles[index]);
                        setArtist(albumArtists[index]);
                    }
                } else {
                    setTitle(albumTitles[index]);
                    setArtist(albumArtists[index]);
                }
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
                    <Image src={albumImages[index]} alt="Album Art" width={300} height={300} objectFit='contain'/>
                </AlbumArt>
            </AlbumContainer>
            <TrackInfo>
                <SongTitle>{title}</SongTitle>
                <Artist>{artist}</Artist>
            </TrackInfo>
            <PlaybackControls>
                <Button onClick={handlePrevious}><img src='/Player/backward.png' /></Button>
                <Image src="/logo600.png" width={100} height={100} />
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
    box-shadow: -5px 5px 0px ${({ theme }) => theme.c3};
`

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
    font-size: .9rem;
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
    transform: scale(.6);
`;
