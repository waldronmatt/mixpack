/* CODE SPLITTING EXAMPLE - DYNAMIC IMPORTS */
/*
  NOTE: When you dynamically import a module, it automatically makes
  that module ineligible for tree shaking.

  https://medium.com/@christiango/the-unexpected-impact-of-dynamic-imports-on-tree-shaking-ddadeb135dd7
*/

const dynamicLoad = () => {
  if (document.querySelectorAll("[data-load='index']").length) {
    import(
      /* webpackChunkName: "_dynamic-load-print" */ "./_dynamic-load-print"
    )
      .then((module) => module.default())
      .catch(() => "An error occurred while loading _dynamic-load-print");
  }
};

export default dynamicLoad;
