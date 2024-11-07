const webpack = require('webpack');

module.exports = {
  output: "standalone",
  reactStrictMode: true,
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
    );
    return config;
  }
}