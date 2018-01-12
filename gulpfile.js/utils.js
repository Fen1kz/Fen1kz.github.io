const path = require('path');
const fs = require('fs');

module.exports = {
  requireDir: (requirePath) => fs.readdirSync(path.join(__dirname, requirePath))
    .reduce((result, file) => {
      console.log(result, file);
      return Object.assign(result, {
        [file]: require(path.join(__dirname, requirePath, file))
      })
    }, {})
}
