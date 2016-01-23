var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: './smartstorage.js',
    output: {
        path: __dirname,
        filename: 'smartstorage.min.js'
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