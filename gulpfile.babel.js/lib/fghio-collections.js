let _ = require('lodash');
let Promise = require('bluebird');
let $ = {
    tap: require('gulp-tap')
    , util: require('gulp-util')
    , file: require('gulp-file')
    //, frontMatter: require('gulp-front-matter')
};
let through2 = require('through2');
let eventStream = require('event-stream');
let readMetadata = require('./fghio-read-metadata');

let log = (msg) => $.util.log($.util.colors.cyan('fghioCollections'), msg);

let fsReadFuleAsync = Promise.promisify(require('fs').readFile);

function fghioCollections(options) {
    log('start');
    let collectionName = options.name;
    let collection = options.data[collectionName];
    let directory = options.directory !== void 0 ? options.directory : (collectionName + '/');

    let promise = Promise.all([
        fsReadFuleAsync(options.templates.main)
        , fsReadFuleAsync(options.templates.sub)
    ])
        .spread((mainTemplateFile, subTemplateFile) => {
            let mainTemplate = _.template(mainTemplateFile.toString());
            let subTemplate = _.template(subTemplateFile.toString());

            let collectionsIndex = $.file(`${collectionName}/index.tl`, mainTemplate({
                collectionName: collectionName
                , CollectionName: _.startCase(collectionName)
                , directory: directory
            }), {src: true})
                .pipe(readMetadata());

            let collectionArray = _.map(collection, (item, index) => {
                let itemIndex = index;
                let itemName = item.name;
                let itemValue = item.files;
                return $.file(`${directory}${itemName}/index.tl`, subTemplate({
                    collectionName: collectionName
                    , CollectionName: _.startCase(collectionName)
                    , itemName: itemName
                    , ItemName: _.startCase(itemName)
                    , itemIndex: itemIndex
                }), {src: true})
                    //.pipe($.tap(file => {
                    //    console.log('path', file.path);
                    //    console.log('generated', directory, `${directory}${itemName}/index.tl`);
                    //}))
                    .pipe(readMetadata());
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


// exporting the plugin main function
export default fghioCollections;