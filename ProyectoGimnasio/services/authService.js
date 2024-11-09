import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

export const getUserByEmailService = async (correo) => {
    try {
        // Buscar el usuario en la base de datos por correo
        const user = await User.findOne({ where: { correo } });
        return user;
    } catch (error) {
        console.error('Error al obtener el usuario por correo:', error);
        throw new Error('Error al obtener el usuario');
    }
};

export const verifyPassword = async (inputPassword, storedPassword) => {
    try {
        // Compara la contraseña ingresada con la almacenada en la base de datos
        return await bcrypt.compare(inputPassword, storedPassword);
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        throw new Error('Error al verificar la contraseña');
    }
};

export const generateToken = (user) => {
    // Generar el JWT utilizando el id del usuario y su rol
    return jwt.sign(
        { userId: user.id, rol: user.rol },
        process.env.JWT_SECRET, // Variable de entorno para la clave secreta
        { expiresIn: '1h' }
    );
};
