import React, { useEffect, useState } from "react";
import Tabs from "../components/DashBoard/ViewTab";
import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import { Coin } from "../types";
import { useCoins } from "../hooks/useCoins";
import Layout from "../components/Layout";
import { useWatchListedCoins } from "../hooks/useWatchListed";
import { APP_ROUTES } from "../Routes/route";

const WatchListPage: React.FC = () => {
  const { coins } = useCoins();
  const { watchListedCoins, removeCoin } = useWatchListedCoins();
  const [watchListCoins, setWatchListCoins] = useState<Coin[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('watchListedCoins ',watchListedCoins);
    if (coins && watchListedCoins) {
      const markedCoins = coins.filter(coin => watchListedCoins.includes(coin.id));
      setWatchListCoins(markedCoins);
    }
  }, [watchListedCoins, coins]);

  const handleClick = () => {
    sessionStorage.setItem("currTab", "");
    navigate(APP_ROUTES.DASHBOARD);
  };

  const handleRemove = (id: string) => {
    removeCoin(id);
  };

  return (
    <Layout>
      <div>
        <div style={{ minHeight: "90vh", position: "relative" }}>
          {watchListCoins.length === 0 ? (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <p style={{ fontSize: "20px", fontWeight: "400", fontFamily: "sans-serif" }}>
                No Items in the Watchlist
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button text={"Dashboard"} handleClick={handleClick} style={{ padding: "0.75rem 1.5rem", width: "150px" }} />
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