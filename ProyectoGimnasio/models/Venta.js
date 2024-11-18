import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

import DetalleVenta from './DetalleVenta.js'

const Venta = sequelize.define(
  'Venta',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'ventas',
    timestamps: false,
  }
);

Venta.hasMany(DetalleVenta, {
    foreignKey: "ventaId",
    as: "ventas",
})

export default Venta;
