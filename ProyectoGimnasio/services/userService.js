import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';

export const getUsersService = async () => {
    return await Usuario.findAll();
};

export const createUserService = async (usuario) => {
    try {
        // Encriptar la contraseña antes de crear el usuario
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(usuario.contraseña, saltRounds);

        // Crear el usuario con la contraseña encriptada
        const nuevoUsuario = await Usuario.create({
            ...usuario,
            contraseña: hashedPassword,
        });

        return nuevoUsuario;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

export const getUserByIdService = async (id) => {
    return await Usuario.findByPk(id);
};

export const updateUserByIdService = async (id, userData) => {
    // Buscar usuario por ID
    const user = await Usuario.findByPk(id);
  
    if (!user) {
      return null;
    }
  
    // Si se proporciona una nueva contraseña, encriptarla
    if (userData.contraseña) {
      const saltRounds = 10;
      userData.contraseña = await bcrypt.hash(userData.contraseña, saltRounds);
    }
  
    // Actualizar usuario con los nuevos datos
    return await user.update(userData);
  };

export const deleteUserByIdService = async (id) => {
    const user = await Usuario.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    return false;
};


