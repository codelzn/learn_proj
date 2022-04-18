#define PI 3.14159265359
#define PI2 6.28318530718
varying vec2 v_uv;
uniform float u_time;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

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

float circle(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness) {
  pt -= center;
  float len = length(pt);
  float result = smoothstep(radius - line_width / 2.0 - edge_thickness, radius - line_width / 2.0, len) - smoothstep(radius + line_width / 2.0, radius + line_width / 2.0 + edge_thickness, len);
  return result;
}


float line(float a, float b, float line_width, float edge_thickness) {
  float half_line_width = line_width * 0.5;
  return smoothstep(a - half_line_width - edge_thickness, a - half_line_width, b) -
         smoothstep(a + half_line_width, a + half_line_width + edge_thickness, b);
}

float sweep(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness){
  vec2 d = pt - center;
  float theta = u_time * 2.0;
  vec2 p = vec2(cos(theta), -sin(theta))*radius;
  float h = clamp( dot(d,p)/dot(p,p), 0.0, 1.0 );
  //float h = dot(d,p)/dot(p,p);
  float l = length(d - p*h);

  float gradient = 0.0;
  const float gradient_angle = PI * 0.2;

  if (length(d)<radius){
    float angle = mod(theta + atan(d.y, d.x), PI2);
    gradient = clamp(gradient_angle - angle, 0.0, gradient_angle)/gradient_angle * 0.5;
  }

  return gradient + 1.0 - smoothstep(line_width, line_width+edge_thickness, l);
}

float polygon(vec2 pt, vec2 center, float radius, int sides, float rotate, float edge_thickness){
  pt -= center;

  // Angle and radius from the current pixel
  float theta = atan(pt.y, pt.x) + rotate;
  float rad = PI2/float(sides);

  // Shaping function that modulate the distance
  float d = cos(floor(0.5 + theta/rad)*rad-theta)*length(pt);

  return 1.0 - smoothstep(radius, radius + edge_thickness, d);
}

float brick(vec2 pt, float mortar_height, float edge_thickness) {
  float result = line(pt.y, 0.0, mortar_height, edge_thickness);
  result += line(pt.y, 0.5, mortar_height, edge_thickness);
  result += line(pt.y, 1.0, mortar_height, edge_thickness);

  if (pt.y>0.5) pt.x = fract(pt.x + 0.5);
  result += line(pt.x, 0.5, mortar_height, edge_thickness);

  return result;
}

float random(vec2 st, float seed) {
  const float a = 12.9898;
  const float b = 78.233;
  const float c = 43758.5453;
  return fract(sin(dot(st, vec2(a, b)) + seed) * c);
}

// 2D Random
float random (vec2 st) {
    return fract(sin(dot(st, vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


void main(void){
  // vec3 axis_color = vec3(0.8);
  // vec3 color = line(v_uv.y, 0.5, 0.002, 0.001) * axis_color;
  // color += line(v_uv.x, 0.5, 0.002, 0.001) * axis_color;
  // color += circle(v_uv, vec2(0.5), 0.3, 0.002, 0.001) * axis_color;
  // color += circle(v_uv, vec2(0.5), 0.2, 0.002, 0.001) * axis_color;
  // color += circle(v_uv, vec2(0.5), 0.1, 0.002, 0.001) * axis_color;
  // color += sweep(v_uv, vec2(0.5), 0.3, 0.003, 0.001) * vec3(0.1, 0.3, 1.0);
  // color += polygon(v_uv, vec2(0.9 - sin(u_time*3.0) * 0.05, 0.5), 0.005, 3, 0.0, 0.001) * vec3(1.0);
  // color += polygon(v_uv, vec2(0.1 - sin(u_time*3.0 + PI) * 0.05, 0.5), 0.005, 3, PI, 0.001) * vec3(1.0);

  // vec2 uv = fract(v_uv * 10.0);
  // vec3 color = brick(uv, 0.05, 0.001) * vec3(1.0);

  // vec3 color = random(v_uv, u_time) * vec3(1.0);

  vec2 st = v_uv;
  vec2 pos = vec2(st * 8.0);
  pos.y -= u_time;

  float n = noise(pos);

  vec3 color = mix(u_color_a, u_color_b, n);

  gl_FragColor = vec4(color, 1.0);
}