const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

module.exports = (PORT) => {
    let backendPort = PORT - 1;
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        proxy: {
            "/api": 'http://localhost:' + backendPort // <- over express backend
        },
        historyApiFallback: true
    }).listen(PORT, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + PORT);
    });
}