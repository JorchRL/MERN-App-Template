import React from "react";
import { Route, Routes as Switch } from "react-router";
import Home from "./core/Home.jsx";

const MainRouter = () => {
  return (
    <Switch>
      {/* // Since we are using react router v6, Route uses an "element" prop 
      // instead of the "component" prop that was used in react router v5 */}
      <Route path='/' element={<Home />} />
    </Switch>
  );
};

export default MainRouter;
