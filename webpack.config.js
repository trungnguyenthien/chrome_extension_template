const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    // entry là đường dẫn đến tệp JavaScript của bạn sử dụng để tạo ra ứng dụng của bạn.
    entry: {
        popup: "./src/popup.jsx",
        option: "./src/option.jsx",
        background: "./src/background.js"
    },
    //output là đường dẫn đến file bundle sẽ được tạo ra sau khi webpack hoàn tất.
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        //module.rules là một mảng các cấu hình giúp webpack hiểu được các tệp JavaScript mới nhất và biên dịch chúng thành mã JavaScript có thể chạy được trên trình duyệt.
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }, {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }, ]
    },
    //plugins là một mảng các plugin để giúp webpack tự động tạo ra các file HTML, CSS và hình ảnh.
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'popup.html',
            chunks:['popup']
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            filename: 'option.html',
            chunks:['option']
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.html',
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: 'stats.json'
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/images',
                    to: 'images'
                },
                {
                    from: 'src/libs',
                    to: 'libs'
                }
                ,
                {
                    from: 'src/manifest.json',
                    to: 'manifest.json'
                },
                {
                    from: 'src/libs',
                    to: 'libs'
                },
                {
                    from: 'src/libs',
                    to: 'libs'
                }
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            name: 'vendor',
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor-react',
                    chunks: 'all',
                },
            },
        },
    }
};