import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

const DEFAULT_PASSWORD = "coder123";

async function hashPassword(plain) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plain, salt);
}

// ----------------------------------------------
// Generar usuarios
// ----------------------------------------------
export async function generateUsers(n = 50) {
    const hashed = await hashPassword(DEFAULT_PASSWORD);
    const users = [];

    for (let i = 0; i < n; i++) {
        const first = faker.person.firstName();
        const last = faker.person.lastName();

        users.push({
            _id: new mongoose.Types.ObjectId(),
            first_name: first,
            last_name: last,
            email: faker.internet.email({ firstName: first, lastName: last }),
            password: hashed,
            role: Math.random() < 0.2 ? "admin" : "user",
            pets: [],
            createdAt: faker.date.past(),
            updatedAt: new Date()
        });
    }
    return users;
}

// ----------------------------------------------
// Geberar PETS
// ----------------------------------------------
export function generatePets(n = 10) {
    const speciesList = ["dog", "cat", "bird", "rabbit", "hamster"];

    const pets = [];
    for (let i = 0; i < n; i++) {
        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name: faker.person.firstName(),
            species: speciesList[Math.floor(Math.random() * speciesList.length)],
            age: faker.number.int({ min: 1, max: 20 }),
            owner: null,
            createdAt: faker.date.past(),
            updatedAt: new Date()
        });
    }
    return pets;
}

// ----------------------------------------------
// Insertar usuarios y pets en DB
// ----------------------------------------------
export async function insertFakeData(models, usersCount = 50, petsCount = 20) {

    const { UserModel, PetModel } = models;
    if (!UserModel || !PetModel)
        throw new Error("Debe proveer UserModel y PetModel");

    // Insertar users
    const fakeUsers = await generateUsers(usersCount);
    const insertedUsers = await UserModel.insertMany(fakeUsers);

    // Insertar pets asignando owner aleatorio
    const fakePets = generatePets(petsCount).map(p => {
        if (insertedUsers.length > 0 && Math.random() < 0.6) {
            const owner = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
            p.owner = owner._id;
            owner.pets.push(p._id);
        }
        return p;
    });

    const insertedPets = await PetModel.insertMany(fakePets);

    // Actualizar usuarios que adoptaron pets
    const bulkUpdates = insertedUsers
        .filter(u => u.pets.length > 0)
        .map(u => ({
            updateOne: {
                filter: { _id: u._id },
                update: { $set: { pets: u.pets } }
            }
        }));

    if (bulkUpdates.length > 0) {
        await UserModel.bulkWrite(bulkUpdates);
    }

    return { insertedUsers, insertedPets };
}
