let _ = require('lodash');
let throughPipes = require('through-pipes');
let $path = require('path');

let collectionsMap = {
    posts: [/^posts$/]
    , self: [/^self$/]
};

let readGlobalMetadata = ($, globalMetadata) => (throughPipes((readable) => {
        _.forIn(collectionsMap, (v, k) => {
            globalMetadata.collections[k] = [];
        });
        return readable
            .pipe($.frontMatter({
                property: ''
            }))
            .pipe($.tap((file, t) => {
                let meta = file.data.file.meta;
                let fileUrl = $.util.replaceExtension(file.relative, '.html').replace('\\', '/');
                //console.log('meta:', meta);
                //console.log('base:', $path.dirname(file.relative));
                if (meta.tags) {
                    meta.tags.split(',').map((metaTag) => {
                        let tag = _.chain(metaTag).trim().kebabCase().value();
                        if (!globalMetadata.tags[tag]) {
                            globalMetadata.tags[tag] = [];
                        }
                        globalMetadata.tags[tag].push({
                            href: fileUrl
                            , meta: meta
                        });
                        globalMetadata.tags[tag] = globalMetadata.tags[tag].sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
                    });
                }

                let base = $path.dirname(file.relative);
                _.forIn(collectionsMap, (basePatterns, collectionName) => {
                    _.forEach(basePatterns, (basePattern) => {
                        if (basePattern.test(base)) {
                            globalMetadata.collections[collectionName].push({
                                href: fileUrl
                                , meta: meta
                                , content: file.contents.toString()
                            });
                        }
                    });
                    //console.log(globalMetadata.collections[collectionName].map(item => item.meta.title + ':' + item.meta.timestamp))
                    globalMetadata.collections[collectionName] = globalMetadata.collections[collectionName].sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
                    //console.log(globalMetadata.collections[collectionName].map(item => item.meta.title + ':' + item.meta.timestamp))
                });
                //console.log(file.path, 'metadata collection complete')
            }))
            .on('end', () => {
                console.log('root:', globalMetadata);
            })
    }
));

export default readGlobalMetadata;