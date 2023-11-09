class Uniform {
  public location: WebGLUniformLocation;
  constructor(
    private name: string,
    private suffix: string,
    private program: WebGLProgram,
    private gl: WebGLRenderingContext
  ) {
    this.location = this.gl.getUniformLocation(this.program, this.name);
  }

  public set(...values: Array<number>) {
    let method = 'uniform' + this.suffix;
    let args = [this.location].concat(values);
    this.gl[method].apply(this.gl, args);
  }
}

export default Uniform;
