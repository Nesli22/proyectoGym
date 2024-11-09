import bcrypt from 'bcrypt';
import User from '../models/User.js';

// Obtener todos los usuarios
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

// Obtener un usuario por su ID
export const getUserById = async (id) => {
    return await User.findByPk(id);
};

// Actualizar un usuario por su ID
export const updateUserById = async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    return null;
};

// Eliminar un usuario por su ID
export const deleteUserById = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    return false;
};
