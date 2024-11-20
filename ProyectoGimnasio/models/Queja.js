import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const Queja = sequelize.define(
  'Queja',
  {
    asunto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.TEXT,
      defaultValue: 'Pendiente',
      allowNull: false,
    },
  },
  {
    tableName: 'quejas',
    timestamps: false,
  }
);

export default Queja;
