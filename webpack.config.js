const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

// func
function optimization() {
  const config = { splitChunks: { chunks: 'all' } };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
}

function filename(fileExt) {
  return isDev ? `[name].${fileExt}` : `[name].[hash].${fileExt}`;
}

function cssLoaders(loader) {
  const loaders = [];

  loaders.push({
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reload: true,
    },
  });

  loaders.push('css-loader');

  if (loader) loaders.push(loader);

  return loaders;
}

function babelOptions(preset) {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) options.presets.push(preset);

  return options;
}

function jsLoaders() {
  const loaders = [];

  loaders.push({
    loader: 'babel-loader',
    options: babelOptions(),
  });

  if (isDev) loaders.push('eslint-loader');

  return loaders;
}

function getPlugins() {
  const plugins = [];

  plugins.push(
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      filename: 'index.html',
      minify: { collapseWhitespace: isProd },
      favicon: './src/assets/images/favicon.ico',
    })
  );

  plugins.push(new CleanWebpackPlugin());

  plugins.push(
    new MiniCssExtractPlugin({
      filename: filename('css'),
    })
  );

  return plugins;
}

// config
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        },
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
};
