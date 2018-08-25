'use strict';

const { join } = require('path');

module.exports = {
  context: join(__dirname, 'client'),

  entry: './index.tsx',

  mode: 'development',

  output: {
    path: join(__dirname, 'public'),
    filename: 'dep.js'
  },

  module: {
    rules: [
      {
        test: /\.html$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.woff2$|\.mp3$/,
        use: [ 'file-loader?name=[name].[ext]' ],
      },
      {
        test: /.tsx?$/,
        use: [ 'ts-loader' ],
      },
    ]
  },

  serve: {
    port: 5000,
  },
};