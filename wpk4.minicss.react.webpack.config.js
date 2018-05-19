const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extrac-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    page_editor: "./src/index.jsx",
    styles: "./src/style_inc.js"
  },

  output: {
    path: path.resolve("dist"),
    filename: "[name].js"
  },

  module: {
    rules: [{
        test: /\.jsx$/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
