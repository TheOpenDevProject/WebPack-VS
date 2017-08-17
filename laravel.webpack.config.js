let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//^^ Makes available your npm package.json deps to webpack (The ones you do npm -i package-name --save-dev)
module.exports = {

    entry: {
        main: './src/js/index.js', //Your sites Javscript entry point
        styles: './src/scss/style.js' //Your sites styles entry point (This is usually a one liner for scss, require('./pathtosite.scss'))
                                      //This gives webpack an entry point for SCSS etc..
    },
    output: {
        filename: "[name].index.js", //Your naming convention for bundled files
        sourceMapFilename: '[file].map', //Source maps you see in the browser for debug purposes
        path: __dirname + '/build/', //Build directory

    },
    module: {
      //Loaders are modules that NPM passes a specific file to (based on the test) to be processed.
      //For example this config passes all.js files minus the excluded to be procesesd into ES5
        loaders: [{
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            },
            //This is the extract text plugin loader, it takes our SCSS, runs it through css-loader,postcss and sass loader
            // then outputs it to a plain .css file instead of webpacks default bundle option which is into the index.js build
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' })
            },
        ]
    },





    devtool: 'source-map',
    //Plugins give you build time extensions, normally modifying webpack behaviour..
    // Ignore plugin makes sure certain folders are excluded from webpacks searches
    // Finally for laravel we copy all our results back to Laravels public directory so its ready for use.
    // This is quite powerful because we can really do anything here without any manual handling
    plugins: [
        new webpack.IgnorePlugin(/locale/, /moment$/),
        new ExtractTextPlugin("/css/style.css"),
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new CopyWebpackPlugin([ 
            { from: 'src/assets/', to: '../../public/assets/' },
            {from: 'build/css/style.css', to: '../../public/css/style.css' },
            {from: 'build/main.index.js', to: '../../public/js/app.js' }
        ])
    ]
};
