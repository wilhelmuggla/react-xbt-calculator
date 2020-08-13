import React, { useEffect, useState, useDebugValue, useContext } from "react";
import { getExchangeRate } from "../apis/exchangeRateApi";
import { WatchListContext } from "../context/watchListContext";
import { ProcentContext } from "../context/procentContext";
import {displayProfit, formatProfit} from "../components/Profit";
import Coin from "./Coin";
import * as fairValue from "./fairValue";

const CoinList = (props) => {
  //const [coins, setCoins] = useState([]);
  const { watchList } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState();
  const { showProcent } = useContext(ProcentContext);
  let portfolio_value = 0;
  let portfolio_profit = 0;

  useEffect(() => {
    fairValue.portfolioValue(watchList).then((result) => {
      setPortfolioValue(result);
    });
  }, []);


  const RenderCoins = () => {
    if (isLoading) {
      return <div>Loading... </div>;
    }

    return (
      <div className="coin-table">
        <table className="table">
          <thead>
            <tr>
              <th>Coin</th>
              <th className="text-center">Value</th>
              <th className="text-right">Holdings</th>
            </tr>
          </thead>
          <tbody>
            {props.coins.map((coin, index) => {
              const fairvalue = fairValue.getFairValue(
                coin.current_price,
                coin.id,
                props.fxRate
              );

              portfolio_value =
                portfolio_value +
                fairValue.coinPortfolioValue(
                  fairvalue,
                  watchList[index]["value"]
                );
              let coin_profit =
                coin.price_change_percentage_24h *
                0.01 *
                fairValue.coinPortfolioValue(
                  fairvalue,
                  watchList[index]["value"]
                );
              portfolio_profit += coin_profit;
              return <Coin key={coin.id} fxRate={props.fxRate} index={index} coin={coin}></Coin>;
            })}
          </tbody>
        </table>

        <div className="total-value">
         <b> Total value:</b> {formatProfit(portfolioValue)}
          <span
            className={portfolio_profit >= 0 ? "text-success" : "text-danger"}
          >
            {displayProfit(showProcent, portfolio_profit, portfolioValue)}
          </span>
        </div>
      </div>
    );
  };

  return <RenderCoins></RenderCoins>;
};
export default CoinList;
