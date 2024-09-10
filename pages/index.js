import styled from 'styled-components';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { useTheme } from '../components/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <Hero />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  font-family: Arial, sans-serif;
  user-select: none;
  -webkit-user-drag: none;
`;
