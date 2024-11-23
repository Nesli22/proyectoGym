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
    observacion:{
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    tableName: 'quejas',
    timestamps: false,
  }
);

Queja.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

export default Queja;
