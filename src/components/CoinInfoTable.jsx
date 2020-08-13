import React from "react";
import CurrencyFormat from "react-currency-format";

const CoinInfoTable = (props) => {
  return (
    <table className="table coin-info-table">
      <thead>
        <th>Market cap</th>
        <th className="text-center">circulating_supply</th>
        <th className="text-right">total_supply</th>
      </thead>
      <tbody>
        <td>
          <CurrencyFormat
            thousandSeparator={true}
            value={props.coinData[0].market_cap}
            suffix={" $"}
            displayType={"text"}
          />
        </td>
        <td className="text-center">
          <CurrencyFormat
            thousandSeparator={true}
            value={props.coinData[0].circulating_supply}
            suffix={""}
            displayType={"text"}
          />
        </td>
        <td className="text-right">
          {props.coinData[0].total_supply !== null ? (
            <CurrencyFormat
              thousandSeparator={true}
              value={props.coinData[0].total_supply}
              suffix={""}
              displayType={"text"}
            />
          ) : (
            "unknown"
          )}
        </td>
      </tbody>
    </table>
  );
};
export default CoinInfoTable;
