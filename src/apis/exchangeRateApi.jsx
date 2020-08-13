import axios from "axios";

export const exchangeRateApi = axios.create({
  baseURL: "https://api.exchangeratesapi.io/latest/",
});


export const getExchangeRate = async (base, rate) => {
  let result =  await exchangeRateApi.get(``, {
        params: {
          base: base,
        },
      });
      console.log(result);
      return result.data['rates'][rate]
}