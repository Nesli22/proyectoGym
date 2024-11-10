import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/Connection.js';

class User extends Model {}

User.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('Administrador', 'Empleado', 'Cliente'),
        allowNull: false,
    },
    estadoActivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, { sequelize, modelName: 'User' });

export default User;
