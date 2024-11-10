import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const getUsersService = async () => {
    return await User.findAll();
};

export const createUserService = async (userData) => {
    try {
        // Encriptar la contraseña antes de crear el usuario
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.contraseña, saltRounds);

        // Crear el usuario con la contraseña encriptada
        const newUser = await User.create({
            ...userData,
            contraseña: hashedPassword,
        });

        return newUser;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const getUserByIdService = async (id) => {
    return await User.findByPk(id);
};

export const updateUserByIdService = async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    return null;
};

export const deleteUserByIdService = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    return false;
};


