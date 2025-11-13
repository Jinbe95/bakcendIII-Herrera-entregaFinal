import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routers/mocks.router.js';
import UserModel from './models/user.model.js';
import PetModel from './models/pet.model.js';

const app = express();
app.use(express.json());


//-----------------------------
//Montamos router bajo api/mocks
//-----------------------------
app.use('/api/mocks', mocksRouter);



//-----------------------------
//endpoints de verificacion
//-----------------------------
app.get('/api/users', async (req, res, next) => {
    try {
        const users = await UserModel.find().limit(100);
        res.json({ status: 'success', payload: users })
    } catch (error) {
        next(error);
    }
});

app.get('/api/pets', async (req, res, next) => {
    try {
        const pets = await PetModel.find().limit(100);
        res.json({ status: 'success', payload: pets });
    } catch (error) {
        next(error);
    }
})


//-----------------------------
//Manejo de errores
//-----------------------------

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
});

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/mi_basedatos';
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Mongo conectado');
        app.listen(PORT, () => console.log(`Server escuchando en http://localhost:${PORT}`));
    })
    .catch(error => {
        console.error('Error conectando a Mongo:', error);
    });
