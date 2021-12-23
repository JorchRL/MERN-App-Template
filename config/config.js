// We will import our variables from a .env file or generate defaults,
// and use the config object to export them to the rest of the application

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  mongoURI:
    process.env.MONGOURI ||
    process.env.MONGO_HOST ||
    `mongodb://${process.env.IP || "localhost"}:${
      process.env.MONGO_PORT || 27017
    }/mernproject`,
};

export default config;
