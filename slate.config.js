// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

module.exports = {
  'webpack.extend': {
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.jsx/,
        use: ['babel-loader'],
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    }
  }
}