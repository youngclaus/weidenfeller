import React, { useState, useCallback } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/Theme/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header';
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

  const handleSetActiveComponent = useCallback((component: ActiveComponent) => {
    setActiveComponent(component);
  }, []);

  return (
    <StyledThemeProvider theme={theme}>
      <Header activeComponent={activeComponent} setActiveComponent={handleSetActiveComponent} />
      {activeComponent === 'projects' && <Projects />}
      {activeComponent === 'about' && <About setActiveComponent={handleSetActiveComponent} />}
      {activeComponent === 'music' && <Music />}
      {activeComponent === 'index' && <Index />}
    </StyledThemeProvider>
  );
};

export default App;
