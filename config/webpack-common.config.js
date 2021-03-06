'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, '../src');

const cssLoader = [
    'css-loader?' + ['localIdentName=[local]__[hash:base64:4]', 'modules', 'importLoaders=1', 'sourceMap'].join('&'),
    'postcss-loader'
].join('!');

module.exports = {
    entry: {
        main: './src/main.js',
        vendor: './src/vendor.js'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: SRC_PATH
            }
        ],

        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                include: SRC_PATH
            },
            {
                // Transform our own .css files using PostCSS and CSS-modules
                test: /\.css$/,
                include: SRC_PATH,
                loader: ExtractTextPlugin.extract({
                    notExtractLoader: 'style-loader',
                    loader: cssLoader
                })
            },
            {
                // Do not transform vendor's CSS with CSS-modules
                test: /\.css$/,
                include: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    notExtractLoader: 'style-loader',
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file',
                query: {
                    name: '[name].[hash].[ext]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url',
                query: {
                    name: '[name].[hash].[ext]',
                    limit: 25000,
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    resolve: {
        modules: [SRC_PATH, 'node_modules'],
        extensions: ['', '.js', '.jsx', '.json']
    },

    // Process the CSS with PostCSS
    postcss: () => [
        require('precss')(),
        require('postcss-cssnext')({
            browsers: ['last 2 versions', 'ie > 10']
        }),
        require('postcss-reporter')({ // Posts messages from plugins to the terminal
            clearMessages: true
        })
    ],

    plugins: [
        new HtmlPlugin({
            title: 'React Redux Seed',
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true
        }),
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        })
    ]
};
