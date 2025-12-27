import express from "express";
import mongoose from "mongoose";
import usersService from "../services/users.service.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         _id: 64fabc123
 *         first_name: Juan
 *         last_name: Perez
 *         email: juan@mail.com
 *         role: user
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", async (req, res, next) => {
    try {
        const users = await usersService.getAll();
        res.json({ status: "success", payload: users });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({ status: "error", message: "ID invalido" });
        }

        const user = await usersService.getById(uid);

        if (!user) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        res.json({ status: "success", payload: user });
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", async (req, res, next) => {
    try {
        const newUser = await usersService.create(req.body);
        res.status(201).json({ status: "success", payload: newUser });
    } catch (error) {
        next(error);
    }
});

export default router;
