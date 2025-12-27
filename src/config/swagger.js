import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Backend III - API",
            description: "Documentación de la API - Users",
            version: "1.0.0"
        }
    },
    apis: ["./src/routers/*.js"]
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
