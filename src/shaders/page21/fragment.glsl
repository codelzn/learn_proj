varying vec2 vUv;
float PI = 3.141592;
uniform float progress;

void main() {
  vec2 newUV = vUv;
  float bottom = abs(1.0 - progress);
  float curveStrength = 1.0;
  float waveStrength = 1.0;
  float curve = progress + (sin(newUV.x * PI * waveStrength) * progress - progress) * bottom * curveStrength;
  float color = step(curve, newUV.y);
  gl_FragColor = vec4(color,color,color, 1.0);
}