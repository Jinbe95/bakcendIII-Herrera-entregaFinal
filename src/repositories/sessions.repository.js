import UserModel from "../models/user.model.js";

class SessionsRepository {

    async getUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async createUser(userData) {
        return await UserModel.create(userData);
    }

}

export default new SessionsRepository();
