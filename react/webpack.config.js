/**
 * Created by feichongzheng on 16/12/7.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {

    devtool: 'eval-source-map',
    entry:  __dirname + "/src/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },

    module: {//在配置文件里添加JSON loader
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
                loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!postcss'//添加对样式表的处理
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            //SASS需要根据本地机器环境安装
            // {
            //     test: /\.sass/,
            //     loader: 'style!css!sass'
            // },
            // {
            //     test: /\.scss/,
            //     loader: 'style!css!sass'
            // },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
        ],
        postLoaders: [
            {
                test: /\.js$/,
                loaders: ['es3ify-loader'],
            },
        ]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],

    plugins: [
        // new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
        new CopyWebpackPlugin([
            {from: __dirname + '/src/assets', to: __dirname+"/public/assets"},
            {from: __dirname + '/src/favicon.ico', to: __dirname +'/public/favicon.ico'},
            {from: __dirname + '/src/faylogin.html', to: __dirname +'/public/faylogin.html'},
        ]),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        // new webpack.HotModuleReplacementPlugin()//热加载插件（IE8下调试须注释掉）
    ],

    devServer: {
        outputPath: path.join(__dirname, 'public'),
        host: "0.0.0.0",//本地IP和localhost都可以用
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        port: "3000",
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
}