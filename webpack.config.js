const HtmlWebpackPlugin = require("html-webpack-plugin");

const backendUri = `http://localhost:${process.env.PORT || 3001}`;

module.exports = {
  module: {
    rules: [
      {
        test: [/\.js/, /\.tsx/, /\.ts/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css/,
        use: [
          {loader: "style-loader"}, {loader: "css-loader"}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    port: 3000,
    proxy: {
      "/socket.io": {
        target: backendUri,
        ws: true
      },
      "/": backendUri,
    }
  }
};
