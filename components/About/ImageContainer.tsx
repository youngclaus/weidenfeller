import styled, { css } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import { getObjectsWithState, ObjectWithState } from '../BlueprintMenu/blueprints';
import { useTheme } from '../Theme/ThemeContext';
import { getThemeGlowFilter } from '../Theme/exploreGlow';
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
    <ExploreLayout>
      <ViewportFrame>
        <StyledImageContainer ref={imageContainerRef}>
          {staticImages.map((image, idx) => (
            <StaticImage key={idx} {...image} />
          ))}
          {objects
            .filter(obj => blueprintPositions[obj.name])
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
        </StyledImageContainer>
      </ViewportFrame>

      <MenuDock>
        <InventoryButton onClick={toggleInventory} isInventoryOpen={showInventory} setActiveComponent={setActiveComponent}/>
      </MenuDock>

      {showInventory && (
        <InventoryOverlay id="inventory-overlay">
          <InventoryManager />
        </InventoryOverlay>
      )}
    </ExploreLayout>
  );
};

export default ImageContainer;

const ExploreLayout = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 2.6vh, 26px);
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  padding: clamp(70px, 10vh, 108px) clamp(18px, 4vw, 48px) clamp(26px, 5vh, 48px);
`;

const ViewportFrame = styled.div`
  flex: 0 1 auto;
  width: min(1000px, 86vw);
  height: clamp(300px, 50vh, 540px);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 8px;
  background: #000;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 70px rgba(0, 0, 0, 0.42),
    0 0 34px ${({ theme }) => theme.glow};

  @media (max-width: 700px) {
    width: min(100%, 92vw);
    height: clamp(260px, 44vh, 420px);
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;

  opacity: ${({ theme }) => theme.opacity};
  overflow-x: auto;
  overflow-y: hidden;
  justify-content: left;

  background-image: url('/About/background.png');
  background-position: left bottom;
  background-size: auto 100%;
  background-repeat: repeat-x;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.c3};
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
        ? css`filter: ${getThemeGlowFilter(theme.glow, 20)};`
        : css`filter: brightness(0) drop-shadow(0 0 12px ${theme.c4});`}
  }
`;

const TextBox = styled.div<{ $visible: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 8%;
  transform: translateX(-50%);
  font-family: "DM Mono", monospace;
  font-size: clamp(13px, 2vh, 22px);
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

const MenuDock = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  width: min(90vw, 360px);
  height: 80px;
`;

const InventoryOverlay = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
