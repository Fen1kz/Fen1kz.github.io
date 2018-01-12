/*
 * Task Plugin Options
 * ============================================================================
 */

'use strict';

let Prism = require('prismjs');
let log = require('fancy-log');

let logger = {
    warn: (plugin, msg) => gutil.log(gutil.colors.yellow(plugin), msg)
};

module.exports = {
    markdown: {
        langPrefix: 'language-'
        , highlight: function (code, lang) {
            //console.log(Prism);
            if (Prism.languages[lang] === void 0) {
                logger.warn('markdown', `cannot find languages[${lang}]`);
                return code;
            } else {
                return `<div class='language-${lang}'>${Prism.highlight(code, Prism.languages[lang])}</div>`;
                //return Prism.highlight(code, Prism.languages[lang]);
            }
        }
    }
};
