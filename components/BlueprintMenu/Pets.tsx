import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Pet {
    name: string;
    frames: string[];
    speed: number;
    direction: 'left' | 'right';
    x: number;
}

const Pets: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([
        {
            name: 'ludicolo',
            frames: ['/About/sprites/ludicolo_1.png', '/About/sprites/ludicolo_2.png'],
            speed: 0.5,
            direction: 'right',
            x: 0,
        }
    ]);
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setPets(prev =>
            prev.map(pet => {
              let newX = pet.x + (pet.direction === 'left' ? pet.speed : -pet.speed);
              let newDir = pet.direction;
    
              // Bounce off edges
              if (newX < 0) {
                newX = 0;
                newDir = 'left';
              } else if (newX > window.innerWidth - 64) {
                newX = window.innerWidth - 64;
                newDir = 'right';
              }
    
              return { ...pet, x: newX, direction: newDir };
            })
          );
        }, 20);
    
        return () => clearInterval(interval);
      }, []);
    
      // Switch frames every 400ms
      useEffect(() => {
        const interval = setInterval(() => {
          setFrameIndex(prev => (prev + 1) % 2);
        }, 400);
        return () => clearInterval(interval);
      }, []);
    
      return (
        <PetContainer>
          {pets.map((pet, i) => (
            <PetImage
              key={i}
              src={pet.frames[frameIndex]}
              style={{
                left: `${pet.x}px`,
                transform: pet.direction === 'right' ? 'scaleX(1)' : 'scaleX(-1)',
              }}
              alt={pet.name}
            />
          ))}
        </PetContainer>
      );
};

export default Pets;

const PetContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 64px;
  pointer-events: none;
  z-index: 9999;
`;

const PetImage = styled.img`
  position: absolute;
  width: 64px;
  height: 64px;
  image-rendering: pixelated;
  transition: transform 0.2s;
`;