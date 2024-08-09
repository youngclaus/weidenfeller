import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { blackAndWhiteTheme } from './themes';

const Hero = ({ toggleTheme, currentTheme, setTheme }) => {
  const imageRef = useRef(null);
  const angleRef = useRef(0);
  const animationFrameId = useRef(null);

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
      <ThemeSwitcher>
        <ThemeImage onClick={() => setTheme(blackAndWhiteTheme)} src="/mixtape_altrock.png" alt="altrock theme" />
      </ThemeSwitcher> 
    </Container>
  );
};

export default Hero;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.bodyBg};
`;

const Code = styled.div`
  opacity: 0.1;
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

const ThemeSwitcher = styled.div`
  position: absolute;
  display: flex;
  width: 50vw;
  height: 100vh;
  left: 100px;
  justify-content: left;
  margin-top: 20px;
  gap: 20px;
  z-index: 40;
`;

const ThemeImage = styled.img`
  position: absolute;
  width: 100px;
  height: auto;
  bottom: 0;
  transform: translate(0%, 10%);
  cursor: pointer;
  scale: 3;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translate(0%, -10%);
  }
`;