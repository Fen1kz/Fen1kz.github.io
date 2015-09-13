let _ = require('lodash');
let throughPipes = require('through-pipes');
let $path = require('path');

export default (gulp, $, config) => {
    let debug = (false) ? console.log : () => (void 0);
    let globalMetadata = config.globalMetadata;
    return () => (throughPipes((readable) => {
            _.forIn(config.collectionsMap, (v, k) => {
                globalMetadata.collections[k] = [];
            });
            debug('----- read-global-metadata -----');
            return readable
                .pipe($.tap((file, t) => {
                    let meta = file.data.file.meta;
                    let fileUrl = $.util.replaceExtension(file.relative, '.html').replace('\\', '/');
                    debug('file:', file.relative);
                    debug('meta:', meta);
                    //console.log('base:', $path.dirname(file.relative));
                    if (meta.tags) {
                        meta.tags.split(',').map((metaTag) => {
                            let tagName = _.chain(metaTag).trim().kebabCase().value();
                            let tag = _.find(globalMetadata.tags, 'name', tagName);
                            //console.log(`searched for ${tagName}, found ${!(tag === void 0)}`);
                            if (!tag) {
                                tag = {name: tagName, files: []};
                                globalMetadata.tags.push(tag);
                            }
                            tag.files.push({
                                href: fileUrl
                                , meta: meta
                            });
                            tag.files.sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
                        });
                        globalMetadata.tags.sort((item1, item2) => item1.files.length < item2.files.length ? 1 : -1);
                    }

                    let base = $path.dirname(file.relative);
                    debug('--- collections / ---');
                    _.forIn(config.collectionsMap, (basePatterns, collectionName) => {
                        let collection = globalMetadata.getCollectionByName(collectionName);
                        if (!collection) {
                            collection = {name: collectionName, files: []};
                            globalMetadata.collections.push(collection);
                        }
                        _.forEach(basePatterns, (basePattern) => {
                            debug('base:', basePattern.test(base), base);
                            if (basePattern.test(base)) {
                                collection.files.push({
                                    href: fileUrl
                                    , meta: meta
                                    , content: file.contents.toString()
                                });
                            }
                        });
                        //console.log(globalMetadata.collections[collectionName].map(item => item.meta.title + ':' + item.meta.timestamp))
                        collection.files.sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
                        //console.log(globalMetadata.collections[collectionName].map(item => item.meta.title + ':' + item.meta.timestamp))
                    });
                    debug('--- / collections ---');
                    //console.log(file.path, 'metadata collection complete')
                }))
                .on('end', () => {
                    console.log(globalMetadata);
                    debug('----- end read-global-metadata -----');
                })
        }
    ));
}