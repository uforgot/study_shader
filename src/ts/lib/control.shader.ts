// @ts-ignore
import vertex from '@/glsl/vertex.vert';
// @ts-ignore
import fragment from '@/glsl/fragment.frag';
import Uniform from '@/ts/lib/uniform';

class ControlShader {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private uResolution: Uniform;
  private uMouse: Uniform;
  private uRatio: Uniform;
  private uTime: Uniform;

  constructor(private canvasEl: HTMLCanvasElement) {
    this.init();
  }

  init() {
    this.gl = this.canvasEl.getContext('webgl');
    this.program = this.gl.createProgram();

    this.gl.linkProgram(this.program);

    this.setShader(vertex, this.gl.VERTEX_SHADER);
    this.setShader(fragment, this.gl.FRAGMENT_SHADER);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
  }

  setUniform() {
    this.uResolution = new Uniform('uResolution', '4f', this.program, this.gl);
    this.uMouse = new Uniform('iMouse', '2f', this.program, this.gl);
    this.uRatio = new Uniform('iPixelRatio', '1f', this.program, this.gl);
    this.uTime = new Uniform('iTime', '1f', this.program, this.gl);
  }

  setShader(source: string, type: number) {
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
