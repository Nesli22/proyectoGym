import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/Connection.js';

import User from '../models/User.js';

class Payment extends Model {}

Payment.init({
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    fechaPago: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    metodo: {
        type: DataTypes.ENUM('Tarjeta', 'Efectivo', 'Transferencia'),
        allowNull: false,
    }
}, { sequelize, modelName: 'Payment' });

// Relación uno a muchos con User
User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

export default Payment;
