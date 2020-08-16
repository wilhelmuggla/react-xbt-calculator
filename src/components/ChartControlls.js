import React, { useState, useEffect, useRef } from "react";
import CachedIcon from "@material-ui/icons/Cached";
import { updateChart, formatChartData } from "./Chart";
import { coinGecko, getPortfolioChartData } from "../apis/coinGecko";

const ChartControlls = (props) => {
  const [timeFrame, setTimeFrame] = useState(1);
  const isInitialMountUpdate = useRef(true);
  const isInitialMountReload = useRef(true);

  const [reload, setReload] = useState();

  const fetchData = async () => {
    return await coinGecko.get(`/coins/bitcoin/market_chart`, {
      params: {
        vs_currency: "usd",
        days: timeFrame,
      },
    });
  };

  useEffect(() => {
    //do not update on load
    if (isInitialMountUpdate.current) {
        isInitialMountUpdate.current = false;
    } else {
      props.isLoading(true);

      //portfolio page
      if (props.id === "portfolio") {
        getPortfolioChartData(props.watchList, timeFrame).then((result) => {
          updateChart(result, props.chart);
          props.isLoading(false);
        });
      }
      //coin page
      else {
        fetchData().then((result) => {
          updateChart(formatChartData(result.data.prices), props.chart);
          props.isLoading(false);
        });
      }
    }
  }, [timeFrame, reload]);

  useEffect(() => {
    if (isInitialMountReload.current) {
        isInitialMountReload.current = false;
    } else window.location.reload();
  }, [reload]);

  return (
    <div class="row controlls">
      <div className="col-8 d-flex">
        <button
          className={timeFrame === 1 ? "selected button" : "button"}
          onClick={() => setTimeFrame(1)}
        >
          1d
        </button>
        <button
          className={timeFrame === 7 ? "selected button" : "button"}
          onClick={() => setTimeFrame(7)}
        >
          1w
        </button>
        <button
          className={timeFrame === 30 ? "selected button" : "button"}
          onClick={() => setTimeFrame(30)}
        >
          1m
        </button>

        {props.id !== "portfolio" ? (
          <button
            className={timeFrame === 365 ? "selected button" : "button"}
            onClick={() => setTimeFrame(365)}
          >
            1y
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="col-4">
       <button className="button reload-button"> <CachedIcon
          onClick={() => setReload(reload + 1)}
        /></button>
      </div>
    </div>
  );
};

export default ChartControlls;
