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
    , index: dirs.src + '/index.*'
};

globs = Object.assign(globs, {
    md: [globs.src + '.{md,txt}']
    , txt: globs.src + '.txt'
    , jade: [globs.index, globs.src + '.{md,txt}']
    , theme: dirs.src + '/theme/**/*.jade'
});

console.log(globs);

module.exports = globs;
