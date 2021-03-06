const {resolve} = require('path');
const {
  DefinePlugin,
  NamedModulesPlugin,
  HashedModuleIdsPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  optimize: {
    CommonsChunkPlugin,
    ModuleConcatenationPlugin,
  },
} = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeJSPlugin = require('optimize-js-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const {extract} = ExtractTextPlugin;

const src = 'src';
const dest = 'app';
const clean = [dest];
const copy = [
  {
    from: 'static',
  },
];

module.exports = ({dev} = {}) => {
  const env = dev ? 'development' : 'production';

  return {
    devtool: dev ? 'eval-source-map' : 'hidden-source-map',
    entry: [
      ...dev ? ['react-hot-loader/patch'] : [],
      `./${src}/index.jsx`,
    ],
    output: {
      path: resolve(__dirname, dest),
      filename: `[name]${dev ? '' : '.[chunkhash]'}.js`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: resolve(__dirname, src),
          loader: 'babel-loader',
          options: {
            cacheDirectory: dev,
            forceEnv: env,
          },
        },
        {
          test: /\.css$/,
          include: resolve(__dirname, src),
          use: extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new CleanPlugin(clean),
      new CopyPlugin(copy),
      new HTMLPlugin({
        template: `${src}/template.ejs`,
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        },
      }),
      new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        allChunks: true,
        disable: dev,
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks(module) {
          return module.context && module.context.includes('node_modules');
        },
      }),
      new CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity,
      }),
      ...dev
        ? [
          new NamedModulesPlugin(),
          new HotModuleReplacementPlugin(),
          new BundleAnalyzerPlugin({
            analyzerHost: '0.0.0.0',
            openAnalyzer: false,
          }),
        ]
        : [
          new HashedModuleIdsPlugin(),
          new NoEmitOnErrorsPlugin(),
          new ModuleConcatenationPlugin(),
          new BabelMinifyPlugin(),
          new OptimizeJSPlugin(),
          new OfflinePlugin(),
        ],
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
  };
};
