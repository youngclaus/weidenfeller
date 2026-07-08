import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colorDictionary, getUserBits, removeUserBits, getHexFromColorName } from './bits';

interface Bit {
  color: string;
  quantity: number;
}

interface ObjectData {
  name: string;
  series: string;
  image: string;
  description: string;
  requiredBits: { color: string; quantity: number }[];
}

interface BlueprintComponentProps {
  completeBlueprint: (name: string) => void;
  blueprints: ObjectData[];
}

const BlueprintComponent: React.FC<BlueprintComponentProps> = ({ completeBlueprint, blueprints }) => {
  const [userStash, setUserStash] = useState<Bit[]>([]);

  useEffect(() => {
    setUserStash(getUserBits());
  }, []);

  const hasRequiredBits = (requiredBits: { color: string; quantity: number }[]): boolean => {
    return requiredBits.every((requiredBit) => {
      const stashBit = userStash.find((bit) => bit.color.toLowerCase() === requiredBit.color.toLowerCase());
      return Boolean(stashBit && stashBit.quantity >= requiredBit.quantity);
    });
  };

  const handleCompleteBlueprint = (blueprintName: string) => {
    const blueprint = blueprints.find((candidate) => candidate.name === blueprintName);
    if (blueprint && hasRequiredBits(blueprint.requiredBits)) {
      removeUserBits(blueprint.requiredBits);
      setUserStash(getUserBits());
      completeBlueprint(blueprintName);
    }
  };

  return (
    <BlueprintContainer>
      {blueprints.map((blueprint) => (
        <BlueprintItem key={blueprint.name}>
          <BlueprintImageContainer>
            <HoverOverlay>
              {blueprint.requiredBits.map((bit) => (
                <BitRequirement key={`${blueprint.name}-${bit.color}`}>
                  <ColorBox color={getHexFromColorName(bit.color) || bit.color} />
                  <span>{colorDictionary[bit.color] || bit.color}: {bit.quantity}</span>
                </BitRequirement>
              ))}
            </HoverOverlay>
            <BlueprintImage src={blueprint.image} alt={`${blueprint.name} image`} />
          </BlueprintImageContainer>
          <BlueprintName>{blueprint.name}</BlueprintName>
          <CompleteButton
            onClick={() => handleCompleteBlueprint(blueprint.name)}
            disabled={!hasRequiredBits(blueprint.requiredBits)}
          >
            {hasRequiredBits(blueprint.requiredBits) ? 'complete' : 'not enough bits'}
          </CompleteButton>
        </BlueprintItem>
      ))}
    </BlueprintContainer>
  );
};

export default BlueprintComponent;

const BlueprintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1;
  width: calc(100% - 20px);
  overflow-y: auto;
  padding: 10px;
  padding-right: 5px;
  background-color: inherit;
  min-height: 0;
  margin: 10px;

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

const BlueprintImageContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 100;
`;

const BlueprintImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: brightness(0);
  transition: filter 0.3s ease;
`;

const BlueprintItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.24);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: calc(100% - 30px);
  max-width: 100%;
  height: 175px;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.c3};

    ${BlueprintImage} {
      opacity: 0;
    }
    ${HoverOverlay} {
      opacity: 1;
    }
  }
`;

const BitRequirement = styled.p`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 5px;
  color: ${({theme}) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.54);
  background-color: ${({color}) => color};
`;

const BlueprintName = styled.p`
  margin: 10px 0;
  color: ${({theme}) => theme.c4};
  font-family: "DM Mono", monospace;
  font-weight: bold;
`;

const CompleteButton = styled.button`
  padding: 7px 11px;
  color: ${({theme}) => theme.c4};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "DM Mono", monospace;
  font-weight: bold;
  font-size: 10px;

  &:hover:not(:disabled) {
    border-color: ${({theme}) => theme.c3};
    color: ${({theme}) => theme.c3};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }
`;
