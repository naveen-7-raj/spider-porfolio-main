export const vertexShader = `
varying vec2 vUv;
uniform float uHovered;
uniform float uScale;

void main() {
  vUv = uv;
  
  // Very subtle zoom in effect on hover
  vec3 pos = position;
  float scale = 1.0 + (uHovered * uScale);
  // Scale from the center
  pos *= scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uMouse;
uniform float uHovered;
uniform float uRadius;
uniform float uSoftness;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform vec2 uImageResolution2;
uniform vec2 uOffset2;
uniform float uScale2;
uniform vec2 uGlobalOffset;

varying vec2 vUv;

void main() {
  vec2 ratio1 = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
  );
  
  vec2 ratio2 = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution2.x / uImageResolution2.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution2.y / uImageResolution2.x), 1.0)
  );
  
  vec2 centeredUv = vUv - vec2(0.5);
  vec2 uvCover1 = centeredUv * ratio1 + vec2(0.5) + uGlobalOffset;
  vec2 uvCover2 = (centeredUv * ratio2) / uScale2 + vec2(0.5) + uOffset2 + uGlobalOffset;

  vec4 color1 = texture2D(uTexture1, uvCover1);
  
  vec2 screenRatio = vec2(uResolution.x / uResolution.y, 1.0);
  if (uResolution.y > uResolution.x) {
    screenRatio = vec2(1.0, uResolution.y / uResolution.x);
  }
  
  vec2 uvMouse = vUv * screenRatio;
  vec2 cursor = uMouse * screenRatio;

  float dist = distance(uvMouse, cursor);
  
  float currentRadius = uRadius * uHovered;

  float mask = 1.0 - smoothstep(currentRadius - uSoftness, currentRadius + uSoftness, dist);
  
  vec2 distortedUv2 = uvCover2 + (mask * (1.0 - mask)) * 0.05 * uHovered;
  vec4 color2 = texture2D(uTexture2, distortedUv2);

  vec4 finalColor = mix(color1, color2, mask);

  float glow = 1.0 - smoothstep(0.0, currentRadius * 1.5, dist);
  finalColor.rgb += vec3(0.05, 0.08, 0.1) * glow * uHovered;

  gl_FragColor = finalColor;
}
`;
