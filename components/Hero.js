import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Player from './Player.js';

const Hero = () => {
  const imageRef = useRef(null);
  const angleRef = useRef(0);
  const animationFrameId = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [floatingWords, setFloatingWords] = useState([]);

  const commandLines = [
    "Ambitious Software Developer",
    "Creative Full-Stacker",
    "Artificial Intelligence Engineer",
    "Masters Degree Receiver",
    "Active Full-Time Job Seeker",
    "Licensed Bartender",
    "Constant Music Listener",
    "Lifelong Borussia Dortmund Supporter",
    "Unique Shoe Collector",
    "Yankees Supporter",
    "Soccer Player",
    "Decent Golf Player",
    "Vinyl Collector",
    "Japanese Art Enjoyer",
    "Master Lego Builder",
    "Avid Arizona Iced Tea Drinker",
    "Large Beanbag Enjoyer",
  ];

  useEffect(() => {
    const img = imageRef.current;

    const rotateImage = () => {
      if (img) {
        img.style.transform = `rotate(${angleRef.current}deg)`;
        angleRef.current = (angleRef.current + 1) % 360;
        animationFrameId.current = requestAnimationFrame(rotateImage);
      }
    };

    rotateImage();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setCurrentLine(prevLine => (prevLine + 1) % commandLines.length);
      }, 500); // Short delay between lines

      return () => clearTimeout(timeout);
    }
  }, [isTyping, commandLines.length]);

  const handleAnimationEnd = () => {
    setIsTyping(false);

    const randomLeft = `${20 + Math.floor(Math.random() * 40)}%`;
    setFloatingWords([...floatingWords, { text: commandLines[currentLine], position: randomLeft }]);
  };

  return (
    <Container>
      <BackgroundContainer>
        <Code>
          <img src="/Hero/code.png" alt="code" />
        </Code>
      </BackgroundContainer>

      <ContentContainer>
        <PlayerContainer>
          <Player />
        </PlayerContainer>
        <TitleContainer>
          <Title>chris</Title>
          <Title>youngclaus</Title>
        </TitleContainer>
      </ContentContainer>

      <CommandLine>
        {isTyping && (
          <CommandText
            onAnimationEnd={handleAnimationEnd}
            key={currentLine}
          >
            {`> console.log("${commandLines[currentLine]}")`}
          </CommandText>
        )}
      </CommandLine>
      {floatingWords.map((word, index) => {
        const isLeftSide = parseInt(word.position) < 50; // Check if word is on the left half of the screen
        return (
          <FloatingWord
            key={index}
            style={{
              left: word.position,
              transformOrigin: isLeftSide ? 'left' : 'right', // Adjust the origin based on position
            }}
          >
            {word.text}
          </FloatingWord>
        );
      })}
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.c1};
  z-index: 0;
`;

const BackgroundContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const Code = styled.div`
  opacity: 0.3;
  filter: blur(5px);
  position: absolute;
  width: 100vw;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  @media (max-width: 949px) {
    width: 100vw;
    height: calc(100vh - 35px);
    align-items: center;
    justify-content: center;
    z-index: 5;
  }

  @media (min-width: 950px) {
    display: flex;
    width: 100vw;
    height: calc(100vh - 35px);
    align-items: center;
    z-index: 5;
    justify-content: space-between;
    flex-direction: row;  
  }
`

const TitleContainer = styled.div`
  @media (max-width: 949px) {
    display: none;
    width: 0px;
    height: 0px;
  }

  @media (min-width: 950px) {
    width: 60%;
    height: auto;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
`

const Title = styled.div`
  text-align: left;
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
  opacity: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: clamp(1rem, 8vw, 9rem);
`;

const PlayerContainer = styled.div`
  @media (max-width: 949px) {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    left: 50%;
    top: 10%;
    transform: translate(-50%);
    padding: 0;

    @supports (-webkit-touch-callout: none) {
      position: absolute;
      display: flex;
      width: 80%;
      height: 80%;
      justify-content: center;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0;
    }
  }

  @media (min-width: 950px) {
    display: flex;
    width: 40%;
    height: 100%;

    justify-content: right;
    padding-right: 20px;
    align-items: center;
    z-index: 10;
  }
`

const CommandLine = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15px;
  background-color: #111;
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 50;
`;

const typing = keyframes`
  from { width: 0ch; }
  to { width: ${props => props.children.length}ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

const fadeOut = keyframes`
  from { width: ${props => props.children.length}ch; }
  to { width: 0ch; }
`;

const fadeOutUpwards = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const CommandText = styled.span`
  margin: 10px;
  overflow: hidden;
  border-right: .15em solid white;
  white-space: nowrap;
  font-size: 18px;
  color: #fff;
  animation: 
    ${typing} 3.5s steps(${props => props.children.length}, end),
    ${blinkCaret} .75s step-end infinite,
    ${fadeOut} 2s steps(${props => props.children.length}, end) 5.5s forwards;
  width: ${props => props.children.length}ch;
`;

const FloatingWord = styled.div`
  position: fixed;
  bottom: 40px;
  font-family: "DM Mono", monospace;
  font-size: 100%;
  color: ${({ theme }) => theme.c4};
  font-weight: bold;
  white-space: nowrap;
  opacity: 1;
  animation: 5s ${fadeOutUpwards} 3s ease-out forwards;
  transform-origin: left;
`;
