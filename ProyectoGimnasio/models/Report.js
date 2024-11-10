import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/Connection.js';

import User from '../models/User.js';

class Report extends Model {}

Report.init({
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Resuelto'),
        defaultValue: 'Pendiente',
    }
}, { sequelize, modelName: 'Report' });

// Relación muchos a uno entre Report y User
User.hasMany(Report, { foreignKey: 'userId' });
Report.belongsTo(User, { foreignKey: 'userId' });

// Relación muchos a uno entre Report y Empleado (User con rol Empleado)
User.hasMany(Report, { as: 'AssignedReports', foreignKey: 'assignedTo' });
Report.belongsTo(User, { as: 'AssignedEmployee', foreignKey: 'assignedTo' });

export default Report;
