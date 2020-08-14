import React, { useContext, useRef, useState, useEffect } from "react";
import CoinList from "../components/CoinList";
import * as chart from "../components/Chart";
import {
  getPortfolioChartData,
  getCoinPriceData,
  listCoins,
} from "../apis/coinGecko";
import { WatchListContext } from "../context/watchListContext";
import { ProcentContext } from "../context/procentContext";
import { portfolioValue } from "../components/fairValue";
import {
  getPortfolioProfit,
  getPortfolioProfitProcent,
  displayProfit,
  formatProfit,
} from "../components/Profit";
import ProcentSwitch from "../components/ProcentSwitch";
import {getExchangeRate} from "../apis/exchangeRateApi";

const Front = () => {
  const { watchList } = useContext(WatchListContext);
  const { showProcent, changeSetProcent } = useContext(ProcentContext);

  const chartRef = useRef();
  let [portfoliovalue, setPortfolioValue] = useState();
  let [coins, setCoins] = useState();
  let [profit, setProfit] = useState();
  let [profitProcent, setProfitProcent] = useState();
  let [fxRate, setFxRate] = useState();

  useEffect(() => {
    getExchangeRate("USD", "SEK").then((result) => {
      setFxRate(result);
    });

    getPortfolioChartData(watchList, 1).then((result) => {
      chart.createChart(result, chartRef);
    });
  }, []);

  useEffect(() => {
    portfolioValue(watchList, false).then((result) => {
      setPortfolioValue(result);
    });
  }, []);

  useEffect(() => {
    getCoinPriceData(listCoins(watchList)).then((result) => {
      setCoins(result.data);
      getPortfolioProfit(result.data, watchList).then((result2) => {
        setProfit(result2);
      });
      setProfitProcent(getPortfolioProfitProcent(portfoliovalue, result.data));
    });
  }, []);

 
    return (
      <div>
        <div className="container historychart">
          <h3>
            Portfolio {formatProfit(portfoliovalue)}
            {displayProfit(showProcent, profit, portfoliovalue)}
            <ProcentSwitch />
          </h3>
          <div className="chart-container">
            <canvas id="myChart" ref={chartRef}>
              loading
            </canvas>
          </div>
        </div>
        <div className="container">
          <h3>Holdings</h3>
          {coins === undefined || fxRate === undefined ? 'Loading...' : <CoinList
            coins={coins}
            profit={profit}
            fxRate={fxRate}
            portfoliovalue={portfoliovalue}
          />}
        </div>
      </div>
    );
  
};

export default Front;
