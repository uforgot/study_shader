const fs = require('fs');

class ejsScssClearPlugin {
  constructor(options = {}) {
    console.log('> clear : ' + options.scssFile);
    this.scssFile = options.scssFile;

    fs.writeFile(this.scssFile, '', () => {
      console.log('> clear : ' + options.scssFile + ' completed');
    });
  }
  apply(compiler) {}
}

module.exports = ejsScssClearPlugin;
