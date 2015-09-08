let mainTemplate = `
---
timestamp: 1441718580963
title: Collections
---
{@loop:global.collections}
    <div class="z-depth-1 padding">
        <h4><a href="/collections/{key}">{@startCase:key/}</a></h4>
        <div class="collection">
            {@loop:value}
                <a class="collection-item" href="/{value.href}">{value.meta.title}</a>
            {/loop}
        </div>
    </div>
{/loop}
`;

let subTemplate = (collectionName) => (`
---
timestamp: 1441718580963
title: Collections/${_.startCase(collectionName)}
header: <a href="/collections/">Collections</a>/<a href="/collections/${collectionName}">${_.startCase(collectionName)}</a>
---
<div class="z-depth-1 padding">
    <div class="collection">
        {@loop:global.collections.${collectionName}}
            <a class="collection-item" href="/{value.href}">{value.meta.title}</a>
        {/loop}
    </div>
</div>
`);

let _ = require('lodash');
let $ = {
    tap: require('gulp-tap')
    , util: require('gulp-util')
    , file: require('gulp-file')
    , frontMatter: require('gulp-front-matter')
};
let throughPipes = require('through-pipes');
let eventStream = require('event-stream');
let readMetadata = require('./gulp-read-metadata');

let log = (msg) => $.util.log($.util.colors.cyan('fghioCollections'), msg);

function fghioCollections(options) {
    log('start');
    let collections = options.data;
    let collectionArray = _.map(collections, (collection, collectionName) => {
        return $.file(`collections/${collectionName}/index.tl`, subTemplate(collectionName), {})
            .pipe(readMetadata());
    });

    let collectionsIndex = $.file('collections/index.tl', mainTemplate, {})
        .pipe(readMetadata());

    let collectionStreams = _.reduce(collectionArray, ((result, stream) => eventStream.merge(result, stream)), collectionsIndex);

    return throughPipes((readable) => (
        eventStream.merge(readable, collectionStreams)
    ))
}


// exporting the plugin main function
export default fghioCollections;