#include <GLUT/glut.h> // (or others, depending on the system in use)
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
    int point1 [ ] = {25, 75};
    int point2 [ ] = {50, 50};
    int point3 [ ] = {100, 50};
    int point4 [ ] = {125, 75};
    int point5 [ ] = {100, 100};
    int point6 [ ] = {50, 100};
    glBegin (GL_TRIANGLE_FAN); // GL_POLYGON, GL_TRIANGLES, GL_TRIANGLE_STRIP, GL TRIANGLE FAN 
    glVertex2iv (point1);
    glVertex2iv (point2);
    glVertex2iv (point3);
    glVertex2iv (point4);
    glVertex2iv (point5);
    glVertex2iv (point6);
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

