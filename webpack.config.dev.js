var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './public/assets'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: {
          loader: ['babel-loader'],
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            byPassOnDebug: true
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 40000},
          },
          {
            loader: 'image-webpack-loader',
            options: { byPassOnDebug: true }
          }
        ]
      }

    ]
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  //增加一個給devserver的設定
  devServer: {
    //指定開啟port為9000
    port: 9000
  }
}
