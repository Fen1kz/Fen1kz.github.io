let throughPipes = require('through-pipes');

let _ = require('lodash');
let $path = require('path');
let $ = {
    tap: require('gulp-tap')
    , frontMatter: require('gulp-front-matter')
    , util: require('gulp-util')
};


let readBreadcrumbs = (options) => (
    $.tap((file, t) => {
        _.defaults(options, {
            index: 'home'
        });
        let makeLink = (link, text) => `<a href='/${link}'>${text}</a>`;
        let basenameOf = (item) => $path.basename(item, $path.extname(item));
        let meta = file.data.file.meta;

        let breadcrumbsArray = (meta.breadcrumbs
            ? meta.breadcrumbs.split('/')
            : file.relative.split($path.sep))
            .map((item) => basenameOf(item))
            .filter((item, index, array) => {
                return !(index === array.length - 1 && basenameOf(item) === 'index')
            })
            .map((item, index, array) => {
                return {
                    text: item
                    , link: ''
                };
            });

        let lastItem = breadcrumbsArray.pop();

        breadcrumbsArray.reduce((result, item) => {
            let link = result + item.text;
            item.link = link;
            return link;
        }, '');

        breadcrumbsArray = breadcrumbsArray.map((item, index, array) => {
            return makeLink(item.link, item.text);
        });

        breadcrumbsArray.unshift(makeLink('', '/' + options.index));
        if (lastItem) {
            breadcrumbsArray.push(`<strong>${meta.title}</strong>`);
        }
        file.data.file.breadcrumbs = breadcrumbsArray.join('<span> / </span>');
    }));

let readMetadata = () => (throughPipes((readable) => (readable
        //.pipe($.tap((file) => {
        //    console.log(file, file.metadata);
        //}))
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
        .pipe(readBreadcrumbs({
            index: 'root'
        }))
)));

export default readMetadata;