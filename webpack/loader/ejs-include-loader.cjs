const fs = require('fs');

module.exports = function ejsIncludeLoader(content) {
  let ejs = content;
  const options = this.getOptions();

  options.includeFiles.forEach((file) => {
    const pattern = new RegExp(`<!-- include:${file} -->`, 'g');
    try {
      const data = fs.readFileSync('./src/ejs/include/' + file);
      ejs = ejs.replace(pattern, data);
    } catch (err) {
      console.log(err);
    }
  });

  return ejs;
};
