const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000,
        ignored: /node_modules/,
    },
    devServer: {
        historyApiFallback: true,
    },
    entry: path.resolve(__dirname, 'public', 'index.js'),
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <title>Fluir</title>
                    <link rel="shortcut icon" type="image/jpg" href="./static/svg/whiteLogo.svg">
                </head>
                <body>
                    <div id="root"></div>
                </body>
                </html>
            `,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './public/static',
                    to: './static',
                },
            ],
        }),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.less$/i,
                use: [
                // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
        },
    },
};
