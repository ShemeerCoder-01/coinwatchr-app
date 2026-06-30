import React from 'react'
import './style.css';
import Button from '../../Common/Button';
import iphone from '../../../assets/img1.jpg'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function MainComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.setItem('currTab','');
    navigate('/dashboard');
  }
  return (
    <div className='landingPage'>
      <div className='leftArea'>
        <motion.h1 className='crypto-heading'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{type:"smooth", duration: 0.5 }}
        >Track Crypto</motion.h1>
        <motion.h1 className='realTime-heading'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{type:"smooth", duration: 0.5 ,delay:0.5}}
        >Real Time</motion.h1>
        <motion.p className='para'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{type:"smooth", duration: 0.5 ,delay:1}}
        >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>
        <motion.div className='buttons'
        initial={{opacity:0, x:30}}
        animate={{opacity:1,x:0}}
        transition={{type:"smooth",duration:0.5,delay:1.5}}
        >
          <Button text={"DashBoard"} handleClick={handleClick} />
          <Button text={"Share"} outlined />
        </motion.div>
      </div>
      <div className='rightArea'>
        <motion.img className='phone' src={iphone} alt='phoneImg'
        initial={{y:-10}}
        animate={{y:10}}
        transition={{
        type:"smooth",
        repeatType:"mirror",
        duration:2,
        repeat:Infinity}} />
        <div className='gradient'></div>
      </div>
    </div>
  )
}

export default MainComponent;