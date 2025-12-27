import UserModel from "../models/user.model.js";

class UsersRepository {

    async getAll() {
        return UserModel.find();
    }

    async getById(uid) {
        return UserModel.findById(uid);
    }

    async create(userData) {
        return UserModel.create(userData);
    }
}

export default new UsersRepository();
