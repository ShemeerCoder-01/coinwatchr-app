import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import Switch from "@mui/material/Switch";
import { useTheme } from '../../../hooks/useTheme';

 const TemporaryDrawer: React.FC =() =>{

  const [state, setState] = useState<boolean>(false);
  const {theme,onChangeTheme} = useTheme();

  const validate = (theme:string) => {
    return theme === "dark";
  }

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
                <Switch checked={validate(theme)} onClick={() => onChangeTheme()} />
            </div>
          </Drawer>
       
  
    </div>
  );
}

export default TemporaryDrawer;