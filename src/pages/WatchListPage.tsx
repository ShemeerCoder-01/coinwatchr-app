import React, { useEffect, useState } from "react";
import Tabs from "../components/DashBoard/ViewTab";
import LoaderComponent from "../components/Common/Loader";
import Button from "../components/Common/Button";
import { removeFromWatchList } from "../functions/removeFromWatchList";
import { useNavigate } from "react-router-dom";
import { Coin } from "../types";
import { useCoins } from "../hooks/useCoins";
import Layout from "../components/Layout";

const WatchListPage: React.FC = () => {
  const { coins } = useCoins();
  const [watchListCoins, setWatchListCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const storedWatchlist = localStorage.getItem("watchlist");
  const coinIds: string[] = storedWatchlist ? JSON.parse(storedWatchlist) : [];
  const navigate = useNavigate();
  useEffect(() => {
    if (coinIds !== undefined && coinIds?.length !== 0) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getData() {
    setIsLoading(true);
    const storedWatchlist = localStorage.getItem("watchlist");
    const coinIds: string[] = storedWatchlist
      ? JSON.parse(storedWatchlist)
      : [];
    if (coinIds) {
      const markedCoins = coins?.filter((coin) => coinIds.includes(coin.id));
      setWatchListCoins(markedCoins);
    }
    setIsLoading(false);
  }
  const handleClick = () => {
    sessionStorage.setItem("currTab", "");
    navigate("/dashboard");
  };
  const handleRemove = (id: string) => {
    removeFromWatchList(id);
    setWatchListCoins(watchListCoins?.filter((coin) => coin.id !== id));
    console.log(watchListCoins);
    setIsRemoved(!isRemoved);
  };
  if (isLoading) return <LoaderComponent />;
  return (
    <Layout>
      <div>
        <div style={{ minHeight: "90vh",position:"relative" }}>
          {watchListCoins === undefined || watchListCoins?.length === 0 ? (
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
              <p style={{fontSize:"20px",fontWeight:"400",fontFamily:"sans-serif"}}>No Items in the Watchlist</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button text={"Dashboard"} handleClick={handleClick} style={{padding:"0.75rem 1.5rem",width:"150px"}} />
              </div>
            </div>
          ) : (
            <div style={{ height: "95vh" }}>
              <Tabs coins={watchListCoins} handleRemove={handleRemove} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WatchListPage;
