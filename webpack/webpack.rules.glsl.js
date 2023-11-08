const WebpackRulesGlsl = (argv) => {
  return {
    test: /\.(frag|vert|glsl)$/,
    exclude: /node_module/,
    use: [
      {
        loader: 'glsl-shader-loader',
        options: {}
      }
    ]
  };
};

export default WebpackRulesGlsl;
