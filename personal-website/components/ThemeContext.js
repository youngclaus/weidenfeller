import { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme, the1975, basement, beck, blink, borns, catfish, coldplay, coldplay2, daft, glass, imagine, mckenna, monkeys, paramore, xx } from './themes';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme);
      setTheme(parsedTheme || lightTheme); // Ensure a valid theme is always set
    }
  }, []);

  const switchTheme = (themeName) => {
    let newTheme;

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
      default:
        newTheme = lightTheme;
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
