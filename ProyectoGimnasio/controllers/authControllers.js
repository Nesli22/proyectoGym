import { getUserByEmailService, verifyPassword, generateToken } from '../services/authService.js';

export const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({
            status: 'No',
            message: 'El correo y la contraseña son obligatorios',
        });
    }

    try {
        const user = await getUserByEmailService(correo);
        if (!user) {
            return res.status(404).json({
                status: 'No',
                message: 'Usuario no encontrado',
            });
        }

        const isPasswordValid = await verifyPassword(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'No',
                message: 'Credenciales incorrectas',
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            status: 'ok',
            message: 'Inicio de sesión exitoso',
            token,
            userId: user.id,
            rol: user.rol
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        res.status(500).json({
            status: 'No',
            message: 'Error al iniciar sesión',
            error: error.message,
        });
    }
};
