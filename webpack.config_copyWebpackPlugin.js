/**
 * import theo cú pháp ES5
 * đổi sang ES6 ko run dc
 */
const path = require('path');
/**
 * CleanWebpackPlugin sẽ xóa folder trc khi build lại
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
/**
 * ko nên dùng HtmlWebpackPlugin phức tạp (vì add *.css, *.js còn phải xác định ở header hay body của template *.html file)
 * nên dùng CopyWebpackPlugin để chủ động add *.html file vào output folder khi build
 *   https://github.com/webpack-contrib/copy-webpack-plugin
 * ----
 * to: '.' là folder output
 * from: copy theo đúng cấu trúc folders. chỉ search *.html trong context folder thôi
 */
const plugins = [
  new CleanWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      {
        context: './src/',
        from: '**/*.html',
        to: '.',
        force: true,
      },
    ],
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
      /** FileLoader sẽ ko add file vào webpack, mà lúc build nó sẽ đổi tên và add vào folder “/dist”. */
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

/**
 * export theo cú phaps ES5
 * đổi sang ES6 ko run ddc
 *
 */
module.exports = config;
