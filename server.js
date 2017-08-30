const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');
let backServer = require('./backendServer');

module.exports = (PORT) => {
    let BACKPORT = PORT - 1;
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        proxy: {
            "/api": 'http://localhost:' + BACKPORT // <- over express backend
        },
        historyApiFallback: true
    }).listen(PORT, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + PORT);
    });

    backServer(BACKPORT);
};