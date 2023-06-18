import React from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import './style.css';

function BacktoTop() {

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

  return (
    <div className='upwardIcon'>
        <ArrowUpwardRoundedIcon onClick={()=> topFunction()}/>
    </div>
  )
}

export default BacktoTop;