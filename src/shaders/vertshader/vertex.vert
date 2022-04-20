#include <noise>
uniform float u_time;

varying float v_noise;
varying vec2 v_uv;

void main() {

  v_noise = 10.0 * -0.1 * turbulence(0.5 * normal + u_time * 0.1);
  float b = 5.0 * pnoise(0.05 * position, vec3(100.0));
  float displacement = b - 10.0 * v_noise;
  vec3 pos = position + normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_uv = uv;
}