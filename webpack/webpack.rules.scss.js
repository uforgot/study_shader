import sassEmbedded from 'sass-embedded';
const WebpackRulesScss = (argv, version) => {
  return {
    test: /\.scss$/,
    exclude: /node_module/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: `assets/css/[name].${version}.css`
        }
      },
      {
        loader: 'extract-loader'
      },
      {
        loader: 'css-loader',
        options: {
          url: false
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: argv.mode !== 'production',
          implementation: sassEmbedded,
          sassOptions: {
            quietDeps: true
          }
        }
      }
    ]
  };
};

export default WebpackRulesScss;
