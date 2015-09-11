/*
 * Glob patterns
 * ============================================================================
 *
 * Information about the project assets and source code. Very specific to the
 * development tasks, telling where to read the project source code for
 * processing and compilation.
 */

'use strict';


var dirs = require('./dirs');

var globs = {
    src: {
        root: `${dirs.src}/root/**/*.!(js|css|scss|tl)`
        , projects: `${dirs.src}/projects/**`
        , style: {
            local: `${dirs.src}/root/css/**/*.{css,scss}`
            , extension: [`${dirs.src}/lib/css/*.{css,scss}`]
            , vendor: ['node_modules/prismjs/dist/prism-default/prism-default.css']
        }
    }
    , dist: {
        all: `${dirs.dist}/**/*`
        , content: ``
    }
    //src: {`${dirs.src}/**/*`
    //, src: dirs.src + '/root/**/*'
    //, raw: dirs.src + '/_raw/**/*'
    //, helpers: './helpers/**/*'
    //, md: [globs.src + '.{md,txt}', `!${dirs.src}/_raw/**/*`]
    //, theme: dirs.src + '/theme-dust/**/*.tl'
    //, styles: dirs.src + '/theme-dust/css/**/*.{css,scss}'
};

module.exports = globs;
