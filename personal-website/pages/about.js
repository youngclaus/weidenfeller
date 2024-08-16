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
                    Glow Containers measure from Left in px
                    Glow Containers inline style controls placement on screen

                    GlowImages set size to scale with other images
                        Preset to 300px wide each

                    GlowImages set to center of container (reassure central position)
                    All GlowContainers set to fit-content

                */}
                <Background style={{width: 'fit-content', height: 'fit-content', left: 0}}>
                    <img src='/About/background.png' alt='background' style={{transform: 'translateY(50%)'}}/>
                </Background>
                <Table style={{left: '10px', bottom: '110px'}}>
                    <img src='/About/table.png' alt='table' style={{width: '500px', height: 'auto'}}/>
                </Table>
                <GlowContainer style={{left: '50px', bottom: '280px'}}>
                    <GlowImage
                        src='/About/stereo.png'
                        alt='stereo.png'
                        style={{
                            width: '400px',
                            height: 'auto'
                        }}
                    />
                    <TextBox>The Perfect Christmas Gift for a Music Junkie</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '420px', bottom: '150px'}}>
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
                <GlowContainer style={{left: '62px', bottom: '150px'}}>
                    <GlowImage
                        src='/About/records.png'
                        alt='records'
                        style={{
                            width: '150px',
                            height: 'auto'
                        }}
                    />
                    <TextBox style={{left: '160px'}}>Click on the records to change the theme!</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '500px', bottom: '300px'}}>
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
                <GlowContainer style={{left: '800px', bottom: '50px'}}>
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

                {/* --------- Records Section ---------- */}
                <GlowContainer style={{left: '830px', bottom: '600px'}}>
                    <GlowImage
                        src='/About/records/1975.png'
                        alt='record_1975'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('the1975')}
                    />
                    <TextBox>ILIWYSFYASBYSU - The 1975</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '970px', bottom: '600px'}}>
                    <GlowImage
                        src='/About/records/basement.png'
                        alt='record_1975'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('basement')}
                    />
                    <TextBox>ILIWYSFYASBYSU - The 1975</TextBox>
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
    overflow-y: hidden; 
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
