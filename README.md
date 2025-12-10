**README -- Entrega Final Backend**

**Alumno:** Agustín Herrera

---

**Descripción de la entrega**

Este proyecto implementa las consignas solicitadas para la **Entrega 1
de Backend**, incluyendo:

- Generación de datos mock con Faker.\
- Inserción opcional de datos falsos en MongoDB.\
- Router de Adopciones con los endpoints solicitados.\
- Testing con **Mocha**, **Chai** y **Supertest**.

---

**Estructura del proyecto**

    /src
      /models
        adoption.model.js
        pet.model.js
        user.model.js
      /routers
        adoption.router.js
        mocks.router.js
      /services
        mocking.service.js
      index.js

    /test
      adoption.test.js

    package.json

---

**Requerimientos cumplidos**

#Mocking

- `/src/services/mocking.service.js`
- `/src/routers/mocks.router.js`

Incluye generación de usuarios, mascotas e inserción en BD.

#Router de Adopciones

`/src/routers/adoption.router.js`

#Endpoints solicitados:

- `GET /api/adoptions`
- `GET /api/adoptions/:aid`
- `POST /api/adoptions/:uid/:pid`

Con validación de ObjectId y existencia de documentos.

#Testing

`/test/adoption.test.js`

Pruebas realizadas:

- GET general
- GET con id inválido
- GET con id inexistente
- POST creación de adopción

---

**Cómo ejecutar el proyecto**

#Instalar dependencias

    npm install

#Iniciar servidor

    npm run dev

---

**Ejecutar tests**

    npm test (Se ejecuta usando una nueva terminal)

---

**Endpoints principales**

#Mocks

Método Endpoint

---

GET `/api/mocks/mockingusers`
GET `/api/mocks/mockingpets`
POST `/api/mocks/generateData`

#Adoptions

Método Endpoint

---

GET `/api/adoptions`
GET `/api/adoptions/:aid`
POST `/api/adoptions/:uid/:pid`

---

#Tecnologías

- Node.js\
- Express\
- MongoDB / Mongoose\
- Faker\
- Mocha\
- Chai\
- Supertest
