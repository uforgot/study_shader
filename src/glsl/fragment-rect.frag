#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

vec3 rect( vec2 coord, vec2 loc, vec2 size) {
    vec2 sw = loc-size/2.;
    vec2 ne = loc+size/2.;
    vec2 pct = step(sw, coord);
    pct -= step(ne, coord);
    return vec3(pct.x * pct.y);
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    vec3 col;

    col =  rect(coord, vec2(0.5, 0.5), vec2(0.5,0.5));

    gl_FragColor = vec4(col, 1.0);
}