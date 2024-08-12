import styled, { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { useState } from 'react';
import {lightTheme, darkTheme} from '../components/themes';

const Home = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header toggleTheme={toggleTheme} currentTheme={theme}/>
        <Hero toggleTheme={toggleTheme} currentTheme={theme} setTheme={setTheme}/>
      </Container>
    </ThemeProvider>
  );
};

export default Home;

const Container = styled.div`
  font-family: Arial, sans-serif;
  user-select: none;
  -webkit-user-drag: none;
`;
