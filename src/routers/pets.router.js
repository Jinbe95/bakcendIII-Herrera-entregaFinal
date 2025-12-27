import { Router } from "express";
import petsService from "../services/pets.service.js";
import mongoose from "mongoose";

const router = Router();

// GET all pets
router.get("/", async (req, res) => {
    try {
        const pets = await petsService.getAllPets();
        res.status(200).json({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// GET pet by id
router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "Invalid pet ID" });
        }

        const pet = await petsService.getPetById(pid);
        res.status(200).json({ status: "success", payload: pet });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

// CREATE pet
router.post("/", async (req, res) => {
    try {
        const newPet = await petsService.createPet(req.body);
        res.status(201).json({ status: "success", payload: newPet });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// UPDATE pet
router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "Invalid pet ID" });
        }

        const updatedPet = await petsService.updatePet(pid, req.body);
        res.status(200).json({ status: "success", payload: updatedPet });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

// DELETE pet
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", message: "Invalid pet ID" });
        }

        await petsService.deletePet(pid);
        res.status(200).json({ status: "success", message: "Pet deleted" });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

export default router;
