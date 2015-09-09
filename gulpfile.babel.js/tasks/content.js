let $path = require('path');
let gutil = require('gulp-util');
let throughPipes = require('through-pipes');
let through2 = require('through2');
let eventStream = require('event-stream');
let _ = require('lodash');
let Promise = require('bluebird');

let log = (msg) => gutil.log(gutil.colors.cyan('gulp-content'), msg);
let warn = (msg) => gutil.log(gutil.colors.yellow('gulp-content'), msg);

export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    let insert2Template = require('./../lib/gulp-insert-to-template');
    let fghioCollections = require('./../lib/gulp-fghio-collections');
    let readMetadata = require('./../lib/gulp-read-metadata');
    let globalMetadata;

    let writeMetadata = () => (throughPipes((readable) => (readable
            .pipe(readMetadata())
            .pipe($.tap((file, t) => {
                let meta = file.data.file.meta;
                //let copy = _.clone(file, true);
                //delete copy.contents;
                //delete copy._contents;
                //delete copy.stat;
                ////console.log(copy);

                if (!meta.timestamp) {
                    warn(`Found post without timestamp: ${file.path}`);
                    meta.timestamp = new Date().getTime();
                    log(`set timestamp: ${meta.timestamp}`);
                }

                if (!meta.title) {
                    warn(`Found post without title: ${file.path}`);
                    meta.title = $path.basename(file.path, $path.extname(file.path));
                    log(`set title: ${meta.title}`);
                }
                meta.title = _.startCase(meta.title);

                let metadataToWrite = _.map(meta, (value, key) => {
                    return `${key}: ${value}`;
                }).join('\n');

                metadataToWrite = '---\n' + metadataToWrite + '\n---\n';
                //console.log(metadataToWrite);

                file.contents = Buffer.concat([
                    new Buffer(metadataToWrite),
                    file.contents
                ]);
            }))
            .pipe(gulp.dest(dirs.src))
    )));

    let collectionsMap = {
        posts: [/^posts$/]
        , self: [/^self$/]
    };

    let readGlobalMetadata = () => (throughPipes((readable) => {
            globalMetadata = {
                tags: {}
                , collections: {}
            };
            _.forIn(collectionsMap, (v, k) => {
                globalMetadata.collections[k] = [];
            });
            return readable
                .pipe($.frontMatter({
                    property: ''
                }))
                .pipe($.tap((file, t) => {
                    let meta = file.data.file.meta;
                    let fileUrl = gutil.replaceExtension(file.relative, '.html').replace('\\', '/');
                    //console.log('meta:', meta);
                    //console.log('base:', $path.dirname(file.relative));
                    if (meta.tags) {
                        meta.tags.split(',').map((metaTag) => {
                            let tag = _.chain(metaTag).trim().kebabCase().value();
                            if (!globalMetadata.tags[tag]) {
                                globalMetadata.tags[tag] = [];
                            }
                            globalMetadata.tags[tag].push(fileUrl);
                        });
                    }

                    let base = $path.dirname(file.relative);
                    _.forIn(collectionsMap, (basePatterns, collectionName) => {
                        _.forEach(basePatterns, (basePattern) => {
                            if (basePattern.test(base)) {
                                globalMetadata.collections[collectionName].push({
                                    href: fileUrl
                                    , meta: meta
                                });
                            }
                        });
                    });
                    //console.log(file.path, 'metadata collection complete')
                }))
                .on('end', () => {
                    console.log('root:', globalMetadata);
                })
        }
    ));

    let insertAndPlace = () => (throughPipes((readable) => (readable
            .pipe(insert2Template({
                data: {
                    global: globalMetadata
                }
            }))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist))
    )));

    gulp.task('meta:read', () => {
        return eventStream.merge(
            gulp.src(globs.md)
                .pipe(writeMetadata())
            , gulp.src(globs.root, {base: './root'})
                .pipe(writeMetadata())
        )
            .pipe(readGlobalMetadata());
    });

    //gulp.task('collections:collections', ['meta:read'], (cb) => {
    gulp.task('collections:collections', () => {
        return fghioCollections({
            name: 'collections'
            , data: globalMetadata
            , templates: {
                main: './helpers/fhgio-collections/collections-main.tl'
                , sub: './helpers/fhgio-collections/collections-sub.tl'
            }
        })
            //.pipe(insertAndPlace());
            .pipe($.tap((file) => {
                console.log('tap', file);
            }))
            .on('close', function() {
                console.log('close');
            })
            .on('end', function() {
                console.log('end');
            })
            .on('finish', function() {
                console.log('finish');
            });
    });

    gulp.task('content', ['meta:read'], () => {
        return eventStream.merge(
            gulp.src(globs.md)
                .pipe(readMetadata())
                .pipe($.extReplace('.md'))
                .pipe($.marked())
            , gulp.src(globs.root)
                .pipe(readMetadata())
        )
            //.pipe(fghioCollections({
            //    name: 'tags'
            //    , data: globalMetadata.tags
            //}))
            .pipe(insertAndPlace());
    });
}