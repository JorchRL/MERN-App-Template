import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

import { hot } from "react-hot-loader";
import MainRouter from "./MainRouter.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* <h3>HEllo</h3> */}
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default hot(module)(App);
