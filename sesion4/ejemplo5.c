// #include <GLUT/glut.h> // MAC OS(For others, depending on the system in use)
// Linux mesa installation: https://www.wikihow.com/Install-Mesa-(OpenGL)-on-Linux-Mint
// Build: g++ ejemplo5.c -lglut -lGL -lGLEW -lGLU -o ejemplo5
// Execute: ./ejemplo5
#include <GL/glut.h> // Linux 

void init (void)
{
    glClearColor (1.0, 1.0, 1.0, 0.0); // Set display-window color to white.
    glMatrixMode (GL_PROJECTION); // Set projection parameters.
    gluOrtho2D (0.0, 300.0, 0.0, 300.0); //(xmin, xmax, ymin, ymax)
}
void lineSegment (void)
{
    glClear (GL_COLOR_BUFFER_BIT); // Clear display window.
    glColor3f (0.0, 0.4, 0.2); // Set line segment color to green.
    int point1 [ ] = {25, 100};
    int point2 [ ] = {50, 20};
    int point3 [ ] = {75, 30};
    int point4 [ ] = {70, 75};
    int point5 [ ] = {110, 75};
    int point6 [ ] = {110, 40};
    int point7 [ ] = {140, 20};
    int point8 [ ] = {130, 110};
    glBegin (GL_QUAD_STRIP); // GL_QUADS, GL_QUAD_STRIP 
    glVertex2iv (point1);
    glVertex2iv (point2);
    glVertex2iv (point4);
    glVertex2iv (point3);
    glVertex2iv (point5);
    glVertex2iv (point6);
    glVertex2iv (point8);
    glVertex2iv (point7);
    glEnd ( );
    glFlush ( ); // Process all OpenGL routines as quickly as possible.
}
int main (int argc, char** argv)
{
    glutInit (&argc, argv); // Initialize GLUT.
    glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB); // Set display mode.
    glutInitWindowPosition (50, 100); // Set top-left display-window position.
    glutInitWindowSize (400, 400); // Set display-window width and height.
    glutCreateWindow ("An Example OpenGL Program"); // Create display window.
    init ( ); // Execute initialization procedure.
    glutDisplayFunc (lineSegment); // Send graphics to display window.
    glutMainLoop ( ); // Display everything and wait.
    return 0;
}

