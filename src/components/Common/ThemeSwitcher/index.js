import React, { useState} from 'react';
import { createTheme,ThemeProvider,useTheme } from '@mui/material';
import {Switch} from '@mui/material';


// Create custom light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary:{
      main:"#fff"
    },
    background:{
      paper:"#fff"
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      main:"#3A80E9"
    },
    background:{
      paper:"#121212"
    }
  },
});



// ThemeProvider and theme toggle component
function ThemeSwitcher() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Switch
          checked={theme === darkTheme?true:false}
          onChange={toggleTheme}
        />
        {/* <MyComponent /> */}
      </div>
    </ThemeProvider>
  );
}

export default ThemeSwitcher;


