import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const imageRef = useRef(null);
  const angleRef = useRef(0);
  const animationFrameId = useRef(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [floatingWords, setFloatingWords] = useState([]);

  const commandLines = [
    "Software Developer",
    "Artificial Intelligence Engineer",
    "Masters Degree Receiver",
    "Licensed Bartender",
    "Dedicated Music Listener",
    "Lifelong Borussia Dortmund Supporter",
    "Unique Shoe Collector",
    "New York Yankees Supporter",
    "Soccer Player",
    "Decent Golf Player",
    "Vinyl Collector",
    "Manga Enjoyer",
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

    const randomLeft = `${20 + Math.floor(Math.random() * 60)}%`;
    setFloatingWords([...floatingWords, { text: commandLines[currentLine], position: randomLeft }]);
  };

  return (
    <Container>
      <Code>
        <img src="/Hero/code.png" alt="code" />
      </Code>
      <RecordPlayer>
        <Tonearm>
          <img src="/Hero/turntable.png" alt="turntable" />
        </Tonearm>
        <Record>
          <img ref={imageRef} src="/Hero/blackyellow.png" alt="record" />
        </Record>
      </RecordPlayer>
      <Text>
        <Title>chris youngclaus</Title>
      </Text>
      <CircleContainer>
      <Circle>
          <img src="/Hero/chris.png" alt="image1" />
          <CircleText>About Me</CircleText>
        </Circle>
        <Circle>
          <img src="/Hero/map.png" alt="image1" />
          <CircleText>Allergenics</CircleText>
        </Circle>
        <Circle>
          <img src="/Hero/spotify.png" alt="image1" />
          <CircleText>Music</CircleText>
        </Circle>
        <Circle>
          <img src="/Hero/dortmund.png" alt="image1" />
          <CircleText>Hobbies</CircleText>
        </Circle>
      </CircleContainer>
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
      {floatingWords.map((word, index) => (
        <FloatingWord key={index} style={{ left: word.position }}>
          {word.text}
        </FloatingWord>
      ))}
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
  transform: translate(137%, -57%);
  z-index: 20;
`;

const Record = styled.div`
  position: absolute;
  transform: translate(25%, -50%);
`;

const Text = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 20vh;
  top: 100px;
  align-items: center;
  color: ${({ theme }) => theme.headerText};
`;

const Title = styled.div`
  position: static;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 7vw;
`;

const CircleContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100vw;
  height: 20vh;
  transform: translate(0, -20%);
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  position: relative;
  width: 9vw;
  height: 9vw;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin-left: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.1s ease-in-out;
  }

  &:hover img {
    filter: brightness(50%);
  }

  &:hover div {
    opacity: 1;
  }
`;

const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "DM Mono", monospace;
  font-size: 1.2rem;
  opacity: 0;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;
`;

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
  font-size: 16px;
  color: #fff;
  animation: 
    ${typing} 3.5s steps(${props => props.children.length}, end),
    ${blinkCaret} .75s step-end infinite,
    ${fadeOut} 2s steps(${props => props.children.length}, end) 5.5s forwards;
  width: ${props => props.children.length}ch;
`;

const FloatingWord = styled.div`
  position: fixed;
  bottom: 40px; /* Just above the command line */
  font-family: "DM Mono", monospace;
  font-size: 100%;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  opacity: 1;
  animation: 5s ${fadeOutUpwards} 3s ease-out forwards;
`;