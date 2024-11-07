import express from 'express';
import db from './database/Connection.js';  // Conexión a la base de datos
import userRoutes from './routes/userRoutes.js';  // Rutas de usuarios

// Inicializar el servidor Express
const app = express();
const PORT = process.env.SV_PORT || 3000;  // Puerto del servidor, con valor por defecto

// Middleware para parsear JSON
app.use(express.json());

// Rutas para gestionar usuarios
app.use('/users', userRoutes);

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});

// Función para sincronizar la base de datos
async function sincronizarDB() {
    try {
        // Sincroniza la base de datos con los modelos
        await db.sync();
        console.log('La base de datos ha sido sincronizada con éxito.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
}

// Llamada a la función de sincronización de la base de datos
sincronizarDB();
