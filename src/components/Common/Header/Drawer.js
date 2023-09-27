import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Switch from "@mui/material/Switch";

export default function TemporaryDrawer() {

  const [state, setState] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setLight();
    } else {
      setDark();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") !== "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    setDarkMode(true);
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    setDarkMode(false);
  };



  return (
    <div>
      
          <IconButton onClick={()=> setState(true)}><MenuIcon className='link'/></IconButton>
          <Drawer
            anchor={'right'}
            open={state}
            onClose={()=>setState(false)}
          >
            <div className='drawer-links'>
                <a className='link' href='/'>
                    <p>Home</p>
                </a>
                <a className='link' href='/compare'>
                    <p>Compare</p>
                </a>
                <a className='link' href='/watchlist'>
                    <p>WatchList</p>
                </a>
                <a className='link dashBoard' href='/dashboard'>
                    <p>DashBoard</p>
                </a>
                <Switch checked={darkMode} onClick={() => changeMode()} />
            </div>
          </Drawer>
       
  
    </div>
  );
}