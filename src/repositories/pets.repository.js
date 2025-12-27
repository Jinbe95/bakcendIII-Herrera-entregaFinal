import PetModel from "../models/pet.model.js";

class PetsRepository {

    // Obtener todas las mascotas
    async getAll() {
        return await PetModel.find();
    }

    // Obtener mascota por ID
    async getById(pid) {
        const pet = await PetModel.findById(pid);
        if (!pet) throw new Error("Pet not found");
        return pet;
    }

    // Crear mascota
    async create(data) {
        return await PetModel.create(data);
    }

    // Actualizar mascota
    async update(pid, data) {
        const pet = await PetModel.findByIdAndUpdate(
            pid,
            data,
            { new: true }
        );
        if (!pet) throw new Error("Pet not found");
        return pet;
    }

    // Eliminar mascota
    async delete(pid) {
        const pet = await PetModel.findByIdAndDelete(pid);
        if (!pet) throw new Error("Pet not found");
        return pet;
    }
}

export default new PetsRepository();
