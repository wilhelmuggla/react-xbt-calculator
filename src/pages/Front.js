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
import { getExchangeRate } from "../apis/exchangeRateApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChartControlls from "../components/ChartControlls";

const Front = () => {
  const { watchList } = useContext(WatchListContext);
  const { showProcent} = useContext(ProcentContext);

  const chartRef = useRef();
  let [portfoliovalue, setPortfolioValue] = useState();
  let [coins, setCoins] = useState();
  let [profit, setProfit] = useState();
  //let [profitProcent, setProfitProcent] = useState();
  let [fxRate, setFxRate] = useState();
  let [loading, isLoading] = useState(true);
  const [chartobj, setChart] = useState();

  useEffect(() => {
    getExchangeRate("USD", "SEK").then((result) => {
      setFxRate(result);
    });

    getPortfolioChartData(watchList, 1).then((result) => {
      setChart(() => chart.createChart(result, chartRef));
      isLoading(false);
    });
  }, []);

  useEffect(() => {
    portfolioValue(watchList, false, "23-03-2020").then((result) => {
      setPortfolioValue(result);
    });
  }, []);

  useEffect(() => {
    getCoinPriceData(listCoins(watchList)).then((result) => {
      setCoins(result.data);
      getPortfolioProfit(result.data, watchList).then((result2) => {
        setProfit(result2);
      });
     // setProfitProcent(getPortfolioProfitProcent(portfoliovalue, result.data));
    });
  }, []);

  return (
    <div>
      <div className="container historychart">
        <h3>
          Portfolio<span className="price_big">{formatProfit(portfoliovalue)}</span>
          <span className="profit">
            {displayProfit(showProcent, profit, portfoliovalue)}
          </span>
          <ProcentSwitch />
        </h3>
        <div className="chart-container">
          {loading === true ? (
            <div className="CircularProgress">
              <CircularProgress size={40} />
            </div>
          ) : (
            ""
          )}
          <canvas id="myChart" ref={chartRef}>
            loading
          </canvas>
        </div>
       <ChartControlls chart={chartobj} watchList={watchList} id="portfolio"  isLoading={isLoading} />
      </div>
      <div className="container">
        <h3>Holdings</h3>
        {coins === undefined || fxRate === undefined ? (
          "Loading..."
        ) : (
          <CoinList
            coins={coins}
            profit={profit}
            fxRate={fxRate}
            portfoliovalue={portfoliovalue}
          />
        )}
      </div>
    </div>
  );
};

export default Front;
