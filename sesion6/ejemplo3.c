// #include <GLUT/glut.h> // MAC OS(For others, depending on the system in use)
// Linux mesa installation: https://www.wikihow.com/Install-Mesa-(OpenGL)-on-Linux-Mint
// Build: g++ ejemplo3.c -lglut -lGL -lGLEW -lGLU -o ejemplo3
// Execute: ./ejemplo3
#include <GL/glut.h> // Linux 

void init (void)
{
   /*  Set color of display window to white.  */
   glClearColor (1.0, 1.0, 1.0, 0.0);       

   /*  Set parameters for world-coordinate clipping window.  */
   glMatrixMode (GL_PROJECTION);     //modelview, projection, texture, and color
   gluOrtho2D (-200.0, 250, 0, 250); //(xmin, xmax, ymin, ymax)

   /*  Set mode for constructing geometric transformation matrix.  */
   glMatrixMode (GL_MODELVIEW);      //modelview, projection, texture, and color 
   
}

void displayFcn (void)
{
   glClear (GL_COLOR_BUFFER_BIT);   //  Clear display window.

   glColor3f (0.0, 0.0, 1.0);         // Set current color to blue. 
   glRecti (50, 100, 200, 150);       // Display blue rectangle. 

   glPushMatrix ( );                  // Make copy of identity (top) matrix. 
   glColor3f (1.0, 0.0, 0.0);         // Set current color to red. 

   // glTranslatef (-200.0, -50.0, 0.0); // Set translation parameters. ( tx , ty, tz )
   // glRecti (50, 100, 200, 150);       // Display red, translated rectangle. 

   // glPopMatrix ( );                   // Throw away the translation matrix. 
   // glPushMatrix ( );                  // Make copy of identity (top) matrix. 

   glRotatef (90.0, 0.0, 0.0, 1.0);   // Set 90-deg. rotation about z axis.  (theta , vx, vy, vz)
   glRecti (50, 100, 200, 150);       // Display red, rotated rectangle. 

   // glPopMatrix ( );                   // Throw away the rotation matrix. 
   // glScalef (-0.5, 1.0, 1.0);         // Set scale-reflection parameters. (sx, sy, sz)
   // glRecti (50, 100, 200, 150);       // Display red, transformed rectangle. 

   glFlush ( );
}

int main (int argc, char ** argv)
{
   glutInit (&argc, argv);
   glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
   glutInitWindowPosition (50, 50);
   glutInitWindowSize (600, 300);
   glutCreateWindow ("3D Transformtions OpenGL Example");

   init ( );
   glutDisplayFunc (displayFcn);
 
   glutMainLoop ( );
   return 0;
}




