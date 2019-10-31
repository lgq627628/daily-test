module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.symlinks(true);
  }
};
