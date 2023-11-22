#ifdef GL_ES
precision mediump float;
#endif

uniform vec4 u_resolution;
uniform float u_time;

float bar(vec2 loc, vec2 size, vec2 coord) {
    vec2 sw = loc - size/2.0;
    vec2 ne = loc + size/2.0;
    vec2 ret = smoothstep(sw + 0.002, sw,coord) - smoothstep(ne , ne- 0.002, coord);

    return  ret.x * ret.y;
}

float cross( vec2 loc, vec2 size, vec2 coord) {
    float b1 = bar(loc, size, coord);
    float b2 = bar(loc, vec2(size.y,size.x), coord);
    return max(b1,b2);;
}

mat2 rotate2d(float _angle) {
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale (vec2 _scale) {
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
    vec2 coord = gl_FragCoord.xy/ u_resolution.xy;
    coord.x *= u_resolution.x/u_resolution.y;
    coord = coord*2. - 1.;

    float rad = 0.5;
    coord *= scale(vec2(sin(u_time*2.)*0.5+1.0));
//    coord += vec2(sin(u_time)*rad, cos(u_time)*rad);

    vec2 loc = vec2(0.);
    coord *= rotate2d(u_time*-4.);

//    vec2 loc = vec2(0.) + vec2(sin(u_time)*rad, cos(u_time)*rad);
    vec3 col = vec3(cross(loc,vec2(.15, 0.03),coord));
    gl_FragColor = vec4(col, 1.0);
}