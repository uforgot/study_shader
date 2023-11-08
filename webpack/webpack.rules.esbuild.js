// esbuild config

const WebpackRulesESBuild = (argv) => {
  return {
    test: /\.(js|ts)$/,
    exclude: /node_module/,
    use: [
      {
        loader: 'esbuild-loader',
        options: {
          target: 'esnext'
        }
      }
    ]
  };
};

export default WebpackRulesESBuild;
