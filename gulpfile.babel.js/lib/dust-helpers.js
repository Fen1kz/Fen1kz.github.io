let _ = require('lodash');
let dust = require('dustjs-helpers');
let htmlTruncate = require('html-truncate');

export default {
    loop: (chunk, ctx, bodies) => {
        _.forIn(ctx.current(), (value, key) => {
            chunk = chunk.render(bodies.block, ctx.push({key: key, value: value}));
        });
        return chunk;
    }
    , startCase: (chunk, ctx, bodies, params) => {
        return chunk.write(_.startCase(ctx.current()))
    }
    , truncate: (chunk, context, bodies, params) => {
        let data = dust.helpers.tap(params.data, chunk, context)
            , length = dust.helpers.tap(params.length, chunk, context)
            , href = dust.helpers.tap(params.href, chunk, context);

        let truncated = htmlTruncate(data, length);

        if (data.length > length) {
            truncated += `<div><a href="${href}">Read more</a></div>`;
        }

        return chunk.write(truncated);
    }
}