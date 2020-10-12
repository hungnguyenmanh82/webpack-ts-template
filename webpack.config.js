const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    title: 'App-Name',
    template: './src/index.html',
  }),
];

var config = {
  entry: {
    app: './src/index.ts',
  },

  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        /* chỗ này đã bao gồm *.tsx, *.ts */
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: plugins,
};

module.exports = config;
