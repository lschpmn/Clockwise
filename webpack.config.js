'use strict';

const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),

  entry: './index.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'dep.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.html$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$|\.mp3$/,
        use: [
          'file-loader?name=[name].[ext]',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader?presets[]=react,presets[]=es2015',
        ],
      }
    ]
  },

  devServer: {
    port: 3000,
  },
};