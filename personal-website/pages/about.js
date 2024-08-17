import styled from 'styled-components';
import Header from '../components/Header';
import { useContext, useRef, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';

const About = () => {
    const { theme, switchTheme } = useTheme();
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const imageContainer = imageContainerRef.current;

        const handleScroll = (event) => {
            if (imageContainer) {
                imageContainer.scrollLeft += event.deltaY;
            }
        };

        imageContainer.addEventListener('wheel', handleScroll);

        return () => {
            imageContainer.removeEventListener('wheel', handleScroll);
        };
    }, []);
    
    return (
        <Container>
            <Header />
            <ImageContainer ref={imageContainerRef}>
                {/*Organizing css movement on screen
                    Glow Containers measure from Left in px
                    Glow Containers inline style controls placement on screen

                    GlowImages set size to scale with other images
                        Preset to 300px wide each

                    GlowImages set to center of container (reassure central position)
                    All GlowContainers set to fit-content

                */}
                <Background style={{left: 0, bottom: 0}}>
                    <img src='/About/background.png' alt='background' style={{transform: 'translateY(10%)'}}/>
                </Background>
                <Background style={{left: 1920, bottom: 0}}>
                    <img src='/About/background.png' alt='background' style={{transform: 'translateY(10%)'}}/>
                </Background>
                <Table style={{left: '20px', bottom: '130px'}}>
                    <img src='/About/table.png' alt='table' style={{width: '500px', height: 'auto'}}/>
                </Table>
                <GlowContainer style={{left: '80px', bottom: '300px'}}>
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
                <GlowContainer style={{left: '430px', bottom: '165px'}}>
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
                <GlowContainer style={{left: '72px', bottom: '170px'}}>
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
                <GlowContainer style={{left: '500px', bottom: '330px'}}>
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
                <GlowContainer style={{left: '840px', bottom: '370px'}}>
                    <GlowImage 
                        src='/About/jersey.png' 
                        alt='jersey'
                        style={{
                            width: '175px',
                            height: 'auto',
                        }}
                    />
                    <TextBox>Sigma Nu til' I die</TextBox>
                </GlowContainer>

                {/* -------------- Records Section -------------- */}
                {/* Horizontal: 140px           Vertical: 120px */}
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
                        alt='record_basement'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('basement')}
                    />
                    <TextBox>colourmeinkindess - basement</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1110px', bottom: '600px'}}>
                    <GlowImage
                        src='/About/records/beck.png'
                        alt='record_beck'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('beck')}
                    />
                    <TextBox>Colors - Beck</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1250px', bottom: '600px'}}>
                    <GlowImage
                        src='/About/records/blink.png'
                        alt='record_blink'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('blink')}
                    />
                    <TextBox>Take Off Your Pants and Jacket - blink-182</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1390px', bottom: '600px'}}>
                    <GlowImage
                        src='/About/records/borns.png'
                        alt='record_borns'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('borns')}
                    />
                    <TextBox>Dopamine - Borns</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1040px', bottom: '480px'}}>
                    <GlowImage
                        src='/About/records/catfish.png'
                        alt='record_catfish'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('catfish')}
                    />
                    <TextBox>The Balcony - Catfish & the Bottlemen</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1180px', bottom: '480px'}}>
                    <GlowImage
                        src='/About/records/coldplay.png'
                        alt='record_coldplay'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('coldplay')}
                    />
                    <TextBox>Viva la Vida - Coldplay</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1320px', bottom: '480px'}}>
                    <GlowImage
                        src='/About/records/coldplay2.png'
                        alt='record_coldplay2'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('coldplay2')}
                    />
                    <TextBox>X&Y - Coldplay</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1040px', bottom: '360px'}}>
                    <GlowImage
                        src='/About/records/daft.png'
                        alt='record_daft'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('daft')}
                    />
                    <TextBox>Random Access Memories - Daft Punk</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1180px', bottom: '360px'}}>
                    <GlowImage
                        src='/About/records/glass.png'
                        alt='record_glass'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('glass')}
                    />
                    <TextBox>Dreamland - Glass Animals</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1320px', bottom: '360px'}}>
                    <GlowImage
                        src='/About/records/imagine.png'
                        alt='record_imagine'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('imagine')}
                    />
                    <TextBox>Night Visions - Imagine Dragons</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '830px', bottom: '240px'}}>
                    <GlowImage
                        src='/About/records/mckenna.png'
                        alt='record_mckenna'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('mckenna')}
                    />
                    <TextBox>What Do You Think About the Car? - Declan McKenna</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '970px', bottom: '240px'}}>
                    <GlowImage
                        src='/About/records/monkeys.png'
                        alt='record_monkeys'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('monkeys')}
                    />
                    <TextBox>AM - Arctic Monkeys</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1110px', bottom: '240px'}}>
                    <GlowImage
                        src='/About/records/paramore.png'
                        alt='record_paramore'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('paramore')}
                    />
                    <TextBox>RIOT! - Paramore</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '1250px', bottom: '240px'}}>
                    <GlowImage
                        src='/About/records/xx.png'
                        alt='record_xx'
                        style={{
                            width: '110px',
                            height: 'auto'
                        }}
                        onClick={() => switchTheme('xx')}
                    />
                    <TextBox>xx - The xx</TextBox>
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
    user-select: none;
    -webkit-user-drag: none;
`;

const ImageContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100vw;
    height: calc(100vh - 60px);
    top: 60px;
    opacity: ${({ theme }) => theme.aboutOpacity};
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.headerBg}; 
    }

    &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.buttonBg}; 
    }
`;

const Background = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
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
        content: url(${theme.mode === 'light' ? '/About/window_day.png' : theme.mode === 'dark' ? '/About/window_night.png' : '/About/window_sunset.png'});
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