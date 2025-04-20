const path = require("path");

module.exports = {
  entry: "./src/main.ts",
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.wgsl$/,
        use: {
          loader: "ts-shader-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devServer: {
    static: "./dist",
  },
};
