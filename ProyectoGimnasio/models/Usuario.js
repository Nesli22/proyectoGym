import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/Connection.js';

import Membresia from "./Membresia.js";
import Queja from "./Queja.js";
import Entrada from "./Entrada.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estadoActivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

Membresia.hasOne(Usuario, {
  foreignKey: "membresiaId",
  as: "usuario",
});

// Relación 1 a muchos con Queja
Usuario.hasMany(Queja, {
  foreignKey: "usuarioId",
  as: "quejas",
});

// Relación 1 a muchos con Entrada
Usuario.hasMany(Entrada, {
  foreignKey: "usuarioId",
  as: "entradas",
});


export default Usuario;
