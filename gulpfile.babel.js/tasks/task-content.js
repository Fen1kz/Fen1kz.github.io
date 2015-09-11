let _ = require('lodash');
let throughPipes = require('through-pipes');
let eventStream = require('event-stream');


export default (gulp, $, config) => {
    let log = (msg) => $.util.log($.util.colors.cyan('gulp-content'), msg);
    let warn = (msg) => $.util.log($.util.colors.yellow('gulp-content'), msg);
    let dirs = config.dirs;
    let globs = config.globs;
    let insert2Template = require('./../lib/fghio-insert-to-template');
    let fghioCollections = require('./../lib/fghio-collections');
    let readMetadata = require('./../lib/fghio-read-metadata');
    let {fn: readGlobalMetadata, obj: globalMetadata} = require('./../lib/fghio-read-global-metadata');

    let insertAndPlace = () => (throughPipes((readable) => (readable
            .pipe(insert2Template({
                data: {
                    global: globalMetadata
                }
            }))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist))
    )));

    gulp.task('content', ['meta:read'], () => {
        return eventStream.merge(
            gulp.src(globs.src.content.md)
                .pipe(readMetadata())
                .pipe($.extReplace('.md'))
                .pipe($.markdown(config.pluginOptions.markdown))
            , gulp.src(globs.src.content.root)
                .pipe(readMetadata())
        ).pipe(insertAndPlace());
    });

    //gulp.task('collections', ['collections:collections', 'collections:tags']);
    //{
    //    gulp.task('collections:collections', ['meta:read'], () => {
    //        return fghioCollections({
    //            name: 'collections'
    //            , data: globalMetadata
    //            , directory: ''
    //            , templates: {
    //                main: './helpers/fhgio-collections/collections-main.html'
    //                , sub: './helpers/fhgio-collections/collections-sub.html'
    //            }
    //        }).pipe(insertAndPlace());
    //    });
    //
    //    gulp.task('collections:tags', ['meta:read'], () => {
    //        return fghioCollections({
    //            name: 'tags'
    //            , data: globalMetadata
    //            , templates: {
    //                main: './helpers/fhgio-collections/tags-main.html'
    //                , sub: './helpers/fhgio-collections/tags-sub.html'
    //            }
    //        }).pipe(insertAndPlace());
    //    });
    //}

}