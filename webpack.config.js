const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
  },
  entry: [
    'babel-polyfill',
    './src/client/index.tsx'
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel']
            }
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              reportFiles: [
                'src/client/**/*'
              ],
              configFileName: './src/client/tsconfig.json'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local])))[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg(\?.*)?$/i,
        use: [
          'svg-url-loader',
          'svg-transform-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'bundle_[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public/index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    contentBase: '/dist/client',
    hot: true
  },
  devtool: 'eval'
}
