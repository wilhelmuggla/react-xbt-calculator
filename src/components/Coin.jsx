import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/coin-table.css";
import { WatchListContext } from "../context/watchListContext";
import {getFairValue, coinPortfolioValue } from "./fairValue";
import {displayProfit, formatProfit} from "../components/Profit";
import { ProcentContext } from "../context/procentContext";


const Coin = ({ coin, index, fxRate }) => {
  console.log(coin);
  const { watchList } = useContext(WatchListContext);
  const { showProcent } = useContext(ProcentContext);

  const fair_value = getFairValue(coin.current_price, coin.id, fxRate);

  return (
    <tr key={coin.symbol} className="coinlist-item">
      <td>
        <Link to={`coin/${coin.id}`}>
          <img src={coin.image} className="coinlist-image" />
          {coin.name}
        </Link>
      </td>
      <td className="price">
        <span>
          {formatProfit(coin.current_price, 'usd')}
        </span>
        <span className="percentage align-middle">
        {displayProfit(showProcent, coin.current_price*coin.price_change_percentage_24h * 0.01, coin.current_price, 'usd')}
        </span>
      </td>
      <td className="text-right">
        {watchList[index]["value"] !== "" ? (
          formatProfit(coinPortfolioValue(fair_value, watchList[index]["value"]))
        ) : (
          <Link to="/settings">
            <button className="button">Add</button>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default Coin;
