import React from 'react'
import { motion } from 'framer-motion';
import './style.css';

function AppDetails({ img, heading, Description, margin, align }) {



    return align === true ? (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='appDetails'
            style={{ marginTop: margin }}>
            <div className='left'>
                <img src={img} alt='img' width={"80%"} height={"300px"} />
            </div>
            <div className='right'>
                <h1>{heading}</h1>
                <p className='para'>{Description}</p>
            </div>
        </motion.div>
    ) :
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
                    <img src={img} alt='img' width={"80%"} height={"300px"} />
                </div>
            </motion.div>
        )
}


export default AppDetails;