import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/Connection.js';

const Pago = sequelize.define(
  'Pago',
  {
 
  },
  {
    tableName: 'pagos',
    timestamps: false,
  }
);

export default Pago;