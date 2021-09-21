// #include <GLUT/glut.h> // MAC OS(For others, depending on the system in use)
// Linux mesa installation: https://www.wikihow.com/Install-Mesa-(OpenGL)-on-Linux-Mint
// Build: g++ ejemplo3.c -lglut -lGL -lGLEW -lGLU -o ejemplo3
// Execute: ./ejemplo3
#include <GL/glut.h> // Linux 
#include <math.h>
#include <iostream>
using namespace std;

typedef enum Boundary { Left, Right, Bottom, Top} ;
const GLint nClip = 4;

class wcPt2D {
   public:
      GLfloat x, y;
	  void setCoords (GLfloat xCoord, GLfloat yCoord) {
		x = xCoord;
		y = yCoord;
	}
};

wcPt2D leftbottom, righttop;

GLint num;

wcPt2D *in, *out;

Boundary b;


GLint inside (wcPt2D p, Boundary b, wcPt2D wMin, wcPt2D wMax)
{
	switch (b) {
	case Left:   if (p.x < wMin.x) return (false); break;
	case Right:  if (p.x > wMax.x) return (false); break;
	case Bottom: if (p.y < wMin.y) return (false); break;
	case Top:    if (p.y > wMax.y) return (false); break;
	}
	return (true);
}

GLint cross (wcPt2D p1, wcPt2D p2, Boundary winEdge, wcPt2D wMin, wcPt2D wMax)
{
	if (inside (p1, winEdge, wMin, wMax) == inside (p2, winEdge, wMin, wMax))
		return (false);
	else return (true);
}

wcPt2D intersect (wcPt2D p1, wcPt2D p2, Boundary winEdge, wcPt2D wMin, wcPt2D wMax)
{
	wcPt2D iPt;
	GLfloat m;

	if (p1.x != p2.x) m = (p1.y - p2.y) / (p1.x - p2.x);
	switch (winEdge) {
	case Left:
		iPt.x = wMin.x;
		iPt.y = p2.y + (wMin.x - p2.x) * m;
		break;
	case Right:
		iPt.x = wMax.x;
		iPt.y = p2.y + (wMax.x - p2.x) * m;
		break;
	case Bottom:
		iPt.y = wMin.y;
		if (p1.x != p2.x) iPt.x = p2.x + (wMin.y - p2.y) / m;
		else iPt.x = p2.x;
		break;
	case Top:
		iPt.y = wMax.y;
		if (p1.x != p2.x) iPt.x = p2.x + (wMax.y - p2.y) / m;
		else iPt.x = p2.x;
		break;
	}
	return (iPt);
}

void clipPoint (wcPt2D p, Boundary winEdge, wcPt2D wMin, wcPt2D wMax,
				wcPt2D *pOut, int *cnt, wcPt2D *first[], wcPt2D *s)
{
	wcPt2D iPt;
	
	if (!first[winEdge])
		first[winEdge] = &p;
	else
		if (cross (p, s[winEdge], winEdge, wMin, wMax)) {
			iPt = intersect (p, s[winEdge], winEdge, wMin, wMax);
			if (winEdge < Top)
				clipPoint (iPt, (Boundary)(b+1), wMin, wMax, pOut, cnt, first, s);
			else {
				pOut[*cnt] = iPt; (*cnt)++;
			}
		}
	s[winEdge] = p;

	if (inside (p, winEdge, wMin, wMax))
		if (winEdge < Top)
			clipPoint (p, (Boundary)(winEdge+1), wMin, wMax, pOut, cnt, first, s);
		else {
			pOut[*cnt] = p; (*cnt)++;
		}
}

void closeClip (wcPt2D wMin, wcPt2D wMax, wcPt2D *pOut,
				GLint *cnt, wcPt2D *first[], wcPt2D *s)
{
	wcPt2D pt;
	Boundary winEdge;

	for (winEdge = Left; winEdge <= Top; winEdge+1) {
		if (cross (s[winEdge], *first[winEdge], winEdge, wMin, wMax)) {
			pt = intersect (s[winEdge], *first[winEdge], winEdge, wMin, wMax);
			if (winEdge < Top)
				clipPoint (pt, (Boundary)(winEdge +1) , wMin, wMax, pOut, cnt, first, s);
			else {
				pOut[*cnt] = pt; (*cnt)++;
			}
		}
	}
}

GLint polygonClipSuthHodg (wcPt2D wMin, wcPt2D wMax, GLint n, wcPt2D *pIn, wcPt2D *pOut)
{
	wcPt2D *first[nClip] = {0, 0, 0, 0}, s[nClip];
	GLint k, cnt = 0;

	for (k = 0; k < n; k++)
		clipPoint (pIn[k], Left, wMin, wMax, pOut, &cnt, first, s);
	closeClip (wMin, wMax, pOut, &cnt, first, s);
	return (cnt);
}

void display()
{
	glClear (GL_COLOR_BUFFER_BIT);
	glColor3f (1.0, 0.0, 0.0);

	polygonClipSuthHodg(leftbottom, righttop, num, in, out);
	glBegin(GL_POLYGON);
		for(GLint i = 0; i < num; i++) {
			glVertex2f(out->x, out->y);
			out++;}
	glEnd();

	glFlush();
}


void init (void)
{
	/*  Set color of display window to white.  */
	glClearColor (1.0, 1.0, 1.0, 0.0);       
	
	/*  Set parameters for world-coordinate clipping window.  */
	glMatrixMode (GL_PROJECTION);
	gluOrtho2D (-200.0, 200.0, -200.0, 200.0);
	
	/*  Set mode for constructing geometric transformation matrix.  */
	glMatrixMode (GL_MODELVIEW); 
}


int main (int argc, char ** argv)
{
	glutInit (&argc, argv);
	glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB);
	glutInitWindowPosition (100, 100);
	glutInitWindowSize (500, 450);
	glutCreateWindow ("Sutherland-Hodgman Poligon Clip");

	cout << "Introduzca las coordenadas de la esquina inferior izquierda y la esquina superior derecha del área de recorte" << endl;
	cin >> leftbottom.x >> leftbottom.y >> righttop.x >> righttop.y;

	cout << "Ingrese el número de vértices del polígono" << endl;
	cin >> num;

	cout << "Ingrese los vértices del polígono a su vez" << endl;
	cout << "format:x(Vertice1) y(Vertice1) x(Vertice2) y(Vertice2)....." << endl;
	in = new wcPt2D[num];
	out = new wcPt2D[num];
	
	GLfloat x, y;

	wcPt2D *p = in;

	for (GLint i = 0; i < num; i++) {
		cin >> x >> y;
		in->setCoords(x,y);
		in++;
	}

	in = p;
	
	init ( );
	glutDisplayFunc (display);
	
	glutMainLoop ( );

    return 0;
}
