import { DataTypes } from 'sequelize';
import db from '../config/Connection.js';
import User from '../models/User.js';

const CheckIn = db.define('CheckIn', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    fechaHora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,  // Registra la fecha y hora del check-in automáticamente
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'Autorizado',  // Estado del check-in, puede ser 'Autorizado', 'Pendiente', etc.
    },
}, {
    timestamps: false,  // Evita la creación automática de columnas 'createdAt' y 'updatedAt'
});

User.hasMany(CheckIn, { foreignKey: 'clienteId' });
CheckIn.belongsTo(User, { foreignKey: 'clienteId' });

export default CheckIn;
