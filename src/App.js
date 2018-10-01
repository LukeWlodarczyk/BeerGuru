import React from "react";
import { renderRoutes } from "react-router-config";
import "./App.css";

import Header from "./components/layout/Header";

const App = ({ route }) => {
  return (
    <div className="container">
      <Header />
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App
};
