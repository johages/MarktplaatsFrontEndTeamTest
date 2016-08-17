var path = require('path');

module.exports = {
  entry: {
    app: [path.resolve('components/app.jsx')],
  },

  output: {
    publicPath: '/',
    path: path.resolve('build'),
    filename: '[name].js',
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.jsx$/,
        include: path.resolve('components'),
        loader: 'babel?cacheDirectory'
      },
      {
        test: /\.less$/,
        include: path.resolve('less'),
        loader: "style!css!less"
      }
    ]
  },

  resolve: {
    root: path.resolve('./'),
    extensions: ['', '.jsx', '.js']
  }
};