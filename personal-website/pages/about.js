import styled from 'styled-components';
import Header from '../components/Header';
import { useRef, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import Link from 'next/link';

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
                <img src='/About/table.png' alt='table' style={{
                    position: 'absolute',
                    display: 'flex',
                    width: 'auto', 
                    height: '30%',
                    transform: 'translate(5%, 160%)',
                    zIndex: 2,
                }}/>
                <GlowContainer style={{transform: 'translate(20%, 93%)'}}>
                    <Link href="/music">
                        <GlowImage
                            src='/About/stereo.png'
                            alt='stereo.png'
                            style={{
                                width: 'auto',
                                height: '70%'
                            }}
                        />
                    
                    <TextBox>Click Here to go to Music</TextBox>
                    </Link>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(930%, 168%)'}}>
                    <GlowImage
                        src='/About/ps5.png'
                        alt='ps5'
                        style={{
                            width: 'auto',
                            height: '50%'
                        }}
                    />
                    <TextBox>I was an Xbox kid until high school</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(45%, 168%)'}}>
                    <GlowImage
                        src='/About/records.png'
                        alt='records'
                        style={{
                            width: 'auto',
                            height: '50%'
                        }}
                    />
                    <TextBox style={{left: '160px'}}>Click on the records to change the theme!</TextBox>
                </GlowContainer>
                <GlowContainer style={{zIndex: 1, transform: 'translate(175%, 52%)'}}>
                    <GlowImage 
                        alt='window.png'
                        id='window'
                        style={{
                            width: 'auto',
                            height: '200%',
                        }}
                    />
                    <TextBox>I had a balcony with a view of Hoboken in college</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(300%, 220%)'}}>
                    <GlowImage 
                        src='/About/whitedog.png' 
                        alt='dog'
                        style={{
                            width: 'auto',
                            height: '70%',
                        }}
                    />
                    <TextBox>I have always wanted a Husky</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(568%, 60%)'}}>
                    <GlowImage 
                        src='/About/jersey.png'
                        alt='jersey'
                        style={{
                            width: 'auto',
                            height: '90%',
                            zIndex: 1
                        }}
                    />
                    <TextBox>Sigma Nu</TextBox>
                </GlowContainer>


                {/*-------------- Records Section --------------}
                { Horizontal: 120px           Vertical: 120px*/}
                <GlowContainer style={{transform: 'translate(1050%, -10%)'}}>
                    <GlowImage
                        src='/About/records/1975.png'
                        alt='record_1975'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('the1975')}
                    />
                    <TextBox>ILIWYSFYASBYSU - The 1975</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1170%, -10%)'}}>
                    <GlowImage
                        src='/About/records/beck.png'
                        alt='record_beck'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('beck')}
                    />
                    <TextBox>Colors - Beck</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1290%, -10%)'}}>
                    <GlowImage
                        src='/About/records/mckenna.png'
                        alt='record_mckenna'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('mckenna')}
                    />
                    <TextBox>What Do You Think About the Car? - Declan McKenna</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1410%, -10%)'}}>
                    <GlowImage
                        src='/About/records/paramore.png'
                        alt='record_paramore'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('paramore')}
                    />
                    <TextBox>RIOT! - Paramore</TextBox>
                </GlowContainer>

                {/* ----- Second Row ----- */}
                <GlowContainer style={{transform: 'translate(1230%, 35%)'}}>
                    <GlowImage
                        src='/About/records/basement.png'
                        alt='record_basement'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('basement')}
                    />
                    <TextBox>colourmeinkindess - basement</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1350%, 35%)'}}>
                    <GlowImage
                        src='/About/records/borns.png'
                        alt='record_borns'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('borns')}
                    />
                    <TextBox>Dopamine - Borns</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1470%, 35%)'}}>
                    <GlowImage
                        src='/About/records/coldplay.png'
                        alt='record_coldplay'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('coldplay')}
                    />
                    <TextBox>Viva la Vida - Coldplay</TextBox>
                </GlowContainer>
                
                {/* ----- Third Row ----- */}
                <GlowContainer style={{transform: 'translate(1230%, 85%)'}}>
                    <GlowImage
                        src='/About/records/coldplay2.png'
                        alt='record_coldplay2'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('coldplay2')}
                    />
                    <TextBox>X&Y - Coldplay</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1350%, 85%)'}}>
                    <GlowImage
                        src='/About/records/glass.png'
                        alt='record_glass'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('glass')}
                    />
                    <TextBox>Dreamland - Glass Animals</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1470%, 85%)'}}>
                    <GlowImage
                        src='/About/records/imagine.png'
                        alt='record_imagine'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('imagine')}
                    />
                    <TextBox>Night Visions - Imagine Dragons</TextBox>
                </GlowContainer>

                {/* ----- Fourth Row ----- */}
                <GlowContainer style={{transform: 'translate(1050%, 130%)'}}>
                    <GlowImage
                        src='/About/records/blink.png'
                        alt='record_blink'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('blink')}
                    />
                    <TextBox>Take Off Your Pants and Jacket - blink-182</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1170%, 130%)'}}>
                    <GlowImage
                        src='/About/records/catfish.png'
                        alt='record_catfish'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('catfish')}
                    />
                    <TextBox>The Balcony - Catfish & the Bottlemen</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1290%, 130%)'}}>
                    <GlowImage
                        src='/About/records/daft.png'
                        alt='record_daft'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('daft')}
                    />
                    <TextBox>Random Access Memories - Daft Punk</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1410%, 130%)'}}>
                    <GlowImage
                        src='/About/records/monkeys.png'
                        alt='record_monkeys'
                        style={{
                            width: 'auto',
                            height: '40%'
                        }}
                        onClick={() => switchTheme('monkeys')}
                    />
                    <TextBox>AM - Arctic Monkeys</TextBox>
                </GlowContainer>
                <GlowContainer style={{transform: 'translate(1530%, 130%)'}}>
                    <GlowImage
                        src='/About/records/xx.png'
                        alt='record_xx'
                        style={{
                            width: 'auto',
                            height: '40%'
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
    background-color: ${({ theme }) => theme.bodyBg};
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
    justify-content: left;

    background-image: url('/About/background.png');
    background-position: left bottom;
    background-size: auto calc(100vh - 60px);

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

const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    
    align-items: center;
    justify-content: center;
    width: auto;
    height: 30%;
    margin: 0;
    padding: 0;
    z-index: 5;
`;

const GlowImage = styled.img`
    display: flex;
    transition: filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    
    z-index: 2;

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
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    font-family: "DM Mono", monospace;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
    z-index: 100;
`;
