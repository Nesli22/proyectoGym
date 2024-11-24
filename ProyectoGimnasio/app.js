import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

import db, { testDbConnection } from "./config/Connection.js"; 

import userRoutes from "./routes/userRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";

import Usuario from "./models/Usuario.js";
import Membresia from "./models/Membresia.js";
import Queja from "./models/Queja.js";
import Venta from "./models/Venta.js";
import DetalleVenta from "./models/DetalleVenta.js";
import Producto from "./models/Producto.js";

// Inicializar el servidor Express
const app = express();
const PORT = process.env.SV_PORT || 8080;

// Middleware para parsear JSON
app.use(
  cors({
    origin: "*", // Or '*' for all origins
    methods: ["GET", "POST", "OPTIONS","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

async function createDataPrincipal() {
  try {
  
    // Verifica si ya existe un administrador
    const adminExists = await Usuario.findOne({
      where: { rol: "Administrador" },
    });

    if (!adminExists) {
      // Genera un hash para la contraseña
      const hashedPassword = await bcrypt.hash("nomelase", 10);

      // Crea el administrador
      await Usuario.create({
        nombre: "Administrador",
        correo: "administrador@gmail.com",
        contraseña: hashedPassword,
        rol: "Administrador",
        estadoActivo: true,
        fechaRegistro: new Date(),
      });

      await Usuario.create({
        nombre: "Empleado",
        correo: "empleado@gmail.com",
        contraseña: hashedPassword,
        rol: "Empleado",
        estadoActivo: true,
        fechaRegistro: new Date(),
      });

      await Usuario.create({
        nombre: "Cliente",
        correo: "cliente@gmail.com",
        contraseña: hashedPassword,
        rol: "Cliente",
        estadoActivo: true,
        fechaRegistro: new Date(),
      });

        // Ejecuta el script SQL para insertar las membresías
    await db.query(`
      INSERT INTO membresias (tipo, costo, duracion_meses)
      VALUES
        ('Normal', 500, 3),       -- Membresía Normal: costo de 500, duración de 3 meses
        ('Estudiante', 300, 5),   -- Membresía Estudiante: costo de 300, duración de 5 meses
        ('VIP', 1000, 12);        -- Membresía VIP: costo de 1000, duración de 12 meses
    `);

      console.log("Administrador, Empleado, Cliente creado exitosamente");
    } else {
      console.log("Ya existe un administrador registrado.");
    }

    console.log("Datos de membresías insertados exitosamente");
  } catch (error) {
    console.error("Error en la inicialización de datos:", error);
  }
}

// Rutas para gestionar usuarios
app.use("/usuarios", userRoutes);
app.use("/ingresar", authRoutes);
app.use("/expiracion", authRoutes);
app.use("/clientes", customerRoutes);
app.use("/empleados", employeesRoutes);

// Función para sincronizar la base de datos
async function sincronizarDB() {
  try {
    // Sincroniza la base de datos con los modelos
    await db.sync();
 
    console.log("La base de datos ha sido sincronizada con éxito.");
    // Crear el administrador después de sincronizar la base de datos
    await createDataPrincipal();
  } catch (error) {
    console.error("Error al sincronizar la base de datos:", error);
  }
}

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});

// Llamada a la función de sincronización de la base de datos
sincronizarDB();

testDbConnection();
