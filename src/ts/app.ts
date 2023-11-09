import Log from '@/ts/lib/log';
import ControlShader from '@/ts/lib/control/shader/control.shader';

class App {
  constructor() {
    Log.console('App constructor');

    new ControlShader(document.querySelector('#canvas-1'), {
      vertex: require('@/glsl/vertex.vert'),
      fragment: require('@/glsl/fragment.frag')
    });
  }
}

export default App;
