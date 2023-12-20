import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import Tabs from '../components/DashBoard/ViewTab';
import { getFullCoins } from '../functions/getFullCoins';
import LoaderComponent from '../components/Common/Loader';
import Button from '../components/Common/Button';
import { removeFromWatchList } from '../functions/removeFromWatchList';
import Footer from '../components/Common/Footer'
import { useNavigate } from 'react-router-dom';

function WatchListPage() {
  const [watchListCoins, setWatchListCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const coinIds = JSON.parse(localStorage.getItem('watchlist'));
  const navigate = useNavigate();
  useEffect(() => {
    if(coinIds !== undefined && coinIds?.length !== 0){
     getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getData() {
    setIsLoading(true);
    const FullCoins = await getFullCoins();
    const coinIds = JSON.parse(localStorage.getItem('watchlist'));
    if (coinIds) {
      const markedCoins = FullCoins?.filter((coin) => coinIds.includes(coin.id));
      setWatchListCoins(markedCoins);
    }
    setIsLoading(false);
  }
  const handleClick = () => {
    sessionStorage.setItem('currTab','');
    navigate('/dashboard');
  }
  const handleRemove = (id) => {
    removeFromWatchList(id);
    setWatchListCoins(watchListCoins?.filter((coin) => coin.id !== id));
    console.log(watchListCoins);
    setIsRemoved(!isRemoved);
  }
  if(isLoading) return <LoaderComponent/>
  return (
    <div>
      <div style={{ minHeight: "90vh" }}>
        {watchListCoins === undefined || watchListCoins?.length === 0 ? (
          <div className='emptyWatchlist'>
            <Header />
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
              No Items in the Watchlist
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button text={"Dashboard"} handleClick={handleClick} />
            </div>
            <Footer />
          </div>
        ) : (
          <div style={{ height: "95vh" }}>
            <Header />
            <Tabs coins={watchListCoins} handleRemove={handleRemove} />
            <Footer />
          </div>
        )}
      </div>
    </div>
  );



}




export default WatchListPage


