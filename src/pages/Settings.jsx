import React, { useContext } from "react";
import { WatchListContext } from "../context/watchListContext";
const Settings = () => {
  const { watchList } = useContext(WatchListContext);
  const { changeValue } = useContext(WatchListContext);

  
  return (
    <div className="container">
      <h3>Settings</h3>

      <div className="settings">
        {watchList.map((coin, x) => {
          return (
            <div className="form-group" key={x}>
              <label htmlFor="{coin.id}">{coin.id}</label>
              <input
                type="number"
                value={coin.value}
                name={x}
                className="form-control"
                onChange={changeValue}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;
