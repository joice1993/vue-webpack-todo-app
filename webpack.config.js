const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');//把非javascript的代码单独打包成一个文件

const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: "web",
    mode: 'development',
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-a.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"productiondev"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
}

if(isDev) {
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    });
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port: 8080,
        host: '0.0.0.0',
        overlay: {
            errors: true,
        },
        hot: true
        // open: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    };//单独打包类库文件
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // })// 将类库文件单独打包出来,webpack4不支持，换optimization和runtimeChunk解决

        // webpack相关的代码单独打包
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime'
        // })
    );
    config.optimization = {
        splitChunks: {
            cacheGroups: {                  // 这里开始设置缓存的 chunks
                commons: {
                    chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    minSize: 0,             // 最小尺寸，默认0,
                    minChunks: 2,           // 最小 chunk ，默认1
                    maxInitialRequests: 5   // 最大初始化请求书，默认1
                },
                vendor: {
                    test: /node_modules/,   // 正则规则验证，如果符合就提取 chunk
                    chunks: 'initial',      // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendor',         // 要缓存的 分隔出来的 chunk 名称
                    priority: 10,           // 缓存组优先级
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }
}

module.exports = config;

