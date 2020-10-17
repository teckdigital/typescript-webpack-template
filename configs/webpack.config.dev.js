const Path = require("path");
const { merge } = require("webpack-merge");
const RunNodeWebpackPlugin = require("run-node-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-source-map",
  output: {
    chunkFilename: "[name].chunk.js",
  },
  plugins: [new RunNodeWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, "../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
});
