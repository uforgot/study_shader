#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

#define PI 3.1415926535897932384626433832795
#define QUAR_PI PI/4.

float rect(vec2 coord, vec2 size, vec2 pos) {
    vec2 center = pos;
    float hor = step(center.x - size.x, coord.x) - step (center.x + size.x, coord.x);
    float ver = step(center.y - size.y, coord.y) - step (center.y + size.y, coord.y);
    return hor*ver;
}

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle),-sin(_angle),
    sin(_angle),cos(_angle));
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord.x *= u_resolution.x / u_resolution.y;

    coord *= 20.0;
    coord = mod(coord,1.);
    coord -= 0.5;
    coord *= rotate2d(QUAR_PI);

    vec3 col = vec3(1.0);
    col = vec3(rect(coord, vec2(.5/1.414), vec2(0.0))) ;

    gl_FragColor = vec4(col, 1.0);
}