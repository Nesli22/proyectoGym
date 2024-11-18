import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const Membresia = sequelize.define(
  'Membresia',
  {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costo: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duracion_meses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'membresias',
    timestamps: false,
  }
);

export default Membresia;
