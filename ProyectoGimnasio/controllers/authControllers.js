import { getUserByEmailService, verifyPassword, generateToken } from '../services/authService.js';

export const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({
            message: 'El correo y la contraseña son obligatorios',
        });
    }

    try {
        const user = await getUserByEmailService(correo);
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
            });
        }

        const isPasswordValid = await verifyPassword(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Credenciales incorrectas',
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            rol: user.rol
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        res.status(500).json({
            message: 'Error al iniciar sesión',
            error: error.message,
        });
    }
};
