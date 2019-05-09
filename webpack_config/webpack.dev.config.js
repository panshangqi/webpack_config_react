const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const Webpack = require('webpack');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
const vars = require('./variables');
const graphs = require('./graphs')
var insert_htmls = []
var final_proxy = {
    "/api/*":{
        target:"http://10.200.3.16:3202",
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
        secure: false, // 接受 运行在 https 上的服务
    }
}
var config = {
    entry: graphs.entries,               // 入口文件
    output: {   // 出口文件
        path: vars.dist_root,
        filename: 'bundle.js'
    },
    resolve:{
        extensions: ['.js','.jsx','.json'],
        alias:{
            '@components': vars.components_root,
            '@pages': vars.pages_root,
            '@imgs': vars.imgs_root
        }
    },
    module: {// 处理对应模块
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: "pre",
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["env","react"],
                            plugins: [
                                ["import",
                                    {
                                        "libraryName": "antd",
                                        "libraryDirectory": "es",
                                        "style": true
                                    }
                                ],
                                ["transform-decorators-legacy"],
                                ["transform-runtime"]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextWebapckPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options:{
                            minimize: process.env.NODE_ENV === "production"
                        }
                    }],
                    publicPath: '../'  //解决css背景图片路径问题
                })
            },
            {
                test: /\.less$/,
                use: [ //不使用ExtractTextWebapckPlugin css文件分离，热更新less文件
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options:{
                            minimize: process.env.NODE_ENV === 'production'
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,
                            globalVars:{
                                'theme_color': '#FF9647',
                                'theme_red': '#FF796B',
                                'theme_green': '#13D469',
                                'img_root': '/static/imgs'
                            }
                        }
                    }
                ]
                // use: ExtractTextWebapckPlugin.extract({
                //     fallback:"style-loader",
                //     use: [
                //         {
                //             loader: "css-loader",
                //             options:{
                //                 minimize: process.env.NODE_ENV === 'production'
                //             }
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options:{
                //                 plugins: (loader) => [
                //                     require('autoprefixer')()
                //                 ]
                //             }
                //         },
                //         {
                //             loader: "less-loader",
                //             options: {
                //                 javascriptEnabled: true,
                //                 globalVars:{
                //                     'theme_color': '#FF9647',
                //                     'theme_red': '#FF796B',
                //                     'theme_green': '#13D469',
                //                     'img_root': '/static/imgs'
                //                 }
                //             }
                //         }
                //     ]
                // })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options:{
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                exclude: /(node_modules)/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    plugins: [
        ...graphs.html_plugins,
        new ExtractTextWebapckPlugin({
            filename: `./[name].[hash:8].css`,
            allChunks: false,
        }),
    ],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development'      // 模式配置
}
config.mode = 'development'
config.output.publicPath = vars.dev_publicPath
config.output.filename = './[name].hash:8].js'
config.devtool = 'cheap-module-source-map';
for(let p in config.entry){
    //config.entry[p] = [`webpack-dev-server/client?http://localhost:${vars.port}/`, config.entry[p],`${vars.pages_root}\\Home\\style.less`];
    //config.entry[p] = ['webpack/hot/dev-server',`webpack-dev-server/client?http://localhost:${vars.port}/`,config.entry[p]]
    config.entry[p].unshift(`webpack-dev-server/client?http://localhost:${vars.port}/`)
    config.entry[p].unshift(`webpack/hot/dev-server`)
}
config.plugins.push(new Webpack.HotModuleReplacementPlugin());
config.plugins.push(new Webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"'
}))
config.plugins.push(new Webpack.NoEmitOnErrorsPlugin());

var compiler = Webpack(config);
console.log('development: ')
console.log(config)
var server = new WebpackDevServer(compiler, {
    inline: true,                //设置为true，当源文件改变的时候会自动刷新
    contentBase: vars.dist_root, //默认webpack-dev-server会为根文件夹提供本地服务器
    hot: true,                   //允许热加载
    hotOnly: true,               //当编译失败时，不刷新页面
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: final_proxy,
    publicPath: vars.dev_publicPath,
    overlay: true,                     //用来在编译出错的时候，在浏览器页面上显示错误
    progress:false,                    //显示打包的进度
    stats: {
        entrypoints: false,
        children: false,
        chunks: false,  // 使构建过程更静默无输出
        colors: true,    // 在控制台展示颜色
        modules: false,
        chunkModules: false
    }

});
for(var name of graphs.graphs){
    console.log(`http://localhost:${vars.port}/templates/${name}.html`)
}

server.listen(vars.port, 'localhost', function () {

});
