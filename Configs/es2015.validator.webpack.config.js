/// <binding BeforeBuild='Run - Development' />
"use strict";
var path = require('path');
var validate = require("validate.js");
var Joi = require('joi-browser');
var webpack = require("webpack");
module.exports = {
    context: __dirname + "/Scripts",
    entry: {
      
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
        //This will give global access to the following plugins. Accessable by their name (Eg. Joi)
        //requires npm install for each plugin.
        new webpack.ProvidePlugin({
            validate: "validate.js",
            Joi: "joi-browser"
            
        }),
        //Specific ignore for moment because we dont use it in the browser.
        new webpack.IgnorePlugin(/locale/, /moment$/)
    ]
};
