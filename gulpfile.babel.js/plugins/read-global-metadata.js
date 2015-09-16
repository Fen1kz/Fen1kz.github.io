let _ = require('lodash');
let throughPipes = require('through-pipes');
let fs = require('fs');
let yaml = require('js-yaml');

export default (gulp, $, config) => {
    let debug = (false) ? console.log : () => (void 0);
    let globalMetadata = config.globalMetadata;
    let collectionsConfig = yaml.safeLoad(fs.readFileSync(`${config.dirs.src}/config/collections.yml`));

    _.map(collectionsConfig, (config, name) => {
        globalMetadata.collections[name] = $.getCollection(name, config);
    });

    globalMetadata.tags = [];

    return () => throughPipes((readable) => {
        debug('----- read-global-metadata -----');
        globalMetadata.collections.forEach((c) => c.clear());
        return readable
            .pipe($.tap((file, t) => {
                _.forIn(globalMetadata.collections, (collection) => collection.parse(file));

                let meta = file.data.file.meta;
                if (meta.tags) {
                    meta.tags.split(',').map((metaTag) => {
                        let tagName = _.chain(metaTag).trim().kebabCase().value();
                        let tagCollection = _.find(globalMetadata.tags, 'name', tagName);
                        if (!tagCollection) {
                            tagCollection = $.getCollection(tagName);
                            globalMetadata.tags.push(tagCollection);
                        }
                        tagCollection.addFile(file);
                    })
                }
                globalMetadata.tags.sort((item1, item2) => item1.files.length < item2.files.length ? 1 : -1);
            }))
            .on('end', () => {
                _.forIn(globalMetadata.collections, (collection) => collection.sort());
                globalMetadata.tags.forEach((collection) => collection.sort());
                debug('----- end read-global-metadata -----');
            });
    });
}