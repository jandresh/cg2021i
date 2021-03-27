#include <GLUT/glut.h>

void init (void)
{
   /*  Set color of display window to white.  */
   glClearColor (1.0, 1.0, 1.0, 0.0);       

   /*  Set parameters for world-coordinate clipping window.  */
   glMatrixMode (GL_PROJECTION);
   gluOrtho2D (-200.0, 250, 0, 250);//(xmin, xmax, ymin, ymax)

   /*  Set mode for constructing geometric transformation matrix.  */
   glMatrixMode (GL_MODELVIEW);
   
}

void displayFcn (void)
{
   glClear (GL_COLOR_BUFFER_BIT);   //  Clear display window.

   glColor3f (0.0, 0.0, 1.0);
   glRecti (50, 100, 200, 150);       // Display blue rectangle. 

   glColor3f (1.0, 0.0, 0.0);
   // glTranslatef (-200.0, -50.0, 0.0); // Set translation parameters. 
   // glRecti (50, 100, 200, 150);       // Display red, translated rectangle. ( tx , ty, tz )

   // glLoadIdentity ( );                // Reset current matrix to identity. 
   // glRotatef (90.0, 0.0, 0.0, 1.0);   // Set 90-deg. rotation about z axis. (theta , vx, vy, vz)
   // glRecti (50, 100, 200, 150);       // Display red, rotated rectangle. 

   glLoadIdentity ( );                // Reset current matrix to identity. 
   glScalef (-0.5, 1.0, 1.0);         // Set scale-reflection parameters. (sx, sy, sz)
   glRecti (50, 100, 200, 150);       // Display red, transformed rectangle.

   glFlush ( );
}

int main (int argc, char ** argv)
{
   glutInit (&argc, argv);
   glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
   glutInitWindowPosition (50, 50);
   glutInitWindowSize (600, 300);
   glutCreateWindow ("Split-Screen Example");

   init ( );
   glutDisplayFunc (displayFcn);
 
   glutMainLoop ( );
   return 0;
}
