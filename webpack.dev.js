const { join } = require('path');

const autoPrefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const timestamp = new Date().getTime();
const publicPath = '/'; //for github page

module.exports = {
  cache: true,
  devServer: {
    compress: false,
    contentBase: join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    overlay: true,
    writeToDisk: false,
  },
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './src/index.tsx',
  },
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'html-loader',
        options: {
          attrs: ['img:src', 'link:href'],
        },
        test: /\.html$/u,
      },
      {
        test: /\.tsx?$/u,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              experimentalFileCaching: true,
              experimentalWatchApi: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/u,
        use: [
          'react-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoPrefixer()],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: `[name].[hash].bundle.js?_=${timestamp}`,
    pathinfo: true,
    publicPath: publicPath,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      dry: false,
      protectWebpackAssets: true,
      verbose: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: false,
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/u,
  },
};
