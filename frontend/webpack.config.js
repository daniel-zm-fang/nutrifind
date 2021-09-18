const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/popup.js',
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: 'src/popup.html',
            filename: 'popup.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './src/background.js' },
                { from: './src/content.js' }
            ],
        })
    ],
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname, 'dist'),
    },
};