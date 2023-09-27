import React, { useEffect, useState } from 'react'
import './style.css';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { addToWatchList } from '../../../functions/addToWatchList';
import {removeFromWatchList} from '../../../functions/removeFromWatchList';
import { IsAdded } from '../../../functions/IsAdded';
import { convertNumber } from '../../../functions/convertNumber';
import { motion } from "framer-motion";

function List({coin,handleRemove}) {
  const [watchlisted,setWatchlisted] = useState(false);

  useEffect(()=>{
    setWatchlisted(IsAdded(coin.id));
  },[coin]);


  const handleIconClick = (e,id)=>{
    e.preventDefault();
    if(IsAdded(coin.id)){
      removeFromWatchList(coin.id);
      setWatchlisted(false);
    }
    else{
      addToWatchList(id);
      setWatchlisted(true);
    }
  }


  return (
    <Link to={`/coin/${coin.id}`} style={{textDecoration:"none",color:"var(--white)"}}>
    <motion.tr
     initial={{ opacity: 0, x: -50 }}
     whileInView={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.5, delay: 0.3 }}
     className={`list-item ${coin.market_cap_change_percentage_24h > 0?'bullish':"bearish"}`}>
      
      <td className='firstCol'>
        <Tooltip title="Logo" placement="top">
         <img className='coinLogo' src={coin.image} alt='img' />
        </Tooltip>
        <div className='labelArea'>
          <Tooltip title="Symbol" placement="top">
           <h3 className='coinShortHand '>{coin.symbol}</h3>
          </Tooltip>
          <Tooltip title="Coin Name" placement="bottom">
           <p className='fullName'>{coin.name}</p>
          </Tooltip>
        </div>
      </td>
     
        {coin.market_cap_change_percentage_24h > 0 ?(<td className='secondCol'>
          <Tooltip title="Market_Cap Change %" placement="top">
          <div className='marketCapital greenish'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
          </Tooltip>
        <Tooltip title="Icon" placement="top">
         <TrendingUpIcon className='icon greenish'/>
        </Tooltip>
        </td>):
        (<td className='secondCol'>
          <Tooltip title="Market_Cap Change %" placement="top">
           <div className='marketCapital redish'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
          </Tooltip>
        <Tooltip title="Icon" placement="top">
         <TrendingDownIcon className='icon redish'/>
        </Tooltip>
        </td>)
        }
      
      <td className='thirdCol'>
        <Tooltip title="Current Price" placement="top-start">
         <p className={coin.market_cap_change_percentage_24h > 0?"bullishPrice":"bearishPrice"}>${coin.current_price.toLocaleString()}</p>
        </Tooltip>
      </td>
      <td className='fourthCol'>
        <Tooltip title="Total Volume" placement="top">
         <p className='totalVolume'>${coin.total_volume.toLocaleString()}</p>
        </Tooltip>
        <Tooltip title="Total Market Capital" placement="top">
         <p className='totalMoney'>${convertNumber(coin.market_cap)}</p>
        </Tooltip>
        <Tooltip title="Add to Watchlist" placement='top'>
          <div>
          {!watchlisted?(<IconButton onClick={(e)=>handleIconClick(e,coin.id)} >
              <StarOutlineRoundedIcon className={`watchlistIcon ${coin.market_cap_change_percentage_24h > 0? "greenish": "redish"}`}/>
          </IconButton>):(<IconButton onClick={(e)=>handleIconClick(e,coin.id)} >
              <StarsRoundedIcon className={`bookMarkIcon ${coin.market_cap_change_percentage_24h > 0? " green": " red"}`} />
            </IconButton>)}
          </div>
        </Tooltip>
        

      </td>

    </motion.tr>
    </Link>
    
  )
}

export default List;