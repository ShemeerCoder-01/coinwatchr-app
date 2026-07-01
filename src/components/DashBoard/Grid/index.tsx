import React, { useState } from "react";
// @ts-ignore
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconButton from "@mui/material/IconButton";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CoinData } from "../../../types";
import CommonModal from "../../Common/Modal";
import Button from "../../Common/Button";
import { buildRoute } from "../../../Routes/route";
import { useWatchListedCoins } from "../../../hooks/useWatchListed";

interface GridProps {
  coin: CoinData | null;
  handleRemove: (id: string) => void;
}

const Grid: React.FC<GridProps> = ({ coin, handleRemove }) => {
  const {addCoin,removeCoin,isWatchListed,watchListedCoins} = useWatchListedCoins();
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const navigate = useNavigate();

  console.log(" watchListedCoins ",watchListedCoins)

  const handleIconClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string | undefined,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWatchListed(coin?.id)) {
      setConfirmModal(true);
    } else {
      if (id) {
        addCoin(id);
      }
    }
  };

  const handleClick = () => {
    if (coin?.id) {
      removeCoin(coin?.id);
    }
    setConfirmModal(false);
  };

  const handleNavigation = () => {
      navigate(buildRoute.coinPage(coin?.id ?? ""));
  };
  
  return (
    <>
      <div
        onClick={handleNavigation}
        style={{ textDecoration: "none", color: "var(--white)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`grid-item ${coin?.market_cap_change_percentage_24h > 0 ? "bull" : "bear"}`}
        >
          <div className="firstRow">
            <div className="left">
              <div className="imgArea">
                <img className="img" src={coin?.image} alt="img" />
              </div>
              <div className="labelArea">
                <h3 className="coinSymbol">{coin?.symbol}</h3>
                <p className="coinName">{coin?.name}</p>
              </div>
            </div>
            <div>
              { isWatchListed(coin?.id) ? (
                <IconButton onClick={(e) => handleIconClick(e, coin?.id)}>
                  <StarsRoundedIcon
                    className={`bookMarkIcon ${coin?.market_cap_change_percentage_24h > 0 ? " green" : " red"}`}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={(e) => handleIconClick(e, coin?.id)}>
                  <StarOutlineRoundedIcon
                    className={`bookMarkIcon ${coin?.market_cap_change_percentage_24h > 0 ? " green" : " red"}`}
                  />
                </IconButton>
              )}
            </div>
          </div>
          <div className="secondRow">
            {coin?.market_cap_change_percentage_24h > 0 ? (
              <>
                <div className="marketCap green">
                  {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
                <TrendingUpIcon className="Icon green" />
              </>
            ) : (
              <>
                <div className="marketCap red">
                  {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
                <TrendingDownIcon className="Icon red" />
              </>
            )}
          </div>
          <div className="thirdRow">
            <p
              className={
                coin?.market_cap_change_percentage_24h > 0
                  ? "bullPrice"
                  : "bearPrice"
              }
            >
              ${coin?.current_price?.toLocaleString()}
            </p>
          </div>
          <div className="fourthRow">
            <p className="total">
              Total Volume:${coin?.total_volume?.toLocaleString()}
            </p>
            <p className="total">
              Market Cap:${coin?.market_cap?.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </div>
      <CommonModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
      >
        <div>
          <div style={{height:"200px",width:"400px", position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"white", borderRadius:"8px",padding:"14px"}}>
          <p style={{color:"gray",margin:"16px",fontWeight:"500",fontSize:"20px"}}>Are you sure you want to remove this coin?</p>
          <div style={{display:"flex",flexDirection:"row", gap:"6px", alignItems:"center",position:"absolute",bottom:"4%",right:"4%"}}>
            <Button handleClick={() => setConfirmModal(false)} text ={"Cancel"} style={{width:"100px",padding:"6px",backgroundColor:"var(--white)",color:"#3A80E9",border:"1px solid #3A80E9"}}/>
            <Button handleClick={handleClick} text ={"Remove"} style={{width:"100px",padding:"6px",backgroundColor:"var(--blue)",color:"var(--white)"}}/>
          </div>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default Grid;
