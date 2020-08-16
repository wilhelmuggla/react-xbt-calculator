import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { coinGecko, getCoinPriceData } from "../apis/coinGecko";
import { createChart, formatChartData, updateChart } from "../components/Chart";
import ProcentSwitch from "../components/ProcentSwitch";
import { ProcentContext } from "../context/procentContext";
import { displayProfit, formatProfit } from "../components/Profit";
import CoinInfoTable from "../components/CoinInfoTable";
import { CircularProgress } from "@material-ui/core";
import { WatchListContext } from "../context/watchListContext";
import ChartControlls from "../components/ChartControlls";
const CoinDetailPage = () => {
  const { id } = useParams();
  const chartRef = useRef();
  let [coinData, setCoinData] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let [timeFrame, setTimeFrame] = useState(1);
  let [chart, setChart] = useState();
  const { showProcent } = useContext(ProcentContext);
  const { watchList } = useContext(WatchListContext);

  //fetch data from api
  const fetchData = async () => {
    return await coinGecko.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: timeFrame,
      },
    });
  };

  //creates the chart
  useEffect(() => {
    fetchData().then((result) => {
      setChart(createChart(formatChartData(result.data.prices), chartRef));
    });
  }, []);

  //updates the chart
  useEffect(() => {
    if (!isLoading) {
      fetchData().then((result) => {
        updateChart(formatChartData(result.data.prices), chart);
      });
    }
  }, [timeFrame]);

  //gets the coin data
  useEffect(() => {
    getCoinPriceData(id).then((result) => {
      setCoinData(result.data);
      console.log(result.data[0]);
      setIsLoading(false);
    });
  }, []);

  const renderData = () => {
    return (
      <div className="container">
        <h3>
          {isLoading ? "Loading..." : coinData[0].name + " "}
          {isLoading
            ? "Loading..."
            : formatProfit(coinData[0].current_price, "usd")}
          {isLoading
            ? "Loading..."
            : displayProfit(
                showProcent,
                coinData[0].current_price *
                  coinData[0].price_change_percentage_24h *
                  0.01,
                coinData[0].current_price,
                "usd"
              )}
          <ProcentSwitch />
        </h3>
        <div className="chart-container">
          {isLoading === true ? (
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
        <ChartControlls
          chart={chart}
          watchList={watchList}
          id={id}
          isLoading={setIsLoading}
        />

        <h3>{isLoading ? "" : coinData[0].name} Statistics</h3>
        {isLoading ? "" : <CoinInfoTable coinData={coinData} />}
      </div>
    );
  };

  return renderData();
};

export default CoinDetailPage;
