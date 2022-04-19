#define PI 3.14159265358979323846
#define PI2 6.28318530717958647692

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

varying vec2 v_uv;

void main() {
  gl_FragColor = vec4(u_color, 1.0);
}