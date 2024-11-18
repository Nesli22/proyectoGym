import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/Connection.js';

import DetalleVenta from './DetalleVenta.js'

const Producto = sequelize.define(
  "Producto",
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
    }
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);

Producto.hasMany(DetalleVenta, {
    foreignKey: "productoId",
    as: "productos",
})

export default Producto;
