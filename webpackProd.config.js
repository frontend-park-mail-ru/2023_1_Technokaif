/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, 'public', 'index.ts'),
        Router: path.resolve(__dirname, 'public/router', 'Router.ts'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            templateContent: `
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>Fluire</title>
                    <link rel="manifest" href="/manifest.json">
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
                    from: './public/static/svg',
                    to: './static/svg',
                },
                {
                    from: './public/static/img/icons',
                    to: './static/img/icons',
                },
                {
                    from: 'public/utils/sw/serviceWorker.js',
                    to: '.',
                },
                {
                    from: 'manifest.json',
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
                test: /\.svg$/,
                use: [
                    'file-loader',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeTitle: true },
                                { removeComments: true },
                                { removeDesc: true },
                                { removeMetadata: true },
                                { removeUselessDefs: true },
                                { removeEditorsNSData: true },
                                { removeEmptyAttrs: true },
                                { removeHiddenElems: true },
                                { removeEmptyText: true },
                                { removeEmptyContainers: true },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'defaults',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
                exclude: /node_modules/,
                options: {
                    helperDirs: [path.resolve(__dirname, 'public/utils/helpers/')],
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                exclude: /node_modules/,
                options: {
                    helperDirs: [path.resolve(__dirname, 'public/utils/helpers/')],
                },
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    postcssPresetEnv(),
                                ],
                            },
                        },
                    },
                    'less-loader',
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js',
            // todo remove when will be in ts
            '@components': path.resolve(__dirname, 'public/components'),
            '@smallComponents': path.resolve(__dirname, 'public/components/smallComponents'),
            '@bigComponents': path.resolve(__dirname, 'public/components/bigComponents'),
            '@router': path.resolve(__dirname, 'public/router'),
            '@api': path.resolve(__dirname, 'public/api'),
            '@actions': path.resolve(__dirname, 'public/actions'),
            '@dispatcher': path.resolve(__dirname, 'public/dispatcher'),
            '@modules': path.resolve(__dirname, 'public/modules'),
            '@config': path.resolve(__dirname, 'public/utils/config'),
            '@setup': path.resolve(__dirname, 'public/utils/setup'),
            '@functions': path.resolve(__dirname, 'public/utils/functions'),
            '@views': path.resolve(__dirname, 'public/views'),
            '@store': path.resolve(__dirname, 'public/stores'),
            '@svg': path.resolve(__dirname, 'public/static/svg'),
            '@API': path.resolve(__dirname, 'public/actions/Api'),
            '@Actions': path.resolve(__dirname, 'public/actions/Actions'),
        },
        fallback: {
            path: require.resolve('path-browserify'),
        },
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: { drop_console: true },
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.sharpMinify,
                    options: {
                        encodeOptions: {
                            jpeg: {
                                // https://sharp.pixelplumbing.com/api-output#jpeg
                                quality: 100,
                            },
                            webp: {
                                // https://sharp.pixelplumbing.com/api-output#webp
                                lossless: true,
                            },
                            // png by default sets the quality to 100%, which is same as lossless
                            // https://sharp.pixelplumbing.com/api-output#png
                            png: {},
                        },
                    },
                },
            }),
        ],
        usedExports: true,
        minimize: true,
        removeEmptyChunks: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'node_vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
                functions: {
                    name: 'utils',
                    test: /[\\/]utils[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                apiRequests: {
                    name: 'apiRequests',
                    test: /[\\/]api[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                actions: {
                    name: 'actions',
                    test: /[\\/]actions[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                dispatcher: {
                    name: 'dispatcher',
                    test: /[\\/]dispatcher[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
                stores: {
                    name: 'stores',
                    test: /[\\/]stores[\\/]/,
                    chunks: 'all',
                    minSize: 0,
                },
            },
        },
    },
};
