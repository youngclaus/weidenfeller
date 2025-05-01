import styled, { keyframes } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

interface FloatingWord {
  text: string;
  position: string;
}

const CommandLine: React.FC = () => {
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const [currentLine, setCurrentLine] = useState<number>(0);

  const commandLines: string[] = [
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
    if (!isTyping) {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        setCurrentLine((prevLine) => (prevLine + 1) % commandLines.length);
      }, 500); // Short delay between lines

      return () => clearTimeout(timeout);
    }
  }, [isTyping, commandLines.length]);

  const handleAnimationEnd = () => {
    setIsTyping(false);

    const randomLeft = `${20 + Math.floor(Math.random() * 40)}%`;
    setFloatingWords((prevFloatingWords) => [
      ...prevFloatingWords,
      { text: commandLines[currentLine], position: randomLeft },
    ]);
  };

  return (
    <>
      <CommandLineContainer>
        {isTyping && (
          <CommandText onAnimationEnd={handleAnimationEnd} key={currentLine}>
            {`> console.log("${commandLines[currentLine]}")`}
          </CommandText>
        )}
      </CommandLineContainer>
      {floatingWords.map((word, index) => {
        const isLeftSide = parseInt(word.position) < 50; // Check if word is on the left half of the screen
        return (
          <FloatingWord
            key={index}
            style={{
              left: word.position,
              zIndex: 100,
              transformOrigin: isLeftSide ? 'left' : 'right', // Adjust the origin based on position
            }}
          >
            {word.text}
          </FloatingWord>
        );
      })}
    </>
  );
};

export default CommandLine;

const CommandLineContainer = styled.div`
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
  z-index: 10;
`;

const typing = keyframes`
  from { width: 0ch; }
  to { width: 20ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

const fadeOut = keyframes`
  from { width: 20ch; }
  to { width: 0ch; }
`;

const fadeOutUpwards = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-20px); }
`;

const CommandText = styled.span`
  margin: 10px;
  overflow: hidden;
  border-right: 0.15em solid white;
  white-space: nowrap;
  font-size: 18px;
  color: #fff;
  animation: 
    ${typing} 3.5s steps(${(props) => props.children?.toString().length}, end),
    ${blinkCaret} 0.75s step-end infinite,
    ${fadeOut} 2s steps(${(props) => props.children?.toString().length}, end) 5.5s forwards;
  width: ${(props) => props.children?.toString().length}ch;
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
