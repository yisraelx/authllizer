import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'path';
import * as webpack from 'webpack';

const ROOT: string = __dirname;
const SRC: string = join(ROOT, 'src');
const DEST: string = join(ROOT, 'dist');

export default {

    mode:  process.env.NODE_ENV || 'development',

    devtool: 'inline-source-map',

    context: SRC,

    target: 'electron-renderer',

    entry: {
        main: './main.tsx'
    },

    output: {
        path: DEST,
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
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
                exclude: [join(SRC, 'index.html')],
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts'
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images'
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'favicon.ico'
        }),
        new CopyWebpackPlugin([{
            from:  'assets',
            to: 'assets'
        }]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NormalModuleReplacementPlugin(/\.\/\environments\/environment/, (result) => {
            let env: string = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
            result.request = result.request.replace(/\.\/\environments\/environment/, `./environments/environment.${ env }.ts`);
        })
    ],

    optimization: {
        namedModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all'
                }
            }
        }
    },

    devServer: {
        contentBase: DEST,
        historyApiFallback: true,
        port: 8080,
        open: false,
        hot: true
    }

} as webpack.Configuration;
