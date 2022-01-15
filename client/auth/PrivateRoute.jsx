import React from "react";
import { Route, Navigate } from "react-router-dom";
import { auth } from "./auth-helper";

const PrivateRoute = ({ children, redirectTo }) => {
  const isAuthenticated = auth.isAuthenticated();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
