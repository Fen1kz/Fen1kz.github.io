let _ = require('lodash');
let Promise = require('bluebird');
let through2 = require('through2');
let eventStream = require('event-stream');
let fsReadFuleAsync = Promise.promisify(require('fs').readFile);

export default (gulp, $, config) => {
    let globalMetadata = config.globalMetadata;
    let debug = (true) ? console.log : () => (void 0);

    return function fghioCollections(options) {
        let collectionType = options.name;
        let collection = globalMetadata[collectionType];
        let directory = options.directory !== void 0 ? options.directory : (collectionType + '/');
        debug('starting', collectionType);
        debug('data', collection);

        let promise = Promise.all([
            fsReadFuleAsync(options.templates.main)
            , fsReadFuleAsync(options.templates.sub)
        ])
            .spread((mainTemplateFile, subTemplateFile) => {
                let mainTemplate = _.template(mainTemplateFile.toString());
                let subTemplate = _.template(subTemplateFile.toString());

                let collectionsIndex = $.file(`${collectionType}/index.tl`, mainTemplate({
                    collectionType: collectionType
                    , CollectionType: _.startCase(collectionType)
                    , directory: directory
                }), {src: true})
                    .pipe($.readMetadata());

                let collectionArray = _.map(collection, (item, index) => {
                    let itemIndex = index;
                    let itemName = item.name;
                    let itemValue = item.files;
                    debug('Item with index:(', itemIndex, ') and name(', itemName, ') and value(, itemValue')
                    return $.file(`${directory}${itemName}/index.tl`, subTemplate({
                        collectionType: collectionType
                        , CollectionType: _.startCase(collectionType)
                        , itemName: itemName
                        , ItemName: _.startCase(itemName)
                        , itemIndex: itemIndex
                    }), {src: true})
                        //.pipe($.tap(file => {
                        //    console.log('path', file.path);
                        //    console.log('generated', directory, `${directory}${itemName}/index.tl`);
                        //}))
                        .pipe($.readMetadata());
                });

                let collectionStreams = _.reduce(collectionArray, ((result, stream) => eventStream.merge(result, stream)), collectionsIndex);

                return collectionStreams;
            });

        let promisedStream = through2.obj(function (data, enc, cb) {
            cb(null, data);
        });
        promise.then((collectionStreams) => {
            collectionStreams.pipe(promisedStream);
        });

        return promisedStream;
    }
}