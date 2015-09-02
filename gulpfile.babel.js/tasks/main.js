import rimraf from 'rimraf';

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('hello', () => {
        console.log('hello');
    });

    gulp.task('deploy', () => {
        return gulp.src(globs.src)
            .pipe($.ghPages({
                branch: 'master'
            }));
    });

    gulp.task('theme:jade', () => {
        return gulp.src(globs.jade)
            .pipe(gulpJade({
                pretty: true
            }))
            .pipe(gulp.dest(dirs.dest))
    });

    gulp.task('dist:clean', (cb) => {
        rimraf(dirs.dest, cb);
    });

    gulp.task('default', ['hello']);

    gulp.task('make', $.sequence('dist:clean', 'theme:jade'));
}