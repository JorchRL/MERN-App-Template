import React from "react";
import { Route, Routes as Switch } from "react-router";

import Menu from "./core/Menu.jsx";
import Home from "./core/Home.jsx";
import Users from "./user/Users.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./auth/Signin.jsx";
import Profile from "./user/Profile.jsx";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        {/* // Since we are using react router v6, Route uses an "element" prop 
      // instead of the "component" prop that was used in react router v5 */}
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user'>
          <Route path=':userId' element={<Profile />} />
        </Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
