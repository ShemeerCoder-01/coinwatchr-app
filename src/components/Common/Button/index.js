import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';

function Button({text,outlined}) {

  const navigate = useNavigate();
  
  return (
    <button onClick={()=> navigate('/dashboard')} className={outlined?'outlined-btn':'btn'}>{text}</button>
  )
}

export default Button;