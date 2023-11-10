#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

vec3 circle (vec2 coord, vec2 loc, float r) {
    float d;
//    d = distance(coord, loc);
    d = length(coord - loc);
    float c;
//    c = step(r, d);
    c = smoothstep(r, r + 0.003, d);
    return vec3(1.0 -c);
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    vec3 col =  circle(coord, vec2(.5), .25);



    gl_FragColor = vec4(col, 1.0);
}