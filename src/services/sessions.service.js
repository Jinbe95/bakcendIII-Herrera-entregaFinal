import bcrypt from "bcryptjs";
import sessionsRepository from "../repositories/sessions.repository.js";

class SessionsService {

    async register(userData) {
        const { email, password } = userData;

        const userExists = await sessionsRepository.getUserByEmail(email);
        if (userExists) {
            throw new Error("El usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            ...userData,
            password: hashedPassword,
            role: "user"
        };

        return sessionsRepository.createUser(newUser);
    }

    async login(email, password) {
        const user = await sessionsRepository.getUserByEmail(email);
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error("Credenciales incorrectas");
        }

        return user;
    }
}

export default new SessionsService();
