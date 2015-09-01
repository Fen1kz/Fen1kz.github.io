let through = require('through2');
let gutil = require('gulp-util');
let jade = require('jade');
let util = require('util');
let fs = require("fs");

let extend = util._extend;
let ext = gutil.replaceExtension;
let PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-template';

function gulpPrefixer(options) {
    let opts = extend({
        pretty: true
    }, options);

    console.log('compiling template');
    let template = fs.readFileSync('./src/theme/index.jade');
    //console.log(file);
    let compiledTemplate = jade.compile(template, opts);

    let compileJade = function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            try {
                let data = {
                    file: {
                        metadata: file.metadata
                        , contents: String(file.contents)
                    }
                };
                let compiledFile = compiledTemplate(data);
                file.contents = new Buffer(compiledFile);
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