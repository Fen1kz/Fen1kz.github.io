let rimraf = require('rimraf');
let eventStream = require('event-stream');

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('vendor', () => {
        return eventStream.merge(
            gulp.src('./node_modules/jquery/dist/jquery.min.js')
                .pipe(gulp.dest(dirs.dist_vendor))
            //gulp.src('node_modules/modernizr/dist/modernizr-build.min.js')
            //    .pipe($.rename('modernizr.min.js'))
            //    .pipe($.uglify())
            //    .pipe(gulp.dest('build/vendor/modernizr-' + pkgs.modernizr))
        );
    });

    gulp.task('scripts', () => {
        return gulp.src(globs.scripts)
            .pipe(gulp.dest(dirs.dist_scripts))
    });

    gulp.task('dist:clean', (cb) => {
        return rimraf(dirs.dist, cb);
    });

    gulp.task('deploy', () => {
        return gulp.src(globs.src)
            .pipe($.ghPages({
                branch: 'master'
            }));
    });

    gulp.task('default', ['hello']);

    gulp.task('build', $.sequence('dist:clean', ['vendor', 'scripts', 'content']));

    gulp.task('watch', ['build'], () => {
        gulp.watch([globs.src], ['meta:read', 'content', 'scripts']);
    });
}