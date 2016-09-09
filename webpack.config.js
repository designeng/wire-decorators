var path = require('path');
var CleanSpecPlugin = require('./webpack/plugins/cleanSpec');

var specLoader = require('./webpack/loaders/specLoader');

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: [
            './index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {   
                test: /\.spec\.js$/,
                loaders: [path.join(__dirname, './webpack/loaders/specLoader.js')],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanSpecPlugin()
    ]
}