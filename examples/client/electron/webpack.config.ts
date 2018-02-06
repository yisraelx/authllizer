import * as webpack from 'webpack';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

export = {
    devtool: 'source-map',
    context: root('src'),
    target: 'electron-renderer',
    entry: {
        'main': root('src', 'main.tsx')
    },
    output: {
        path: root('build'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.html'],
        alias: {}
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [root('src', 'index.html')]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images'
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: root(),
            verbose: false,
            dry: false
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: root('src', 'index.html'),
            favicon: root('src', 'favicon.ico')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new CopyWebpackPlugin([{
            from: root('src', 'assets'),
            to: './assets'
        }]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\.\/\environments\/environment/, (result) => {
            let env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
            result.request = result.request.replace(/\.\/\environments\/environment/, `./environments/environment.${env}.ts`);
        })
    ],

    stats: {
        colors: {
            green: '\u001b[32m'
        }
    },

    devServer: {
        contentBase: root('src'),
        historyApiFallback: true,
        port: 8080,
        open: false,
        compress: false,
        inline: true,
        hot: true,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m'
            }
        }
    }
};

function root(...args) {
    return path.join(__dirname, ...args);
}
