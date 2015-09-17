let _ = require('lodash');
let dust = require('dustjs-helpers');
let htmlTruncate = require('html-truncate');

export default {
    loop: (chunk, ctx, bodies, params) => {
        let keyName = dust.helpers.tap(params.key, chunk, ctx) || 'key';
        let valueName = dust.helpers.tap(params.value, chunk, ctx) || 'value';

        _.forIn(ctx.current(), (value, key) => {
            chunk.render(bodies.block, ctx.push({[keyName]: key, [valueName]: value}));
        });
        return chunk;
    }
    , if: (chunk, ctx, bodies, params) => {
        let condition = ctx.resolve(params.cond);
        if (!!condition) {
            chunk.render(bodies.block, ctx);
        }
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