#define PI 3.14159265358979323846
#define PI2 6.28318530717958647692

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform sampler2D u_tex;

varying vec2 v_uv;
varying float v_noise;

float random( vec3 pt, float seed ){
  vec3 scale = vec3( 12.9898, 78.233, 151.7182 );
  return fract( sin( dot( pt + seed, scale ) ) * 43758.5453 + seed ) ;
}

void main() {
  float r = 0.01 * random(gl_FragCoord.xyz, 0.0);
  vec2 uv = vec2(0, 1.3 * v_noise + r);
  vec3 color = texture2D(u_tex, uv).rgb;
  gl_FragColor = vec4(color, 1.0);
}