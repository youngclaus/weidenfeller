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

const ImageContainer: React.FC = () => {
  const { theme, switchTheme } = useTheme();
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [objects, setObjects] = useState<ObjectWithState[]>([]);
  const [hoveredText, setHoveredText] = useState<string | null>(null);
  const [showInventory, setShowInventory] = useState(false);
  const [renderInventory, setRenderInventory] = useState(false);
  const [isViewVisible, setIsViewVisible] = useState(true);
  const [isSwappingView, setIsSwappingView] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const toggleInventory = () => {
    if (isSwappingView) return;

    setIsSwappingView(true);
    setIsViewVisible(false);

    window.setTimeout(() => {
      setRenderInventory((currentValue) => !currentValue);
      setShowInventory((currentValue) => {
        if (currentValue) {
          setRefreshKey((prevKey) => prevKey + 1);
        }

        return !currentValue;
      });
      setIsViewVisible(true);
      setIsSwappingView(false);
    }, 180);
  };

  useEffect(() => {
    setObjects(getObjectsWithState());
  }, [refreshKey]);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
  
    const handleScroll = (event: WheelEvent) => {
      if (showInventory) {
        return;
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
        {renderInventory ? (
          <ViewPane $visible={isViewVisible} $view="create">
            <InventoryManager />
          </ViewPane>
        ) : (
          <ViewPane $visible={isViewVisible} $view="room">
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
          </ViewPane>
        )}
      </ViewportFrame>

      <MenuDock>
        <InventoryButton onClick={toggleInventory} isInventoryOpen={showInventory}/>
      </MenuDock>
    </ExploreLayout>
  );
};

export default ImageContainer;

const ExploreLayout = styled.div`
  --explore-top-space: clamp(72px, 11vh, 112px);
  --explore-side-space: clamp(14px, 3vw, 36px);
  --explore-bottom-space: clamp(14px, 3vh, 28px);
  --explore-menu-height: 80px;
  --explore-gap: clamp(12px, 2vh, 22px);

  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--explore-gap);
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  padding: var(--explore-top-space) var(--explore-side-space) var(--explore-bottom-space);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(circle at 50% 42%, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.22) 76%),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.24));
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const ViewportFrame = styled.div`
  flex: 0 1 auto;
  width: min(
    calc(100vw - (var(--explore-side-space) * 2)),
    calc((100dvh - var(--explore-top-space) - var(--explore-menu-height) - var(--explore-gap) - var(--explore-bottom-space)) * 2)
  );
  max-height: calc(100dvh - var(--explore-top-space) - var(--explore-menu-height) - var(--explore-gap) - var(--explore-bottom-space));
  aspect-ratio: 2 / 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.c3};
  border-radius: 8px;
  background: #000;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 24px 70px rgba(0, 0, 0, 0.54),
    0 0 22px ${({ theme }) => theme.glow};

  @media (max-width: 700px) {
    width: min(
      calc(100vw - (var(--explore-side-space) * 2)),
      calc((100dvh - var(--explore-top-space) - var(--explore-menu-height) - var(--explore-gap) - var(--explore-bottom-space)) * 2)
    );
  }
`;

const ViewPane = styled.div<{ $visible: boolean; $view: 'room' | 'create' }>`
  width: 100%;
  height: 100%;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible, $view }) => {
    if ($visible) return '0';
    return $view === 'room' ? '-10px' : '10px';
  }});
  transition: opacity 180ms ease, transform 180ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms;
    transform: none;
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
  height: var(--explore-menu-height);
`;
