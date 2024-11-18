import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const DetalleVenta = sequelize.define(
  'DetalleVenta',
  {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'detalleVentas',
    timestamps: false,
  }
);

export default DetalleVenta;
