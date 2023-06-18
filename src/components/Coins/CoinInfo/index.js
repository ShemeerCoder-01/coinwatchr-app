import React, { useState } from 'react'
import './style.css';
function CoinInfo({Name,Description}) {
    
    const [isClicked,setIsClicked] = useState(false);



    const shortDescription= Description.slice(0,250) + "...<p className='toggle'> Read More...</p>";
    const FullDescription =Description + "<p className='toggle'> Read Less...</p>"
    
  return (
    <div className='currCoinTab'>
        <h1 className='currCoinName'>{Name}</h1>
        {Description.length > 350?
        <p className='currCoinDesc' onClick={()=> setIsClicked(!isClicked)} dangerouslySetInnerHTML={{__html:!isClicked?shortDescription:FullDescription}}/>:
        <p className='currCoinDesc' dangerouslySetInnerHTML={{__html:Description}}/>
        }
    </div>
  )
}

export default CoinInfo;