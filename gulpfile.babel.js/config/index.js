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
        , articles: [/^articles$/]
    }
    , globalMetadata: {
        tags: []
        , collections: []
        , getCollectionByName: (name) => _.find(config.globalMetadata.collections, 'name', name)
        , get indexCollection() {
            let posts = config.globalMetadata.getCollectionByName('posts');
            let articles = config.globalMetadata.getCollectionByName('articles');
            let files = _.flatten([posts.files, articles.files])
            //console.log(files.map(file => file.meta))
            files = files.sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1)

            return {
                name: 'index'
                , files: files

            };
        }
    }
};

module.exports = config;