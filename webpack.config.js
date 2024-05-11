// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        mode: 'development',
        entry: './src/entry/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            open: true,
            host: 'localhost',
            port: '8000',
            historyApiFallback: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/entry/index.html',
            }),

            new webpack.DefinePlugin({
                API_URL: JSON.stringify(env.apiurl),
            }),

            // Add your plugins here
            // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
        ],
        module: {
            rules: [
                {
                    test: /\.ts$|tsx/,
                    loader: 'ts-loader',
                    exclude: ['/node_modules/'],
                },
                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    exclude: ['/node_modules/'],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: ['/node_modules'],
                },
                {
                    test: /\.png$/,
                    type: 'asset/resource'
                },
                {
                    test: /\.jpg$|.gif/,
                    type: 'asset',
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }

                // Add your rules for custom modules here
                // Learn more about loaders from https://webpack.js.org/loaders/
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.jpg', '.png', '.gif'],
        },
    };
}