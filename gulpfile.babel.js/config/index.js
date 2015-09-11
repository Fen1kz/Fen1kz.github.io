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
    , globalMetadata: {
        tags: []
        , collections: []
        , getCollectionByName: (name) => _.find(config.globalMetadata.collections, 'name', name)
        , get indexCollection() {
            return _.find(config.globalMetadata.collections, 'name', 'posts')
        }
    }
};

module.exports = config;