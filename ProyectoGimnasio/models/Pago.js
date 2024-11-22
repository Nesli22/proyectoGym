import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const Pago = sequelize.define(
  'Pago',
  {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metodoPago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    tableName: 'pagos',
    timestamps: true, 
  }
);

export default Pago;
