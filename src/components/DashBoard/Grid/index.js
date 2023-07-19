import React, { useState } from 'react'
import './style.css'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import IconButton from '@mui/material/IconButton';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { Link } from 'react-router-dom';
import { addToWatchList } from '../../../functions/addToWatchList';
import { IsAdded } from '../../../functions/IsAdded';
import {motion} from 'framer-motion';

function Grid({ coin,handleRemove}) {

  const [watchlisted,setWatchlisted] = useState(IsAdded(coin.id));

  const handleIconClick = (e,id)=>{
    e.preventDefault();
    if(IsAdded(coin.id)){
      handleRemove(coin.id);
    }
    else{
      addToWatchList(id);
    }
  }

  return (
    <Link to={`/coin/${coin.id}`} style={{textDecoration:"none",color:"var(--white)"}}>
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.3 }}
       className={`grid-item ${coin.market_cap_change_percentage_24h > 0?'bull':"bear"}`}
       >
        <div className='firstRow'>
          <div className='left'>
            <div className='imgArea'>
              <img className='img' src={coin.image} alt='img' />
            </div>
            <div className='labelArea'>
              <h3 className='coinSymbol'>{coin.symbol}</h3>
              <p className='coinName'>{coin.name}</p>
            </div>
          </div>
          <div>
            {!watchlisted?(<IconButton onClick={(e)=>handleIconClick(e,coin.id)} >
              <StarOutlineRoundedIcon className={`bookMarkIcon ${coin.market_cap_change_percentage_24h > 0? " green": " red"}`} />
            </IconButton>):
            (<IconButton onClick={(e)=>handleIconClick(e,coin.id)} >
              <StarsRoundedIcon className={`bookMarkIcon ${coin.market_cap_change_percentage_24h > 0? " green": " red"}`} />
            </IconButton>)}
          </div>
        </div>
        <div className='secondRow'>
          {coin.market_cap_change_percentage_24h > 0 ?<>
          <div className='marketCap green'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
          <TrendingUpIcon className='Icon green'/>
          </>:<>
          <div className='marketCap red'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</div>
          <TrendingDownIcon className='Icon red'/>
          </>}
        </div>
        <div className='thirdRow'>
          <p className={coin.market_cap_change_percentage_24h > 0?"bullPrice":"bearPrice"}>${coin.current_price.toLocaleString()}</p>
        </div>
        <div className='fourthRow'>
          <p className='total'>Total Volume:${coin.total_volume.toLocaleString()}</p>
          <p className='total'>Market Cap:${coin.market_cap.toLocaleString()}</p>

        </div>

      </motion.div>
    </Link>
  );
}

export default Grid;