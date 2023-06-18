import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import Tabs from '../components/DashBoard/ViewTab';
import { getFullCoins } from '../functions/getFullCoins';
import LoaderComponent from '../components/Common/Loader';
import Button from '../components/Common/Button';


function WatchListPage() {

  const [watchListCoins, setWatchListCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  const coinIds = JSON.parse(localStorage.getItem('watchlist'));


  useEffect(() => {
    getData();
  },[]);

  async function getData() {
    setIsLoading(true);
    const FullCoins = await getFullCoins();
    if (coinIds) {
      const markedCoins = FullCoins.filter((coin) => coinIds.includes(coin.id));
      setWatchListCoins(markedCoins);
      console.log(markedCoins);
    }
    setIsLoading(false);
  }


  return (
    <div>
      {isLoading || !coinIds ? (
        <LoaderComponent />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          {watchListCoins.length === 0 || !coinIds ? (
            <div>
              <Header />
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button text={"Dashboard"} />
              </div>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Header />
              <Tabs coins={watchListCoins} />
              
            </div>
          )}
        </div>
      )}
    </div>
  );



}




export default WatchListPage


