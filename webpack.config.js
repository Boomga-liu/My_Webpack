const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('css/all.css'); // 獨立拆分 css 檔案的套件
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');




module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './js/index.js',
    about: './js/about.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js?[hash:8]', // ?[hash:8]為預防快取
  },
  // 該設定可以不用在注入點 import 時加上 "../" 等等的路徑
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/js/object'),
      path.resolve('src/scss'),
      path.resolve('src/images'),
      path.resolve('src/assets'),
      path.resolve('node_modules'),
    ],
    // 可以省略副檔名的設定，避免設定過多
    extensions: ['.js']
  },
  // 將 node_modules 獨立出來打包成vendor
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    },
  },
  module: {
    rules: [
      // 若使用 Html-Webpack-Plugin-template 就不需要搬移 html
      // {
      //   test: /\.html$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name].[ext]'
      //     }
      //   }]
      // },
      // 字型之類的檔案直接透過 file-loader 搬運
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash:8]'
        },
        // 提升打包效率
        include: path.resolve('src/assets'), // include表示哪些目錄中的文件需要進行loader轉換
        exclude: path.resolve('./node_modules') // exclude表示哪些目錄中的文件不需要進行loader轉換
      },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract({
      //     use: ['css-loader', 'postcss-loader']
      //   })
      // },
      // {
      //   test: /\.(sass|scss)$/,
      //   use: extractCSS.extract([
      //     'css-loader',
      //     'postcss-loader',
      //     'sass-loader'
      //   ]),
      //   include: path.resolve('src/scss'),
      //   exclude: path.resolve('./node_modules')
      // },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules')
      },
      // js檔案不一定會只有自己會經過loader有可能node_modules裡面會經過，所以不用設定exclude
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        include: path.resolve('.'), // 設定根目錄所有資料夾
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader', // 轉換 base64
            options: {
              limit: 8192, // 圖片大小KB，當圖片小於轉為 base64
              name: '[path][name].[ext]?[hash:8]'
            },
          },
          {
            loader: 'image-webpack-loader', // 壓縮圖片
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          }
        ],
        include: path.resolve('src/images'),
        exclude: path.resolve('./node_modules')
      }
    ]
  },
  plugins: [
    extractCSS,
    // 專門拿來搬移不會經過 loader 的檔案
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ]),
    // 能設定全域變數的 webpack 插件，非必要盡量不要使用 ProvidePlugin 這個做法
    new webpack.ProvidePlugin({
      $: 'jquery',
      axios: 'axios'
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack前端開發',
      filename: 'index.html', // 輸出檔案名字
      template: 'html/index.html', // 原本的檔案名稱
      viewport: 'width=device-width, initial-scale=1.0',
      // description: 'Webpack前端自動化開發，讓你熟悉現代前端工程師開發的方法',
      // Keywords: 'Webpack前端自動化開發、前端、工程師、線上教學、教學範例',
      chunks: ['vendor', 'index'], // 要加入的js檔案，另外加上獨立打包後的node_modules
    }),
    new HtmlWebpackPlugin({
      title: 'about',
      filename: 'about.html', // 輸出檔案名字
      template: 'html/about.html', // 原本的檔案名稱
      viewport: 'width=device-width, initial-scale=1.0',
      // description: 'Webpack前端自動化開發，讓你熟悉現代前端工程師開發的方法',
      // Keywords: 'Webpack前端自動化開發、前端、工程師、線上教學、教學範例',
      chunks: ['vendor', 'about'], // 要加入的js檔案，另外加上獨立打包後的node_modules
    }),
  ]
}
