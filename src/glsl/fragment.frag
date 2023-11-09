#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform sampler2D u_texture;
uniform float u_time;

#define PI 3.1415926535897932384626433832795;

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    fragColor = vec4(vec3(1.0,0.,0.), 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
//    gl_FragColor = vec4(vec3(1., abs(sin(u_time)), 0.),1.0);
}
