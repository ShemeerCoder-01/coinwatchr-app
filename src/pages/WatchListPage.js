import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import Tabs from '../components/DashBoard/ViewTab';
import { getFullCoins } from '../functions/getFullCoins';
import LoaderComponent from '../components/Common/Loader';
import Button from '../components/Common/Button';
import { removeFromWatchList } from '../functions/removeFromWatchList';
import Footer from '../components/Common/Footer'

function WatchListPage() {

  const [watchListCoins, setWatchListCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoved,setIsRemoved] = useState(false);

 

  


  useEffect(() => {
    getData();
  },[]);
  
  async function getData() {
    setIsLoading(true);
    const FullCoins = await getFullCoins();
    const coinIds = JSON.parse(localStorage.getItem('watchlist'));
    if (coinIds) {
      const markedCoins = FullCoins.filter((coin) => coinIds.includes(coin.id));
      setWatchListCoins(markedCoins);
      console.log(markedCoins);
    }
    setIsLoading(false);
  }

  const handleRemove = (id)=>{
      removeFromWatchList(id);
      setWatchListCoins(watchListCoins.filter((coin)=> coin.id !== id));
      setIsRemoved(!isRemoved);
  }


  return (
    <div>
      {isLoading? (
        <LoaderComponent />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {watchListCoins.length === 0? (
            <div className='emptyWatchlist'>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button text={"Dashboard"} />
              </div>
              <Footer className="footer"/>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Header />
              <Tabs coins={watchListCoins} handleRemove={handleRemove} />
              <Footer/>
            </div>
          )}
        </div>
      )}
    </div>
  );



}




export default WatchListPage


