import { Route, Switch } from "react-router-dom";

import Home from "../components/Home";
import About from "../components/About";

import React from "react";
const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </>
  );
};

export default Router;
