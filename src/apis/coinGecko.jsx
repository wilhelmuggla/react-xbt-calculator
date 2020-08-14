import axios from "axios";
import moment from "moment";
import { getFairValue } from "../components/fairValue";
import { getExchangeRate } from "./exchangeRateApi";

export const getCoinPriceData = async (ids) => {
  return await coinGecko.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: ids,
    },
  });
};

export const getPortfolioChartData = async (watchList, timeframe) => {
  let prices = [];
  for (let x = 0; watchList.length > x; x++) {
    let result = await coinGecko.get(`/coins/${watchList[x].id}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: 1,
      },
    });

    const fx_rate = await getExchangeRate("USD", "SEK");

    for (let y = 0; result.data.prices.length > y; y++) {
      let m = moment(result.data.prices[y][0]);
      let remainder = 15 - (m.minute() % 15);
      let dateTime = moment(m).startOf('hour').format("YYYY-MM-DD HH:mm");
      result.data.prices[y][0] = dateTime;
      result.data.prices[y][1] =
        watchList[x].value *
        getFairValue(result.data.prices[y][1], watchList[x].id, fx_rate);
    }
   result.data.prices = removeDuplicates(result.data.prices, 0);

    prices.push({ price: result.data.prices, id: watchList[x].id });
  }

  return mergeArrayObjects(prices);
};

export const coinGecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

function mergeArrayObjects(prices) {
  let portfoliotime = [];
  let next;
  console.log(prices);
  let shortest = 1000;

  for (let x = 0; prices.length > x; x++) {
    if (shortest > prices[x].price.length) shortest = prices[x].price.length;
    console.log(prices[x].price.length);
  }
  console.log(shortest);

  for (let x = 0; shortest > x; x++) {
    let timeportfoliovalue = 0;
    for (let y = 0; prices.length > y; y++) {
      if (y < prices.length -1 ) next = y + 1;
      else next = 0;

      for (let z = 0; shortest > z; z++) {
        if (prices[y].price[x][0] == prices[next].price[z][0]) {
          timeportfoliovalue += prices[next].price[z][1];
          if(prices[next].price[z][1] === '') console.log(prices[next].price[z][0] + 'error');
        }
      }
    }
    portfoliotime.push({
      x: prices[0].price[x][0],
      y: Number(timeportfoliovalue).toFixed(0),
    });
  }
  return portfoliotime;
}

export const listCoins = (watchList) => {
  let listCoins;
  for (let x = 0; watchList.length > x; x++) {
    listCoins += "," + watchList[x]["id"] + ",";
  }
  return listCoins;
};


moment.fn.roundNext15Min = function () {
    var intervals = Math.floor(this.minutes() / 15);
    if(this.minutes() % 15 != 0)
        intervals++;
        if(intervals == 4) {
            this.add('hours', 1);
            intervals = 0;
        }
        this.minutes(intervals * 15);
        this.seconds(0);
        return this;
    }