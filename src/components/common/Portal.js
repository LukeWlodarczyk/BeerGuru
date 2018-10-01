import React from "react";
import { Router, StaticRouter } from "react-router-dom";
import { createUniversalPortal } from "react-portal-universal";

export const Portal = ({ children, history }) => {
  const portal =
    typeof window !== "undefined" ? (
      <Router history={history}>{children}</Router>
    ) : (
      <StaticRouter>{children}</StaticRouter>
    );
  return createUniversalPortal(portal, "#portal");
};
