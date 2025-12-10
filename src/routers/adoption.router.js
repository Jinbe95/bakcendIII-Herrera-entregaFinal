import express from 'express';
import mongoose from 'mongoose';
import AdoptionModel from '../models/adoption.model.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

const router = express.Router();

//-----------------------------
// Devuelve todas las opciones con info del user y la pet
//-----------------------------

router.get('/', async (req, res, next) => {
    try {
        const adoptions = await AdoptionModel.find()
            .populate('user', 'first_name last_name email')
            .populate('pet', 'name species age');

        res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
        next(error);
    }
});

//-----------------------------
//Devuelve una adopcion por id en el caso que exista
//-----------------------------

router.get('/:aid', async (req, res, next) => {
    try {
        const { aid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(aid)) {
            return res.status(400).json({ status: 'error', message: 'Adoption id no valido' });
        }

        const adoption = await AdoptionModel.findById(aid)
            .populate('user', 'first_name last_name email')
            .populate('pet', 'name species age');

        if (!adoption) {
            return res.status(404).json({ status: 'error', message: 'Adoption no encontrada' });
        }

        res.status(200).json({ status: 'success', payload: adoption });

    } catch (error) {
        next(error);
    }
});



//-----------------------------
// Crea un registro de adoptcion y validamos que el uid y pid sean validos
//-----------------------------

router.post('/:uid/:pid', async (req, res, next) => {
    try {
        const { uid, pid } = req.params;

        // Validamos que los IDs tengan formato ObjectId
        if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: 'error', message: 'UserId o PetId no valido' });
        }

        // Validamos existencia del usuario y la mascota
        const [userExists, petExists] = await Promise.all([
            UserModel.findById(uid).select('_id'),
            PetModel.findById(pid).select('_id')
        ]);

        if (!userExists || !petExists) {
            return res.status(404).json({ status: 'error', message: 'User o Pet no encontrados' });
        }

        // Creamos la adopcion
        const newAdoption = await AdoptionModel.create({ user: uid, pet: pid });

        res.status(201).json({ status: 'success', payload: newAdoption });

    } catch (error) {
        next(error);
    }
});

export default router;