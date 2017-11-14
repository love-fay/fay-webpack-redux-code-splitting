/**
 * Created by feichongzheng on 16/12/7.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin'); //清理文件夹
// var path = require('path');

module.exports = {
    entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/dist",
        filename: "[name]-[hash].js"
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader'],
            },
        ]
    },
    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        //清空输出目录
        new CleanPlugin(['dist'], {
            "root": __dirname,
            "verbose": true,
            "dry": false
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets', to: __dirname+"/dist/assets"},
            {from: __dirname + '/src/favicon.ico', to: __dirname +'/dist/favicon.ico'},
        ]),
        new webpack.optimize.UglifyJsPlugin()
    ]
}