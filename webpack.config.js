const
    dev = Boolean( process.env.WEBPACK_DEV_SERVER ),
    path = require( 'path' ),
    HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
    MiniCssExtractPlugin = require( 'mini-css-extract-plugin' ),
    { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )

module.exports = {
    stats: {
        children: !dev
    },
    entry: './src/scripts/index.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve( 'dist' ),
    },
    watch: dev,
    devtool: dev ? 'inline-source-map' : false,
    devServer: {
        contentBase: path.resolve( 'dist' ),
        https: true,
        compress: true,
        open: true,
        stats: 'minimal'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.((jpe?|pn|sv)g|web(p|m)|m(ov|p4)|gif|bmp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: '[name].[ext]',
                            outputPath: 'assets'
                        }
                    }
                ]
            },
            {
                test: /\.s?(c|a)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.ejs$/,
                use: ['ejs-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin( {
            template: './src/pages/index.ejs',
            filename: 'index.html'
        } ),
        new MiniCssExtractPlugin( {
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        } )
    ]
}
