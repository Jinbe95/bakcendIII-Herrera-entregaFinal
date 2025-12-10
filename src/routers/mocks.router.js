import express from 'express';
const router = express.Router();

import { generateUsers, generatePets, insertFakeData } from '../services/mocking.service.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

router.get('/mockingpets', (req, res) => {
    const qty = parseInt(req.query.qty) || 10;
    const pets = generatePets(qty);
    res.json({ status: 'success', payload: pets });
});

router.get('/mockingusers', async (req, res, next) => {
    try {
        const count = parseInt(req.query.count) || 50;
        const users = await generateUsers(count);
        res.json({ status: 'success', payload: users });
    } catch (err) {
        next(err);
    }
});

router.post('/generateData', async (req, res, next) => {
    try {
        const usersCount = parseInt(req.body.users) || 0;
        const petsCount = parseInt(req.body.pets) || 0;

        if (usersCount <= 0 && petsCount <= 0) {
            return res.status(400).json({ status: 'error', message: 'Debe indicar users y/o pets > 0' });
        }

        const result = await insertFakeData({ UserModel, PetModel }, usersCount, petsCount);

        res.json({
            status: 'success',
            message: `Se insertaron ${result.insertedUsers.length} users y ${result.insertedPets.length} pets`,
            usersInserted: result.insertedUsers.length,
            petsInserted: result.insertedPets.length
        });
    } catch (error) {
        next(error);
    }
});

export default router;
