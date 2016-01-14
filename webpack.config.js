var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './local_storage.js',
    output: {
        path: __dirname,
        filename: 'local_storage.min.js'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({ minimize: true, compress: { warnings: false } })
    ]
};