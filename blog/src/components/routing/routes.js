import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../../components/auth/register";
import Login from "../../components/auth/login";

export const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  );
};
