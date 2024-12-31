import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {
  lightTheme, darkTheme, the1975, basement, beck, blink, borns, catfish,
  coldplay, coldplay2, coldplay3, daft, glass, imagine, mckenna, monkeys,
  paramore, xx, Theme
} from './themes';

interface ThemeContextType {
  theme: Theme;
  switchTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme || lightTheme);
    }
  }, []);

  const switchTheme = (themeName: string) => {
    let newTheme: Theme;

    switch (themeName) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'the1975':
        newTheme = the1975;
        break;
      case 'basement':
        newTheme = basement;
        break;
      case 'beck':
        newTheme = beck;
        break;
      case 'blink':
        newTheme = blink;
        break;
      case 'borns':
        newTheme = borns;
        break;
      case 'catfish':
        newTheme = catfish;
        break;
      case 'coldplay':
        newTheme = coldplay;
        break;
      case 'coldplay2':
        newTheme = coldplay2;
        break;
      case 'coldplay3':
        newTheme = coldplay3;
        break;
      case 'daft':
        newTheme = daft;
        break;
      case 'glass':
        newTheme = glass;
        break;
      case 'imagine':
        newTheme = imagine;
        break;
      case 'mckenna':
        newTheme = mckenna;
        break;
      case 'monkeys':
        newTheme = monkeys;
        break;
      case 'paramore':
        newTheme = paramore;
        break;
      case 'xx':
        newTheme = xx;
        break;
      case 'light':
        newTheme = lightTheme;
        break;
      default:
        newTheme = darkTheme;
        break;
    }

    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
