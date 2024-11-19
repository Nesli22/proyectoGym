import { Router } from "express";
import { getUsers, createUser, getUserById, updateUserById, deleteUserById} from '../controllers/userControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getUsers);

router.post('/', authMiddleware, authorizeRoles('Administrador', 'Empleado'), createUser);

router.get('/', authMiddleware, authorizeRoles('Administrador', 'Empleado', 'Cliente'), getUserById); 

router.put('/:id', authMiddleware, authorizeRoles('Administrador', 'Empleado'), updateUserById);  

router.delete('/:id', authMiddleware, authorizeRoles('Administrador'), deleteUserById); 

export default router;
