import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { colors as darkColors } from '../../theme/dark';
import { lights as lightColors } from '../../theme/light';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setIsDark,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);