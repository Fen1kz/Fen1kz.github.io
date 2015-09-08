let path = require('path');
let gutil = require('gulp-util');
let through = require('through-pipes');
let eventStream = require('event-stream');
let _ = require('lodash');

let log = (msg) => gutil.log(gutil.colors.cyan('gulp-content'), msg);
let warn = (msg) => gutil.log(gutil.colors.yellow('gulp-content'), msg);

export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    let insert2Template = require('./../lib/gulp-insert-to-template');
    let globalMetadata;

    let writeMeta = () => (through((readable) => (readable
        .pipe($.frontMatter({
            property: 'metadata'
        }))
        .pipe($.tap((file, t) => {
            file.data = {
                file: {
                    meta: file.metadata
                }
            };
        }))
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
                meta.title = path.basename(file.path, path.extname(file.path));
                log(`set title: ${meta.title}`);
            }

            let metadataToWrite = _.map(meta, (value, key) => {
                return `${key}: ${value}`;
            }).join('\n');

            metadataToWrite = '---\n' + metadataToWrite + '\n ---\n';

            file.contents = Buffer.concat([
                new Buffer(metadataToWrite),
                file.contents
            ]);
        }))
        .pipe(gulp.dest(dirs.src)))));

    let readMeta = () => (through((readable) => {
            globalMetadata = {
                tags: {}
            };
            return readable
                .pipe($.frontMatter({
                    property: ''
                }))
                .pipe($.tap((file, t) => {
                    let meta = file.data.file.meta;
                    console.log('meta:', meta);
                    console.log('base:', path.dirname(file.relative));

                    if (meta.tags) {
                        meta.tags.split(',').map((metaTag) => {
                            let tag = _.chain(metaTag).trim().kebabCase().value();
                            if (!globalMetadata.tags[tag]) {
                                globalMetadata.tags[tag] = [];
                            }
                            let fileUrl = gutil.replaceExtension(file.relative, '.html').replace('\\', '/');
                            globalMetadata.tags[tag].push(fileUrl);
                        });
                    }
                }))
                .on('end', () => {
                    console.log('root:', globalMetadata);
                })
        }
    ));

    gulp.task('content', () => {
        let markdown = gulp.src(globs.md)
            .pipe(writeMeta())
            .pipe($.extReplace('.md'))
            .pipe($.marked());

        let index = gulp.src(globs.index)
            .pipe(writeMeta());

        return eventStream.merge(index, markdown)
            .pipe(readMeta())
            .pipe(insert2Template({}))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist));
    });
}