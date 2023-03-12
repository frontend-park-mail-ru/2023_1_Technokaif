const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'public', 'index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, 'public', 'index.html'),
            templateContent: `
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Fluir</title>
                    <link rel="shortcut icon" type="image/jpg" href="./static/svg/whiteLogo.svg"/>
                </head>
                <body>
                    <div id="root"></div>
                </body>
                </html>
            `,
        }),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js', // TODO can write .[contenthash] for auto reload
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
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
                // exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.svg$/,
                type: 'asset',
                loader: 'svgo-loader',
            },
        ],
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
};
