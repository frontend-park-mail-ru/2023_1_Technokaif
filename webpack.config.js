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
                    <title>Fluire</title>
                    <link rel="shortcut icon" type="image/jpg" href="./static/svg/whiteLogo.svg">
                </head>
                <body>
                    <div id="root"></div>
                    <div id="player__placement"></div>
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
                {
                    from: 'public/utils/sw/serviceWorker.js',
                    to: '.',
                },
            ],
        }),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }],
                        ],
                    },
                },
            },
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
        fallback: {
            path: require.resolve('path-browserify'),
        },
    },
};
