// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

module.exports = {
  'webpack.extend': {
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
  }
}