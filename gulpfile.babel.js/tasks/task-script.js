let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('script:local', () => {
        return browserify({debug: true})
            .transform(babelify)
            .require(dirs.src + '/theme-dust/js/script.js', {entry: true})
            .bundle()
            .on('error', function handleError(err) {
                console.error(err.toString());
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(dirs.dist$.scripts));
    });

    gulp.task('script:vendor', () => {
        return gulp.src(globs.src.script.vendor)
            .pipe($.expectFile(globs.src.script.vendor))
            .pipe($.concat('vendor.min.js'))
            .pipe(gulp.dest(dirs.dist$.scripts))
    });

    gulp.task('script', ['script:local', 'script:vendor']);
}