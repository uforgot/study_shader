class Rect {
  // prettier-ignore
  public static Vertex: Float32Array = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
     1,  1
  ]);

  constructor(private gl: WebGLRenderingContext) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, Rect.Vertex, gl.STATIC_DRAW);
  }

  public render() {
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default Rect;
