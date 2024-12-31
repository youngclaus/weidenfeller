import styled from 'styled-components';

const Music: React.FC = () => {

  return (
    <Container>
      <Text>Nothing to see here (yet)</Text>
    </Container>
  );
};

export default Music;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({theme}) => theme.c1};
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
  color: ${({ theme }) => theme.c4};
  margin: 0;
  z-index: 3;
  white-space: nowrap;

  &:hover {
    font-style: oblique;
  }
`;