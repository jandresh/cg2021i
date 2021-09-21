// #include <GLUT/glut.h> // MAC OS(For others, depending on the system in use)
// Linux mesa installation: https://www.wikihow.com/Install-Mesa-(OpenGL)-on-Linux-Mint
// Build: g++ ejemplo1.c -lglut -lGL -lGLEW -lGLU -o ejemplo1
// Execute: ./ejemplo1
// Cohen-Sutherland
#include <GL/glut.h> // Linux 
 
class wcPt2D {
public:
    float x, y;
};
 
const int winLeftBitCode = 0x1;
const int winRightBitCode = 0x2;
const int winBottomBitCode = 0x4;
const int winTopBitCode = 0x8;
 
GLubyte encode(wcPt2D pt, wcPt2D winMin, wcPt2D winMax) {    
    GLubyte code = 0x00;
    if (pt.x < winMin.x)        
		code = code | winLeftBitCode;
    if (pt.x > winMax.x)        
		code = code | winRightBitCode;
    if (pt.y < winMin.y)        
		code = code | winBottomBitCode;
    if (pt.y > winMax.y)        
		code = code | winTopBitCode;
    return (code);
}
 
inline int inside(int code) {              
    return int(!code);
}
 
inline int reject(int code1, int code2) {   
    return int(code1 & code2);
}
 
inline int accept(int code1, int code2) {  
    return int(!(code1 | code2));
}
 
void swapPts(wcPt2D *p1, wcPt2D *p2) {      
    wcPt2D tmp;
    tmp = *p1;
    *p1 = *p2;
    *p2 = tmp;
}
 
void swapCodes(GLubyte *c1, GLubyte *c2) {   
    GLubyte tmp;
    tmp = *c1;
    *c1 = *c2;
    *c2 = tmp;
}
 
void lineClip(wcPt2D winMin, wcPt2D winMax, wcPt2D p1, wcPt2D p2)    
{
    GLubyte code1, code2;
    int done = false, plotLine = false;
    float m;
    while (!done)                       
	{
        code1 = encode(p1, winMin, winMax);   
        code2 = encode(p2, winMin, winMax);
        if (accept(code1, code2))	//Inlet clipping window	verification
		{
            done = true;
            plotLine = true;
        } 
		else if (reject(code1, code2)) //Outlet clipping window verification
		{
            done = true;
        } 
		else      //Calcula intersecciones                     
		{
            if (inside(code1))         
			{
                swapPts(&p1, &p2);
                swapCodes(&code1, &code2);
            }
 
			
            if (p2.x != p1.x) 
				m = (p2.y - p1.y) / (p2.x - p1.x);
            if (code1 & winLeftBitCode) 
			{
                p1.y += (winMin.x - p1.x) * m;
                p1.x = winMin.x;
            }
			else if (code1 & winRightBitCode) 
			{
                p1.y += (winMax.x - p1.x) * m;
                p1.x = winMax.x;
            } 
			else if (code1 & winBottomBitCode) 
			{
                if (p2.x != p1.x)
                    p1.x += (winMin.y - p1.y) / m;
                p1.y = winMin.y;
            } 
			else if (code1 & winTopBitCode) 
			{
                if (p2.x != p1.x)
                    p1.x = (winMax.y - p1.y) / m;
                p1.y = winMax.y;
            }
        }
    }
	
    if (plotLine)
        glBegin(GL_LINES);
    glColor3f(1, 0, 0);
    glVertex2f(p1.x, p1.y);
    glVertex2f(p2.x, p2.y);
    glEnd();
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
 
    if (key == 13)   //Hit Enter
        lineClip(winMin, winMax, p1, p2);
        lineClip(winMin, winMax, p3, p4);
        lineClip(winMin, winMax, p5, p6);
 
    glFlush();
    if (key == 27)   //Hit Esc
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
    glutCreateWindow("Cohen-Sutherland");
    glClearColor(1, 1, 1, 0.0);
    glMatrixMode(GL_PROJECTION);
    gluOrtho2D(0.0, 600.0, 0.0, 600.0);
 
    glutKeyboardFunc(myKeyBoard); 
    glutDisplayFunc(display);
 
    glutMainLoop();
    return 0;
 
}