import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import "./styles.css";
import { convertNumbers } from "../../../function/convertNumbers";
import { saveItemToWatchlist } from "../../../function/saveItemToWatchList";
import { removeItemFromWatchList } from "../../../function/removeItemFromWatchList";


function List({ coin, index, search }) {
  const navigate = useNavigate();
  const [isCoinAdded, setIsCoinAdded] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setIsCoinAdded(watchlist.includes(coin.id));
  }, [coin.id]);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (isCoinAdded) {
      removeItemFromWatchList(e, coin.id, setIsCoinAdded);
    } else {
      setIsCoinAdded(true);
      saveItemToWatchlist(e, coin.id);
    }
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  const handleClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  return (
    <Motion.tr
      className="list-row"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: search ? 0.2 : 0.1 * index }}
      whileTap={{ scale: 0.95 }}
    >

      <Tooltip title={coin.name} arrow>
        <td className="td-img">
          <img src={coin.image} alt={coin.name} className="coin-logo" />
        </td>
      </Tooltip>

      <td>
        <div className="info-text">
          <Tooltip title="Symbol" arrow>
            <p className="coin-symbol td-coin-symbol">
              {coin.symbol.toUpperCase()} <span>-USD</span>
            </p>
          </Tooltip>
          <Tooltip title="Name" arrow>
            <p className="coin-name">{coin.name}</p>
          </Tooltip>
        </div>
      </td>

      <Tooltip title="Price Change (24h)" arrow>
        <td className="chip-flex">
          <div className={`price-chip ${!isPositive && "red"}`}>
            {coin?.price_change_percentage_24h != null
              ? coin.price_change_percentage_24h.toFixed(2) + " %"
              : "N/A"}
          </div>
          <div className={`icon-chip td-icon ${!isPositive && "red"}`}>
            {isPositive ? <TrendingUpRoundedIcon /> : <TrendingDownRoundedIcon />}
          </div>
        </td>
      </Tooltip>

      <Tooltip title="Current Price" arrow>
        <td className="price">
          <h3
            className="price-text td-center-align"
            style={{ color: isPositive ? "var(--green)" : "var(--red)" }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </td>
      </Tooltip>

      <Tooltip title="Total Volume" arrow>
        <td>
          <p className="volume td-right-align td-total-volume">
            ${coin.total_volume.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market Cap" arrow>
        <td className="desktop-td-mkt">
          <p className="volume td-right-align market-cap">
            ${coin.market_cap.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market Cap" arrow>
        <td className="mobile-td-mkt">
          <p className="volume td-right-align market-cap">
            ${convertNumbers(coin.market_cap)}
          </p>
        </td>
      </Tooltip>

       <td>
        <span className="watchlist-icon" onClick={handleWatchlistToggle}>
            {isCoinAdded ? (
              <StarIcon style={{ color: "#facc15" }} />
            ) : (
              <StarOutlineIcon />
            )}
          </span>
      </td>
    </Motion.tr>
  );
}

export default List;
