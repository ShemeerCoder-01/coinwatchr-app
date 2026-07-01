import React, { useState } from "react";
// @ts-ignore
import "./style.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { convertNumber } from "../../../functions/convertNumber";
import { motion } from "framer-motion";
import { CoinData } from "../../../types";
import { buildRoute } from "../../../Routes/route";
import { useWatchListedCoins } from "../../../hooks/useWatchListed";
import CommonModal from "../../Common/Modal";
import Button from "../../Common/Button";

interface ListProps {
  coin: CoinData | null;
  handleRemove?: (id: string) => void;
  clickable: boolean;
}

const List: React.FC<ListProps> = ({ coin, handleRemove, clickable }) => {
  const { addCoin, removeCoin, isWatchListed } = useWatchListedCoins();
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const navigate = useNavigate();

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
    if (clickable) navigate(buildRoute.coinPage(coin?.id ?? ""));
  };

  return (
    <>
      <div
        onClick={handleNavigation}
        style={{ textDecoration: "none", color: "var(--white)" }}
      >
        <motion.tr
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`list-item ${coin?.market_cap_change_percentage_24h > 0 ? "bullish" : "bearish"}`}
        >
          <td className="firstCol">
            <Tooltip title="Logo" placement="top">
              <img className="coinLogo" src={coin?.image} alt="img" />
            </Tooltip>
            <div className="labelArea">
              <Tooltip title="Symbol" placement="top">
                <h3 className="coinShortHand ">{coin?.symbol}</h3>
              </Tooltip>
              <Tooltip title="Coin Name" placement="bottom">
                <p className="fullName">{coin?.name}</p>
              </Tooltip>
            </div>
          </td>

          {coin?.market_cap_change_percentage_24h > 0 ? (
            <td className="secondCol">
              <Tooltip title="Market_Cap Change %" placement="top">
                <div className="marketCapital greenish">
                  {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
              </Tooltip>
              <Tooltip title="Icon" placement="top">
                <TrendingUpIcon className="icon greenish" />
              </Tooltip>
            </td>
          ) : (
            <td className="secondCol">
              <Tooltip title="Market_Cap Change %" placement="top">
                <div className="marketCapital redish">
                  {coin?.market_cap_change_percentage_24h?.toFixed(2)}%
                </div>
              </Tooltip>
              <Tooltip title="Icon" placement="top">
                <TrendingDownIcon className="icon redish" />
              </Tooltip>
            </td>
          )}

          <td className="thirdCol">
            <Tooltip title="Current Price" placement="top-start">
              <p
                className={
                  coin?.market_cap_change_percentage_24h > 0
                    ? "bullishPrice"
                    : "bearishPrice"
                }
              >
                ${coin?.current_price?.toLocaleString()}
              </p>
            </Tooltip>
          </td>
          <td className="fourthCol">
            <Tooltip title="Total Volume" placement="top">
              <p className="totalVolume">
                ${coin?.total_volume?.toLocaleString()}
              </p>
            </Tooltip>
            <Tooltip title="Total Market Capital" placement="top">
              <p className="totalMoney">${convertNumber(coin?.market_cap)}</p>
            </Tooltip>
            <Tooltip title={isWatchListed(coin?.id)?"Remove from watchlist":"Add to watchlist"} placement="top">
              <div>
                {isWatchListed(coin?.id)  ? (
                  <IconButton onClick={(e) => handleIconClick(e, coin?.id)}>
                    <StarsRoundedIcon
                      className={`bookMarkIcon ${coin?.market_cap_change_percentage_24h > 0 ? " green" : " red"}`}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => handleIconClick(e, coin?.id)}>
                    <StarOutlineRoundedIcon
                      className={`watchlistIcon ${coin?.market_cap_change_percentage_24h > 0 ? "greenish" : "redish"}`}
                    />
                  </IconButton>
                )}
              </div>
            </Tooltip>
          </td>
        </motion.tr>
      </div>
      <CommonModal open={confirmModal} onClose={() => setConfirmModal(false)}>
        <div>
          <div
            style={{
              height: "200px",
              width: "400px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "14px",
            }}
          >
            <p
              style={{
                color: "gray",
                margin: "16px",
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              Are you sure you want to remove this coin?
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "6px",
                alignItems: "center",
                position: "absolute",
                bottom: "4%",
                right: "4%",
              }}
            >
              <Button
                handleClick={() => setConfirmModal(false)}
                text={"Cancel"}
                style={{
                  width: "100px",
                  padding: "6px",
                  backgroundColor: "var(--white)",
                  color: "#3A80E9",
                  border: "1px solid #3A80E9",
                }}
              />
              <Button
                handleClick={handleClick}
                text={"Remove"}
                style={{
                  width: "100px",
                  padding: "6px",
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                }}
              />
            </div>
          </div>
        </div>
      </CommonModal>
    </>
  );
};

export default List;
