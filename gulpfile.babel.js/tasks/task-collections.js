let _ = require('lodash');
let throughPipes = require('through-pipes');
let eventStream = require('event-stream');


export default (gulp, $, config) => {
    let dirs = config.dirs;
    let globs = config.globs;
    //let fghioCollections = require('./../lib/fghio-collections');
    gulp.task('collections:collections', ['meta:read'], () => {
        return $.fghioCollections({
            name: 'collections'
            , directory: ''
            , templates: {
                main: './helpers/fhgio-collections/collections-main.html'
                , sub: './helpers/fhgio-collections/collections-sub.html'
            }
        }).pipe($.insertAndPlace());
    });

    gulp.task('collections:tags', ['meta:read'], () => {
        return $.fghioCollections({
            name: 'tags'
            , templates: {
                main: './helpers/fhgio-collections/tags-main.html'
                , sub: './helpers/fhgio-collections/tags-sub.html'
            }
        }).pipe($.insertAndPlace());
    });

    gulp.task('collections', ['collections:collections', 'collections:tags']);
}