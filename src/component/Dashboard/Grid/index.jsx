import React from "react";
import "./styles.css";
import { motion as Motion } from "framer-motion";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";

function Grid({ coin,index }) {
  const grid_item = () =>
    coin.price_change_percentage_24h > 0 ? "grid-item " : "grid-item red-item";

  return (
    <Motion.div
      className={grid_item()}
      key={coin.id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 , delay: 0.1 * index}}
      whileTap={{ scale: 0.95 }}
      onClick={() => (window.location.href = `/coin/${coin.id}`)}
    >
      <div className="info">
        <img src={coin.image} alt={coin.name} className="coin-logo" />
        <div className="info-text">
          <p className="coin-symbol">{coin.symbol}-USD</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </div>
      {coin.price_change_percentage_24h > 0 ? (
        <div className="chip-flex">
          <div className="price-chip">
            {coin.price_change_percentage_24h.toFixed(2)} %
          </div>
          <div className="icon-chip">
            <TrendingUpRoundedIcon />
          </div>
        </div>
      ) : (
        <div className="chip-flex">
          <div className="price-chip red">
            {coin.price_change_percentage_24h.toFixed(2)} %
          </div>
          <div className="icon-chip red">
            <TrendingDownRoundedIcon />
          </div>
        </div>
      )}

      <div className="price">
        <h3
          className="price-text"
          style={{
            color:
              coin.price_change_percentage_24h > 0
                ? `var(--green)`
                : `var(--red)`,
          }}
        >
          ${coin.current_price.toLocaleString()}
        </h3>
      </div>

      <p className="volume">
        Total Volume : ${coin.total_volume.toLocaleString()}
      </p>
      <p className="volume">Market Cap : ${coin.market_cap.toLocaleString()}</p>
    </Motion.div>
  );
}

export default Grid;
