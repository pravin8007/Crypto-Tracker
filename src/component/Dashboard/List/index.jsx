import React from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import "./styles.css";
import { motion as Motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../function/convertNumbers";

function List({ coin, index , search}) {
  return (
    <Motion.tr
      className="list-row"
      key={coin.id}
      onClick={() => (window.location.href = `/coin/${coin.id}`)}
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: search ? 0.2 : 0.1 * index }}
      whileTap={{ scale: 0.95 }}
    >
      <Tooltip title={coin.name} placement="top-start" arrow>
        <td className="td-img">
          <img
            src={coin.image}
            alt={`Logo of ${coin.name}`}
            className="coin-logo"
          />
        </td>
      </Tooltip>
      <td>
        <div className="info-text">
          <Tooltip title="Symbol" placement="top" arrow>
            <p className="coin-symbol td-coin-symbol">
              {coin.symbol} <span>-USD</span>
            </p>
          </Tooltip>
          <Tooltip title="Name" placement="bottom" arrow>
            <p className="coin-name">{coin.name}</p>
          </Tooltip>
        </div>
      </td>

      <Tooltip title="Price Change In 24Hrs" placement="top" arrow>
        {coin.price_change_percentage_24h > 0 ? (
          <td className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip td-icon">
              <TrendingUpRoundedIcon />
            </div>
          </td>
        ) : (
          <td className="chip-flex">
            <div className="price-chip red price-change">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </div>
            <div className="icon-chip red td-icon">
              <TrendingDownRoundedIcon />
            </div>
          </td>
        )}
      </Tooltip>

      <td className="price">
        <Tooltip title="Current Price" placement="top" arrow>
          <h3
            className="price-text td-center-align"
            style={{
              color:
                coin.price_change_percentage_24h > 0
                  ? `var(--green)`
                  : `var(--red)`,
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
        </Tooltip>
      </td>
      <Tooltip title="Total Volume" placement="top" arrow>
        <td>
          <p className="volume td-right-align td-total-volume">
            ${coin.total_volume.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market Cap" placement="top" arrow>
        <td className="desktop-td-mkt">
          <p className="volume td-right-align market-cap">
            ${coin.market_cap.toLocaleString()}
          </p>
        </td>
      </Tooltip>

      <Tooltip title="Market Cap" placement="top" arrow>
        <td className="mobile-td-mkt">
          <p className="volume td-right-align market-cap">
            ${convertNumbers(coin.market_cap)}
          </p>
        </td>
      </Tooltip>
    </Motion.tr>
  );
}

export default List;
