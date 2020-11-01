/* eslint-disable global-require */
module.exports = {
  plugins: {
    // PostCSS plugin to use @import in css files
    "postcss-import": {},
    /*
      PostCSS plugin to polyfill modern css
      Note: This plugin automatically includes Autoprefixer
    */
    "postcss-preset-env": {
      // use the most experiemental css features
      stage: 0,
      // The browsers option determines which polyfills are required based upon the browsers you are supporting.
      browsers: "last 2 versions",
    },
  },
};
