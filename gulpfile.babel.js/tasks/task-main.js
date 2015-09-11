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

    gulp.task('build', $.sequence('clean:all', ['content', 'script', 'style', 'collections', 'copy']));

    gulp.task('watch', ['build'], () => {
        gulp.watch([globs.src.all, globs.helpers], ['content', 'script:local', 'style:local', 'collections']);
    });
}