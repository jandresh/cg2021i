precision mediump float; 

// Color of pixel
uniform vec4 uPixelColor;  
uniform vec4 uGlobalAmbientColor;
uniform float uGlobalAmbientIntensity;

void main(void)  {
    gl_FragColor = uPixelColor * uGlobalAmbientIntensity * uGlobalAmbientColor;
}