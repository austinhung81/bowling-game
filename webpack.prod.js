const path = require('path');

const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const timestamp = new Date().getTime();
const publicPath = '/bowling-game/'; //for github page

module.exports = {
  cache: true,
  entry: {
    app: './src/index.tsx',
  },
  mode: 'production',
  output: {
    filename: `[name].[hash].bundle.js?_=${timestamp}`,
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
    publicPath: publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/u,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoPrefixer()],
            },
          },
        ],
      },
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
  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css?_=${timestamp}`,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        removeComments: true,
      },
      template: 'src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    nodeEnv: 'production',
  },
};
