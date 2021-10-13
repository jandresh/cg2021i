# cg2021i
Ejemplos de software vistos en clase de computación gráfica. Sem I-2021. Universidad del Valle

# Proyecto del curso
En el directorio sesion16 se recopilan los proyectos presentados sobre la implementación de un motor de juegos 2D para prácticas de computación gráfica.

Ejecución en Docker de un contenedor con servidor web nginx configurado para listar archivos y facilitar acceso a los diversos proyectos recopilados:

```
docker run -ti -p 8080:80 -v ABSOLUTE-PATH-TO-sesion16-FOLDER:/mnt/data jetbrainsinfra/nginx-file-listing:0.2
```
