import React from 'react';
import styled from 'styled-components';
import { colorDictionary } from './bits';

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
    background: rgba(255, 255, 255, 0.32);
    border-radius: 999px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const BitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
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
  border: 1px solid rgba(255, 255, 255, 0.54);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
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
