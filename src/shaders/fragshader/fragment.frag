#define PI2 6.283185307178
uniform vec3 u_color;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
varying vec2 v_uv;
varying vec3 v_position;

float rect (vec2 pt, vec2 size, vec2 center) {
  vec2 p = pt - center;
  vec2 halfsize = size * 0.5;
  float horz = step(-halfsize.x, p.x) - step(halfsize.x, p.x);
  float vert = step(-halfsize.y, p.y) - step(halfsize.y, p.y);
  return horz * vert;
}

mat2 getRotationMatrix(float theta) {
  float s = sin(theta);
  float c = cos(theta);
  return mat2(c, -s, s, c);
}

mat2 getScaleMatrix(float scale) {
  return mat2(scale, 0.0, 0.0, scale);
}

float circle(vec2 pt, vec2 center, float radius) {
  vec2 p = pt - center;
  return 1.0 - step(radius, length(p));
}

float circle(vec2 pt, vec2 center, float radius, bool soften) {
  vec2 p = pt - center;
  float edge = (soften) ? radius * 0.5 : 0.0;
  return 1.0 - smoothstep(radius - edge, radius + edge, length(p));
}

float circle(vec2 pt, vec2 center, float radius, float line_width) {
  vec2 p = pt - center;
  float len = length(p);
  float half_line_width = line_width * 0.5;
  return step(radius - half_line_width, len) - step(radius + half_line_width, len);
}

float line(float a, float b, float line_width, float edge_thickness) {
  float half_line_width = line_width * 0.5;
  return smoothstep(a - half_line_width - edge_thickness, a - half_line_width, b) -
         smoothstep(a + half_line_width, a + half_line_width + edge_thickness, b);
}

void main(){
  // vec2 v = u_mouse / u_resolution;
  // vec3 color = vec3(v.x, sin(u_time * 3.0), v.y);

  // vec3 color = vec3((sin(u_time) + 1.0) / 2.0, 0.0, (cos(u_time) + 1.0) / 2.0);


  // mix(x, y, a)
  // mix(x, y, 0.0) = x
  // mix(x, y, 1.0) = y
  // vec2 uv = gl_FragCoord.xy / u_resolution;
  // vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), uv.y);

  // vec3 color = vec3(v_uv.x, v_uv.y, 0.0);

  // vec3 color = vec3(v_position.x, v_position.y, 0.0);

  // clamp(n, minimum, maximum)
  // clamp(2.0, 0.0, 1.0) = 1.0
  // clamp(-1.0, 0.0, 1.0) = 0.0
  // clamp(0.5, 0.0, 1.0) = 0.5
  
  // vec3 color = vec3(0.0);
  // color.r = clamp(v_position.x, 0.0, 1.0);
  // color.g = clamp(v_position.y, 0.0, 1.0);

  // step(edge, n) return 0 or 1
  // vec3 color = vec3(0.0);
  // color.r = step(sin(u_time), v_position.x);
  // color.g = step(sin(u_time), v_position.y);

  // smoothstep(edge0, edge1, n)
  // vec3 color = vec3(0.0);
  // color.r = smoothstep(0.0, 1.0, v_position.x);
  // color.g = smoothstep(0.0, 1.0, v_position.y);

  // float inCircle = 1.0 - step(0.5, length(v_position.xy));
  // vec3 color = vec3(1.0, 1.0, 0.0) * inCircle;

  // float inRect = rect(v_position.xy, vec2(1.0), vec2(0.0 ));
  // vec3 color = vec3(1.0, 1.0, 0.0) * inRect;

  // float square1 = rect(v_position.xy, vec2(0.3), vec2(-0.5, 0.0));
  // float square2 = rect(v_position.xy, vec2(0.4), vec2(0.5, 0.0));
  // vec3 color = vec3(1.0, 1.0, 0.0) * square1 + vec3(v_uv, 0.0) * square2;


  // float radius = 0.5;
  // float time = u_time * 2.0;
  // vec2 center = vec2(cos(time) * radius, sin(time) * radius);
  // float square = rect(v_position.xy, vec2(0.5), center);
  // vec3 color = vec3(1.0, 1.0, 0.0) * square;


  // vec2 center = vec2(0.5, 0.0);
  // mat2 mat = getRotationMatrix(u_time);
  // vec2 pt = mat * (v_position.xy - center) + center;
  // float square = rect(pt, vec2(0.0), vec2(0.5), center);
  // vec3 color = vec3(1.0, 1.0, 0.0) * square;

  // vec2 center = vec2(0.5, 0.0);
  // mat2 matr = getRotationMatrix(u_time);
  // mat2 mats = getScaleMatrix((sin(u_time) + 1.0) / 3.0 + 0.5);
  // vec2 pt = (mats * matr * (v_position.xy - center) )+ center;
  // float square = rect(pt, vec2(0.0), vec2(0.5), center);
  // vec3 color = vec3(1.0, 1.0, 0.0) * square;

  // fract
  // 1.5 = 0.5
  // 6.7 = 0.7
  // 3.3 = 0.3
  // float tilecount = 6.0;
  // vec2 center = vec2(0.5);
  // mat2 mat = getRotationMatrix(u_time);
  // vec2 p = fract( v_uv * tilecount );
  // vec2 pt = (mat * (p - center)) + center;
  // float inReact = rect(pt, vec2(0.5), center);
  // vec3 color = vec3(1.0, 1.0, 0.0) * inReact;

  // vec3 color = vec3(1.0, 0.0, 0.0) * circle(v_position.xy, vec2(0.0), 0.3, 0.02);

  vec2 uv = gl_FragCoord.xy;
  vec3 color = vec3(1.0) * line(v_position.y, mix(-0.8, 0.8, (sin(v_position.x * 3.1415) + 1.0)/2.0), 0.05 , 0.002);
  gl_FragColor = vec4(color, 1.0);
}