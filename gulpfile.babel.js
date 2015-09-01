import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import gulpJade from 'gulp-jade';
import gulpSequence from 'gulp-sequence';
import gulpForeach from 'gulp-foreach';
import frontMatter from 'gulp-front-matter';
import marked from 'gulp-marked';

import rimraf from 'rimraf';

import myGulpTransform from './gulp/gulp-template';

let dirs = {
    src: './src'
    , dest: './site'
};

let globs = {
    src: dirs.src + '/**/*'
    , md: dirs.src + '/**/*.md'
    , txt: dirs.src + '/**/*.txt'
    , jade: dirs.src + '/theme/**/*.jade'
};

// uses ES6 lambda
gulp.task('hello', () => {
    console.log('hello');
});

gulp.task('deploy', () => {
    return gulp.src(globs.src)
        .pipe(ghPages({
            branch: 'master'
        }));
});

gulp.task('content:template', () => {
    gulp.src(globs.md)
        .pipe(frontMatter({
            property: 'metadata'
        }))
        .pipe(myGulpTransform('TEST'))
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('content:md', function () {
    gulp.src(globs.md)
        .pipe(marked()) // Do whatever you want with the cleaned up datas
        .pipe(gulp.dest(dirs.dest));
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

gulp.task('make', gulpSequence('dist:clean', 'theme:jade'));