/* eslint-disable global-require */
const path = require('path');

/*
  QUICK OVERVIEW ON WHY BABEL IS SET UP THE WAY IT IS BELOW:

  If you are authoring an app, use import 'core-js at the top of your app with 'useBuiltIns' set to 'entry'
  and '@babel/transform-runtime' only for helpers ('@babel/runtime' as dependency). This way you pollute
  the global environment but you don't care, its your app. You will have the benefit of helpers aliased to
  '@babel/runtime' and polyfills included at the top of your app. This way you also don't need to process
  'node_modules' (except when a dependency uses a syntax that has to be transpiled) because if some dependency
  used a feature that needs a polyfill, you already included that polyfill at the top of your app.

  https://github.com/babel/babel/issues/9853
*/

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
          A collection of babel plugins that allows you to use the latest JavaScript without
          needing to micromanage which syntax transforms (and optionally, browser polyfills)
          are needed by your target environment(s)
        */
        '@babel/preset-env',
        {
          /*
            method for getting package version dynamically found below:
            https://stackoverflow.com/a/10855054
          */
          corejs: require('core-js/package.json').version,
          /*
            output logging to see the plugins and polyfills preset-env applies
            based on the .browserlistrc config
          */
          debug: true,
          // exlude transformations that make code slower
          exclude: ['transform-typeof-symbol'],
          /*
            By default @babel/preset-env uses caller data to determine whether ES modules and module features
            (e.g. import()) should be transformed. Generally caller data will be specified in the bundler plugins
            (e.g. babel-loader, @rollup/plugin-babel): https://babeljs.io/docs/en/babel-preset-env#modules
          */
          modules: 'auto',
          /*
            allow importing core-js in entrypoint and use browserlist to select polyfills

            if you don't want to include polyfills manually, set option to 'usage': https://stackoverflow.com/a/56505264
            but DON'T use this option with @babel/transform-runtime:
            https://github.com/babel/babel/issues/9853#issuecomment-619587386
          */
          useBuiltIns: 'entry',
        },
      ],
    ],
    plugins: [
      [
        /*
          In order to implement details of ECMAScript specs, Babel will use "helper" methods in order
          to keep the generated code clean. Since these helpers can get pretty long, and they get added
          to the top of every file you can move them into a single "runtime" which gets required.
          https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/user-handbook.md#babel-runtime
        */
        '@babel/plugin-transform-runtime',
        /*
          Settings based on defaults:
          https://babeljs.io/docs/en/babel-plugin-transform-runtime#with-a-configuration-file-recommended
        */
        {
          /*
           allows users to run transform-runtime broadly across a whole project.
           By default, transform-runtime imports from @babel/runtime directly,

           Explicitly resolve to match provided helper function
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
         */
          absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
          // by default, @babel/plugin-transform-runtime doesn't polyfill proposals
          corejs: false,
          /*
            toggles whether or not inlined Babel helpers (classCallCheck, extends, etc.) are replaced with calls to moduleName

            Usually Babel will place helpers at the top of your file to do common tasks to avoid duplicating the code around
            in the current file. Sometimes these helpers can get a little bulky and add unnecessary duplication across files.
            The runtime transformer replaces all the helper calls to a module.
            https://babeljs.io/docs/en/babel-plugin-transform-runtime#helper-aliasing
          */
          helpers: true,
          /*
           Toggles whether or not generator functions are transformed to use a regenerator runtime
           that does not pollute the global scope.

           Whenever you use a generator function or async function, the code isn't ideal since it relies on the
           regenerator runtime being included, which pollutes the global scope.
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#regenerator-aliasing
         */
          regenerator: true,
          /*
           When enabled, the transform will use helpers that do not get run through @babel/plugin-transform-modules-commonjs.
           This allows for smaller builds in module systems like webpack, since it doesn't need to preserve commonjs semantics.
           https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules

           Setting to false because IE11 and other older browsers don't recognize modules
         */
          useESModules: false,
          // explicitly resolve to match provided helper functions
          version: require('@babel/runtime/package.json').version,
        },
      ],
      [
        /*
          These are additional stage-3 proposals not present in preset-env
          This is why we install them directly and include here
        */
        // transforms static class properties
        '@babel/plugin-proposal-class-properties',
      ],
    ],
  };
};
