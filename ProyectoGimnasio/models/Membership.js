import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/Connection.js';

import User from '../models/User.js';

class Membership extends Model {}

Membership.init({
    tipo: {
        type: DataTypes.ENUM('Normal', 'Estudiante', 'VIP'),
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, { sequelize, modelName: 'Membership' });

// Relación uno a uno con el usuario
User.hasOne(Membership, { foreignKey: 'userId' });
Membership.belongsTo(User, { foreignKey: 'userId' });

export default Membership;
