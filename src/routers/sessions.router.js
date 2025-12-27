import express from "express";
import sessionsService from "../services/sessions.service.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res, next) => {
    try {
        const user = await sessionsService.register(req.body);

        res.status(201).json({
            status: "success",
            payload: user
        });
    } catch (error) {
        next(error);
    }
});

// LOGIN
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email y password requeridos"
            });
        }

        const user = await sessionsService.login(email, password);

        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        res.json({
            status: "success",
            message: "Login exitoso"
        });
    } catch (error) {
        next(error);
    }
});

// LOGOUT
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({
            status: "success",
            message: "Logout exitoso"
        });
    });
});

export default router;
