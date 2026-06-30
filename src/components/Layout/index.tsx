import React from 'react'
import Header from '../Common/Header';
import Footer from '../Common/Footer';

interface LayoutProps{
  children:React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) =>{
  return (
    <div>
        <Header/>
        <div>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout;