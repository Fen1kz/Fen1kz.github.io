export default function (gulp, $, config, helpers) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('copy:root', () => {
        return gulp.src(globs.src.root)
            .pipe(gulp.dest(`${dirs.dist}`))
    });

    gulp.task('copy:projects', () => {
        return gulp.src(globs.src.projects)
            .pipe(gulp.dest(`${dirs.dist}/projects`))
    });

    gulp.task('copy', ['copy:root', 'copy:projects']);
}