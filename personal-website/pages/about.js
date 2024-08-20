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
                }}/>
                <GlowContainer style={{height: '40%',transform: 'translate(1%, 2%)'}}>
                    <GlowImage  src='/About/flag.png' alt='flag' />
                    <TextBox>I've been a Borussia Dortmund fan since 2012</TextBox>
                </GlowContainer>
                <Link href="/music" passHref>
                    <GlowContainer style={{height: '20%', transform: 'translate(25%, 170%)'}}>
                        <GlowImage src='/About/stereo.png' alt='stereo.png'/>
                        <TextBox>Click Here to go to Music</TextBox>
                    </GlowContainer>
                </Link>
                <GlowContainer style={{height: '15%', transform: 'translate(950%, 385%)'}}>
                    <GlowImage
                        src='/About/ps5.png'
                        alt='ps5'
                    />
                    <TextBox>I was an Xbox kid until high school</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '15%', transform: 'translate(45%, 385%)'}}>
                    <GlowImage src='/About/records.png' alt='records' />
                    <TextBox style={{left: '160px'}}>Click on the records to change the theme!</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '50%', transform: 'translate(210%, 5%)'}}>
                    <GlowImage alt='window.png' id='window' />
                    <TextBox>I had a balcony with a view of Hoboken in college</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '20%', transform: 'translate(300%, 350%)'}}>
                    <GlowImage src='/About/whitedog.png' alt='dog' />
                    <TextBox>I have always wanted a Husky</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '29%', transform: 'translate(500%, 57%)'}}>
                    <GlowImage src='/About/jersey.png' alt='jersey' />
                    <TextBox>Sigma Nu</TextBox>
                </GlowContainer>


                {/*-------------- Records Section --------------}
                { Horizontal: 120px           Vertical: 120px*/}
                <GlowContainer style={{height: '12%', transform: 'translate(1000%, 30%)'}}>
                    <GlowImage
                        src='/About/records/1975.png'
                        alt='record_1975'
                        onClick={() => switchTheme('the1975')}
                    />
                    <TextBox style={{zIndex: 1000}}>ILIWYSFYASBYSU - The 1975</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1120%, 30%)'}}>
                    <GlowImage
                        src='/About/records/beck.png'
                        alt='record_beck'
                        onClick={() => switchTheme('beck')}
                    />
                    <TextBox>Colors - Beck</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1240%, 30%)'}}>
                    <GlowImage
                        src='/About/records/mckenna.png'
                        alt='record_mckenna'
                        onClick={() => switchTheme('mckenna')}
                    />
                    <TextBox>What Do You Think About the Car? - Declan McKenna</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1360%, 30%)'}}>
                    <GlowImage
                        src='/About/records/paramore.png'
                        alt='record_paramore'
                        onClick={() => switchTheme('paramore')}
                    />
                    <TextBox>RIOT! - Paramore</TextBox>
                </GlowContainer>

                {/* ----- Second Row ----- */}
                <GlowContainer style={{height: '12%', transform: 'translate(1180%, 150%)'}}>
                    <GlowImage
                        src='/About/records/basement.png'
                        alt='record_basement'
                        onClick={() => switchTheme('basement')}
                    />
                    <TextBox>colourmeinkindess - basement</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1300%, 150%)'}}>
                    <GlowImage
                        src='/About/records/borns.png'
                        alt='record_borns'
                        onClick={() => switchTheme('borns')}
                    />
                    <TextBox>Dopamine - Borns</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1420%, 150%)'}}>
                    <GlowImage
                        src='/About/records/coldplay.png'
                        alt='record_coldplay'
                        onClick={() => switchTheme('coldplay')}
                    />
                    <TextBox>Viva la Vida - Coldplay</TextBox>
                </GlowContainer>
                
                {/* ----- Third Row ----- */}
                <GlowContainer style={{height: '12%', transform: 'translate(1180%, 270%)'}}>
                    <GlowImage
                        src='/About/records/coldplay2.png'
                        alt='record_coldplay2'
                        onClick={() => switchTheme('coldplay2')}
                    />
                    <TextBox>X&Y - Coldplay</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1300%, 270%)'}}>
                    <GlowImage
                        src='/About/records/glass.png'
                        alt='record_glass'
                        onClick={() => switchTheme('glass')}
                    />
                    <TextBox>Dreamland - Glass Animals</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1420%, 270%)'}}>
                    <GlowImage
                        src='/About/records/imagine.png'
                        alt='record_imagine'
                        onClick={() => switchTheme('imagine')}
                    />
                    <TextBox>Night Visions - Imagine Dragons</TextBox>
                </GlowContainer>

                {/* ----- Fourth Row ----- */}
                <GlowContainer style={{height: '12%', transform: 'translate(1000%, 390%)'}}>
                    <GlowImage
                        src='/About/records/blink.png'
                        alt='record_blink'
                        onClick={() => switchTheme('blink')}
                    />
                    <TextBox>Take Off Your Pants and Jacket - blink-182</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1120%, 390%)'}}>
                    <GlowImage
                        src='/About/records/catfish.png'
                        alt='record_catfish'
                        onClick={() => switchTheme('catfish')}
                    />
                    <TextBox>The Balcony - Catfish & the Bottlemen</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1240%, 390%)'}}>
                    <GlowImage
                        src='/About/records/daft.png'
                        alt='record_daft'
                        onClick={() => switchTheme('daft')}
                    />
                    <TextBox>Random Access Memories - Daft Punk</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1360%, 390%)'}}>
                    <GlowImage
                        src='/About/records/monkeys.png'
                        alt='record_monkeys'
                        onClick={() => switchTheme('monkeys')}
                    />
                    <TextBox>AM - Arctic Monkeys</TextBox>
                </GlowContainer>
                <GlowContainer style={{height: '12%', transform: 'translate(1480%, 390%)'}}>
                    <GlowImage
                        src='/About/records/xx.png'
                        alt='record_xx'
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
    z-index: 1000;
`;

const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    z-index: 1;
    align-items: center;
    justify-content: center;
    width: auto;
    height: 30%;
`;

const GlowImage = styled.img`
    display: block;
    transition: filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: auto;
    height: 100%;
    z-index: 2;
    ${({ id, theme }) => 
        id === 'window' && `
        content: url(${theme.mode === 'light' ? '/About/window_day.png' : theme.mode === 'dark' ? '/About/window_night.png' : '/About/window_sunset.png'});
    `}

    &:hover {
        filter: brightness(1.2) drop-shadow(0 0 20px ${({ theme }) => theme.aboutGlow });
        z-index: 3;
    }

    &:hover + div {
        opacity: 1;
        z-index: 1000;
    }
`;


