  
import React from "react";
import { getCoinPriceData, listCoins } from "../apis/coinGecko";
import {getExchangeRate} from "../apis/exchangeRateApi";

import CurrencyFormat from "react-currency-format";



export function getDevisor(symbol) {
  let devisor;
  switch (symbol) {
    case "bitcoin":
      devisor = 0.005;
      break;
    case "ethereum":
      devisor = 0.01;
      break;
    case "litecoin":
      devisor = 0.05;
      break;
    case "ripple":
      devisor = 5;
      break;
    default:
      devisor = 0;
  }
  return devisor;
}

export let getFairValue = (coin_price, coin_symbol, fx_rate) => {

  const sek_price = fx_rate * coin_price;
  const fee = sek_price * 0.055;
  const sek_price_ex_fee = sek_price - fee;
  let devisor = getDevisor(coin_symbol);
  return Number(sek_price_ex_fee * devisor).toFixed(2);
}

export function coinPortfolioValue(fairValue, amount) {
  return fairValue * amount;
}

export const portfolioValue = async (watchlist, format = false) => {
  let portfolio_value = Number();
 let fx_rate = await getExchangeRate("USD", "SEK");
  await getCoinPriceData(listCoins(watchlist)).then((result) => {
    result.data.map((coin, index) => {
      let fairvalue = getFairValue(coin.current_price, coin.id, fx_rate);
      portfolio_value += coinPortfolioValue(+fairvalue, watchlist[index].value);
    });
  });
  if (format == false) return Number(portfolio_value).toFixed(0);
  else
    return (
      <CurrencyFormat
        value={Number(portfolio_value).toFixed(0)}
        displayType={"text"}
        thousandSeparator={true}
        suffix="kr"
      />
    );
};