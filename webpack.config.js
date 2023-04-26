// todo https://github.com/orgs/frontend-park-mail-ru/projects/1/views/1?pane=issue&itemId=25985431
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    entry: path.resolve(__dirname, 'public', 'index.ts'),
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
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
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
        extensions: ['.tsx', '.ts', '.js'],

    },
};
