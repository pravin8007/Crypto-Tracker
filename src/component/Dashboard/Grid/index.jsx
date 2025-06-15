import React, { useState } from "react";
import "./styles.css";
import { motion as Motion } from "framer-motion";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { saveItemToWatchlist } from "../../../function/saveItemToWatchList";
import { removeFromWatchList } from "../../../function/removeFromWatchList"; 



function Grid({ coin, index, search }) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  const grid_item = () =>
    coin.price_change_percentage_24h > 0 ? "grid-item" : "grid-item red-item";

  const handleWatchlistToggle = (e) => {
    e.preventDefault(); 
    if (isCoinAdded) {
      removeFromWatchList(e, coin.id, setIsCoinAdded);
    } else {
      setIsCoinAdded(true);
      saveItemToWatchlist(e, coin.id);
    }
  };

  return (
    <Link
      to={`/coin/${coin.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Motion.div
        className={grid_item()}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: search ? 0.2 : 0.1 * index }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="info">
          <img src={coin.image} alt={coin.name} className="coin-logo" />
          <div className="info-text">
            <p className="coin-symbol">{coin.symbol}-USD</p>
            <p className="coin-name">{coin.name}</p>
          </div>
          <div
            className={`watchlist-icon ${
              coin.price_change_percentage_24h < 0 ? "red" : ""
            }`}
            onClick={handleWatchlistToggle}
          >
            {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
          </div>
        </div>

        <div className="chip-flex">
          <div
            className={`price-chip ${
              coin.price_change_percentage_24h < 0 ? "red" : ""
            }`}
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </div>
          <div
            className={`icon-chip ${
              coin.price_change_percentage_24h < 0 ? "red" : ""
            }`}
          >
            {coin.price_change_percentage_24h < 0 ? (
              <TrendingDownRoundedIcon />
            ) : (
              <TrendingUpRoundedIcon />
            )}
          </div>
        </div>

        <div className="price">
          <h3
            className="price-text"
            style={{
              color:
                coin.price_change_percentage_24h > 0
                  ? "var(--green)"
                  : "var(--red)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </div>

        <p className="volume">
          Total Volume: ${coin.total_volume.toLocaleString()}
        </p>
        <p className="volume">
          Market Cap: ${coin.market_cap.toLocaleString()}
        </p>
      </Motion.div>
    </Link>
  );
}

export default Grid;
