import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";
import mocksRouter from "./routers/mocks.router.js";
import usersRouter from "./routers/users.router.js";
import petsRouter from "./routers/pets.router.js";
import sessionsRouter from "./routers/sessions.router.js";
import adoptionRouter from "./routers/adoption.router.js";

const app = express();

// -----------------------------
// Middlewares
// -----------------------------
app.use(express.json());

app.use(
    session({
        secret: "coderSecret",
        resave: false,
        saveUninitialized: false
    })
);

// -----------------------------
// Routers
// -----------------------------
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/adoptions", adoptionRouter);

// -----------------------------
// Manejo de errores
// -----------------------------
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({
        status: "error",
        message: error.message
    });
});

// -----------------------------
// Conexion a Mongo
// -----------------------------
const MONGO_URL =
    process.env.MONGO_URL || "mongodb://localhost:27017/mi_basedatos";
const PORT = process.env.PORT || 3000;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Mongo conectado");

        if (process.env.NODE_ENV !== "test") {
            app.listen(PORT, () =>
                console.log(`Server escuchando en http://localhost:${PORT}`)
            );
        }
    })
    .catch((error) => {
        console.error("Error conectando a Mongo:", error);
    });

export default app;
