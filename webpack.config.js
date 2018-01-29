const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelConfig = {
    presets: ['env'],
    plugins: ['transform-object-rest-spread']
};

module.exports = {
    context: __dirname,

    entry: './src/index.js',

    target: "electron-renderer",

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },

    devtool: 'inline-source-map',

    devServer: {
        contentBase: path.resolve(__dirname, 'build')
    },

    watch: true,

    resolve: {
        enforceExtension: false,
        extensions: ['.vue', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    cssSourceMap: false,
                    loaders: {
                        stylus: (
                            'vue-style-loader!' +
                            'css-loader!' +
                            'stylus-loader?resolve url&paths=' + __dirname
                        ),
                        js: 'babel-loader?' + JSON.stringify(babelConfig),
                    },
                },
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: babelConfig,
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
};