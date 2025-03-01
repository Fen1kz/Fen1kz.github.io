let _ = require('lodash');

export default {
    truncae: (chunk, ctx, bodies) => {
        _.forIn(ctx.current(), (value, key) => {
            chunk = chunk.render(bodies.block, ctx.push({key: key, value: value}));
        });
        return chunk;
    }
    , startCase: (chunk, ctx, bodies, params) => {
        return chunk.write(_.startCase(ctx.current()))
    }
}