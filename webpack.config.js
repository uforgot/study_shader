import * as path from 'path';
import * as urlNode from 'url';
const __dirname = urlNode.fileURLToPath(new URL('.', import.meta.url));
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import * as ConfigSite from './src/config/config.site.cjs';

const EjsScssClearPlugin = require('./webpack/plugin/ejs-scss-clear-plugin.cjs');
import WebpackRulesESBuild from './webpack/webpack.rules.esbuild.js';
import WebpackRulesEjs from './webpack/webpack.rules.ejs.js';
import WebpackRulesScss from './webpack/webpack.rules.scss.js';
import WebpackPluginBeautifyHtml from './webpack/webpack.plugin.beautify.html.js';

import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import RemoveFilesWebpackPlugin from 'remove-files-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackRulesGlsl from './webpack/webpack.rules.glsl.js';

export default (env, argv) => {
  const date = new Date();
  const version = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const setting = {
    mode: argv.mode,
    entry: {
      css: ['./src/scss/style.scss'],
      index: ['./src/ts/index.ts']
    },
    output: {
      publicPath: '/',
      filename: `assets/js/[name].bundle.${version}.js`,
      path: path.resolve(__dirname, 'dist/'),
      sourceMapFilename: '[file].map'
    },
    resolve: {
      extensions: ['.js', '.ts', '.json', '.scss', 'css', 'ejs'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        path: require.resolve('path-browserify')
      }
    },
    module: {
      rules: [
        WebpackRulesGlsl(argv),
        WebpackRulesESBuild(argv),
        WebpackRulesScss(argv, version),
        WebpackRulesEjs(argv)
      ]
    },
    devServer: {
      host: '0.0.0.0',
      static: {
        publicPath: '/static/',
        directory: path.join(__dirname, 'dist/static'),
        watch: true
      },
      liveReload: true,
      hot: false,
      compress: false,
      port: 3000
    },
    plugins: [
      new EjsScssClearPlugin({ scssFile: ConfigSite.default.EJS_SCSS_FILE }),
      new RemoveFilesWebpackPlugin({
        before: {
          test: [{ folder: 'dist', method: () => true }],
          exclude: ['./dist/static']
        }
      }),
      new HtmlWebpackTagsPlugin({
        hash: true,
        tags: [`/assets/css/style.${version}.css`],
        publicPath: '',
        append: false
      }),
      new HtmlWebpackPlugin({
        templateParameters: {
          title: 'index',
          namespace: 'index'
        },
        hash: true,
        template: path.resolve(__dirname, './src/ejs/page/page.index.ejs'),
        chunks: ['index'],
        filename: 'index.html'
      })
    ]
  };

  if (argv.mode === 'development') {
    // sass debug 활성화
    setting.stats = {
      loggingDebug: ['sass-loader']
    };
    // setting.plugins.push(new LiveReloadPlugin({}));
    // setting.devtool = 'eval-source-map';
    setting.devtool = 'eval-cheap-module-source-map';
    // setting.cache = 'memory';
  } else {
    setting.devtool = false;
    setting.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    };
  }
  setting.plugins.push(WebpackPluginBeautifyHtml);

  return setting;
};
