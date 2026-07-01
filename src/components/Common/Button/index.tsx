import React from 'react'
// @ts-ignore
import './style.css'
import { RWebShare } from 'react-web-share';

interface ButtonProps{
  text:string;
  handleClick:() => void;
  style:object;
}

const Button: React.FC<ButtonProps> =({text,handleClick,style}) =>{

  if(text === "Share"){
    return(
      <RWebShare
        data={{
          text:"A CryptoApp Where you Can track Crypto Coins Live!!!!",
          url:"https://crypto-tracker-app-one.vercel.app/",
          title:"ShemeerCoder-01"
        }}
        >
          <button onClick={handleClick} style={style} className='outlined-btn'>{text}</button>
        </RWebShare>
    )
  }
  
  return (
      <button onClick={handleClick} className='btn' style={style}>{text}</button>
  )
}

export default Button;