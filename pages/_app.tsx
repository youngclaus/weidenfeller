import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/Theme/ThemeContext';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header';
import PageZoomTransition, {
  PageStage,
  TransitionDirection,
  TransitionPhase,
} from '../components/PageZoomTransition';
import Index from './index';
import Projects from './projects';
import About from './about';
import Music from './music';
import '../styles/globals.css';

type ActiveComponent = PageStage;

const stageOrder: ActiveComponent[] = ['index', 'projects', 'about', 'music'];

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
  const [transitionPhase, setTransitionPhase] = useState<TransitionPhase>('idle');
  const [transitionFrom, setTransitionFrom] = useState<ActiveComponent>('index');
  const [transitionTo, setTransitionTo] = useState<ActiveComponent>('index');
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('forward');
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  const handleSetActiveComponent = useCallback((component: ActiveComponent) => {
    if (component === activeComponent || transitionPhase !== 'idle') return;

    const fromIndex = stageOrder.indexOf(activeComponent);
    const toIndex = stageOrder.indexOf(component);
    const distance = toIndex - fromIndex;
    const direction: TransitionDirection = Math.abs(distance) > 1
      ? 'jump'
      : distance > 0
        ? 'forward'
        : 'backward';

    setTransitionFrom(activeComponent);
    setTransitionTo(component);
    setTransitionDirection(direction);
    setTransitionPhase('departing');

    timers.current.push(setTimeout(() => {
      setActiveComponent(component);
      setTransitionPhase('arriving');
    }, 420));

    timers.current.push(setTimeout(() => {
      setTransitionPhase('idle');
    }, 900));
  }, [activeComponent, transitionPhase]);

  return (
    <StyledThemeProvider theme={theme}>
      <StageGlobals />
      <AppStage className={`stage-${activeComponent}`}>
        <Header
          activeComponent={activeComponent}
          setActiveComponent={handleSetActiveComponent}
        />
        {activeComponent === 'projects' && <Projects />}
        {activeComponent === 'about' && <About setActiveComponent={handleSetActiveComponent} />}
        {activeComponent === 'music' && <Music />}
        {activeComponent === 'index' && <Index />}
      </AppStage>
      <PageZoomTransition
        from={transitionFrom}
        to={transitionTo}
        direction={transitionDirection}
        phase={transitionPhase}
      />
    </StyledThemeProvider>
  );
};

export default App;

const AppStage = React.memo(({ className, children }: React.PropsWithChildren<{ className: string }>) => (
  <div className={className}>{children}</div>
));

const StageGlobals = createGlobalStyle`
  .stage-projects main {
    background:
      radial-gradient(ellipse at 14% 18%, transparent 0 7%, ${({ theme }) => theme.c2} 7.5% 9%, transparent 10%),
      radial-gradient(ellipse at 82% 76%, transparent 0 11%, ${({ theme }) => theme.c2} 11.5% 13%, transparent 14%),
      radial-gradient(circle at 58% 24%, ${({ theme }) => theme.glow} 0 1px, transparent 18%),
      repeating-radial-gradient(circle at 54% 48%, ${({ theme }) => theme.c1} 0 46px, ${({ theme }) => theme.c2} 48px 50px, ${({ theme }) => theme.c1} 52px 94px) !important;
    background-attachment: fixed !important;
  }

  .stage-projects main::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: .42;
    background:
      linear-gradient(118deg, transparent 0 34%, ${({ theme }) => theme.c3} 34.2% 34.5%, transparent 34.8% 100%),
      linear-gradient(64deg, transparent 0 68%, ${({ theme }) => theme.c2} 68.2% 68.8%, transparent 69% 100%);
    filter: drop-shadow(0 0 12px ${({ theme }) => theme.glow});
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
    }
  }
`;
