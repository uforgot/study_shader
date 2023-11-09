import Uniform from '@/ts/lib/control/shader/uniform';
import Rect from '@/ts/lib/control/shader/rect';
import Log from '@/ts/lib/log';

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
  private positionLocation: number;

  constructor(
    private canvasEl: HTMLCanvasElement,
    private shader: IShader
  ) {
    if (this.shader.fragment === undefined) {
      this.shader.fragment = require('@/glsl/fragment-1.frag');
    }
    this.init();
  }

  private init() {
    this.gl = this.canvasEl.getContext('webgl');
    this.program = this.gl.createProgram();

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

    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(
      this.positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    this.onResizeHandler();
    window.addEventListener('resize', this.onResizeHandler.bind(this));
    this.render();
    setInterval(this.render.bind(this), 1000 / 60);
  }

  private onResizeHandler() {
    const width = this.canvasEl.width;
    const height = this.canvasEl.height;
    let a1, a2;
    if (width > height) {
      a1 = 1;
      a2 = height / width;
    } else {
      a1 = width / height;
      a2 = 1;
    }
    this.uResolution.set(width, height, a1, a2);
    this.render();
  }

  private render() {
    this.count += 0.01;
    this.uTime.set(this.count);
    this.billBoard.render();
  }

  private setUniform() {
    this.uResolution = new Uniform('u_resolution', '4f', this.program, this.gl);
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
