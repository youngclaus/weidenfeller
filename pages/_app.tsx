import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/Theme/ThemeContext';
import styled, { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header';
import ConstellationBackground from '../components/Index/ConstellationBackground';
import Index from './index';
import Projects from './projects';
import About from './about';
import Music from './music';
import '../styles/globals.css';

type ActiveComponent = 'index' | 'projects' | 'about' | 'music';

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <ThemedApp />
      <Analytics />
    </CustomThemeProvider>
  );
};

const ThemedApp: React.FC = () => {
  const { theme } = useTheme();
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('index');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  const handleSetActiveComponent = useCallback((component: ActiveComponent) => {
    if (component === activeComponent || isTransitioning) return;

    setIsTransitioning(true);
    setContentVisible(false);

    timers.current.push(setTimeout(() => {
      setActiveComponent(component);
    }, 180));

    timers.current.push(setTimeout(() => {
      setContentVisible(true);
    }, 200));

    timers.current.push(setTimeout(() => {
      setIsTransitioning(false);
    }, 380));
  }, [activeComponent, isTransitioning]);

  const usesStarfield = activeComponent === 'index' || activeComponent === 'projects';
  const showHomeObjects = activeComponent === 'index' && contentVisible;

  return (
    <StyledThemeProvider theme={theme}>
      <StageGlobals />
      {usesStarfield && (
        <SharedStarfield aria-hidden={activeComponent !== 'index'}>
          <ConstellationBackground interactiveVisible={showHomeObjects} />
        </SharedStarfield>
      )}
      <AppStage className={`stage-${activeComponent}`} $contentVisible={contentVisible}>
        <Header
          activeComponent={activeComponent}
          setActiveComponent={handleSetActiveComponent}
        />
        {activeComponent === 'projects' && <Projects contentVisible={contentVisible} />}
        {activeComponent === 'about' && (
          <PageContent $visible={contentVisible}>
            <About setActiveComponent={handleSetActiveComponent} />
          </PageContent>
        )}
        {activeComponent === 'music' && (
          <PageContent $visible={contentVisible}>
            <Music />
          </PageContent>
        )}
        {activeComponent === 'index' && <Index contentVisible={contentVisible} />}
      </AppStage>
    </StyledThemeProvider>
  );
};

export default App;

const AppStage = React.memo(({ className, children, $contentVisible }: React.PropsWithChildren<{ className: string; $contentVisible: boolean }>) => (
  <div className={className} data-content-visible={$contentVisible}>{children}</div>
));

const SharedStarfield = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: #000;
`;

const PageContent = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 180ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 1ms;
  }
`;

const StageGlobals = createGlobalStyle`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
    }
  }
`;
