let through = require('through-pipes');

export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    let insert2Template = require('./../lib/gulp-insert-to-template');

    let meta = () => (through((readable) => (readable
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
    )));

    gulp.task('content:md', () => {
        gulp.src(globs.md)
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
            .pipe($.jade({
                pretty: true
            }))
            .pipe(insert2Template({}))
            .pipe(gulp.dest(dirs.dist));
    });
}