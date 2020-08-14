import React, { useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
import "../css/settings.css";
import { Link, Router } from "react-router-dom";

const Settings = () => {
  const { watchList } = useContext(WatchListContext);
  const { changeValue } = useContext(WatchListContext);
  console.log(watchList);

  return (
    <div className="container">
      <h3>Settings</h3>

      <div className="settings">
        {watchList.map((coin, x) => {
          return (
            <div className="form-group" key={x}>
              <label className="font-weight-bold" htmlFor="{coin.id}">
                {coin.name}
              </label>
              <input
                type="number"
                value={coin.value}
                name={x}
                placeholder="Amount of certificate..."
                className="form-control"
                onChange={changeValue}
              />
            </div>
          );
        })}
          <Link to="/">
            <button className="button save_button">Save</button>
          </Link>
      </div>
    </div>
  );
};

export default Settings;
