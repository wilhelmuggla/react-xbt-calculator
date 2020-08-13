import React, { useState } from "react";
import logo from "./logo.svg";
import "./css/bootstrap.css";
import "./css/App.css";

import Header from "./components/Header";
import Front from "./pages/Front";
import Settings from "./pages/Settings";

import { BrowserRouter, Route } from "react-router-dom";
import { WatchListContextProvider } from "./context/watchListContext";
import { ProcentContextProvider } from "./context/procentContext";
import coinDetailPage from "./pages/CoinDetailsPage";


function App() {
  return (
    <div>
      <ProcentContextProvider>
        <WatchListContextProvider>
          <BrowserRouter>
            <Header />
            <Route exact path="/" component={Front} />
            <Route exact path="/coin/:id" component={coinDetailPage} />
            <Route exact path="/settings" component={Settings} />
          </BrowserRouter>
        </WatchListContextProvider>
      </ProcentContextProvider>
    </div>
  );
}

export default App;
