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
    float y = fract(sin(f  *0.00009) * 34634.12412);
    return y;
}

vec3 line(vec2 coord, bool toggle) {
    float y;
    float r = 0.1;
    float ret;

    if (toggle) {
        y = coord.x;
        ret = smoothstep(y-r, y, coord.y) - smoothstep(y, y+r, coord.y);
    } else {
        y = 1. - coord.x;
        ret = smoothstep(y-r, y, coord.y) - smoothstep(y, y+r, coord.y);
    }

    return mix(vec3(0.), vec3(1.), ret);
}


void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord *= 20.;
    bool isToggle = random(floor(coord.xy))> 0.5;
    coord = fract(coord);
    vec3 col;
    col = line(coord, isToggle);

    gl_FragColor = vec4(col, 1.0);
}