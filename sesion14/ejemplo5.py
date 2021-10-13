# Execute: python3 ejemplo5.py
# Object representation Quadric Surfaces Python
from OpenGL.GLUT import *
from OpenGL.GL import *



def draw():
    glClear(GL_COLOR_BUFFER_BIT)
    glutSolidTeapot(0.5)
    glFlush()


glutInit(sys.argv)
glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB)
glutInitWindowSize(250, 250)
glutInitWindowPosition(100, 100)
glutCreateWindow("glutWireTeapot Object Representation")
glutDisplayFunc(draw)
glutMainLoop()
