/* eslint-disable global-require */
const path = require("path");

module.exports = (api) => {
  /*
    permacache the computed config and never call the function again.
    https://babeljs.io/docs/en/config-files#apicache
  */
  api.cache(true);

  return {
    presets: [
      [
        /*
          A collection of babel plugins that allows you to use the latest
          JavaScript without needing to micromanage which syntax transforms
          (and optionally, browser polyfills) are needed by your target environment(s)
        */
        "@babel/preset-env",
        {
          // babel will throw a warining if a core-js version is not specified
          corejs: "3",
          /*
            output logging to see the plugins and polyfills preset-env applies
            based on the .browserlistrc config

            **This increases the webpack build process
          */
          debug: true,
          /*
            import and export do not change to require and module.exports (CJS) Note: (Meets Tree Shaking Condition)
            https://medium.com/naver-fe-platform/tree-shaking-in-webpack-50fa2ca446f1
          */
          modules: false,
          // allow importing core-js in entrypoint and use browserlist to select polyfills
          useBuiltIns: "usage",
          // exlude transformations that make code slower
          exclude: ["transform-typeof-symbol"],
        },
      ],
    ],
    plugins: [
      [
        /*
          Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals

          Enables the re-use of Babel's injected helper code to save on codesize
        */
        "@babel/plugin-transform-runtime",
        /*
          Settings based on defaults:
          https://babeljs.io/docs/en/babel-plugin-transform-runtime#with-a-configuration-file-recommended
        */
        {
          /*
           allows users to run transform-runtime broadly across a whole project.
           By default, transform-runtime imports from @babel/runtime/foo directly,

           Explicitly resolve to match provided helper function
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
         */
          absoluteRuntime: path.dirname(
            require.resolve("@babel/runtime/package.json")
          ),
          // by default, @babel/plugin-transform-runtime doesn't polyfill proposals
          corejs: false,
          /*
            toggles whether or not inlined Babel helpers (classCallCheck, extends, etc.) are replaced with calls to moduleName

            Usually Babel will place helpers at the top of your file to do common tasks to avoid duplicating the code around in the current file.
            Sometimes these helpers can get a little bulky and add unnecessary duplication across files.
            The runtime transformer replaces all the helper calls to a module.
            https://babeljs.io/docs/en/babel-plugin-transform-runtime#helper-aliasing
          */
          helpers: true,
          /*
           Toggles whether or not generator functions are transformed to use a regenerator runtime that does not pollute the global scope.

           Whenever you use a generator function or async function, the code isn't ideal since it relies on the regenerator runtime being included,
           which pollutes the global scope.
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#regenerator-aliasing
         */
          regenerator: true,
          /*
           When enabled, the transform will use helpers that do not get run through @babel/plugin-transform-modules-commonjs.
           This allows for smaller builds in module systems like webpack, since it doesn't need to preserve commonjs semantics.
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
         */
          useESModules: false,
          // explicitly resolve to match provided helper functions
          version: require("@babel/runtime/package.json").version,
        },
      ],
      [
        /*
          These are additional stage-3 proposals not present in preset-env
          This is why we install them directly and include here
        */
        // transforms static class properties
        "@babel/plugin-proposal-class-properties",
      ],
    ],
  };
};
