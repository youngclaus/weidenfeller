import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { altrock } from './themes';

const Hero = ({ toggleTheme, currentTheme, setTheme }) => {
  const imageRef = useRef(null);
  const angleRef = useRef(0);
  const animationFrameId = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const commandLines = [
    "Software Developer",
    "Artificial Intelligence Engineer",
    "Licensed Bartender",
    "Unhealthy Amounts of Music Listener",
    "Long-time Borussia Dortmund Supporter",
    "Unique Shoe Collector",
    "New York Yankees Supporter",
    "Soccer Player",
    "Decent Golf Player",
    "Vinyl Collector",
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
    if (currentLine < commandLines.length && !isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setCurrentLine(currentLine + 1);
      }, 1000); // Short delay between lines

      return () => clearTimeout(timeout);
    }
  }, [isTyping, currentLine, commandLines.length]);

  const handleAnimationEnd = () => {
    setIsTyping(false);
  };

  return (
    <Container>
      <Code>
        <img src="/code.png" alt="code" />
      </Code>
      <RecordPlayer>
        <Tonearm>
          <img src="turntable.png" alt="turntable" />
        </Tonearm>
        <Record>
          <img ref={imageRef} src="/blackyellow.png" alt="record" />
        </Record>
      </RecordPlayer>
      <Text>
        <Title>chris youngclaus</Title>
      </Text>
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
    </Container>
  );
};

export default Hero;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bodyBg};
`;

const Code = styled.div`
  opacity: 0.3;
  filter: blur(3px);
  position: absolute;
`;

const RecordPlayer = styled.div`
  width: 100;
  height: 100;
  opacity: 0.2;
`;

const Tonearm = styled.div`
  position: absolute;
  scale: 250%;
  transform: translate(20%, -57%);
  z-index: 20;
`;

const Record = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 80vh;
  align-items: center;
`;

const Title = styled.div`
  position: static;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 9vw;
`;

const CommandLine = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15px;
  background-color: #111;
  color: #fff;
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

const CommandText = styled.span`
  margin: 0;
  overflow: hidden;
  border-right: .15em solid white;
  white-space: nowrap;
  font-size: 16px;
  color: #fff;
  animation: 
    ${typing} 3.5s steps(${props => props.children.length}, end),
    ${blinkCaret} .75s step-end infinite,
    ${fadeOut} 2s steps(${props => props.children.length}, end) 5.5s forwards;
  width: ${props => props.children.length}ch;
`;