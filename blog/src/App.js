import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import combineReducers from "./reducers";

import { BrowserRouter, Route, Switch } from "react-router-dom";
/// components
import Landing from "./components/layout/landing";
import Navbar from "./components/layout/navbar";

import { setAuthToken } from "./utilies/setAuthToken";
import { Routes } from "./components/routing/routes";

if (localStorage.token) setAuthToken(localStorage.token);

const store = createStore(
  combineReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export const App = () => {
  return (
    <div style={{ fontFamily: "cursive" }}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
