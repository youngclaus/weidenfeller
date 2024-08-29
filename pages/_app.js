import { ThemeProvider as CustomThemeProvider, useTheme } from '../components/ThemeContext.js';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <Analytics>
      <CustomThemeProvider>
        <ThemedApp Component={Component} pageProps={pageProps} />
      </CustomThemeProvider>
    </Analytics>
  );
}

function ThemedApp({ Component, pageProps }) {
  const { theme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <StyledThemeProvider theme={theme}>
      <Component {...pageProps} />
    </StyledThemeProvider>
  );
}

export default App;
