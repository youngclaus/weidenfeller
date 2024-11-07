import React, { useState, useCallback } from 'react';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/Theme/ThemeContext.js';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header.js';
import Index from './index.js';
import Projects from './projects.js';
import '../styles/globals.css';

function App() {
  return (
    <CustomThemeProvider>
      <ThemedApp />
      <Analytics />
    </CustomThemeProvider>
  );
}

function ThemedApp() {
  const { theme } = useTheme();
  const [activeComponent, setActiveComponent] = useState('index');

  const handleSetActiveComponent = useCallback((component) => {
    setActiveComponent(component);
  }, []);

  if (!theme) return null;

  const renderComponent = () => {
    switch (activeComponent) {
      case 'projects':
        return <Projects />;
      default:
        return <Index />;
    }
  };

  return (
    <StyledThemeProvider theme={theme}>
      <Header activeComponent={activeComponent} setActiveComponent={handleSetActiveComponent} />
      {renderComponent()}
    </StyledThemeProvider>
  );
}

export default App;