import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const DEFAULT_PASSWORD = 'coder123';

async function hashPassword(plain) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plain, salt);
}

export async function generateUsers(n = 50) {
    const hashed = await hashPassword(DEFAULT_PASSWORD);
    const users = [];
    for (let i = 0; i < n; i++) {
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const email = faker.internet.email({ firstName: first_name, lastName: last_name }).toLowerCase();
        const role = Math.random() < 0.2 ? 'admin' : 'user';
        const _id = new mongoose.Types.ObjectId();
        const createdAt = faker.date.past({ years: 1 });
        const updatedAt = createdAt;
        users.push({
            _id,
            first_name,
            last_name,
            email,
            password: hashed,
            role,
            pets: [],
            createdAt,
            updatedAt
        });
    }
    return users;
}

export function generatePets(n = 10) {
    const speciesList = ['dog', 'cat', 'parrot', 'rabbit', 'hamster'];
    const pets = [];
    for (let i = 0; i < n; i++) {
        pets.push({
            _id: new mongoose.Types.ObjectId(),
            name: faker.animal.type() + ' ' + faker.string.alpha(3),
            species: speciesList[Math.floor(Math.random() * speciesList.length)],
            age: Math.floor(Math.random() * 15),
            owner: null,
            createdAt: faker.date.past({ years: 1 }),
            updatedAt: new Date()
        });
    }
    return pets;
}

export async function insertFakeData(models, usersCount = 50, petsCount = 20) {
    const { UserModel, PetModel } = models;
    if (!UserModel || !PetModel) throw new Error('Debe proveer UserModel y PetModel');

    const fakeUsers = await generateUsers(usersCount);
    const insertedUsers = await UserModel.insertMany(fakeUsers);

    const fakePets = generatePets(petsCount).map((p) => {
        if (insertedUsers.length > 0 && Math.random() < 0.6) {
            const owner = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
            p.owner = owner._id;
            if (!owner.pets) owner.pets = [];
            owner.pets.push(p._id);
        }
        return p;
    });

    const insertedPets = await PetModel.insertMany(fakePets);

    const bulkUpdates = insertedUsers
        .filter(u => u.pets && u.pets.length > 0)
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
