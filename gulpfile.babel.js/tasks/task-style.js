let throughPipes = require('through-pipes');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    let compileMinify = () => (throughPipes((readable) => (readable
            .pipe($.sourcemaps.init())
            .pipe($.if('*.scss', $.sass().on('error', $.sass.logError)))
            .pipe($.minifyCss())
            .pipe($.sourcemaps.write())
    )));

    gulp.task('style:local', () => {
        return gulp.src(globs.src.style.local)
            .pipe(compileMinify())
            .pipe($.concat('style.min.css'))
            .pipe(gulp.dest(`${dirs.dist}/css`))
    });

    gulp.task('style:vendor', () => {
        let glob = [].concat(globs.src.style.extension, globs.src.style.vendor);
        return gulp.src(glob)
            .pipe($.expectFile({reportUnexpected: false}, globs.src.style.vendor))
            .pipe(compileMinify())
            .pipe($.concat('vendor.min.css'))
            .pipe(gulp.dest(`${dirs.dist}/css`))
    });

    gulp.task('style', ['style:local', 'style:vendor']);
}