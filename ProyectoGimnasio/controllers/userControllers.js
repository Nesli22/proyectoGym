import {getUsersService, createUserService} from '../services/userService.js';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        // Obtiene todos los usuarios de la base de datos
        const users = await getUsersService();

        // Envía la lista de usuarios en formato JSON
        res.status(201).json({
            message: 'Usuarios obtenidos con éxito',
            status: '201',
            users,  
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        // Envía un mensaje de error en caso de fallas en la consulta
        res.status(500).json({
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

export const createUser = async (req, res) => {
    const { nombre, correo, contraseña, tipoMembresia, rol, estadoActivo } = req.body;

    if (!nombre || !correo || !contraseña || !tipoMembresia || !rol) {
        return res.status(400).json({
            message: 'Todos los campos son obligatorios: nombre, correo, contraseña, tipoMembresia, rol'
        });
    }

    try {
        const user = await createUserService(req.body);

        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            status: '201',
            data: user,
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({
            message: error.message || 'Error al crear el usuario',
            status: '500',
            error: error.message,
        });
    }
};


