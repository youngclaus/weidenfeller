import styled from 'styled-components';
import Header from '../components/Header';
import { useTheme } from '../components/Theme/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
      <Header />
      <Text>Nothing to see here (yet)</Text>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  font-family: Arial, sans-serif;
  user-select: none;
  -webkit-user-drag: none;
`;

const Text = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  font-family: "DM Mono", monospace;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  margin: 0;
  z-index: 3;

  &:hover {
    font-style: oblique;
  }
`;