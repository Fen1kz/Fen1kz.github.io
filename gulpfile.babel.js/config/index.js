/*
 * Project configuration module index.
 * ============================================================================
 */

'use strict';


module.exports = {
    dirs: require('./dirs')
    , globs: require('./globs')
    , pluginOptions: require('./pluginOptions')
    , globalMetadata: {
        tags: []
        , collections: []
        , getCollectionByName: (name) => _.find(globalMetadata.collections, 'name', name)
        , get indexCollection() {
            return _.find(globalMetadata.collections, 'name', 'posts')
        }
    }
};
