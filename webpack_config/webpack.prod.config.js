const path = require('path');
const Webpack = require('webpack');
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin');
const shelljs = require('shelljs')
const vars = require('./variables');
const graphs = require('./graphs')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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

                use: ExtractTextWebapckPlugin.extract({
                    fallback:"style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options:{
                                minimize: process.env.NODE_ENV === 'production'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options:{
                                plugins: (loader) => [
                                    require('autoprefixer')()
                                ]
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
                })
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
            filename: `${vars.static_css_root}/[name].[chunkhash:8].css`,
            allChunks: false,
        }),
    ],             // 对应的插件
    devServer: {},           // 开发服务器配置
    mode: 'development',      // 模式配置
    optimization: {           //代码拆分
        runtimeChunk: false,
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 1,
                    priority: -10,
                    name: 'vendors'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'common'
                }
            }
        }
    }
}

//clean
shelljs.rm('-rf', config.output.path)
shelljs.mkdir('-p', config.output.path)


config.mode = 'production'
config.output.publicPath = vars.prod_publicPath
config.output.filename = `${vars.static_js_root}/[name].[chunkhash:8].js`

config.plugins.push(new BundleAnalyzerPlugin());

console.log('production: ')
console.log(config)

Webpack(config, function (err, stats) {
    if(err){
        console.log(err)
        throw err
    }
    console.log(stats.toString({
        entrypoints: false,
        children: false,
        chunks: false,  // 使构建过程更静默无输出
        colors: true,    // 在控制台展示颜色
        modules: false,
        chunkModules: false
    }))
})