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
    int point1 [ ] = {50, 100};
    int point2 [ ] = {75, 150};
    int point3 [ ] = {100, 200};
    int point4 [ ] = {150, 250};
    glBegin (GL_LINES);
    glVertex2i (point1);
    glVertex2i (point2);
    glVertex2i (ponit3);
    glVertex2i (point4);
    glEnd ( );
    glFlush ( ); // Process all OpenGL routines as quickly as possible.
}
void main (int argc, char** argv)
{
    glutInit (&argc, argv); // Initialize GLUT.
    glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB); // Set display mode.
    glutInitWindowPosition (50, 100); // Set top-left display-window position.
    glutInitWindowSize (400, 400); // Set display-window width and height.
    glutCreateWindow ("An Example OpenGL Program"); // Create display window.
    init ( ); // Execute initialization procedure.
    glutDisplayFunc (lineSegment); // Send graphics to display window.
    glutMainLoop ( ); // Display everything and wait.
}

