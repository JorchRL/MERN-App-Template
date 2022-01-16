import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

// Route imports
import Template from "../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

/// Server-side Rendering imports
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter.jsx";

//StaticRouter moved to react-router-dom/server in react-router v6
import { StaticRouter } from "react-router-dom/server";

import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "../client/theme";

/// devBundle
import devBundle from "./devBundle";
import path from "path";
const CURRENT_WORKING_DIR = process.cwd();
const app = express();
devBundle.compile(app); // For development mode; comment for production

// Parse body of an incomming request. This makes the req.body object
// available. Particularly, JSON formatted bodies can be accesses as
// a javascript object (eg. req.body.<propertyName>)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies. use: req.cookies
app.use(cookieParser());

// Attempt to compress the body of responses for all request that
// go through the middleware
app.use(compress());

// Use Helmet middleware to protect app from security vulnerabilities
// by setting several http headers appropiately
// See: https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

// Enable CORS
app.use(cors());

/// SERVE STATIC FRONTEND REACT SCRIPT
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
//// API ROUTES ////
app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();

  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});
//
////////////////////

/// JWT Error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: `${err.name}: ${err.message}` });
  } else {
    return res.status(400).json({ error: `${err.name}: ${err.message}` });

    console.log(err);
  }
});

// Export the app
export default app;
