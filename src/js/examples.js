/* These are Webpack Code Splitting Example Files */
import dynamicLoad from './examples/_dynamic-load';
import lazyLoad from './examples/_lazy-load';
import splitchuncksVendor from './examples/_splitchuncks-vendor';
import splitchuncksCommon from './examples/_splitchuncks-common';
import { calledFunction } from './examples/_tree-shaking';

/* CODE SPLITTING EXAMPLE - Preload/Prefetch */
/*
    reload-webpack-plugin is used over Webpack's native support
    for integration with html-webpack-plugin

  - prefetch: resource is probably needed for some navigation in the future
  - preload: resource will also be needed during the current navigation
*/
import(/* webpackChunkName: '_prefetch-print' */ './examples/_prefetch-print');

import(/* webpackChunkName: '_preload-print' */ './examples/_preload-print');

dynamicLoad();
lazyLoad();
splitchuncksVendor();
splitchuncksCommon();
calledFunction();
