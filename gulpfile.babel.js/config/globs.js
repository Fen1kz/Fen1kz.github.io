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
        all: [`${dirs.src}/**`]
        , root: [`${dirs.src}/root/**/*.!(js|css|scss|tl)`]
        , projects: [`${dirs.src}/projects/**`]
        , style: {
            local: [`${dirs.src}/root/css/**/*.{css,scss}`]
            , extension: [`${dirs.src}/lib/css/*.{css,scss}`]
            , vendor: ['node_modules/prismjs/dist/prism-default/prism-default.css']
        }
        , scripts: {
            local: [`${dirs.src}/root/css/**/*.js`]
            , vendor: ['node_modules/jquery/dist/jquery.min.js'
                , 'node_modules/moment/min/moment.min.js']
        }
        , content: {
            md: [`${dirs.src}/content/**/*.{md,txt}`]
            , root: [`${dirs.src}/root/**/*.tl`]
        }
    }
    , dist: {
        all: `${dirs.dist}/**/*`
        , content: ``
    }
    , helpers: './helpers/**/*'
    //src: {`${dirs.src}/**/*`
    //, src: dirs.src + '/root/**/*'
    //, raw: dirs.src + '/_raw/**/*'
    //, theme: dirs.src + '/theme-dust/**/*.tl'
    //, styles: dirs.src + '/theme-dust/css/**/*.{css,scss}'
};

module.exports = globs;
