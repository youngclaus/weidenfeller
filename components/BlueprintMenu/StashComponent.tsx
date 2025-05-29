import React from 'react';
import styled from 'styled-components';
import { getUserBits, colorDictionary } from './bits';

interface Bit {
  color: string;
  quantity: number;
}

interface StashComponentProps {
  stash: Bit[];
}

const StashComponent: React.FC<StashComponentProps> = ({ stash }) => {
  return (
    <Container>
      {stash.length === 0 && <NoBitsMessage>No bits available.</NoBitsMessage>}
      {stash.map((bit, index) => (
        <BitContainer key={index}>
          <ColorBox color={Object.keys(colorDictionary).find(key => colorDictionary[key].toLowerCase() === bit.color.toLowerCase()) || bit.color} />
          <BitName>{bit.color}</BitName>
          <BitQuantity>{bit.quantity}</BitQuantity>
        </BitContainer>
      ))}
    </Container>
  );
};

export default StashComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 10px;
  flex: 1;
  width: calc(100% - 20px);
  overflow-y: auto;
  padding-right: 5px;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.c2}; 
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.c1};
    border-radius: 4px;
  }
`;

const BitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.c1};
  width: 80%;
  height: 60px;
  flex-shrink: 0;
  flex-grow: 0;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 3vw;
  height: 3vw;
  max-width: 20px;
  max-height: 20px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  border: 1px solid #000;
`;

const BitName = styled.p`
  margin: 0;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: clamp(2px, 2vw, 20px);
  color: ${({ theme }) => theme.c4};
  display: none;

  @media (min-width: 850px) {
    display: block;
  }
`;

const BitQuantity = styled.p`
  margin: 0;
  font-family: "DM Mono", monospace;
  color: ${({ theme }) => theme.c4};
`;

const NoBitsMessage = styled.p`
  color: ${({ theme }) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;