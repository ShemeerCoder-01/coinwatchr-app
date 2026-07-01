import React from 'react';
// @ts-ignore
import './style.css';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectRangeProps{
  days:number;
  handleDaysChange:(e:SelectChangeEvent<number>) => void;
  isCompare?:boolean;
}

const SelectRange:React.FC<SelectRangeProps> = ({days,handleDaysChange,isCompare}) => {
  
  return (
    <div className='selectDays'>
        {!isCompare && <p className='pTag'>Price Change in the last </p>}
        <Select
          value={days}
          label="Days"
          className='daySelector'
          onChange={handleDaysChange}
          sx={{
            height:"2.5rem",
            color: "var(--white)",
            "& .MuiOutlinedInput-notchedOutline":{
                borderColor:"var(--white)"
            },
            "& .MuiSvgIcon-root":{
                color:"var(--white)"
            },
            "&:hover":{
                "&& fieldset":{
                    borderColor:"#3a80e9"
                }
            }
          }}
        >
          <MenuItem value={7}>7 Days</MenuItem>
          <MenuItem value={30}>30 Days</MenuItem>
          <MenuItem value={60}>60 Days</MenuItem>
          <MenuItem value={90}>90 Days</MenuItem>
          <MenuItem value={120}>120 Days</MenuItem>
          <MenuItem value={365}>1 Year</MenuItem>
          
        </Select>

    </div>
  );
}

export default SelectRange;


