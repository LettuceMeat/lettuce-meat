const isDev = process.env.NODE_ENV === 'development'
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  node: {
    fs: 'empty'
  },
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      swDest: './public/service-worker.js',
      maximumFileSizeToCacheInBytes: 50000000,
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10
            }
          }
        }
      ]
    })
  ]
}
