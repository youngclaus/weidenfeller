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
          <BitInfo>
            <BitName>{bit.color}</BitName>
            <BitQuantity>{bit.quantity}</BitQuantity>
          </BitInfo>
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
  margin-top: 10px;
  margin-bottom: 10px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.c2}; 
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.c3}; 
  }
`;

const BitContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.1);
`;

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
  border: 1px solid #000;
`;

const BitInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BitName = styled.p`
  margin: 0;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  color: ${({ theme }) => theme.c4};
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
