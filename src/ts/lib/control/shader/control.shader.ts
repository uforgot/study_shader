import Uniform from '@/ts/lib/control/shader/uniform';
import Rect from '@/ts/lib/control/shader/rect';

interface IShader {
  fragment?: string;
  vertex: string;
}

class ControlShader {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private uResolution: Uniform;
  private uMouse: Uniform;
  private uRatio: Uniform;
  private uTime: Uniform;

  private count: number = 0;
  private renderIntervalID: NodeJS.Timeout;

  private billBoard: Rect;
  private positionLocation: WebGLUniformLocation;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private shader: IShader
  ) {
    if (this.shader.fragment === undefined) {
      this.shader.fragment = require('@/glsl/fragment.frag');
    }
    this.init();
  }

  private init() {
    this.gl = this.canvasEl.getContext('webgl');
    this.program = this.gl.createProgram();

    this.gl.linkProgram(this.program);

    this.setShader(this.shader.vertex, this.gl.VERTEX_SHADER);
    this.setShader(this.shader.fragment, this.gl.FRAGMENT_SHADER);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.setUniform();

    this.billBoard = new Rect(this.gl);
    this.positionLocation = this.gl.getAttribLocation(
      this.program,
      'a_position'
    );
    this.gl.enableVertexAttribArray(this.positionLocation as number);
    this.gl.vertexAttribPointer(
      this.positionLocation as number,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    this.onResizeHandler();
    window.addEventListener('resize', this.onResizeHandler.bind(this));
    setInterval(this.render.bind(this), 1000 / 60);
  }

  private onResizeHandler() {
    this.uResolution.set(this.canvasEl.width, this.canvasEl.height);
  }

  private render() {
    this.count += 0.001;
    this.uTime.set(this.count);
  }

  private setUniform() {
    this.uResolution = new Uniform('u_resolution', '2f', this.program, this.gl);
    this.uMouse = new Uniform('u_mouse', '2f', this.program, this.gl);
    this.uRatio = new Uniform('u_pixel_ratio', '1f', this.program, this.gl);
    this.uTime = new Uniform('u_time', '1f', this.program, this.gl);

    this.uRatio.set(1 / window.devicePixelRatio);
  }

  private setShader(source: string, type: number) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const isCompiled = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS
    );
    if (!isCompiled) {
      throw new Error(
        'shader compile error: ' + this.gl.getShaderInfoLog(shader)
      );
    }
    this.gl.attachShader(this.program, shader);
  }
}

export default ControlShader;
