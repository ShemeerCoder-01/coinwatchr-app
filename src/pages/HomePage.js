import React from 'react'
import Header from '../components/Common/Header'
import MainComponent from '../components/LandingPage/MainComponent'
import Footer from '../components/Common/Footer';
import dashboarimg from '../assets/CoinDashBoard.jpg';
import coinPageimg from '../assets/coinPageNew.jpg';
import comparePageimg  from '../assets/comparePage.jpg';
import watchlistPageimg  from '../assets/watchlistPage.jpg';
import AppDetails from '../components/LandingPage/AppDetails';



function HomePage() {

  


  return (
    <div>
      <Header/>
      <MainComponent/>
      <AppDetails img={dashboarimg} heading={"Real-time Crypto Tracking"} Description={"Stay up-to-date with the ever-changing crypto market. Our application allows you to effortlessly track various cryptocurrencies in real-time, providing you with accurate and timely data on their current prices, market cap, volume, and more."} margin={window.screen.width < 1020?"30rem":"20rem"} align/>
      <AppDetails img={coinPageimg} heading={"Interactive Historical Charts"} Description={"Dive into the past performance of your favorite cryptocurrencies. With our interactive historical charts, you can analyze price trends, trading volumes, and market fluctuations over specific time periods, empowering you to make informed investment decisions."} margin={"5rem"} align={window.screen.width < 800?true:false}/>
      <AppDetails img={comparePageimg} heading={"Seamless Coin Comparison"} Description={"Make smarter investment choices with our intuitive coin comparison feature. Effortlessly compare two cryptocurrencies side-by-side using their chart data, enabling you to spot trends, differences, and potential opportunities."} margin={"5rem"} align/>
      <AppDetails img={watchlistPageimg} heading={"Personalized Watchlist"} Description={"Create your customized crypto watchlist with ease. Mark your favorite coins, and quickly access their real-time data at a glance. Stay ahead of the game by monitoring your preferred cryptocurrencies all in one place."} margin={"5rem"} align={window.screen.width < 800?true:false}/>
      <Footer/>
    </div>
  )
}

export default HomePage