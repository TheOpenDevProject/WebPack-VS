/// <binding BeforeBuild='Run - Development' />
'use strict';
let ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
module.exports = {
    context : __dirname + "/",
    entry: {
        core: './scripts/app/index.js',
        styles : './styles/build.js'
    },
    output: {
        filename: "[name].index.js",
        path : __dirname + '/assets/'
    },
    module: {
        loaders: [
          {
              test: /\.js?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                  presets: ['es2015']
              }
          },
		  {
			test: /\.scss$/, 
			loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
				
		 }
        ]
    },
	plugins: [
			new ExtractTextPlugin("../assets/style.css")
		]
};
