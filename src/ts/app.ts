import Log from '@/ts/lib/log';
import ControlShader from '@/ts/lib/control/shader/control.shader';

class App {
  constructor() {
    Log.console('App constructor');

    // new ControlShader(document.querySelector('#canvas-1'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-1.frag')
    // });
    //
    // new ControlShader(document.querySelector('#canvas-rect'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-rect.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-circle'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-circle.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-circle-2'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-circle2.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-circle-3'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-circle3.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-2d-matrix'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-2d-matrix.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-pattern'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-pattern.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-pattern-2'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-pattern-2.frag')
    // });

    new ControlShader(document.querySelector('#canvas-random'), {
      vertex: require('@/glsl/vertex.vert'),
      fragment: require('@/glsl/fragment-random.frag')
    });

    // new ControlShader(document.querySelector('#canvas-random-2'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-random-2.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-random-3'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-random-3.frag')
    // });

    // new ControlShader(document.querySelector('#canvas-noise'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-noise.frag')
    // });

    new ControlShader(document.querySelector('#canvas-noise-2'), {
      vertex: require('@/glsl/vertex.vert'),
      fragment: require('@/glsl/fragment-noise-2.frag')
    });

    // new ControlShader(document.querySelector('#canvas-noise-3'), {
    //   vertex: require('@/glsl/vertex.vert'),
    //   fragment: require('@/glsl/fragment-noise-3.frag')
    // });
  }
}

export default App;
