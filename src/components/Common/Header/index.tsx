import React,{useState} from 'react';
// @ts-ignore
import './style.css';
import TemporaryDrawer from './Drawer';
import Button from '../Button';
import { Link, useNavigate} from 'react-router-dom';
import Switch from "@mui/material/Switch";
import { useTheme } from '../../../hooks/useTheme';
import { APP_ROUTES } from '../../../Routes/route';

const Header: React.FC = () => {
  const [currentTab,setCurrentTab] = useState<string>(sessionStorage.getItem('currTab') ||'Home');
  const {theme,onChangeTheme} = useTheme();
  const navigate = useNavigate();
  
  const handleClick = ():void=>{
    setCurrentTab('');
    sessionStorage.setItem('currTab','');
    navigate(APP_ROUTES.DASHBOARD);
  }

  const validate = (theme:string) => {
    return theme === "dark";
  }

  return (
    <div className='navbar'>
        <Link className='logo' to='/' onClick={()=> {setCurrentTab('Home'); sessionStorage.setItem('currTab','Home')}}>CoinWatchr<span>.</span></Link>
        <div className='links'>
          <Switch checked={validate(theme)} onClick={() => onChangeTheme()} />
          <Link className='link' to='/' style={{color:currentTab==='Home'?'#3a80e9':''}} onClick={()=> {setCurrentTab('Home'); sessionStorage.setItem('currTab','Home')}}>Home</Link>
          <Link className='link' to='/compare'  style={{color:currentTab==='Compare'?'#3a80e9':''}} onClick={()=> {setCurrentTab('Compare'); sessionStorage.setItem('currTab','Compare')}}>Compare</Link>
          <Link className='link' to='/watchlist'  style={{color:currentTab==='WatchList'?'#3a80e9':''}} onClick={()=> {setCurrentTab('WatchList'); sessionStorage.setItem('currTab','WatchList')}}>WatchList</Link>
          <Button handleClick={handleClick} text ={"DashBoard"} style={{padding:"0.75rem 1.5rem",width:"150px"}}/>
        </div>
        <div className='side-drawer'>
          <TemporaryDrawer/>
        </div>
    </div>
  )
}

export default Header;