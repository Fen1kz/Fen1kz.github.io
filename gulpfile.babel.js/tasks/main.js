import rimraf from 'rimraf';

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('dist:clean', (cb) => {
        rimraf(dirs.dist, cb);
    });

    gulp.task('deploy', () => {
        return gulp.src(globs.src)
            .pipe($.ghPages({
                branch: 'master'
            }));
    });

    gulp.task('default', ['hello']);

    gulp.task('build', $.sequence('dist:clean', 'content'));

    gulp.task('watch', ['build'], () => {
        gulp.watch(globs.theme, () => {
            gulp.run('content');
        });
    });
}