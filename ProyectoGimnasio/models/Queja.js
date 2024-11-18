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
  },
  {
    tableName: 'quejas',
    timestamps: false,
  }
);

export default Queja;
