#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;

#define PI 3.1415926535897932384626433832795;

void main() {
    gl_FragCoord = vec4(vec3(1., 0., 0.),1.0);
}
