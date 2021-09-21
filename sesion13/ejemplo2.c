// #include <GLUT/glut.h> // MAC OS(For others, depending on the system in use)
// Linux mesa installation: https://www.wikihow.com/Install-Mesa-(OpenGL)-on-Linux-Mint
// Build: g++ ejemplo2.c -lglut -lGL -lGLEW -lGLU -o ejemplo2
// Execute: ./ejemplo2
// Liang-Barsky
#include <GL/glut.h> // Linux

class wcPt2D 
{
    public:
   /*  Default Constructor: initialize position as (0.0, 0.0).  */
      float x=0.0;
      float y = 0.0;

   int setCoords (float xCoord, float yCoord) {
      x = xCoord;
      y = yCoord;
      return 0;
   }

   float getx ( ) const {
      return x;
   }

   float gety ( ) const {
      return y;
   }
};

inline int clipTest (float p, float q, float * u1, float * u2)
{
  float r;
  int returnValue = true;

  if (p < 0.0) {
    r = q / p;
    if (r > *u2)
      returnValue = false;
    else
      if (r > *u1)
        *u1 = r;
  }
  else
    if (p > 0.0) {
      r = q / p;
      if (r < *u1)
        returnValue = false;
      else if (r < *u2)
        *u2 = r;
    }
    else
      /*  Thus p = 0 and line is parallel to clipping boundary.  */
      if (q < 0.0)
        /*  Line is outside clipping boundary.  */
        returnValue = false;

  return (returnValue);
}

void lineClipLiangBarsk (wcPt2D winMin, wcPt2D winMax, wcPt2D p1, wcPt2D p2)
{
  float u1 = 0.0, u2 = 1.0, dx = p2.getx ( ) - p1.getx ( ), dy;

  if (clipTest (-dx, p1.getx ( ) - winMin.getx ( ), &u1, &u2))
    if (clipTest (dx, winMax.getx ( ) - p1.getx ( ), &u1, &u2)) {
      dy = p2.gety ( ) - p1.gety ( );
      if (clipTest (-dy, p1.gety ( ) - winMin.gety ( ), &u1, &u2))
        if (clipTest (dy, winMax.gety ( ) - p1.gety ( ), &u1, &u2)) {
          if (u2 < 1.0) {
            p2.setCoords (p1.getx ( ) + u2 * dx, p1.gety ( ) + u2 * dy);
          }
          if (u1 > 0.0) {
            p1.setCoords (p1.getx ( ) + u1 * dx, p1.gety ( ) + u1 * dy);
          }
          glBegin(GL_LINES);
          glColor3f(1, 0, 0);
          glVertex2f(p1.getx ( ), p1.gety ( ));
          glVertex2f(p2.getx ( ), p2.gety ( ));
          glEnd();
        }
    }
}

void drawpolygon(double cd[]) 
{
    glBegin(GL_LINE_LOOP);    
    glLineWidth(10);
    for (int i = 0; i < 8; i = i + 2) {
        glVertex2f(cd[i], cd[i + 1]);
    }
    glEnd();
}
 
void drawline(double cd[]) 
{
    glBegin(GL_LINES);      
    glLineWidth(10);
    for (int i = 0; i < 4; i = i + 2) {
        glVertex2f(cd[i], cd[i + 1]);
    }
    glEnd();
}
 
void myKeyBoard(unsigned char key, int x, int y) 
{   
    wcPt2D winMin = {200, 200};
    wcPt2D winMax = {400, 400};
    wcPt2D p1 = {100, 0};
    wcPt2D p2 = {500, 500};
    wcPt2D p3 = {250, 250};
    wcPt2D p4 = {300, 300};
    wcPt2D p5 = {0, 100};
    wcPt2D p6 = {300, 100};
 
    if (key == 13)   
        lineClipLiangBarsk(winMin, winMax, p1, p2);
        lineClipLiangBarsk(winMin, winMax, p3, p4);
        lineClipLiangBarsk(winMin, winMax, p5, p6);
 
    glFlush();
    if (key == 27)   
        exit(0);
}
 
void display(void) 
{
    double re[8] = {200, 200, 400, 200, 400, 400, 200, 400};
    double line[4] = {100,0 , 500, 500};
    double line2[4] = {250,250 , 300, 300};
    double line3[4] = {0,100 , 400, 100};
 
    glClear(GL_COLOR_BUFFER_BIT);
	glViewport(0, 0, 600, 600);
    glColor3f(0, 0, 0);
	
    drawpolygon(re);
    drawline(line);
    drawline(line2);
    drawline(line3);
     
    glFlush();
}
 
int main(int argc, char **argv) 
{
	glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RED);
    glutInitWindowSize(600, 600);
    glutInitWindowPosition(100, 100);
    glutCreateWindow("Liang-Barsky");
    glClearColor(1, 1, 1, 0.0);
    glMatrixMode(GL_PROJECTION);
    gluOrtho2D(0.0, 600.0, 0.0, 600.0);
 
    glutKeyboardFunc(myKeyBoard); 
    glutDisplayFunc(display);
 
    glutMainLoop();
    return 0;
 
}