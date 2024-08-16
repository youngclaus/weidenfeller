import styled from 'styled-components';
import Header from '../components/Header';
import { useContext } from 'react';
import { useTheme } from '../components/ThemeContext';

const About = () => {
    const { theme, switchTheme } = useTheme();
    return (
        <Container>
            <Header />
            <ImageContainer>
                {/*Organizing css movement on screen
                    Glow Containers set to center of viewport to keep assets 
                        on same x and y axis and prevent movement
                    Glow Containers inline style controls placement on screen

                    GlowImages set size to scale with other images
                        Preset to 300px wide each

                    GlowImages set to center of container (reassure central position)
                    All GlowContainers set to fit-content

                */}
                <Background>
                    <img src='/About/background.png' alt='background' style={{transform: 'translate(-50%, 50%)'}}/>
                </Background>
                <GlowContainer style={{transform: 'translate(-50%, 15%)'}}>
                    <GlowImage 
                        alt='window.png'
                        id='window'
                        style={{
                            width: '300px',
                            height: 'auto',
                        }}
                    />
                    <TextBox>I had my own balcony with a view of Hoboken in college</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(160%, -230%)'}}>
                    <GlowImage
                        src='/About/records/1975.png'
                        alt='record_1975'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('altrock')}
                    />
                    <TextBox>ILIWYSFYASBYSU - The 1975</TextBox>
                </GlowContainer>
                <Table style={{transform: 'translate(-125%, 120%)'}}>
                    <img src='/About/table.png' alt='table' style={{width: '500px', height: 'auto'}}/>
                </Table>
                <GlowContainer style={{transform: 'translate(-143%, 50%)'}}>
                    <GlowImage
                        src='/About/stereo.png'
                        alt='stereo.png'
                        style={{
                            width: '400px',
                            height: 'auto'
                        }}
                    />
                    <TextBox>The Perfect Christmas Gift: My Stereo System</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(-470%, 210%)'}}>
                    <GlowImage
                        src='/About/ps5.png'
                        alt='ps5'
                        style={{
                            width: '45px',
                            height: 'auto'
                        }}
                    />
                    <TextBox>I was an Xbox kid until high school</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(-382%, 220%)'}}>
                    <GlowImage
                        src='/About/records.png'
                        alt='records'
                        style={{
                            width: '150px',
                            height: 'auto'
                        }}
                    />
                    <TextBox>Click on the records to change the theme!</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(100%, 200%)'}}>
                    <GlowImage 
                        src='/About/whitedog.png' 
                        alt='dog'
                        style={{
                            width: '250px',
                            height: 'auto',
                        }}
                    />
                    <TextBox>I have always wanted a Husky</TextBox>
                </GlowContainer>
            </ImageContainer>
        </Container>
    )
}

export default About;

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    position: relative;
    background: ${({ theme }) => theme.bodyBg};
`;

const ImageContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100vw;
    height: calc(100vh - 60px);
    top: 60px;
    overflow: hidden; 
    opacity: ${({ theme }) => theme.aboutOpacity};
`;

const Background = styled.div`
    position: absolute;
    display: static;
    left: 50%;
    bottom: 50%;
`

const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    left: 50%;
    bottom: 50%;
`;

const GlowImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
    transition: filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    ${({ id, theme }) => 
        id === 'window' && `
        content: url(${theme.mode === 'light' ? '/About/window_day.png' : '/About/window_night.png'});
    `}

    &:hover {
        filter: brightness(1.2) drop-shadow(0 0 20px ${({ theme }) => theme.aboutGlow });
    }

    &:hover + div {
        opacity: 1;
    }
`;

const TextBox = styled.div`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-family: "DM Mono", monospace;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    white-space: nowrap;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
    z-index: 1;
`;

const Table = styled.div`
    position: absolute;
    display: flex;
    width: fit-content;
    height: fit-content;
    left: 50%;
    bottom: 50%;
`