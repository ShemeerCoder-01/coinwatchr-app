import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// @ts-ignore
import './style.css';
import { useCoins } from '../../../hooks/useCoins';

interface SelectCryptos{
    crypto1:string;
    crypto2:string;
    handleCoinsChange:(e:SelectChangeEvent, isSecond:boolean) => void;
}

const SelectCrypto: React.FC<SelectCryptos> = ({crypto1,crypto2,handleCoinsChange}) => {
    const {coins} = useCoins();
    const styling = {
        minWidth:"150px",
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

    return (
        <div>
            <div className='cryptoSelect'>
                <div className='coin-flex'>
                    <p className='pTag'>Crypto 1 </p>
                    <Select
                        value={crypto1 || ""}
                        label="Coins"
                        className='coinSelector'
                        //here passing second argument as false to check weather it is second coin or not
                        onChange={(e)=> handleCoinsChange(e,false)}
                        sx={styling}
                    >
                        {coins?.filter((item)=> item.id !== crypto2).map((coin,idx)=>{
                            return <MenuItem key={idx} value={coin.id}>{coin.name}</MenuItem>
                        })}
                        
                    </Select>
                </div>
                <div className='coin-flex'>
                    <p className='pTag'>Crypto 2 </p>
                    <Select
                        value={crypto2 || ""}
                        label="Coins"
                        className='coinSelector'
                        //if second argument is true then its a second coin
                        onChange={(e)=> handleCoinsChange(e,true)}
                        sx={styling}
                    >
                         {coins?.filter((item)=> item.id !== crypto1).map((coin,idx)=>{
                            return <MenuItem key={idx} value={coin.id}>{coin.name}</MenuItem>
                        })}
                        
                    </Select>
                </div>
            </div>
        </div>
    )
}

export default SelectCrypto;