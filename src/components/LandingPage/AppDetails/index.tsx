import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import './style.css';

interface AppDetailsProps {
  img: string;
  heading: string;
  Description: string;
  margin: string;
  align: boolean;
}

const AppDetails: React.FC<AppDetailsProps> = ({ img, heading, Description, margin, align }) => {

  const [width, setWidth] = useState<number>(window.screen.width);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.screen.width);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const content = (
    <>
      <div className='left'>
        <img className='app-thumbnail' src={img} alt={heading} />
      </div>
      <div className='right'>
        <h1>{heading}</h1>
        <p className='para'>{Description}</p>
      </div>
    </>
  );

  const contentReversed = (
    <>
      <div className='right'>
        <h1>{heading}</h1>
        <p className='para'>{Description}</p>
      </div>
      <div className='left'>
        <img className='app-thumbnail' src={img} alt={heading} />
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='appDetails'
      style={{ marginTop: margin }}
    >
      {align && width > 1020 ? content
       : width > 1020 ? contentReversed
       : content}
    </motion.div>
  );
};

export default AppDetails;