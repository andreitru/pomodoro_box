import React from "react";
import "./App.scss";

import { Main } from "./components/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Statistics } from "./components/Statistics";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/statistics">
          <Statistics />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

store.subscribe(() => {
  localStorage.setItem("store", JSON.stringify(store.getState()));
});

export default App;
