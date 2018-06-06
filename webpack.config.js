const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// NOTE: React code is in ./src/client/
const srcPath = path.join(__dirname, 'src', 'client');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      srcPath,
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.(ttf|eot|svg|woff|png|woff2)(\?[a-z0-9]+)?$/, // fonts files
      //   loader: 'url-loader?name=[path][name].[ext]',
      // },
      {
        test: /\.(html)$/, // copy index.html to dist
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(png)$/, // copy favicon.png to dist
        loader: 'file-loader?name=assets/[name].[ext]',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { verbose: true }),
  ],
};
