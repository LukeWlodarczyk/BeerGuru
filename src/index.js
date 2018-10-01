import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import { removeUniversalPortals } from "react-portal-universal";

import configureStore from "./store/configureStore";
import Routes from "./Routes";

const store = configureStore(window.__REDUX_STATE__ || {});

const AppBundle = (
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>
);

removeUniversalPortals();

window.onload = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(AppBundle, document.getElementById("root"));
  });
};
