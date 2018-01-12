module.exports = {
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
