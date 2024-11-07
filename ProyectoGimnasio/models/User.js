import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../database/Connection.js';

const User = sequelize.define(
  'User',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validación de formato de correo
      },
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoMembresia: {
      type: DataTypes.ENUM('Normal', 'Estudiante', 'VIP'),
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('Administrador', 'Empleado', 'Cliente'),
      allowNull: false,
    },
    estadoActivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  },
  {
    // Opciones adicionales del modelo
    tableName: 'users',          // Nombre de la tabla en la base de datos
    timestamps: true,            // Incluye campos createdAt y updatedAt
  },
);

export default User;
