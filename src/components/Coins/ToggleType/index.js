import React,{useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './style.css';

export default function ToggleType({priceType,handlePriceTypeChange}) {
 
  

  return (
    <div className='toggleButtons'>
        <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={handlePriceTypeChange}
        sx={
            {
                "& .Mui-selected":{
                    color:"var(--blue) !important"
                },
                borderColor:"var(--blue)",
                border:"unset !important",
                "& .MuiToggleButtonGroup-grouped":{
                    border:"1px solid !important",
                    borderColor:"unset",
                    color:"var(--blue)"
                },
                "& .MuiToggleButton-standard":{
                    color:"var(--blue)"
                }
            }
        }
        >
        <ToggleButton className='typeToggler' value="prices">PRICE</ToggleButton>
        <ToggleButton className='typeToggler' value="market_caps">MARKET CAP</ToggleButton>
        <ToggleButton className='typeToggler' value="total_volumes">VOLUME</ToggleButton>
        
        </ToggleButtonGroup>
    </div>
  );
}