/*
 * Directories
 * ============================================================================
 *
 * This module keeps some data about the project directory structure.
 */

'use strict';

module.exports = {
  // Where compiled scripts and assets should be placed.
  'src'   : './src'
  , 'dist'  : './site'
  , dist$: {
    vendor: './site/js/vendor/'
    , 'scripts': './site/js/'
    , 'styles': './site/css/'
  }
};
