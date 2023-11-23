#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep( pct-0.002, pct , st.y) - smoothstep( pct , pct+0.002, st.y);
}

float random(float f) {
    float y = fract(sin(f*712.5568) * 7894.12379);
    return y;
}

float random(vec2 v2) {
    float f =  random(dot(v2, vec2(8.26593, 4.8682)));
    float y = fract(sin(f*u_time *0.00009) * 34634.12412);
    return y;
}


void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    vec3 col;

    coord *= 10.0;

    vec2 ci = floor(coord);
    vec2 cf = coord - ci;
//    vec2 ipos = floor(coord);
//    vec2 fpos = coord  - ipos;

    col = vec3(random(ci));;

    gl_FragColor = vec4(col, 1.0);
}