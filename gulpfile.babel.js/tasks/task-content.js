let _ = require('lodash');
let throughPipes = require('through-pipes');
let eventStream = require('event-stream');

export default (gulp, $, config, helpers) => {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('content', ['meta:read'], () => {
        return eventStream.merge(
            gulp.src(globs.src.content.md)
                .pipe($.readMetadata())
                .pipe($.extReplace('.md'))
                .pipe($.markdown(config.pluginOptions.markdown))
            , gulp.src(globs.src.content.root)
                .pipe($.readMetadata())
        ).pipe($.insertAndPlace());
    });
}