#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

#define PI 3.1415926535897932384626433832795;

float plot(vec2 st, float pct) {
    return smoothstep( pct-0.002, pct , st.y) - smoothstep( pct , pct+0.002, st.y);
}

void main() {
    vec2  coord = gl_FragCoord.xy/u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    coord = coord * 2. - 1.0;

    float a = atan(coord.y/1.0, coord.x);
//    float d = distance(vec2(0.), coord);
    float d = length(coord);

    a*= 3.;
    a+= u_time * 2.;
    float r = sin(a);

    vec3 col = vec3(smoothstep(r-0.01,r+0.01,d));;
    gl_FragColor = vec4(col,1.0);
}