import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/ThemeContext.js';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/Header.js';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    
      <CustomThemeProvider>
        <ThemedApp Component={Component} pageProps={pageProps} />
        <Analytics />
      </CustomThemeProvider>
    
  );
}

function ThemedApp({ Component, pageProps }) {
  const { theme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <StyledThemeProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </StyledThemeProvider>
  );
}

export default App;
