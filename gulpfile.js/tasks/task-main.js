export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('glob', () =>
        gulp.src(globs.src.style.vendor)
            .pipe($.tap((file) => console.log(file.path))));

    gulp.task('deploy', () => {
        return gulp.src('./site/**/*.*')
            .pipe($.ghPages({
                branch: 'master'
                //, force: true
                , push: true
            }));
    });

    gulp.task('dist', $.sequence('clean:all', ['content', 'scripts', 'styles', 'collections', 'copy']));

    gulp.task('build', ['content', 'scripts:local', 'styles:local', 'collections', 'copy']);

    gulp.task('watch', ['dist'], () => {
        gulp.watch([globs.src.all, globs.helpers], ['build']);
    });
}