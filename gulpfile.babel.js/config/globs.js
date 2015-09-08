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
    src: dirs.src + '/**/*'
    , root: dirs.src + '/root/**/*.*'
};

globs = Object.assign(globs, {
    md: [globs.src + '.{md,txt}']
    , theme: dirs.src + '/theme-dust/**/*.tl'
    , scripts: dirs.src + '/theme-dust/js/**/*.js'
    , styles: dirs.src + '/theme-dust/css/**/*.css'
});

module.exports = globs;
