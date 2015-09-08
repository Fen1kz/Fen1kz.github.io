let through = require('through2');
let gutil = require('gulp-util');
let dust = require('dustjs-linkedin');
let util = require('util');
let glob = require('glob');
let _ = require("lodash");
let Promise = require("bluebird");

let fs = require("fs");
let path = require("path");
let readFile = Promise.promisify(fs.readFile);

let config = require('../config');
let extend = util._extend;
let ext = gutil.replaceExtension;
let PluginError = gutil.PluginError;

let dustRender$ = Promise.promisify(dust.render);
let dustHelpers = require('./dust-helpers');

const PLUGIN_NAME = 'gulp-template';

let log = (msg) => gutil.log(gutil.colors.cyan('gulp-insert-to-template'), msg);
let warn = (msg) => gutil.log(gutil.colors.yellow('gulp-insert-to-template'), msg);

function gulpPrefixer(options) {
    log('start');
    options = options || {};

    let opts = extend({
        whitespace: true
    }, options.config);

    Object.assign(dust.config, opts);
    Object.assign(dust.helpers, dustHelpers);

    let templates = {};
    let files = glob.sync(config.globs.theme);
    files.forEach((filePath) => {
        let name = path.basename(filePath, path.extname(filePath));
        let content = fs.readFileSync(filePath);
        let compiled = dust.compile(content.toString(), name);

        let template = {
            path: filePath
            , name: name
            //, content: content
            , compiled: compiled
        };
        dust.loadSource(compiled);
        templates[template.name] = template;
    });

    let renderTemplate = function (file, enc, cb) {
        let fn = this;

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            if (!file.data) warn(`${file.path} has not file.data`);
            file.data = file.data || {};
            if (!file.data.file) warn(`${file.path} has not file.data.file`);
            file.data.file = file.data.file || {};
            if (!file.data.file.meta) warn(`${file.path} has not file.data.file.meta`);
            file.data.file.meta = file.data.file.meta || {};

            let data = _.merge({}, file.data, {
                file: {
                    contents: String(file.contents)
                }
            }, options.data);
            let templateName = (data.file.meta.template
                ? `template-${data.file.meta.template}`
                : `template`);
            //let templateName = 'template';
            let template = templates[templateName];

            Promise.try(() => {
                dust.loadSource(dust.compile(file.contents.toString(), file.path));
                return dustRender$(file.path, data)
            })
                .then((content) => {
                    data.file.contents = content;
                    log(`rendering (${template.name}) ${file.path}`);
                    return dustRender$(template.name, data);
                })
                .then((rendered) => {
                    file.contents = new Buffer(rendered);

                    // make sure the file goes through the next gulp plugin
                    fn.push(file);

                    // tell the stream engine that we are done with this file
                    cb();
                })
                .catch((e) => {
                    return cb(new PluginError(PLUGIN_NAME, e));
                })
        }
    };

    // returning the file stream
    return through.obj(renderTemplate);
};


// exporting the plugin main function
export default gulpPrefixer;