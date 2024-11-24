import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

const dbName = process.env.DB_NAME || 'gym';
const dbUser = process.env.DB_USER || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPass = process.env.DB_PASS || '1234'; 
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbPort = process.env.DB_PORT || 3306;

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    logging: false,
});

export const testDbConnection = async () => {
    try {
        await db.authenticate();
        console.log('Prueba de conexión a la base de datos establecida exitosamente.');
    } catch (error) {
        console.error('Error al probar la conexión con la base de datos:', error);
    }
};

export default db;
