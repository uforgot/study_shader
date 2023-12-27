#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;


float plot(vec2 st, float pct) {
    return smoothstep( pct-0.015, pct , st.y) - smoothstep( pct , pct+0.015, st.y);
}

float plotY(vec2 st, float pct) {
    return smoothstep( pct, pct-0.015, st.x) + smoothstep( pct+0.015 , pct, st.x);
}

vec2 random(vec2 v) {
    float f1 = dot(v, vec2(56.327, 617.531));
    float f2 = dot(v, vec2(69.0841, 75.37839));
    float x  = fract(sin(f1*56.7876) * 56423.12312);
    float y  = fract(cos(f2*75.34531) * 163451.12512);
    return vec2(x,y) * 2.-1.;;
}

float noise(vec2 v) {
    vec2 i = floor(v);
    vec2 f = fract(v);

    vec2 i2 = i + vec2(1., 0.);
    vec2 i3 = i + vec2(0., 1.);
    vec2 i4 = i + vec2(1., 1.);

    vec2 r = random(i);
    vec2 r2 = random(i2);
    vec2 r3 = random(i3);
    vec2 r4 = random(i4);

//    f = smoothstep(0., 1., f);
    f = f*f*f*(f*(f*6.-15.)+10.);

    float d = dot(r, v-i);
    float d2 = dot(r2, v-i2);
    float d3 = dot(r3, v-i3);
    float d4 = dot(r4, v-i4);

    float bottom = mix(d, d2, f.x);
    float top = mix(d3, d4, f.x);
    float ret = mix(bottom, top, f.y);
    return ret * 0.5 + 0.5;
}

void main() {
    vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    coord *= 5.0;


    vec3 col = vec3(noise(coord));
    //grid 추가
    float pctY = plot(coord,  floor(coord.y));
    float pctX = plotY(coord,  floor(coord.x));
    col = mix(col, vec3(1.0,0.0,0.0), pctY);
    col = mix(col, vec3(1.0,0.0,0.0), pctX);

    //    col =  vec3(plot(coord, pow(fract(sin(coord.x*2.)*100000.),1./10.)));

    gl_FragColor = vec4(col, 1.0);
}