import React, { createContext, useState, useEffect } from "react";

export const ProcentContext = createContext();

export const ProcentContextProvider = (props) => {
  const [showProcent, setProcent] = useState(useLocalStorage("showProcent", JSON.stringify(true)));

  // Hook
  function useLocalStorage(key, initialValue) { 
        return JSON.parse(localStorage.getItem(key))

  }

  console.log(localStorage.getItem("showProcent"));
 
 

  const changeSetProcent = (e) => {
      console.log(e);
    setProcent(e);
    localStorage.setItem("showProcent", JSON.stringify(e));
  };

  return (
    <ProcentContext.Provider
      value={{ showProcent, changeSetProcent }}
    >
      {props.children}
    </ProcentContext.Provider>
  );
};
