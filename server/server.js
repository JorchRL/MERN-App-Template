import config from "../config/config";
import app from "./express";

import mongoose from "mongoose";

// Setup connection to MongoDB
mongoose.Promise = global.Promise; // redundant as mongoose uses global.Promise by default
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB!", error);
  });
// mongoose.connection.on("error", () => {
//   // throw new Error(`Unable to connect to database: ${config.mongoURI}`);
//   console.log("Not connected to MongoDB :(");
// });

// Start the server
app.listen(config.port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server started and running on port ${config.port}`);
});
