#define PI 3.14159265358979323846

varying vec2 v_uv;
varying vec3 v_position;

uniform sampler2D u_texture1;
uniform float u_time;
uniform float u_duration;

void main(){
  vec2 p = v_position.xy;
  float len = length(p);
  vec2 ripple = v_uv + p/len*0.03*cos(len*12.0-u_time*4.0);
  float delta = (sin(mod(u_time, u_duration) *(2.0*PI/u_duration)) + 1.0) / 2.0;
  vec2 uv = mix(ripple, v_uv, delta);
  vec3 color = texture2D(u_texture1, uv).rgb;
  gl_FragColor = vec4(color,1.0);
}