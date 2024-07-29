const path = require('path');

module.exports = {
    entry: './src/index.js',  // Adjust this to the entry point of your application
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,  // Adjust for your file types (e.g., .ts for TypeScript)
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],  // Adjust presets if needed
                    },
                },
            },
            {
                test: /\.css$/,  // Adjust for your file types (e.g., .scss for Sass)
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
                    // Your middleware setup before
                    console.log('Middleware before request');
                    next();
                },
            });

            middlewares.push({
                name: 'after-middleware',
                middleware: (req, res, next) => {
                    // Your middleware setup after
                    console.log('Middleware after request');
                    next();
                },
            });

            return middlewares;
        },
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // Adjust for your file types (e.g., .ts, .tsx for TypeScript)
    },
};