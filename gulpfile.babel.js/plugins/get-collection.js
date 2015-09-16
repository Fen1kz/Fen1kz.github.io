let _ = require('lodash');
let $path = require('path');
let $ = {util: require('gulp-util')};

let debug = (false) ? console.log : () => (void 0);

class Collection {
    constructor(name, config) {
        this.name = name;
        if (_.isArray(config)) config = {globs: config};
        this.config = _.defaults({}, config, {
            globs: []
        });
        this.files = [];

        this.globs = this.config.globs.map((glob) => new RegExp(`^${glob}$`));
    }

    parse(file) {
        let base = $path.dirname(file.relative);
        debug(`Collection [${this.name}] parsing [${base}]`);
        //debug('this.config.globs:', this.config);
        _.forEach(this.globs, (glob) => {
            //debug('RegExp:', glob);
            //debug('base:', glob.test(base), base);
            if (glob.test(base)) {
                this.addFile(file);
            }
        });
        ////console.log(globalMetadata.collections[collectionName].map(item => item.meta.title + ':' + item.meta.timestamp))
        //collection.files.sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
    }

    sort() {
        this.files.sort((item1, item2) => item1.meta.timestamp < item2.meta.timestamp ? 1 : -1);
    }

    addFile(file) {
        let meta = file.data.file.meta;
        let fileUrl = $.util.replaceExtension(file.relative, '.html').replace('\\', '/');
        this.files.push({
            href: fileUrl
            , meta: meta
            , content: file.contents.toString()
        });
    }

    clear() {
        this.files = [];
    }
}

export default (gulp, $, config) => {
    return (name, config) => new Collection(name, config)
};