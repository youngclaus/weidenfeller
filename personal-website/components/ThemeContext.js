import { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme } from './themes';

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
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        if (parsedTheme) {
          setTheme(parsedTheme);
        } else {
          throw new Error("Parsed theme is undefined");
        }
      }
    } catch (error) {
      console.error("Failed to parse theme from localStorage:", error);
      setTheme(lightTheme); // fallback to light mode
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
