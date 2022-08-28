const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', //production
  entry: './src/app.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist/',
    hot: true,
    watchFiles: ['src/*.html'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    assetModuleFilename: 'src/assets/images/[name].[ext]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WeatherApp',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'src/css/[name].min.css',
    }),
  ],
};
