import React, { useState } from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material';
import { Switch } from '@mui/material';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: "#fff" },
    background: { paper: "#fff" },
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: "#3A80E9" },
    background: { paper: "#121212" },
  },
});

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Switch
          checked={theme === darkTheme}
          onChange={toggleTheme}
        />
      </div>
    </ThemeProvider>
  );
};

export default ThemeSwitcher;