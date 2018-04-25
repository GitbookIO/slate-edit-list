/* eslint-disable import/no-commonjs */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const NamedModulesPlugin = webpack.NamedModulesPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_DEV = !IS_PROD;

const config = {
    entry: ['react-hot-loader/patch', './example/main.js'],
    output: {
        path: path.resolve(__dirname, '../../example'),
        filename: 'build/bundle.js'
    },
    devtool: IS_PROD ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: './examples',
        publicPath: '/',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'webpack'
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]-[contenthash].css'),
        new HtmlWebpackPlugin({
            title: 'Slate • List Edition',
            template: HtmlWebpackTemplate,
            inject: false,
            links: [
                'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"'
            ]
        }),
        IS_PROD && new UglifyJSPlugin({ sourceMap: true }),
        IS_DEV && new NamedModulesPlugin(),
        IS_DEV && new HotModuleReplacementPlugin()
    ].filter(Boolean)
};

module.exports = config;
