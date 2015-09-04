let through = require('through2');
let gutil = require('gulp-util');
let jade = require('jade');
let util = require('util');
let glob = require('glob');
let _ = require("lodash");
let Promise = require("bluebird");

let fs = require("fs");
let path = require("path");
let readFile = Promise.promisify(fs.readFile);

let extend = util._extend;
let ext = gutil.replaceExtension;
let PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-template';

let log = (msg) => gutil.log(gutil.colors.cyan('gulp-insert-to-template'), msg);

function gulpPrefixer(options) {
    let opts = extend({
        pretty: true
        , filename: './src/theme/template.jade'
    }, options);

    log('start');

    let templates = {};
    let files = glob.sync('./src/theme/*.jade');
    files.forEach((filePath) => {
        let content = fs.readFileSync(filePath);
        let compiled = jade.compile(content, opts);

        let template = {
            path: filePath
            , name: path.basename(filePath, path.extname(filePath))
            //, content: content
            , compiled: compiled
        };
        templates[template.name] = template;
    });

    let compileJade = function (file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            try {
                let data = _.merge({}, file.data, {
                    file: {
                        contents: String(file.contents)
                    }
                });
                let templateName = (data.file.meta.template
                    ? `template-${data.file.meta.template}`
                    : `template`);
                let template = templates[templateName].compiled;
                file.contents = new Buffer(template(data));
            } catch (e) {
                return cb(new PluginError('gulp-jade', e));
            }
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);

        // tell the stream engine that we are done with this file
        cb();
    };

    // returning the file stream
    return through.obj(compileJade);
};


// exporting the plugin main function
export default gulpPrefixer;