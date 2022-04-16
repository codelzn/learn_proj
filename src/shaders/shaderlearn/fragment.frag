varying vec2 vUv;
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 v = u_mouse / u_resolution;
  vec3 color = vec3(v.x, sin(u_time * 3.0), v.y);
  gl_FragColor = vec4(color, 1.0);
}