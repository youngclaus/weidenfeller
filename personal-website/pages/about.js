import styled from 'styled-components';
import Header from '../components/Header';

const About = () => {
    return (
        <Container>
            <Header />
            <ImageContainer>
                <GlowContainer style={{left: '50%', bottom: '34%'}}>
                    <GlowImage 
                        alt='window.png'
                        id='window'
                        style={{
                            width: '250px',
                            height: 'auto',
                        }}
                    />
                    <TextBox>I had my own balcony with a view of Hoboken in college</TextBox>
                </GlowContainer>
                <GlowContainer style={{left: '70%', bottom: '25%'}}>
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
    background-image: url('/About/background.png');
    background-size: 1920px 1080px;
    background-repeat: repeat-x;
    background-position: bottom center;
    opacity: ${({ theme }) => theme.aboutOpacity};
`;

const GlowContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    transform: translate(-50%, -50%);
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
        filter: brightness(1.2) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
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