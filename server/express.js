import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();

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
//
// TO DO
//
////////////////////

// Export the app
export default app;
