import React, { useRef, useEffect, useState } from "react";
import ChartJS from "chart.js";
import { useParams } from "react-router-dom";
import {coinGecko} from "../apis/coinGecko";

const HistoryChart = () => {
  const chartRef = useRef();

  const [coinData, setCoinData] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [timeFrame, setTimeFrame] = useState(7);
  const [Coin, setCoin] = useState("bitcoin");
  const [Chart, setChart] = useState({});

  useEffect(() => {
    console.log(timeFrame);
    const fetchData = async () => {
      const result = await coinGecko.get(`/coins/${Coin}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: timeFrame,
        },
      });
      setCoinData(formatData(result.data.prices));
    };
    fetchData();
  }, [timeFrame, Coin]);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2) *,
      };
    });
  };

  useEffect(() => {
    if (isLoaded) {
      Chart.data.datasets[0].data = coinData;
      Chart.update();
    }
  }, [coinData]);

  useEffect(() => {
    if (chartRef && chartRef.current && !isLoaded) {
      setChart(
        new ChartJS(chartRef.current, {
          type: "line",
          data: {
            datasets: [
              {
                data: coinData,
                backgroundColor: "rgba(174, 305, 194, 0.5)",
                borderColor: "rgba(174, 305, 194, 0.4",
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                },
              ],
            },
            maintainAspectRatio: false,
            responsive: true,
            lineHeighAnnotation: {
              always: true,
              hover: false,
              lineWeight: 1.5,
            },
            animation: false,
          },
        })
      );
      setisLoaded(true);
      console.log(Chart);
    }
  }, [coinData]);

  return (
    <div>
      <div className="row">
        <h3 className="col-4 align-middle">Kurs</h3>
        <ul className="col-8 justify-content-end align-middle">
          <li onClick={() => setTimeFrame(1)}>1d</li>
          <li onClick={() => setTimeFrame(7)}>1w</li>
          <li onClick={() => setTimeFrame(30)}>1m</li>
          <li onClick={() => setTimeFrame(365)}>1y</li>
        </ul>
      </div>
      <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      <div class="row">
        <div className="col-6 d-flex">
          <button className= {Coin == 'bitcoin' ? "selected button" : "button"} onClick={() => setCoin("bitcoin")}>
            BTC
          </button>
          <button className={Coin == 'ethereum' ? "selected button" : "button"} onClick={() => setCoin("ethereum")}>
            ETH
          </button>
          <button className={Coin == 'litecoin' ? "selected button" : "button"} onClick={() => setCoin("litecoin")}>
            LTC
          </button>
          <button className={Coin == 'ripple' ? "selected button" : "button"} onClick={() => setCoin("ripple")}>
            XRP
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryChart;
