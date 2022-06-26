// @ts-check

const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  /*entry: { 
    main: path.join(__dirname, './src/index.js'),
  },*/
  devServer: {
    historyApiFallback: true,
    /*static: {
      directory: path.resolve(__dirname, './dist'),
    },*/
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    host: '0.0.0.0', 
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  /*output: {
    path: path.join(__dirname, 'dist'),
  },*/
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  target: 'web',
  plugins: [
    //new MiniCssExtractPlugin(),
    //new Dotenv(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
    },
    ],
  },
};
