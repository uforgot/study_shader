#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

#define PI 3.1415926535897932384626433832795;

float plot(vec2 st, float pct) {
    return smoothstep( pct-0.002, pct , st.y) - smoothstep( pct , pct+0.002, st.y);
}

float gain(float x, float k) {
    float a = 0.5*pow(2.0*((x<0.5)?x:1.0-x),k);
    return (x<0.5)?a:1.0-a;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

//     float y = fract(st.x*3.0);
//     float y = mod(st.x, 0.25);
     float y = abs(sin(st.x + u_time));
//    float y = st.x;
     float y2 = smoothstep(0.3, 0.9, st.x);
//     float y = step(0.5,st.x);
//     float y = pow( st.x, 5.);
//     float y = abs(cos(st.x * 3.14));
//    float y = gain(st.x,0.7);

    vec3 color = vec3(st.x);
    float pct = plot( st, y);
    float pct2 = plot( st, y2);

//    color = (1.0 - pct) * color + pct * vec3(1.0,0.0,0.0);
    color = mix(color, vec3(1.0,0.0,0.0), pct);
    color = mix(color, vec3(1.0,0.0,0.0), pct2);
    fragColor = vec4(color ,1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy/u_resolution.xy);
}
