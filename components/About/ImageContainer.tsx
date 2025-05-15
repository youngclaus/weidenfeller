import styled, { css } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { getObjectsWithState, ObjectWithState } from '../BlueprintMenu/blueprints';
import { useTheme } from '../Theme/ThemeContext';
import InventoryButton from './InventoryButton';
import InventoryManager from '../../components/BlueprintMenu/InventoryManager';

const blueprintPositions: { [name: string]: { height: string; transform: string; zIndex: number } } = {
  flag: {height: '40%', transform: 'translate(1%, 18%)', zIndex: 1},
  stereo: { height: '20%', transform: 'translate(25%, 175%)', zIndex: 10},
  records: { height: '13%', transform: 'translate(52%, 470%)', zIndex: 10},
  ps5: { height: '15%', transform: 'translate(455%, 395%)', zIndex: 8},
  window: { height: '50%', transform: 'translate(215%, 17%)', zIndex: 5 },
  dog: { height: '20%', transform: 'translate(300%, 310%)', zIndex: 5 },
  jersey: { height: '25%', transform: 'translate(590%, 82%)', zIndex: 5},
  /* -------------- Records Section -------------- */
  the1975: { height: '12%', transform: 'translate(1010%, 60%)', zIndex: 5 },
  beck: { height: '12%', transform: 'translate(1120%, 60%)', zIndex: 5 },
  mckenna: { height: '12%', transform: 'translate(1230%, 60%)', zIndex: 5 },
  paramore: { height: '12%', transform: 'translate(1340%, 60%)', zIndex: 5 },
  coldplay1: { height: '12%', transform: 'translate(1450%, 60%)', zIndex: 5 },

  basement: { height: '12%', transform: 'translate(1175%, 170%)', zIndex: 5 },
  borns: { height: '12%', transform: 'translate(1285%, 170%)', zIndex: 5 },
  coldplay2: { height: '12%', transform: 'translate(1395%, 170%)', zIndex: 5 },

  coldplay3: { height: '12%', transform: 'translate(1175%, 280%)', zIndex: 5 },
  glass: { height: '12%', transform: 'translate(1285%, 280%)', zIndex: 5 },

  blink: { height: '12%', transform: 'translate(1010%, 390%)', zIndex: 5 },
  catfish: { height: '12%', transform: 'translate(1120%, 390%)', zIndex: 5 },
  daft: { height: '12%', transform: 'translate(1230%, 390%)', zIndex: 5 },
  monkeys: { height: '12%', transform: 'translate(1340%, 390%)', zIndex: 5 },
  xx: { height: '12%', transform: 'translate(1450%, 390%)', zIndex: 5 },
};

const staticImages = [
  {
    src: '/About/table.png',
    alt: 'table',
    style: {
      position: 'absolute',
      display: 'flex',
      width: 'auto',
      height: '30%',
      transform: 'translate(5%, 165%)',
    } as React.CSSProperties ,
  },
];

interface ImageContainerProps {
  setActiveComponent: (component: 'index' | 'projects' | 'about' | 'music') => void;
}

const ImageContainer: React.FC<ImageContainerProps> = ({ setActiveComponent }) => {
  const { theme, switchTheme } = useTheme();
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [objects, setObjects] = useState<ObjectWithState[]>([]);
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [showInventory, setShowInventory] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleInventory = () => {
    if (showInventory) {
        setRefreshKey((prevKey) => prevKey + 1);
    }
    setShowInventory(!showInventory);
  };

  useEffect(() => {
    setObjects(getObjectsWithState());
  }, [refreshKey]);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
  
    const handleScroll = (event: WheelEvent) => {
      if (showInventory) {
        const inventoryElement = document.querySelector('#inventory-overlay');
        if (inventoryElement && inventoryElement.contains(event.target as Node)) {
          // vertical scrolling within the inventory
          return;
        }
  
        // Prevent scrolling outside the inventory
        event.preventDefault();
      } else {
        // horizontal scrolling with the wheel
        if (imageContainer) {
          imageContainer.scrollLeft += event.deltaY;
        }
      }
    };
  
    // scroll listener
    window.addEventListener('wheel', handleScroll, { passive: false });
  
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [showInventory]);

  const getDynamicSrc = (name: string, defaultSrc: string): string => {
    if (name === 'window') {
        if (theme.mode === 'light') {
            return '/About/window_day.png';
        } else if (theme.mode === 'dark') {
            return '/About/window_night.png';
        } else {
            return '/About/window_sunset.png';
        }
    }
    return defaultSrc;
  };

  const hasCompleted = objects.some(obj => obj.active);
  const defaultMessage = 'Open the menu to fill up my room';
  const displayText = hoveredText || (!hasCompleted ? defaultMessage : '');

  return (
    <StyledImageContainer ref={imageContainerRef}>
      {staticImages.map((image, idx) => (
        <StaticImage key={idx} {...image} />
      ))}
      {objects
        .filter(obj => blueprintPositions[obj.name]) // Only include prints with defined positions
        .map(obj => {
          const pos = blueprintPositions[obj.name];

          return (
            <GlowContainer
              key={obj.name}
              style={{ height: pos.height, transform: pos.transform, zIndex: pos.zIndex }}
            >
              <GlowImage
                $active={obj.active}
                src={getDynamicSrc(obj.name, obj.image)}
                alt={obj.name}
                onMouseEnter={() => obj.active && setHoveredText(obj.description)}
                onMouseLeave={() => obj.active && setHoveredText(null)}
                onClick={() => obj.active && obj.series === 'vinyl collection' && switchTheme(obj.name)}
              />
            </GlowContainer>
          );
        })}
        <TextBox $visible={!!displayText}>{displayText}</TextBox>
        <InventoryContainer>
          <InventoryButton onClick={toggleInventory} isInventoryOpen={showInventory} setActiveComponent={setActiveComponent}/>
        </InventoryContainer>
        {showInventory && (
            <InventoryOverlay id="inventory-overlay">
                <InventoryManager />
            </InventoryOverlay>
        )}
    </StyledImageContainer>
  );
};

export default ImageContainer;

const StyledImageContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  z-index: 10;

  opacity: ${({ theme }) => theme.opacity};
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: left;

  background-image: url('/About/background.png');
  background-position: left bottom;
  background-size: auto calc(100vh);
  background-repeat: repeat-x;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.c2};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.c4};
  }
`;

const StaticImage = styled.img`
  position: absolute;
`;

const GlowContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlowImage = styled.img<{ $active: boolean }>`
  display: flex;
  transition: filter 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: auto;
  height: 100%;

  ${({ $active, theme }) =>
    $active
      ? css`filter: none;`
      : css`filter: brightness(0) drop-shadow(0 0 4px ${theme.c4});`}

  /* Hover state: glow for active, stronger red-outline for inactive */
  &:hover {
    ${({ $active, theme }) =>
      $active
        ? css`filter: brightness(1.2) drop-shadow(0 0 20px ${theme.glow});`
        : css`filter: brightness(0) drop-shadow(0 0 12px ${theme.c4});`}
  }
`;

const TextBox = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  font-family: "DM Mono", monospace;
  font-size: 2.5vh;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  white-space: nowrap;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  z-index: 10000;
`;

const InventoryContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 100px;
`

const InventoryOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
