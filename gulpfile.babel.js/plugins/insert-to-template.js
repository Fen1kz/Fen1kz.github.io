let Promise = require("bluebird");
let _ = require("lodash");
let through = require('through2');
let dust = require('dustjs-helpers');
let glob = require('glob');

let fs = require("fs");
let path = require("path");
let readFile = Promise.promisify(fs.readFile);

let dustRender$ = Promise.promisify(dust.render);
let dustHelpers = require('./../lib/dust-helpers');

const PLUGIN_NAME = 'insert-to-template';

export default (gulp, $, config) => {
    let logger = $.getLogger(PLUGIN_NAME);
    return (options) => {
        logger.log('start');

        options = options || {};

        Object.assign(dust.config, {whitespace: true}, options.config);
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
                this.emit('error', new $.PluginError(PLUGIN_NAME, 'Streams are not supported!'));
                return cb();
            }

            if (file.isBuffer()) {
                if (!file.data) logger.warn(`${file.path} has not file.data`);
                file.data = file.data || {};
                if (!file.data.file) logger.warn(`${file.path} has not file.data.file`);
                file.data.file = file.data.file || {};
                if (!file.data.file.meta) logger.warn(`${file.path} has not file.data.file.meta`);
                file.data.file.meta = file.data.file.meta || {};

                let data = _.merge({}, file.data, {
                    global: config.globalMetadata
                    , file: {
                        contents: String(file.contents)
                    }
                });
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
                        //log(`rendering (${template.name}) ${file.path}`);
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
    }
};