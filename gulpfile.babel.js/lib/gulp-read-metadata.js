let throughPipes = require('through-pipes');

let $ = {
    tap: require('gulp-tap')
    , frontMatter: require('gulp-front-matter')
};

let readMetadata = () => (throughPipes((readable) => (readable
        .pipe($.frontMatter({
            property: 'metadata'
        }))
        .pipe($.tap((file, t) => {
            file.data = {
                file: {
                    meta: file.metadata
                }
            };
        }))
)));

export default readMetadata;