import styled from 'styled-components';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext.js';

const Player = () => {
    const { theme, switchTheme } = useTheme();
    const [title, setTitle] = useState('welcome to the portfolio');
    const [artist, setArtist] = useState('claus');

    const handleThemeToggle = () => {
        switchTheme(theme.mode === 'light' ? 'dark' : 'light');  // Toggle between light and dark modes
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1220) {
                if (window.innerHeight < 550) {
                    setTitle('Break Stuff');
                    setArtist('Limp Bizkit');
                } else {
                    setTitle('welcome to the portfolio')
                    setArtist('chris youngclaus');
                }
            } else {
                setTitle('welcome to the portfolio');
                setArtist('claus');
            }
            
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <PlayerContainer>
            <AlbumContainer>
                <AlbumArt>
                    <img src="/Hero/claus.png" alt="Album Art" />
                </AlbumArt>
            </AlbumContainer>
            <TrackInfo>
                <SongTitle>{title}</SongTitle>
                <Artist>{artist}</Artist>
            </TrackInfo>
            <PlaybackControls>
                <Link href="/about">
                    <Button><img src='/Player/backward.png' /></Button>
                </Link>
                <Button onClick={handleThemeToggle}><img src='/Player/lightdark.png' /></Button>
                <Link href="/projects">
                    <Button><img src='/Player/forward.png' /></Button>
                </Link>
            </PlaybackControls>
        </PlayerContainer>
    );
};

export default Player;

const PlayerContainer = styled.div`
    width: 100%;
    height: 70%;
    max-width: 300px;
    max-height: 500px;
    backdrop-filter: blur(15px);
    padding: 20px;
    border-radius: 15px;
    box-shadow: -2px 1px 5px ${({ theme }) => theme.c2};
    font-family: "DM Mono", monospace;

    @media (max-width: 700px) {
        width: 550px;
    }
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
`;

const Artist = styled.h3`
    font-size: .9rem;
    color: ${({ theme }) => theme.c4};
    margin: 0;
    padding-bottom: 10px;
    white-space: nowrap;
`;

const PlaybackControls = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.c3};
    border-radius: 15px;
    box-shadow: -2px 1px 5px ${({ theme }) => theme.c2};
    backdrop-filter: blur(5px);
`;

const Button = styled.button`
    display: flex;
    position: static;
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 30px;
    margin-right: 30px;
    transform: scale(1.5);
`;
