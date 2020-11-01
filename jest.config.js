module.exports = {
  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  // A list of paths to directories that Jest should use to search for files in.
  roots: ["<rootDir>/src"],
  /*
    The glob patterns Jest uses to detect test files.
    We're looking for all .ts and .js extensions (including x variants) as well as files with .spec and .test suffixes
  */
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js|jsx)",
    "**/?(*.)+(spec|test).+(ts|tsx|js|jsx)",
  ],
  /*
    A map from regular expressions to paths to transformers.
    A transformer is a module that provides a synchronous function for transforming source files.

    For example, if you wanted to be able to use a new language feature in your modules or tests that aren't yet supported by node,
    you might plug in one of many compilers that compile a future version of JavaScript to a current one.
    Examples: Babel, Typescript, etc.
  */
  transform: {
    // Jest doesn't handle non JavaScript assets by default.
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      // You can use this module to avoid errors when importing non JavaScript assets.
      "jest-transform-stub",
    /*
      If you have JavaScript files that are transformed by Babel, you can enable support for Babel by installing the babel-jest plugin.
      Non-Babel JavaScript transformations can be handled with Jest's transform config option.

      Note: if you are using babel-jest with additional code preprocessors (and we are because we're using ts-jest for TypeScript files),
      you have to explicitly define babel-jest as a transformer for your JavaScript code to map .js files to the babel-jest module.
    */
    "^.+\\.(js|jsx)?$": "babel-jest",
    // A TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
