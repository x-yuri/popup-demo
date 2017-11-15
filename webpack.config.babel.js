import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

let customPropertiesPlugin;

function runningUnderWebpackDevServer() {
    return path.relative('', require.main.filename)
        == 'node_modules/webpack-dev-server/bin/webpack-dev-server.js';
}

function getFrontEndVars() {
    if ( ! fs.existsSync('assets/front-end-vars.js'))
        return {};
    const name = './assets/front-end-vars.js';
    delete require.cache[require.resolve(name)];
    const r = require(name).default;
    return r;
}

function dirHas(dir, p) {
    const relative = path.relative(dir, p);
    return !!relative && relative.split(path.sep)[0] != '..';
}

class ExtraDependenciesPlugin {
    constructor(options) {
        this._options = options;
    }

    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            compilation.plugin('succeed-module', module => {
                if (module.resource
                && dirHas(this._options['include'], module.resource)
                && this._options['test'].test(module.resource)
                && module.fileDependencies.indexOf(this._options['dependency']) == -1
                ) {
                    module.fileDependencies.push(this._options['dependency']);
                }
            });
        });
    }
}

class OnInvalidCompilationPlugin {
    constructor(callback) {
        this._callback = callback;
    }

    apply(compiler) {
        compiler.plugin('invalid', () => {
            this._callback();
        });
    }
}

module.exports = {
    entry: './assets/index.js',
    // entry: './assets/1.js',

    output: {
        path: path.resolve('dist'),
        filename: '[name]-[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('assets'),
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        ['env', {modules: false}],
                    ],
                },
            },
            {
                test: /\.(png|jpg|woff|woff2)$/,
                include: path.resolve('assets'),
                loader: 'file-loader',
                options: {
                    name: '[path][name]-[hash].[ext]',
                },
            },
            {
                test: /\.css$/,
                include: path.resolve('assets'),
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('postcss-import'),
                                    (customPropertiesPlugin = require('postcss-custom-properties')({
                                        variables: getFrontEndVars(),
                                    })),
                                    require('postcss-image-sizes'),
                                    require('postcss-calc'),
                                    require('postcss-nesting'),
                                    require('postcss-custom-selectors'),
                                    require('postcss-color-gray'),
                                    require('postcss-color-hex-alpha'),
                                    require('postcss-color-function'),
                                    require('postcss-pseudoelements'),
                                    require('postcss-selector-matches'),
                                    require('postcss-mixins'),
                                    require('autoprefixer'),
                                ],
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
        ],
    },

    devtool: 'source-map',

    plugins: [
        new ExtractTextPlugin('[name]-[contenthash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module =>
                module.context.startsWith(path.resolve('node_modules')),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(Object.assign({
            template: 'template.html',
        }, runningUnderWebpackDevServer() ? {
            filename: 'index.html',
        } : {
            filename: '../index.html',
        })),
        new ExtraDependenciesPlugin({
            test: /\.css$/,
            include: path.resolve('assets'),
            dependency: 'assets/front-end-vars.js',
        }),
        new OnInvalidCompilationPlugin(() => {
            customPropertiesPlugin.setVariables(getFrontEndVars());
        }),
    ],
};
