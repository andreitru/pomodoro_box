const paths = require("./paths");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [paths.src + "/index.js"],
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: paths.src + "/assets",
        to: "assets",
      }]
    }),
    new HtmlWebpackPlugin({
      title: "Pomodoro_box",
      favicon: paths.src + "/assets/icons/favicon.ico",
      template: paths.public + "/index.html",
      filename: "index.html"
    }),
  ],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"]},
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {sourceMap: true, importLoaders: 1},
          },
          {loader: "postcss-loader", options: {sourceMap: true}},
          {loader: "sass-loader", options: {sourceMap: true}},
        ],
      },
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource"},
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline"},
    ],
  },
};