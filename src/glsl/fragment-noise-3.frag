#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


float plot(vec2 st, float pct) {
    return smoothstep( pct-0.002, pct , st.y) - smoothstep( pct , pct+0.002, st.y);
}

float noise(vec2 val) {
    vec2 i = floor(val);
    vec2 f = fract(val);

    vec2 v1 = i;
    vec2 v2 = i+vec2(1.0, 0.0);
    vec2 v3 = i+vec2(0.0, 1.0);
    vec2 v4 = i+vec2(1.0, 1.0);

    float r1 = random(v1);
    float r2 = random(v2);
    float r3 = random(v3);
    float r4 = random(v4);

//    f = smoothstep(0.,1.,f);

    float bottom = mix(r1, r2, smoothstep(0.0, 1.0, f.x));
    float top = mix(r3, r4, smoothstep(0.0, 1.0, f.x));
    float ret = mix(bottom, top, smoothstep(0.0, 1.0, f.y));
    return ret;
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    coord *= 5.0;


    vec3 col = vec3(noise(coord));

    //    col =  vec3(plot(coord, pow(fract(sin(coord.x*2.)*100000.),1./10.)));

    gl_FragColor = vec4(col, 1.0);
}