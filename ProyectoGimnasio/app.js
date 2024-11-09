import express from 'express';
import cors from 'cors';
import db, {testDbConnection} from './config/Connection.js';  // Conexión a la base de datos
import userRoutes from './routes/userRoutes.js';  // Rutas de usuarios
import authRoutes from './routes/authRoutes.js';

// Inicializar el servidor Express
const app = express();
const PORT = process.env.SV_PORT || 3000;  

// Middleware para parsear JSON
app.use(cors());
app.use(express.json());

// Rutas para gestionar usuarios
app.use('/users', userRoutes);
app.use('/login', authRoutes);

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

testDbConnection();