module.exports = {
  productionSourceMap: false,
  css: {
    extract: {
      filename: 'app.css',
      chunkFilename: 'app.css',
    },
  },
  configureWebpack: {
    output: {
      filename: 'app.js'
    },
    optimization: {
      splitChunks: false
    },
  },
  filenameHashing: false
}