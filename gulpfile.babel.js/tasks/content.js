let path = require('path');
let gutil = require('gulp-util');
let through = require('through-pipes');
let _ = require('lodash');

let log = (msg) => gutil.log(gutil.colors.cyan('gulp-content'), msg);
let warn = (msg) => gutil.log(gutil.colors.yellow('gulp-content'), msg);

export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    let insert2Template = require('./../lib/gulp-insert-to-template');
    let rootMetadata = {
        tags: {}
    };

    let fillMeta = () => (through((readable) => (readable
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

    let getMeta = () => (through((readable) => (readable
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

            if (meta.tags) {
                meta.tags.split(',').map((metaTag) => {
                    let tag = _.chain(metaTag).trim().kebabCase().value();
                    if (!rootMetadata.tags[tag]) {
                        rootMetadata.tags[tag] = [];
                    }
                    rootMetadata.tags[tag].push(gutil.replaceExtension(file.relative, '.html'));
                });
                console.log('root:', rootMetadata);
                //rootMetadata
            }
        })))));

    gulp.task('content:md', () => {
        let markdown = gulp.src(globs.md)
            .pipe(meta())
            .pipe($.extReplace('.md'))
            .pipe($.marked())

            .pipe(insert2Template({}))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist));
    });

    gulp.task('content:index', () => {
        gulp.src(globs.index)
            .pipe(meta())
            .pipe(insert2Template({}))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist));
    });

    gulp.task('content', ['content:index', 'content:md']);
}