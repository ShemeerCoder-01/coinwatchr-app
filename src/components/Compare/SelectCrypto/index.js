import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getFullCoins } from '../../../functions/getFullCoins';
import './style.css';
import LoaderComponent from '../../Common/Loader';

function SelectCrypto({crypto1,crypto2,handleCoinsChange}) {

   
    const [isLoading,setIsLoading] = useState(true);
    const [Coins,setCoins] = useState([]);

    const styling = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)"
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)"
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#3a80e9"
            }
        }
    };
   

    useEffect(()=>{
        getData();
    },[]);

    async function getData(){
        const coinsData = await getFullCoins();
        setCoins(coinsData);
        setIsLoading(false);
    }


    return (
        <div>
            {isLoading? <LoaderComponent/>:
            <div className='cryptoSelect'>
                <div className='coin-flex'>
                    <p className='pTag'>Crypto 1 </p>
                    <Select
                        value={crypto1}
                        label="Coins"
                        className='coinSelector'
                        //here passing second argument as false to check weather it is second coin or not
                        onChange={(e)=> handleCoinsChange(e,false)}
                        sx={styling}
                    >
                        {Coins?.filter((item)=> item.id !== crypto2).map((coin,idx)=>{
                            return <MenuItem key={idx} value={coin.id}>{coin.name}</MenuItem>
                        })}
                        
                    </Select>
                </div>
                <div className='coin-flex'>
                    <p className='pTag'>Crypto 2 </p>
                    <Select
                        value={crypto2}
                        label="Coins"
                        className='coinSelector'
                        //if second argument is true then its a second coin
                        onChange={(e)=> handleCoinsChange(e,true)}
                        sx={styling}
                    >
                         {Coins?.filter((item)=> item.id !== crypto1).map((coin,idx)=>{
                            return <MenuItem key={idx} value={coin.id}>{coin.name}</MenuItem>
                        })}
                        
                    </Select>
                </div>
            </div>}
        </div>
    )
}

export default SelectCrypto;