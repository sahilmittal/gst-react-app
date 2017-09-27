var path = require ("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')

var DIST_DIR = path.resolve(__dirname, "dist")
var SRC_DIR = path.resolve(__dirname, "src")

var config = {
  entry: SRC_DIR + "/app/index.js",
  output: {
    path: DIST_DIR + "/app",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        include: SRC_DIR,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

module.exports = config;