attribute vec3 aSquareVertexPosition; // Expects one vertex position
void main(void) {
 gl_Position = vec4(aSquareVertexPosition, 1.0);
}
