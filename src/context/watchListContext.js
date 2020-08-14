import React, { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    useLocalStorage("watchList", [
      { id: "bitcoin", name: "Bitcoin", short_name: "BTC", value: "" },
      { id: "ethereum", name: "Ethereum", short_name: "ETH", value: "" },
      { id: "ripple", name: "XRP", short_name: "XRP", value: "" },
      { id: "litecoin", name: "Litecoin", short_name: "LTC", value: "" },
    ])
  );

  // Hook
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once

    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);
      console.log(item);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  }

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };

  const addCoin = (coin) => {
    if (watchList.indexOf(coin) === -1) {
      setWatchList([...watchList, coin]);
    }
  };

  const changeValue = (e) => {
    // 1. Make a shallow copy of the items
    let items = [...watchList];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...watchList[e.target.name] };
    // 3. Replace the property you're intested in
    item["value"] = e.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[e.target.name] = item;
    // 5. Set the state to our new copy
    setWatchList(items);
    console.log(items);
  };

  return (
    <WatchListContext.Provider
      value={{ watchList, deleteCoin, addCoin, changeValue }}
    >
      {props.children}
    </WatchListContext.Provider>
  );
};
