const path = require("path");
// const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();
const nodeExternals = require("webpack-node-externals");

const config = {
  name: "server",
  entry: [path.join(CURRENT_WORKING_DIR, "./server/server.js")],
  target: "node",
  output: {
    path: path.join(CURRENT_WORKING_DIR, "/dist/"),
    filename: "server.generated.js",
    publicPath: "/dist/",
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        // This is needed in the server for server-side rendering to work with jsx files
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ttf|eot|svg|jpg|png)(\?[\s\S]+)?$/,
        use: "file-loader",
      },
    ],
  },
};

module.exports = config;
