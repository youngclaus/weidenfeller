import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  lightTheme, darkTheme, the1975, basement, beck, blink, borns, catfish,
  coldplay, coldplay2, coldplay3, daft, glass, imagine, mckenna, monkeys,
  paramore, xx, Theme,
} from './themes';

interface ThemeContextType {
  theme: Theme;
  switchTheme: (themeName: string) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themesByName = {
  light: lightTheme,
  dark: darkTheme,
  the1975,
  basement,
  beck,
  blink,
  borns,
  catfish,
  coldplay,
  coldplay2,
  coldplay3,
  daft,
  glass,
  imagine,
  mckenna,
  monkeys,
  paramore,
  xx,
} satisfies Record<string, Theme>;

type ThemeName = keyof typeof themesByName;

const isTheme = (value: unknown): value is Theme => {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Theme>;
  return (
    (candidate.mode === 'light' || candidate.mode === 'dark' || candidate.mode === 'toggled')
    && typeof candidate.c1 === 'string'
    && typeof candidate.c2 === 'string'
    && typeof candidate.c3 === 'string'
    && typeof candidate.c4 === 'string'
    && typeof candidate.opacity === 'string'
    && typeof candidate.glow === 'string'
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) return;

    try {
      const parsed: unknown = JSON.parse(savedTheme);
      if (isTheme(parsed)) {
        setTheme(parsed);
      } else {
        localStorage.removeItem('theme');
      }
    } catch {
      localStorage.removeItem('theme');
    }
  }, []);

  const switchTheme = (themeName: string) => {
    const newTheme = themesByName[themeName as ThemeName] ?? darkTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
