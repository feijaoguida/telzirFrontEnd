import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import simulacao from "./pages/Simulacao";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={simulacao} />
      </Switch>
    </BrowserRouter>
  );
}
