let $path = require('path');
let eventStream = require('event-stream');
let _ = require('lodash');

export default (gulp, $, config) => {
    let log = (msg) => $.util.log($.util.colors.cyan('gulp-content'), msg);
    let warn = (msg) => $.util.log($.util.colors.yellow('gulp-content'), msg);
    let dirs = config.dirs;
    let globs = config.globs;
    let readMetadata = require('./../lib/fghio-read-metadata');
    let {fn: readGlobalMetadata, obj: globalMetadata} = require('./../lib/fghio-read-global-metadata');

    gulp.task('meta:write', () => {
        return eventStream.merge(gulp.src(globs.src.content.md)
            , gulp.src(globs.src.content.root, {base: './root'}))
            .pipe(readMetadata())
            .pipe($.tap((file, t) => {
                let meta = file.data.file.meta;
                let changed = false;

                if (!meta.timestamp) {
                    warn(`Found post without timestamp: ${file.path}`);
                    meta.timestamp = new Date().getTime();
                    changed = true;
                    log(`set timestamp: ${meta.timestamp}`);
                }

                if (!meta.title) {
                    warn(`Found post without title: ${file.path}`);
                    meta.title = $path.basename(file.path, $path.extname(file.path));
                    changed = true;
                    log(`set title: ${meta.title}`);
                }
                meta.title = _.startCase(meta.title);

                let metadataToWrite = _.map(meta, (value, key) => {
                    return (!_.startsWith(key, '$')
                        ? `${key}: ${value}`
                        : null);
                }).filter((item) => item !== null).join('\n');

                metadataToWrite = '---\n' + metadataToWrite + '\n---\n';
                //console.log(metadataToWrite);

                if (changed) {
                    file.data.changed = true;
                    file.contents = Buffer.concat([
                        new Buffer(metadataToWrite),
                        file.contents
                    ]);
                }
            }))
            .pipe($.if((file) => file.data.changed, gulp.dest(dirs.src)))
    });

    gulp.task('meta:read', ['meta:write'], () => {
        return eventStream.merge(
            gulp.src(globs.src.content.md)
                .pipe(readMetadata())
                .pipe($.extReplace('.md'))
                .pipe($.markdown(config.pluginOptions.markdown))
            , gulp.src(globs.src.content.root, {base: './root'})
                .pipe(readMetadata()))
            .pipe(readGlobalMetadata($));
    });
}