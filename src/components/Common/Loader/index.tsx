import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
// @ts-ignore
import './style.css';

const LoaderComponent : React.FC = () =>{
  return (
    <div className='loader'>
        <CircularProgress />
    </div>
  )
}

export default LoaderComponent