let rimraf = require('rimraf');
let eventStream = require('event-stream');

let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('raw', () => {
        return gulp.src(globs.raw)
            .pipe(gulp.dest(dirs.dist))
    });

    gulp.task('scripts', () => {
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

    gulp.task('styles', () => {
        return gulp.src(globs.styles)
            .pipe($.sourcemaps.init())
            .pipe($.if('*.scss', $.sass().on('error', $.sass.logError)))
            .pipe($.concat('style.min.css'))
            .pipe($.minifyCss())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(dirs.dist$.styles))
    });

    gulp.task('dist:clean', (cb) => {
        return rimraf(dirs.dist, cb);
    });

    gulp.task('deploy', () => {
        return gulp.src('./site/**/*.*')
            .pipe($.ghPages({
                branch: 'master'
                , force: true
                , push: true
            }));
    });

    gulp.task('build', $.sequence('dist:clean', ['vendor', 'content', 'scripts', 'styles', 'collections', 'raw']));

    gulp.task('watch', ['build'], () => {
        gulp.watch([globs.src, globs.helpers, globs.raw], ['content', 'scripts', 'styles', 'collections']);
    });
}