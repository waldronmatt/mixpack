module.exports = {
  // See https://github.com/stylelint/stylelint/issues/3128 for options on rule conflicts
  extends: [
    /*
      Extends 'stylelint-config-recommended': The recommended shareable config for stylelint.

      Turns on additional rules to enforce the common stylistic conventions found within a handful of CSS styleguides,
      including: The Idiomatic CSS Principles, Google's CSS Style Guide, Airbnb's Styleguide, and @mdo's Code Guide.
    */
    "stylelint-config-standard",
    // The recommended shareable SCSS config for stylelint.
    "stylelint-config-recommended-scss",
    // This linter has been designed / tested with SCSS syntax based on the SCSS guidelines documented in https://sass-guidelin.es/
    "stylelint-config-sass-guidelines",
    // Turns off all rules that are unnecessary or might conflict with Prettier.
    "stylelint-config-prettier",
  ],
  plugins: [
    // specify the ordering of things, e.g. properties within declaration blocks
    "stylelint-order",
    // a collection of SCSS specific linting rules for stylelint (in a form of a plugin).
    "stylelint-scss",
    // runs prettier as a stylelint rule and reports differences as individual stylelint issues.
    "stylelint-prettier"
  ],
  rules: {
    // enable 'stylelint-prettier'
    "prettier/prettier": true
  },
  // files to exclude including: bundled files, jest coverage reports
  ignoreFiles: ["dist/**", "coverage/**"],
};
