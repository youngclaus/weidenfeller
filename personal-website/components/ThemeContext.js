import { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme, the1975, basement } from './themes';

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
