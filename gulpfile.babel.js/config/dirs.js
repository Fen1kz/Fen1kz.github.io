/*
 * Directories
 * ============================================================================
 *
 * This module keeps some data about the project directory structure.
 */

'use strict';

module.exports = {
    // Where compiled scripts and assets should be placed.
    'src': './src'
    , 'dist': './site'
    , dist$: {
        vendor: {
            js: './site/js/vendor/'
            , css: './site/css/'
        }
        , 'scripts': './site/js/'
        , 'styles': './site/css/'
    }
};
