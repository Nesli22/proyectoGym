import { Router } from "express";
import { getUsers, createUser } from '../controllers/userControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta para obtener usuarios, accesible solo para Administradores y Empleados
router.get('/', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getUsers);

// Ruta para crear usuarios, accesible solo para Administradores
router.post('/', authMiddleware, authorizeRoles('Administrador'), createUser);

export default router;
