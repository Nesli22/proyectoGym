import { getUserByEmailService, verifyPassword, generateToken, verifyTokenExpiration } from '../services/authService.js';

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
            data: ''+token+','+user.id+','+user.rol+','+user.nombre
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

export const checkTokenValidity = (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({
        status: "No",
        message: "El token es obligatorio",
      });
    }
  
    const result = verifyTokenExpiration(token);
  
    if (result.status) {
      return res.status(200).json({
        status: "Si",
        message: result.message,
        tiempoRestante: result.timeRemaining, 
      });
    } else {
      return res.status(401).json({
        status: "No",
        message: result.message,
      });
    }
  };