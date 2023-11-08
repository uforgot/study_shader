import path from 'path';
import * as ConfigSite from './../src/config/config.site.cjs';

const WebpackRulesEjs = (argv, version) => {
  return {
    test: /\.ejs$/,
    exclude: /node_module/,
    use: [
      {
        loader: 'ejs-compiled-loader',
        options: {}
      },
      {
        loader: path.resolve('./webpack/loader/ejs-scss-loader.cjs'),
        options: {
          scssFile: ConfigSite.default.EJS_SCSS_FILE
        }
      },
      {
        loader: path.resolve('./webpack/loader/ejs-include-loader.cjs'),
        options: {
          includeFiles: ['include.head.ejs', 'include.tail.ejs']
        }
      }
    ]
  };
};

export default WebpackRulesEjs;
