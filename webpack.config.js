const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'public', 'index.js'),
    plugins: [
        new HtmlWebpackPlugin({
        }),
    ],
    output: {
        filename: '[name].bundle.js', // TODO can write .[contenthash] for auto reload
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
            },
        ],
    },
};
