const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/scripts/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist/assets'),
  },
  watch: true,
};