**README -- Entrega Final Backend**

**Alumno:** Agustín Herrera

---

**Descripción de la entrega**

Este proyecto implementa las consignas solicitadas para la **Entrega Final de Backend**, incorporando los distintos contenidos vistos durante el curso:

- Generación de datos mock con Faker
- Inserción de datos falsos en MongoDB
- Arquitectura por capas (Router / Service / Repository)
- CRUD de usuarios y mascotas
- Sistema de autenticación con Sessions
- Router de adopciones
- Documentación con Swagger
- Contenerización con Docker
- Testing con Mocha y Supertest

---

**Estructura del proyecto**

/src
├── models
│ ├── adoption.model.js
│ ├── pet.model.js
│ └── user.model.js
│
├── repositories
│ ├── users.repository.js
│ ├── pets.repository.js
│ └── sessions.repository.js
│
├── services
│ ├── users.service.js
│ ├── pets.service.js
│ ├── sessions.service.js
│ └── mocking.service.js
│
├── routers
│ ├── users.router.js
│ ├── pets.router.js
│ ├── sessions.router.js
│ ├── adoption.router.js
│ └── mocks.router.js
│
├── config
│ └── swagger.js
│
└── index.js
/test
└── adoption.test.js

Dockerfile
package.json

---

## ✅ Requerimientos cumplidos

### 🧪 Mocking de datos

Archivos:

- `/src/services/mocking.service.js`
- `/src/routers/mocks.router.js`

Funcionalidades:

- Generación de usuarios y mascotas fake
- Inserción opcional de datos mock en MongoDB

Endpoints:

- `GET /api/mocks/mockingusers`
- `GET /api/mocks/mockingpets`
- `POST /api/mocks/generateData`

---

### 👤 Users

Arquitectura por capas:

- Router
- Service
- Repository

Endpoints:

- `GET /api/users`
- `GET /api/users/:uid`
- `POST /api/users`

---

### 🐶 Pets

Arquitectura por capas:

- Router
- Service
- Repository

Endpoints:

- `GET /api/pets`
- `GET /api/pets/:pid`
- `POST /api/pets`

---

### 🔐 Sessions (Autenticación)

Implementación de autenticación utilizando **express-session**.

Endpoints:

- `POST /api/sessions/register`
- `POST /api/sessions/login`
- `POST /api/sessions/logout`

Incluye:

- Hash de contraseñas con bcrypt
- Manejo de sesión de usuario

---

### 🐾 Adoptions

Archivo:

- `/src/routers/adoption.router.js`

Endpoints:

- `GET /api/adoptions`
- `GET /api/adoptions/:aid`
- `POST /api/adoptions/:uid/:pid`

Incluye validaciones de:

- ObjectId
- Existencia de usuario y mascota

---

### 📘 Swagger

La documentación de la API se encuentra disponible en:

Incluye la documentación del módulo **Users**.

---

### 🐳 Docker

El proyecto incluye un archivo **Dockerfile** para ejecutar la aplicación dentro de un contenedor.

---

### 🧪 Testing

Testing implementado con **Mocha** y **Supertest**.

Archivo:

- `/test/adoption.test.js`

Pruebas realizadas:

- GET de adopciones
- GET con ID inválido
- GET con ID inexistente
- POST de adopción

---

## ▶️ Cómo ejecutar el proyecto

### Instalar dependencias

- npm install

### Iniciar servidor

- npm run dev

---

## ▶️ Ejecutar tests

- npm test (se ejecuta usando nueva terminal)

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express
- MongoDB / Mongoose
- Faker
- Docker
- Swagger
- Mocha
- Chai
- Supertest

---

## 🎯 Estado del proyecto

✔ Cumple con todos los requisitos de la entrega final  
✔ Incluye autenticación, documentación y dockerización  
✔ Arquitectura alineada con lo visto en clase
