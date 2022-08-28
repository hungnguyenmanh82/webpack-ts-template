/**
 * import theo cú pháp ES5  => có thể đổi theo cú pháp ES6 vẫn ok
 * Nếu có lỗi thì xem lại config của ESlintrc.json => đổi sang ES6
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * HtmlWebpackPlugin: sẽ loại bỏ comment và ký tự thừa ở html file, sau đó insert *.bundle.js ở mục Entry vào *.html
 * Mô hình Single Page App thì file *.bundle.js  thường chèn vào body của *.html và cũng chỉ có 1 file *.js cần chèn vào thôi
 * file *.js này chứa cả javaScript và CSS.
 *    https://stackoverflow.com/questions/39798095/multiple-html-files-using-webpack
 * -----
 * chunks: là tên Entry khai báo các *.js cần webpack bundle
 */
let htmlPageNames = ['test1', 'test2'];
let multipleHtmlPlugins = htmlPageNames.map((name) => {
  let templateFile = './src/' + name + '/' + name + '.html';
  let filename = name + '/' + name + '.html';
  let jsName = './src/' + name + '/' + name + '.html';
  return new HtmlWebpackPlugin({
    template: templateFile, // relative path to the HTML files
    filename: filename, // output HTML files
    chunks: [name], // respective JS files
    inject: 'body',
  });
});

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html',
    chunks: ['index'],
    inject: 'body',
  }),
].concat(multipleHtmlPlugins); // concat là add thêm phần tử vào Array

/**
 * index, test1, test2: =[name] ở mục output khi bundle bởi webpack
 */
var config = {
  entry: {
    index: './src/index.ts',
    test1: {
      import: './src/test1/test1.ts',
      library: {
        /**
         * sẽ dùng 'MyLibrary.functionName()' để gọi tới functin của thư viện
         * ở file *.ts cần phải export các function và Variable thì mới đc
         * ---
         * Nếu ko khai báo cách này thì webpack khi build *.js sẽ ra empty file
         */
        name: 'MyLibrary',
        type: 'umd',
        umdNamedDefine: true,
      },
    },
    test2: './src/test2/test2.ts', // file này sẽ bị empty, phải khai báo giống 'test1' thì mới đc
  },
  /**
   * Vấn đề của Http LastModified và Etag: là nó thiết lập cho 1 nhóm folder, file.
   *  Nếu ta chỉ thay đổi 1 file trong đó mà phía server lại phải thay đổi Etag, lastModified chung thì toán bộ dữ liệu cache browser sẽ đc load lại.
   * Giải pháp là khi có thay đổi ở CSS, js, image... ta sẽ đổi tên của nó.
   * Như vậy Browser sẽ bắt buộc phải load lại các file này.
   * Đây là lý do tại sao Angular, wepack.. cung cấp giải pháp đổi tên CSS, js khi build.
   * File *.html thường chứa data động vì thế sẽ ko cache ở browser. Nhưng vẫn cache ở server.
   * ------
   * [name] : là tên của javascript file ở mục Entry
   * [hash:8], [chunkhash], [fullhash] : là 1 chuỗi random 8 ký tự (default = 20)
   * ------
   * Mô hình Single Page App thì file *.bundle.js  thường chèn vào body của *.html và cũng chỉ có 1 file *.js cần chèn vào thôi
   * file *.js này chứa cả javaScript và CSS.
   * -----
   * https://webpack.js.org/configuration/output/
   */
  output: {
    path: path.resolve('./dist'),
    filename: '[name].[chunkhash:8].js',
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
 * export theo cú phaps ES5 => đổi sang ES6 ko run ddc
 */
module.exports = config;
