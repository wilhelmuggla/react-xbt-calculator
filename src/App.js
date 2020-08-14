import React, { useState } from "react";
import "./css/bootstrap.css";
import "./css/App.css";

import Header from "./components/Header";

import Front from "./pages/Front";
import Settings from "./pages/Settings";
import coinDetailPage from "./pages/CoinDetailsPage";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WatchListContextProvider } from "./context/watchListContext";
import { ProcentContextProvider } from "./context/procentContext";

function App() {
  return (
    <div>
      <ProcentContextProvider>
        <WatchListContextProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={Front} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/coin/:id" component={coinDetailPage} />
            </Switch>
          </BrowserRouter>
        </WatchListContextProvider>
      </ProcentContextProvider>
    </div>
  );
}

export default App;
