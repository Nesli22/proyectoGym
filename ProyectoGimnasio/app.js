import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import db, { testDbConnection } from "./config/Connection.js"; // Conexión a la base de datos
import userRoutes from "./routes/userRoutes.js"; // Rutas de usuarios
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

import Usuario from "./models/Usuario.js";
import Membresia from "./models/Membresia.js";
import Queja from "./models/Queja.js";

// Inicializar el servidor Express
const app = express();
const PORT = process.env.SV_PORT || 3000;

// Middleware para parsear JSON
app.use(
  cors({
    origin: "*", // Or '*' for all origins
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Función para crear el primer administrador
async function createAdmin() {
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

      console.log("Administrador creado exitosamente");
    } else {
      console.log("Ya existe un administrador registrado.");
    }
  } catch (error) {
    console.error("Error al crear el administrador:", error);
  }
}

// Rutas para gestionar usuarios
app.use("/usuarios", userRoutes);
app.use("/ingresar", authRoutes);
app.use("/clientes", customerRoutes);

// Función para sincronizar la base de datos
async function sincronizarDB() {
  try {
    // Sincroniza la base de datos con los modelos
    await db.sync();
 
    console.log("La base de datos ha sido sincronizada con éxito.");
    // Crear el administrador después de sincronizar la base de datos
    await createAdmin();
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
