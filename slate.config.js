const webpack = require('webpack')

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
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ],
    optimization: {
      minimize: true,
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }
  }
}