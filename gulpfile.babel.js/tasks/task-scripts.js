let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('scripts:local', () => {
        return browserify({debug: true})
            .transform(babelify)
            .require(dirs.src + '/root/js/script.js', {entry: true})
            .bundle()
            .on('error', function handleError(err) {
                console.error(err.toString());
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`));
    });

    gulp.task('scripts:vendor', () => {
        return gulp.src(globs.src.scripts.vendor)
            .pipe($.expectFile(globs.src.scripts.vendor))
            .pipe($.concat('vendor.min.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`))
    });

    gulp.task('scripts', ['scripts:local', 'scripts:vendor']);
}