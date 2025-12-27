import usersRepository from "../repositories/user.repository.js";

class UsersService {

    async getAll() {
        return usersRepository.getAll();
    }

    async getById(uid) {
        return usersRepository.getById(uid);
    }

    async create(userData) {
        return usersRepository.create(userData);
    }
}

export default new UsersService();
