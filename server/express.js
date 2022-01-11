import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import Template from "../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import devBundle from "./devBundle";
import path from "path";
const CURRENT_WORKING_DIR = process.cwd();
const app = express();
devBundle.compile(app); // For development mode; comment for production

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

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

//// API ROUTES ////
app.use("/", userRoutes);
app.use("/", authRouter);

app.get("/", (req, res) => {
  res.status(200).send(Template());
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
