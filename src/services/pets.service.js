import petsRepository from "../repositories/pets.repository.js";

class PetsService {

    async getAllPets() {
        return await petsRepository.getAll();
    }

    async getPetById(pid) {
        const pet = await petsRepository.getById(pid);
        if (!pet) {
            throw new Error("Pet not found");
        }
        return pet;
    }

    async createPet(petData) {
        if (!petData.name || !petData.species) {
            throw new Error("Missing required pet fields");
        }
        return await petsRepository.create(petData);
    }

    async updatePet(pid, data) {
        const updatedPet = await petsRepository.update(pid, data);
        if (!updatedPet) {
            throw new Error("Pet not found");
        }
        return updatedPet;
    }

    async deletePet(pid) {
        const deletedPet = await petsRepository.delete(pid);
        if (!deletedPet) {
            throw new Error("Pet not found");
        }
        return deletedPet;
    }
}

export default new PetsService();
