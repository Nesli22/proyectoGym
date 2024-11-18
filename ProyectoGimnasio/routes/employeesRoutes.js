import { Router } from "express";
import { createMemberShip, getMemberShips } from '../controllers/employeesControllers.js';
import { authMiddleware, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), createMemberShip);

router.get('/membresia', authMiddleware, authorizeRoles('Administrador', 'Empleado'), getMemberShips);

export default router;