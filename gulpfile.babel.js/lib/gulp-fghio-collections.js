let _ = require('lodash');
let Promise = require('bluebird');
let $ = {
    tap: require('gulp-tap')
    , util: require('gulp-util')
    , file: require('gulp-file')
    , frontMatter: require('gulp-front-matter')
};
let stream = require('stream');
let through2 = require('through2');
let eventStream = require('event-stream');
let readMetadata = require('./gulp-read-metadata');

let log = (msg) => $.util.log($.util.colors.cyan('fghioCollections'), msg);

let fs = require('fs');

function fghioCollections(cb, options) {
    log('start');
    //let collectionName = options.name;
    //let collection = options.data[collectionName];
    //
    //let mainTemplate = (collectionName) => ('');
    //let subTemplate = (collectionName, itemName) => (``);
    //
    //let collectionsIndex = $.file(`${collectionName}/index.tl`, mainTemplate(collectionName), {})
    //    .pipe(readMetadata());
    //
    //let collectionArray = [];
    ////let collectionArray = _.map(collection, (itemValue, itemName) => {
    ////    return $.file(`${collectionName}/${itemName}/index.tl`, subTemplate(collectionName, itemName), {})
    ////        .pipe(readMetadata());
    ////});
    //
    //let collectionStreams = _.reduce(collectionArray, ((result, stream) => eventStream.merge(result, stream)), collectionsIndex);

    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
            console.log('bluebird resolved');
        }, 1500);
    });

    //let stream = $.file('collections/lol.html', 'sup!', {});


    //let promisedStream = through2.obj(function (file, enc, cb) {
    //    console.log(file, enc, cb);
    //    this.push(file);
    //    callback()
    //}, function (callback) {
    //    promise.then(() => {
    //        console.log(callback)
    //    });
    //});

    //let promisedStream2 = eventStream.readable(function (count, callback) {
    //    console.log(count);
    //    callback()
    //});


    let promisedStream = through2.
        obj(function (data, enc, cb) {
            console.log('data ', data);
            cb(null, data);
        })
        .on('end', function () {
            console.log('promisedStream end')
        });
    //
    //promisedStream.on('data', function(chunk) {
    //    console.log('ondata', chunk)
    //});
    //
    //promisedStream.write('test 1');
    //
    //promise.then(() => {
    //    let source = eventStream.readArray([1, 2])
    //        .on('end', function () {
    //            console.log('source end')
    //        });
    //    let stream = $.file('collections/lol.html', 'sup!', {})
    //        .on('end', function () {
    //            console.log('stream end')
    //        });
    //    promisedStream.pipe(source);
    //});
    //
    ////promisedStream.push('lol');
    //
    //promisedStream.write('test 2');
    //
    //return promisedStream;


    //let promisedStream = eventStream.readable(function (count, callback) {
    //    promise.then(() => {
    //        //this.emit('data', 'ahhaha');
    //        let fileStream = $.file('collections/lol.html', 'sup!', {});
    //        //this.emit('data', stream);
    //        //this.emit('end');
    //    });
    //});

    //let array = eventStream.readArray([1, 2])

    //let promisedStream = new stream.Writable();
    promise.then(() => {
        let fileStream = eventStream.merge(
            $.file('1.html', 'sup!', {})
            , $.file('2.html', 'sup!', {})
        )
        .on('close', function() {
            console.log('close');
        })
        .on('end', function() {
            console.log('close');
        })
        .on('error', function() {
            console.log('error');
        })
        .on('readable', function() {
            console.log('readable');
        })
        //.on('data', function() {
        //    console.log('data');
        //})
        .on('finish', function() {
            console.log('close');
        })
        fileStream.pipe(promisedStream).unpipe(promisedStream);
        //.on('close', function () {
        //    console.log("fileStream.pipe(promisedStream) ended");
        //});//.end();
    });

    return promisedStream
        .on('finish', function () {
            console.log("promisedStream finished");
        })
        .on('end', function() {
            console.log('close');
        });


    //promise.then(() => {
    //    cb();
    //});

    //cb(stream);
    //return stream;

    //let th = through2(function (file) {
    //    console.log('file!!!!!')
    //
    //}, function () {
    //    console.log('FINISHHH!!!!!')
    //    cb();
    //    this.emit('end');
    //});
    //
    //return stream.pipe(th);

    //return through2.obj(function (file, encoding, next) {
    //    console.log('hai');
    //    this.emit('suppp')
    //    next();
    //    promise
    //        .then(() => {
    //            console.log('im file!');
    //            //        this.push(file);
    //        })
    //})
    //    .on('end', function () {
    //        console.log('end')
    //    });
}


// exporting the plugin main function
export default fghioCollections;