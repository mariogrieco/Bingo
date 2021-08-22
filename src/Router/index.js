import React from "react";
import { Route, Switch } from "react-router-dom";
import { StoreProvider } from "../Store";
import Home from "../components/Home";

const Router = () => {
  return (
    <StoreProvider>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </StoreProvider>
  );
};

export default Router;
