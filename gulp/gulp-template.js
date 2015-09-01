import through from 'through2';
import gutil   from 'gulp-util';

let PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-template';

function gulpPrefixer(prefixText) {
    if (!prefixText) {
        throw new PluginError(PLUGIN_NAME, 'Missing prefix text!');
    }

    prefixText = new Buffer(prefixText); // allocate ahead of time

    // creating a stream through which each file will pass
    var stream = through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            console.log(Object.keys(file));
            console.log(file.metadata);
            file.contents = Buffer.concat([prefixText, file.contents]);
        }

        // make sure the file goes through the next gulp plugin
        this.push(file);

        // tell the stream engine that we are done with this file
        cb();
    });

    // returning the file stream
    return stream;
};


// exporting the plugin main function
export default gulpPrefixer;