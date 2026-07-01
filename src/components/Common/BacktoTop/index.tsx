import React, { useEffect, useState } from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
//  @ts-ignore
import './style.css';

const BacktoTop: React.FC = () =>{

  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className='upwardIcon' style={{display: showButton ? 'flex' : 'none' }}>
      <ArrowUpwardRoundedIcon onClick={() => topFunction()} />
    </div>
  )
}

export default BacktoTop;