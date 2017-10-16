const merge = require('webpack-merge');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    index: './src/index.ts',
    'index.min': './src/index.ts',
    inputBuilder: './src/inputBuilder.tsx',
    'inputBuilder.min': './src/inputBuilder.tsx'
  },
  plugins: [
    new UglifyJSPlugin({sourcemap:true,minimize: true,include: /\.min\.js$/}),
		new webpack.DefinePlugin({
			'process.env': {
			  'NODE_ENV': JSON.stringify('production')
		  }
    })
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
    'mongodb':'commonjs mongodb',
    'express':'commonjs express'
  }
});
