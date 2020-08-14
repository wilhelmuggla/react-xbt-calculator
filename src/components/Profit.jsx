import React from "react";
import * as fairValue from "./fairValue";
import CurrencyFormat from "react-currency-format";
import { getExchangeRate } from "../apis/exchangeRateApi";

export let getPortfolioProfit = async (coins, watchList, format = false) => {
  let portfolio_value = 0;
  let portfolioProfit = 0;
  let fx_rate = await getExchangeRate("USD", "SEK");

  coins.map((coin, index) => {
    console.log(fx_rate);

    const fairvalue = fairValue.getFairValue(
      coin.current_price,
      coin.id,
      fx_rate
    );
    portfolio_value =
      portfolio_value +
      fairValue.coinPortfolioValue(fairvalue, watchList[index]["value"]);
    let coin_profit =
      coin.price_change_percentage_24h *
      0.01 *
      fairValue.coinPortfolioValue(fairvalue, watchList[index]["value"]);
    portfolioProfit += coin_profit;
  });
  if (format == false) return portfolioProfit;
  else
    return (
      <CurrencyFormat
        thousandSeparator={true}
        value={Number(portfolioProfit).toFixed(2)}
        suffix={"kr"}
        displayType={"text"}
      />
    );
};

export const getPortfolioProfitProcent = (profit, portfolio_value) => {
  return Number((profit / portfolio_value) * 100).toFixed(2);
};

export const displayProfit = (
  showProcent,
  profit,
  portfolio_value,
  currency = "sek"
) => {
  let textClass;

  if (profit >= 0) textClass = "text-success show-profit";
  else textClass = "text-danger show-profit";

  if (showProcent)
    return (
      <span className={textClass}>
        ({getPortfolioProfitProcent(profit, portfolio_value)}%)
      </span>
    );
  else
    return (
      <span className={textClass}>({formatProfit(profit, currency)})</span>
    );
};

export const formatProfit = (profit, currency = "sek") => {
  if (currency === "usd")
    return (
      <span className="price_big">
        <CurrencyFormat
          thousandSeparator={true}
          value={Number(profit).toFixed(2)}
          prefix={"$"}
          displayType={"text"}
        />
      </span>
    );
  else
    return (
      <span className="price_big">
        <CurrencyFormat
          thousandSeparator={true}
          value={Number(profit).toFixed(2)}
          suffix={"kr"}
          displayType={"text"}
        />
      </span>
    );
};
