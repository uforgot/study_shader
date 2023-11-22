#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord.x *= u_resolution.x / u_resolution.y;

    coord *= 10.0;
    coord = mod(coord, 1.);


    vec3 col1 = 1. - vec3(smoothstep(.35, .36, distance(coord, vec2(.5))));
    vec3 col2 = vec3(coord.xy,0.);
    vec3 col = col1 * col2;

    gl_FragColor = vec4(col, 1.0);
}