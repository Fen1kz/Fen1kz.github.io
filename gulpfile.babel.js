import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

// uses ES6 lambda
gulp.task('hello', () => { console.log('hello'); });

gulp.task('deploy', () => {
    return gulp.src('./site/**/*')
        .pipe(ghPages({
            branch: 'master'
        }));
});

gulp.task('default', ['hello']);