# TheWitcher-Bestiario

Esta página contiene las siguientes funcionalidades:

- Servidor hecho en express
- Motor de vistas en express-handlebars
- Login como Admin
- Ver y editar el listado de items
- Permisos de Admin para editar las entradas
- Integración con MongoAtlas

Módulos:

beasts.js - Contiene las requests a la base de datos (colection:beasts):
-getByIdAndUpdate: Buscar por ObjectId en la base de datos y updatea. Recibe un formulario y un id.
-getAll: Busca todas las entradas dentro de la colección.
-getByBook: Busca todas las entradas dentro de colection:beasts que coinciden con el índice del libro.
-getById :Buscar por ObjectId en la base de datos

login.js - Contiene las requests a la base de datos (colection:users):
-login: Busca la entrada en la colección users que coincida con los parámetros de entrada.

const-db.js - Contiene las configuraciones de conección a mongoDB:
-Modificar const url para ingresar una conexión a mongo atlas.

index.js -  Contiene todas las rutas del servidor express.

Funcionalidades a agregar:
- Alta y baja de usuarios por parte del Admin
- Permisos de edición de usuarios para el Admin
- Creación de nuevas entradas desde el front (no desde la DB)
