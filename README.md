# Proyecto de Recetas

Este es un proyecto de una aplicación web de recetas donde los usuarios pueden realizar un CRUD (Crear, Leer, Actualizar, Eliminar) de recetas, además de poder añadir o quitar recetas de sus favoritos. El backend está desarrollado utilizando **Node.js** con varias tecnologías clave para la autenticación, gestión de usuarios y envío de correos electrónicos.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express**: Framework web para Node.js que facilita la creación de la API.
- **Mongoose**: ODM (Object Data Modeling) para interactuar con MongoDB.
- **bcrypt**: Librería para el hashing de contraseñas y la autenticación segura.
- **dotenv**: Manejo de variables de entorno.
- **JWT (JSON Web Token)**: Autenticación basada en tokens.
- **nodemailer**: Librería para el envío de correos electrónicos.

## Entidades

### Recipe (Receta)

- **id**: Identificador único de la receta.
- **title**: Nombre de la receta.
- **description**: Descripción breve de la receta.
- **ingredients**: Lista de ingredientes necesarios para la receta.
- **category**: Categoría de la receta (por ejemplo, "postres", "ensaladas", "bebidas", etc.).
- **imageUrl**: URL de la imagen de la receta.
- **difficulty**: Nivel de dificultad ("fácil", "medio", "difícil").
- **likes**: Lista de IDs de los usuarios que han dado "like" a la receta.
- **creationDate**: Fecha de creación de la receta.

### User (Usuario)

- **id**: Identificador único del usuario.
- **name**: Nombre del usuario.
- **email**: Correo electrónico del usuario.
- **password**: Contraseña del usuario (almacenada encriptada).
- **role**: Rol del usuario ('admin' o 'user').
- **favoriteRecipes**: Array con los IDs de las recetas favoritas del usuario.

## Endpoints

### Sin Autenticación

- **GET /recipes**: Obtener todas las recetas. El campo `likes` devolverá un número con la cantidad de likes.
- **GET /recipes/:id**: Obtener el detalle de una receta específica por su ID.
- **GET /recent_recipes**: Obtener las 5 recetas más recientes.
- **GET /popular_recipes**: Obtener las 5 recetas con mayor cantidad de likes.
- **POST /signup**: Registro de nuevos usuarios.
- **POST /login**: Inicio de sesión para usuarios existentes.

### Con Autenticación

- **GET /user/favorites**: Obtener las recetas favoritas del usuario logueado.
- **POST /user/:recipeId/favorite**: Añadir una receta a los favoritos del usuario logueado.
- **DELETE /user/:recipeId/favorite**: Eliminar una receta de los favoritos del usuario logueado.
- **POST /recipes**: Crear una nueva receta (solo para administradores).
- **PATCH /recipes/:id**: Actualizar una receta (solo para administradores).
- **DELETE /recipes/:id**: Eliminar una receta (solo para administradores).
- **POST /recipes/:id/comment**: Añadir un comentario a una receta (solo usuarios logueados).

### Características adicionales

- **Correo de bienvenida**: Enviar un correo de bienvenida cuando un usuario se registre en la aplicación.
  
#### Likes para recetas

- **POST /recipes/:id/like**: Añadir un like a una receta.
- **DELETE /recipes/:id/like**: Eliminar un like de una receta.

#### Filtrar por categoría

- **GET /recipes/category/:category**: Obtener recetas filtradas por categoría (por ejemplo: "Postres", "Bebidas", etc.).

#### Sistema de comentarios

Cada receta tiene un array de comentarios con la siguiente estructura:

- **comment**: Texto del comentario.
- **userId**: ID del usuario que realiza el comentario.
- **date**: Fecha de creación del comentario.
- **rating**: Puntuación de la receta (del 1 al 5).

#### Rutas adicionales

- **PATCH /user**: Editar los datos del usuario logueado.
- **GET /generateToken**: Obtener el **ACCESS_TOKEN** y el **REFRESH_TOKEN**. Este endpoint utiliza el **REFRESH_TOKEN** para generar nuevos tokens.

### Seguridad

- **Tokens generados con JWT**:
  - **ACCESS_TOKEN**: Válido por 15 minutos.
  - **REFRESH_TOKEN**: Válido por 60 minutos.
  
- **Contraseñas**: Las contraseñas de los usuarios están encriptadas usando `bcrypt`.
  
- **Middlewares de seguridad**:
  - Validación de tokens para garantizar que no hayan expirado.
  - Validación de roles para asegurar que un usuario tenga permisos de administrador cuando sea necesario.

## Contacto

  - Si tienes alguna pregunta o sugerencia, no dudes en contactarme:[anamolina.r08@gmail.com](anamolina.r08@gmail.com)
