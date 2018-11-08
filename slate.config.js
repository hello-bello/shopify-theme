module.exports = {
  'webpack.extend': {
    module: {
      rules: [{
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      }, {
        test: /\.ttf$/,
        use: 'file-loader',
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }],
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
  }
}