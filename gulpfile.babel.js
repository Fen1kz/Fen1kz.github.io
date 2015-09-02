import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import gulpSequence from 'gulp-sequence';
import gulpForeach from 'gulp-foreach';
import gulpJade from 'gulp-jade';
import gulpTap from 'gulp-tap';
import frontMatter from 'gulp-front-matter';
import marked from 'gulp-marked';

import rimraf from 'rimraf';

import insert2Template from './gulp/gulp-template';

let dirs = {
    src: './src'
    , dest: './site'
};

let globs = {
    src: dirs.src + '/**/*'
    , index: dirs.src + '/index.*'
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

gulp.task('content:md', () => {
    gulp.src(globs.md)
        .pipe(frontMatter({
            property: 'metadata'
        }))
        .pipe(gulpTap((file, t) => {
            file.data = {
                file: {
                    data: file.metadata
                }
            };
        }))
        .pipe(marked())
        .pipe(insert2Template({}))
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('content:index', () => {
    gulp.src(globs.index)
        .pipe(frontMatter({
            property: 'metadata'
        }))
        .pipe(gulpTap((file, t) => {
            file.data = {
                file: {
                    meta: file.metadata
                }
            };
        }))
        .pipe(gulpJade({
            pretty: true
        }))
        .pipe(gulpTap((file, t) => {
            console.log(file.data)
        }))
        .pipe(insert2Template({}))
        .pipe(gulpTap((file, t) => {
            console.log(file.data)
        }))
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