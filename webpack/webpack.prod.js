const merge = require('webpack-merge');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    index: './src/index.ts',
    'index.min': './src/index.ts'
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
   'react': 'commonjs react', 
   'react-dom':'commonjs react-dom',
   'mongodb':'commonjs mongodb'
  }
});
