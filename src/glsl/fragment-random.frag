#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep( pct-0.002, pct , st.y) - smoothstep( pct , pct+0.002, st.y);
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    vec3 col;

    col =  vec3(plot(coord, sqrt(fract(sin(coord.x*2. + u_time)*100000.))));
//    col =  vec3(plot(coord, pow(fract(sin(coord.x*2.)*100000.),1./10.)));

    gl_FragColor = vec4(col, 1.0);
}