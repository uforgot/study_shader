const fs = require('fs');
const os = require('os');

module.exports = function ejsScssLoader(content) {
  // console.log( '> ejs');
  // console.log('fileName : ' + this.resourcePath);

  let ejsStyleIdentifier = '';

  if (/^win/i.test(os.type())) {
    ejsStyleIdentifier = 'src/' + this.resourcePath.split('\\src\\')[1];
  } else {
    ejsStyleIdentifier = 'src/' + this.resourcePath.split('/src/')[1];
  }

  let scss = content.match(/<style[^>]*?>[\s\S]*?<\/style>/gi);
  let ejs = content.replace(/<style[^>]*?>[\s\S]*?<\/style>/gi, '');

  if (scss) {
    // console.log('---> style');
    let startDelimiter = '//start-/' + ejsStyleIdentifier;
    let endDelimiter = '//end-/' + ejsStyleIdentifier + '\n';

    let scssString = startDelimiter;
    scssString += scss
      .toString()
      .replace('<style>', '')
      .replace('</style>', '');
    scssString += endDelimiter;
    const options = this.getOptions();

    let data;
    try {
      data = fs.readFileSync(options.scssFile);
    } catch (err) {
      fs.writeFileSync(options.scssFile, '', { flag: 'w' });
      data = fs.readFileSync(options.scssFile);
    }
    const result = data.toString();
    // console.log(ejsStyleIdentifier);

    const headArray = result.split(startDelimiter);

    if (headArray.length > 1) {
      const merge = headArray[0] + scssString + result.split(endDelimiter)[1];
      try {
        fs.writeFileSync(options.scssFile, merge);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        fs.appendFileSync(options.scssFile, scssString);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // console.log('---> ejs');
  // console.log(ejs);
  return ejs;
};
