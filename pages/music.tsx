import styled from 'styled-components';
import React, { useState } from 'react';
import { getUserBits, addUserBits, Bit } from '../components/BlueprintMenu/bits';

const Music: React.FC = () => {
  const [stash, setStash] = useState<Bit[]>([]);
  const [buttonText, setButtonText] = useState("Here's bits to play with for now");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleTestButtonClick = () => {
    addUserBits('white', 100);
    addUserBits('gray', 100);
    addUserBits('blue', 100);
    addUserBits('brown', 100);
    addUserBits('gray', 100);
    addUserBits('orange', 100);
    addUserBits('pink', 100);
    addUserBits('yellow', 100);
    addUserBits('green', 100);
    addUserBits('brown', 100);
    addUserBits('black', 100);

    setStash(getUserBits());
    setButtonText("Test Bits Added (go back to the explore page to use them)");
    setIsButtonDisabled(true);
  };

  return (
    <Container>
      <Text>Nothing to see here (yet)</Text>
      <TestButton onClick={handleTestButtonClick} disabled={isButtonDisabled}>{buttonText}</TestButton>
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

const TestButton = styled.button`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.c2};
  color: ${({ theme }) => theme.c4};
  border: none;
  border-radius: 5px;
  font-family: "DM Mono", monospace;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.c1};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.c1};
    cursor: not-allowed;
  }
`;