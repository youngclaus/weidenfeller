import React from 'react';
import styled from 'styled-components';

interface ObjectData {
  name: string;
  series: string;
  image: string;
  description: string;
}

interface PrintsComponentProps {
  prints: ObjectData[];
}

const PrintsComponent: React.FC<PrintsComponentProps> = ({ prints }) => {
  return (
    <PrintsContainer>
      {prints.length === 0 && <NoPrintsMessage>No prints yet.</NoPrintsMessage>}
      {prints.map((print) => (
        <PrintItem key={print.name}>
          <PrintImageContainer>
            <HoverOverlay>
              <Description>{print.description}</Description>
            </HoverOverlay>
            <PrintImage src={print.image} alt={`${print.name} image`} />
          </PrintImageContainer>
          <PrintName>{print.name}</PrintName>
        </PrintItem>
      ))}
    </PrintsContainer>
  );
};

export default PrintsComponent;

const PrintsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 10px;
  flex: 1;
  width: calc(100% - 20px);
  overflow-y: auto;
  padding-right: 5px;
  background-color: inherit;
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

const PrintImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: opacity 0.3s ease;
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  overflow-y: auto;
  z-index: 100;
`;

const PrintItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.c1};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  width: calc(100% - 30px);
  max-width: 100%;
  height: 175px;
  position: relative;

  &:hover {
    ${PrintImage} {
      opacity: 0;
    }
    ${HoverOverlay} {
      opacity: 1;
    }
  }
`;

const PrintImageContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Description = styled.p`
  color: ${({theme}) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
  text-align: center;
  margin: 0;
`;

const PrintName = styled.p`
  margin: 10px 0;
  color: ${({theme}) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;

const NoPrintsMessage = styled.p`
  color: ${({theme}) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;