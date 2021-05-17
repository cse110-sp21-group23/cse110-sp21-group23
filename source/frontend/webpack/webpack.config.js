module.exports = options => {
    return {
      entry: './src/js/index.js',
      output: {
        filename: 'bundle.js',
      },
      devtool: 'source-map',
      devServer: {
         port: 5000,
         host: '127.0.0.1',
         historyApiFallback: {
           rewrites: [{
            from: /./,
            to: '/src/index.html'
           }]
         },
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets:[ 'stage-2' ]
            }
          }
        ]
      }
    }
  }