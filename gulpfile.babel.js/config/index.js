/*
 * Project configuration module index.
 * ============================================================================
 */

'use strict';

let _ = require('lodash');

let config = {
    dirs: require('./dirs')
    , globs: require('./globs')
    , pluginOptions: require('./pluginOptions')
    , collectionsMap: {
        posts: [/^posts$/]
        , notes: [/^notes$/]
        , projects: [/^projects/]
    }
    , globalMetadata: {
        tags: []
        , collections: {}
    }
};

module.exports = config;