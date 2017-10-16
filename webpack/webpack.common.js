const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');
var webpack = require('webpack');

module.exports = {
	 plugins: [
			new StyleLintPlugin(),
			new CleanWebpackPlugin(['../dist']),
			new ExtractTextPlugin("index.css")		 
	],
   resolve:{
     extensions: ["",".scss", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
   },
   module: {
		preLoaders: [
			{
	   			test: /\.tsx$/,
	   			loader: 'tslint-loader'
	   		}
	   ],
       loaders: [
		   { test: /\.scss$/, loader: ExtractTextPlugin.extract("css-loader!postcss-loader!sass-loader")},
           { test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader!postcss-loader")},		   
           { test: /\.tsx?$/, loader: "awesome-typescript-loader",exclude: /node_modules/,query:{declaration:false} },
           {
               test: /\.(png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
               loader: 'file-loader',
           }
       ]
   },
    devtool: 'source-map',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname,"..", 'dist'),
		library: 'productupload',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		//publicPath: '/'
	}
};
