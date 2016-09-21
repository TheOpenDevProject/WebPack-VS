/// <binding BeforeBuild='Run - Development' />
"use strict";
var path = require('path');
var jQuery = require('jQuery');
module.exports = {
    context: __dirname + "/Scripts",
    entry: {
        ExampleB: './ExampleUserCode/index.js',
        ExampleA: './ExampleUserCodeB/index.js',
        vendor: ["jQuery"]
    },
    output: {
        filename: "[name].index.js",
        path: __dirname + '/Scripts/Build'
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
          }
        ]
    },
    plugins: [
         new webpack.ProvidePlugin({
            jQuery : "jQuery"
        }),
        new webpack.IgnorePlugin(/locale/, /moment$/),
        new webpack.optimize.CommonsChunkPlugin("vendor","vendor_libs.js")
        
    ]
};
