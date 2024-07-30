const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        setupMiddlewares: (middlewares, devServer) => {
            middlewares.unshift({
                name: 'before-middleware',
                middleware: (req, res, next) => {
                    console.log('Middleware before request');
                    next();
                },
            });

            middlewares.push({
                name: 'after-middleware',
                middleware: (req, res, next) => {
                    console.log('Middleware after request');
                    next();
                },
            });

            return middlewares;
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};