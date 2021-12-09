# API-REST-COMMERCE
Desarrollo completo de solo **backend** que permite la gestión de productos, usuarios además de tener la gestión de signup y singin. Desarrollo tomado de [este video de Fazt][video de fazt]
***

## Tecnologías usadas
- express
- bcrypjs (cifrar datos, como la contraseña)
- dotenv (para crear variables de entorno **no se usó**)
- jsonwebtoken (creacion de token, para los usuarios reistrados)
- mongoose  (adaptador para la bd mogoose)
- morgan (notificaiones en consola de las peticions http realizadas)
- helmet (caracteristicas de seguridad para evitar que el servidor de info adicional **no se usó**)
- babel --> @babel/core @babel/cli @babel/node @babel/preset-env   (recordar crear archivo .babelrc)

***
## Como ejecutar
Solo corre en local. pues no se hizo despliegue
Se debe correr mongod en local y luego ejecutar el script del package.json
```
$ mongod
$ npm run dev
```
Al ser un proyecto backend 100% se recomienda el uso de **Postman** para el accesos a los difernetes endpoint.

***
## Descripción detallada del proyecto y caracteristicas
El proyecto es 100% backend y tiene como principal propósito tener los elementos básicos de la gestion de una bd que podria emular una tienda. 
Se implementa registro, loguin y roles (admin, user, moderator) aunque solo se usa en esta implementacion admin y user
- La base de datos está implementada con mongo
- Los endpoit se implementaron con express
Al ser 100% backend, los accesos a los difernetes endpoint se realiza con postman.

### Estructura de los enpoint
-   /api/products  (get) muestra todos los productos (No requiere autenticacion)
-   /api/products/:id  (get) Muestra el producto identificado con el id (No requiere autenticacion)
-   /api/products (post) Ingreso de nuevos productos (Requiere auth y rol admin)
-   /api/products/:id (put) Actualiza un producto identificado con id (Requiere auth y rol admin)
-   /api/products/:id (delete) Borra un producto identificado con id (Requiere auth y rol admin)
-   /api/users (get)  Despliega todos los usuarios registrados (no requiere auth)
-   /api/users (post) Permite el ingreso *manual* de usuarios (requiere auth y rol admin)
-   /api/auth/sigup  (post) permite el registro de un nuevo usuario (no requiere auth)
-   /api/auth/sigin (post) Permite el ingreso al usuario (se entrega un token que contiene el id del usuario autorizado)

**Nota:** La implementacion de /api/users (post) falta implementarlo completamente pues es necesario todo el proceso de encriptación de la contraseña que se le asigne al usuario etc


***
## Descripción de la estructra del proyecto
Del directorio raiz se crea la carpeta `src` para todo el código que se crea
- .babelrc: código para que el proyecto trabaje con babel
- index.js: Inicia el proyecto, se encarga de `app.listen()` y de usar la conexión a la base de datos
- app.js: Es donde está toda la configuración de la app 
- database.js: Se encarga de la configuración de la base de datos
- config.js: En este caso solo se usa para el guardado de una palabra clave (quizas Fazt iba usar variables de entorno pero no lo alcanzó a ejecutar (ver el proyecto de my-todolist alli si se implementa))
- /routes: la implementacion de los endpoit
- /controllers: son las funciones que usan los endpoint
- /models: todos los modelos de datos usados (Product, User, Role)
- /libs/initialsetup.js: Verificacion de la existencia de los roles en la bd, este tipo de carpetas son mas de gusto del programador, pues está lógica bien pueden estar en index.js
- /middlewares   funciones que ayudan a la verificacion de datos y por lo tanto permiten o no continuar con la ejecucion de los controllers (gracias a los midlewares se logra la protección de rutas, o verificacion de usuario registrados, de roles, o de datos existentes en la bd, **muy útiles**)

*** 
## Por menores del proyecto

### Orden en el desarrollo
Encuentro en este orden una logica de la estructura general del proyectto, esta es una base y no necesariamnete debe seguirse de forma estricta.

- Instalacion de dependencias y configuracion de .rcbabel y los scripts del package.json
-crear index
- crar app
- crear estructuras de carpetas
- Crear rutas y lo posible los controladores
- Conexion a la base de datos en el archivo database.js e importacion al index
- creacion de los modelos de base de datos
- Creacioon y comprobacion de datos
- Signup
- Signin
- Validaciones de token y proteccion de rutas

***

## Apuntes
-   El concepto de roles se maneja como una estructura de datos en la bd y en el usuario es un arreglo.

-   La palabra clave para la generacion de los token se realiza desde el archivo congin (no es obligacion pero esa es la implementación que se hizo)

-   Para el manejo de los roles la implementacion consiste en que se cargaran unos roles por defecto cuando el servidor se ejecute por primera vez, para ello usaremos un archivi ubicado en libs

## Mejoras futuras
-   Hacer la implementacion de addUsuarios en el controlador users
- Realizar el despliegue en heroku y en mongoatlas
***
### Maolink software
Version. 1.0.0

Diciembre 2021



[video de fazt]:<https://www.youtube.com/watch?v=lV7mxivGX_I&list=PLFvTzgbYK-U7uOKvpW8kQfDF0BYzeMo3_&index=1&t=3649s>