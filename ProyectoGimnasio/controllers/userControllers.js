import {getUsersService, createUserService} from '../services/userService.js';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        // Obtiene todos los usuarios de la base de datos
        const users = await getUsersService();

        // Envía la lista de usuarios en formato JSON
        res.status(201).json({
            status: 'Ok',
            message: 'Usuarios obtenidos con éxito',
            users,  
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        // Envía un mensaje de error en caso de fallas en la consulta
        res.status(500).json({
            status: 'No',
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

export const createUser = async (req, res) => {
    const { nombre, correo, contraseña, rol, estadoActivo } = req.body;

    if (!nombre || !correo || !contraseña || !rol) {
        return res.status(400).json({
            status: 'No',
            message: 'Todos los campos son obligatorios: nombre, correo, contraseña, rol'
        });
    }

    try {
        const user = await createUserService(req.body);

        return res.status(201).json({
            status: 'Ok',
            message: 'Usuario creado exitosamente',
            usuarioId: user.id,
            nombre: user.nombre,
        });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({
            message: error.message || 'Error al crear el usuario',
            status: 'No',
            error: error.message,
        });
    }
};


