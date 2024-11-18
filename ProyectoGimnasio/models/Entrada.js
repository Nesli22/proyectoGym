import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const Entrada = sequelize.define(
  'Entrada',
  {
    fechaEntrada: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
  },
  {
    tableName: 'entradas',
    timestamps: false,
  }
);

export default Entrada;
