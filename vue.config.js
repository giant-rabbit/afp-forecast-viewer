const devPort = 8084;
const path = require("path");

module.exports = {
  devServer: {
    hot: true,
    writeToDisk: true,
    liveReload: true,
    sockPort: devPort,
    port: devPort,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    // https: true,
    // public: 'https://localhost:8085/'
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? process.env.ASSET_PATH || "/"
      : `http://localhost:${devPort}/`,
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