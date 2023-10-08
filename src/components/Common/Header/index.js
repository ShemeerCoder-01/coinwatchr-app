import React,{useState,useEffect} from 'react';
import './style.css'
import TemporaryDrawer from './Drawer';
import Button from '../Button';
import { Link } from 'react-router-dom';
import Switch from "@mui/material/Switch";

function Header() {

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
    <div className='navbar'>
        <Link className='logo' to='/'>CoinWatchr<span>.</span></Link>
        <div className='links'>
          <Switch checked={darkMode} onClick={() => changeMode()} />
          <Link className='link' to='/'>Home</Link>
          <Link className='link' to='/compare'>Compare</Link>
          <Link className='link' to='/watchlist'>WatchList</Link>
          <Button text ={"DashBoard"}/>
        </div>
        <div className='side-drawer'>
          <TemporaryDrawer/>
        </div>
    </div>
  )
}

export default Header;