import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './style.css';

function AppDetails({ img, heading, Description, margin, align }) {

    const [width,setWidth] = useState(window.screen.width);

    
    useEffect(()=>{
        window.addEventListener('resize',()=>{
           setWidth(window.screen.width);
        });

        return()=>{
            window.removeEventListener('resize',()=>{
                setWidth(window.screen.width);
            })
        }
    },[width]);


    return align === true && width > 1020 ? (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='appDetails'
            style={{ marginTop: margin }}>
            <div className='left'>
                <img src={img} alt='img'/>
            </div>
            <div className='right'>
                <h1>{heading}</h1>
                <p className='para'>{Description}</p>
            </div>
        </motion.div>
    ) :width > 1020?
        (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='appDetails'
                style={{ marginTop: margin }}>
                <div className='right'>
                    <h1>{heading}</h1>
                    <p className='para'>{Description}</p>
                </div>
                <div className='left'>
                    <img src={img} alt='img'/>
                </div>
            </motion.div>
        ):(
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='appDetails'
                style={{ marginTop: margin }}>
                <div className='left'>
                    <img src={img} alt='img'/>
                </div>
                <div className='right'>
                    <h1>{heading}</h1>
                    <p className='para'>{Description}</p>
                </div>
            </motion.div>
        )
}


export default AppDetails;