let throughPipes = require('through-pipes');

export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    return () => (throughPipes((readable) => (readable
            .pipe($.insertToTemplate({
                data: {
                    global: config.globalMetadata
                }
            }))
            .pipe($.extReplace('.html'))
            .pipe(gulp.dest(dirs.dist))
    )));
};