import {request, response} from "express";
import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        // Obtiene todos los usuarios de la base de datos
        const users = await User.findAll();

        // Envía la lista de usuarios en formato JSON
        res.status(200).json({
            message: 'Usuarios obtenidos con éxito',
            status: '200',
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
    try {
        // Obtiene los datos desde el cuerpo de la solicitud
        const { nombre, correo, contraseña, tipoMembresia, rol, estadoActivo } = req.body;

        // Verifica que los campos requeridos no estén vacíos
        if (!nombre || !correo || !contraseña || !tipoMembresia || !rol) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios: nombre, correo, contraseña, tipoMembresia, rol'
            });
        }

        // Crea un nuevo usuario con los datos recibidos
        const user = await User.create({
            nombre,
            correo,
            contraseña,
            tipoMembresia,
            rol,
            estadoActivo: estadoActivo !== undefined ? estadoActivo : true // Valor por defecto a 'true' si no se pasa
        });

        // Responde con los datos del usuario recién creado
        return res.status(201).json({
            message: 'Usuario creado exitosamente',
            status: '201',
            user,
            
        });

    } catch (error) {
        console.error('Error al crear usuario:', error);

        // Manejo de errores específicos para que el cliente sepa el problema
        return res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};
