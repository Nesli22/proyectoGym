import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import db, { testDbConnection } from './config/Connection.js';  // Conexión a la base de datos
import userRoutes from './routes/userRoutes.js';  // Rutas de usuarios
import authRoutes from './routes/authRoutes.js';

import User from './models/User.js';
import Membership from './models/Membership.js';
import Payment from './models/Payment.js';
import Report from './models/Report.js';
import Product from './models/Product.js';

// Inicializar el servidor Express
const app = express();
const PORT = process.env.SV_PORT || 3000;

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Función para crear el primer administrador
async function createAdmin() {
    try {
        const adminExists = await User.findOne({ where: { rol: 'Administrador' } });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('nomelase', 10);  // Hashea la contraseña
            await User.create({
                nombre: 'Administrador',
                correo: 'administrador@gmail.com',
                contraseña: hashedPassword,
                rol: 'Administrador',
                estadoActivo: true,
            });
            console.log('Administrador creado exitosamente');
        } else {
            console.log('Administrador ya existe');
        }
    } catch (error) {
        console.error('Error al crear el administrador:', error);
    }
}

// Rutas para gestionar usuarios
app.use('/users', userRoutes);
app.use('/login', authRoutes);

// Función para sincronizar la base de datos
async function sincronizarDB() {
    try {
        // Sincroniza la base de datos con los modelos
        await db.sync();
        console.log('La base de datos ha sido sincronizada con éxito.');
        // Crear el administrador después de sincronizar la base de datos
        await createAdmin();
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
}

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

// Llamada a la función de sincronización de la base de datos
sincronizarDB();

testDbConnection();
