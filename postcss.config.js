/* eslint-disable global-require */
module.exports = {
  plugins: {
    // PostCSS plugin to parse CSS and add vendor prefixes to CSS rules
    autoprefixer: {},
    // PostCSS plugin to use @import in css files
    'postcss-import': {},
    /*
      PostCSS plugin to polyfill modern css
      Note: This plugin automatically includes Autoprefixer
    */
    'postcss-preset-env': {
      /*
        The stage option determines which CSS features to polyfill
        stage 2 is enabled by default
        change to a lower stage to see postcss polyfill more
      */
      stage: 2,
    },
  },
};
