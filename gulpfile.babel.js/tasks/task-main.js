let rimraf = require('rimraf');
let eventStream = require('event-stream');

let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('glob', () =>
        gulp.src(globs.src.style.vendor)
            .pipe($.tap((file) => console.log(file.path))));

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

    gulp.task('deploy', () => {
        return gulp.src('./site/**/*.*')
            .pipe($.ghPages({
                branch: 'master'
                //, force: true
                , push: true
            }));
    });

    gulp.task('build', $.sequence('dist:clean', ['vendor', 'content', 'scripts', 'styles', 'collections', 'raw']));

    gulp.task('watch', ['build'], () => {
        gulp.watch([globs.src, globs.helpers, globs.raw], ['content', 'scripts', 'styles', 'collections']);
    });
}